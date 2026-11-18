# Tooltip kopiowania i systemowe udostępnianie

18 października 2026. Użytkownik poprosił o przeniesienie potwierdzenia kopiowania do tooltipu i zastąpienie dialogu udostępniania systemowym panelem.

## Zachowanie

- Kopiowanie promptu i linku pokazuje tooltip przy użytym przycisku, przez około 3 sekundy. Nie powiększa dialogu ani nie przesuwa treści. Podczas przewijania podąża za przyciskiem; znika, gdy przycisk opuszcza ekran, po Escape, zmianie rozmiaru lub zamknięciu dialogu. Powtórne kliknięcie zastępuje poprzedni komunikat.
- Tooltip używa warstwy Popover API, jeśli jest dostępna, dzięki czemu nie jest przycinany przez przewijany dialog. Bez Popover pozostaje pozycjonowanym elementem przy przycisku. Zachowano dyskretne, wizualnie ukryte regiony `aria-live` i powiązanie `aria-describedby`.
- „Udostępnij artykuł” wywołuje `navigator.share({title, url})` bez otwierania własnego dialogu, bezpośrednio z kliknięcia. Jeżeli `navigator.canShare` jest dostępne, sprawdzana jest obsługa danych.
- Anulowanie (`AbortError`) nie uruchamia kopiowania i nie pokazuje błędu. Błąd uruchomienia udostępniania powoduje próbę skopiowania linku z tooltipem. Przy braku obsługi API przycisk od razu nazywa się „Kopiuj link” i ma ikonę kopiowania.
- Bez JS pozostało natywne rozwinięcie pokazujące odnośnik, dostępny do ręcznego skopiowania.

Systemowy panel wymaga bezpiecznego kontekstu i obsługi API w urządzeniu/przeglądarce: [MDN — navigator.share](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share). Obecny prywatny podgląd jest HTTP, więc jego rzeczywistą akcją jest kopiowanie linku. Konfiguracja HTTPS w Tailscale nadal wymaga administratora serwera; wcześniejsza próba zakończyła się odmową dostępu, a `sudo -n` wymagało hasła. Nie zmieniono konfiguracji hostingu ani nie opublikowano strony. Mechanizm tooltipu: [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using).

## Weryfikacja

`npm run validate`: TypeScript, 12 statycznych stron, 13 testów Node.

Chromium, osiem widoków PL/EN przy 320/390/768/1440 px: tooltip mieści się w ekranie, znajduje się nad dialogiem, nie zmienia jego wymiarów, występuje pojedynczo i jest automatycznie usuwany. Sprawdzono brak własnego dialogu dla kopiowania linku i fallback bez JS. [Prompt](previews/astro-copy-tooltip-mobile.png), [link](previews/astro-share-copy-tooltip-mobile.png).

`scripts/check-clipboard.cjs` nadal odczytuje rzeczywisty schowek po obu akcjach: HTTP, bezpieczny kontekst, odmowa głównego API oraz odmowa obu mechanizmów. Zmieniono selektory dla linku kopiowanego bez dialogu i potwierdzenia w tooltipie.

`scripts/check-sharing.cjs` sprawdza tooltip po pierwszym kliknięciu na HTTP (także po zakolejkowanym przewinięciu do przycisku), wywołanie Web Share API z tytułem i adresem oraz aktywacją użytkownika, brak dialogu strony, anulowanie bez efektu ubocznego, błąd i brak obsługi danych. Testy API używają przechwyconego originu HTTPS i stubu systemowego panelu, ponieważ headless Chromium nie automatyzuje interfejsu systemu operacyjnego. Nie jest to test panelu na fizycznym iPhonie.

Do testów przeglądarkowych potrzebny jest oddzielny pakiet Playwright/Chromium. W istniejącym środowisku narzędziowym serwera:

```sh
PLAYWRIGHT_MODULE=/tmp/kolodziejczak-preview/node_modules/playwright \
LD_LIBRARY_PATH=/tmp/kolodziejczak-preview/libs/usr/lib/aarch64-linux-gnu \
node scripts/check-sharing.cjs
```

Analogicznie można uruchomić `scripts/check-clipboard.cjs`. `CLIPBOARD_TEST_URL` zmienia adres podglądu użyty w obu testach.
