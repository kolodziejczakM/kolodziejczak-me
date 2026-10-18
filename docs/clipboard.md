# Kopiowanie linku i promptu do schowka

18 października 2026. Użytkownik zgłosił, że „Kopiuj link” i „Kopiuj prompt” tylko zaznaczają tekst w podglądzie otwartym na iPhonie przez HTTP.

## Przyczyna i poprawka

W rzeczywistym podglądzie `isSecureContext` było fałszywe, a `navigator.clipboard` niedostępne. Poprzedni `catch` wyłącznie wykonywał `focus()` i `select()`, bez polecenia kopiowania. Test odczytujący rzeczywisty schowek odtworzył błąd: po kliknięciu pozostawała poprzednia zawartość.

Wspólny helper `src/scripts/clipboard.ts` najpierw używa `navigator.clipboard.writeText()`. Gdy API jest niedostępne albo odmawia zapisu, zaznacza pole i wywołuje `document.execCommand('copy')` w obsłudze kliknięcia. Następnie przywraca fokus i wcześniejszy zakres zaznaczenia. To działa też wewnątrz natywnego dialogu, bez tworzenia pomocniczego pola poza jego aktywną warstwą.

Komunikat sukcesu pojawia się po zakończonym zapisie lub pozytywnym wyniku `execCommand`. Jeżeli oba mechanizmy zawiodą, wyświetlany jest błąd i prośba o ponowienie. Usunięto traktowanie samego zaznaczenia jako wyniku przycisku „Kopiuj”.

[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) wymaga bezpiecznego kontekstu. [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) jest starszym, deprecated mechanizmem używanym tutaj wyłącznie jako fallback. Przeglądarka może zabronić obu metod; kod nie przedstawia wtedy nieudanego zapisu jako sukcesu.

## Weryfikacja

`npm run validate`: TypeScript, build 12 stron, 13 testów Node. Test regresji w `scripts/check-clipboard.cjs` uruchamia prawdziwą przeglądarkę i odczytuje schowek z osobnej, bezpiecznej strony localhost w tym samym kontekście przeglądarki. Porównuje pełny tekst po kliknięciu obu przycisków.

Sprawdzone scenariusze w Chromium:

1. Rzeczywisty podgląd HTTP w Tailscale: API nieobecne, polecenie zastępcze zapisuje pełny link/prompt.
2. Ten sam zbudowany HTML i zasoby pod testowym originem HTTPS: główne Clipboard API zapisuje tekst bez wywołania starszego polecenia.
3. Testowa odmowa głównego API: zapis zastępczy faktycznie zmienia schowek.
4. Testowa odmowa obu metod: schowek nie zmienia się i interfejs pokazuje błąd.

Test HTTPS wykorzystuje przechwycenie żądań przez Playwright, a nie publicznie wdrożony certyfikat. Weryfikacja nie obejmuje fizycznego iPhone’a/Safari. Zachowanie urządzeń pozostaje ograniczone uprawnieniami przeglądarki.

Test przeglądarkowy wymaga oddzielnie dostępnego pakietu Playwright i Chromium. Nie dodaje ich do zależności strony. Uruchomienie w zwykłym środowisku z Playwright:

```sh
CLIPBOARD_TEST_URL=http://100.113.202.72:4322 node scripts/check-clipboard.cjs
```

Jeśli Playwright jest zainstalowany poza repo, wskaż ścieżkę do jego pakietu przez `PLAYWRIGHT_MODULE`. Na obecnym serwerze wykorzystano istniejące narzędzia podglądu:

```sh
PLAYWRIGHT_MODULE=/tmp/kolodziejczak-preview/node_modules/playwright \
LD_LIBRARY_PATH=/tmp/kolodziejczak-preview/libs/usr/lib/aarch64-linux-gnu \
node scripts/check-clipboard.cjs
```

## HTTPS w Tailscale

Sprawdzono możliwość udostępnienia `dist/` przez `tailscale serve`. Zmiana konfiguracji wymaga uprawnień administratora; konto nie ma uprawnień operatora, a `sudo -n` wymaga hasła. Nie zmieniono konfiguracji Serve ani istniejącego podglądu HTTP. Ta poprawka kopiowania działa przy obecnym adresie. Docelowe publiczne wdrożenie powinno mieć HTTPS; źródło: [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve).
