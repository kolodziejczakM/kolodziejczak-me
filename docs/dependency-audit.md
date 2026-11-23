# Audyt zależności i archiwalny wyjątek

**Aktualizacja 23 listopada 2026:** zgłoszenie zostało wycofane z bazy 18 listopada o 15:38 UTC, a surowy audyt ponownie przechodzi bez wyjątków. Usunięto kod akceptacji oraz powiązane testy; `npm run audit:check` uruchamia teraz bezpośrednio standardowy audyt. Wersje Astro i picomatch nie zostały zmienione. Poniższy opis dokumentuje historyczną decyzję.

Decyzja autora z 18 listopada 2026: zachować Astro 7.4.12 i dopuścić czasowo wyłącznie [GHSA-fc5q-39xc-vjpf / CVE-2026-112366](https://github.com/advisories/GHSA-fc5q-39xc-vjpf). Jest to akceptacja ograniczonego ryzyka, nie usunięcie podatności.

## Przyczyna i zakres

W [nieudanym uruchomieniu PR #1](https://github.com/kolodziejczakM/kolodziejczak-me/actions/runs/44280400966) instalacja, TypeScript, build i 20 testów przeszły. Zablokował je audyt z 11 pozycjami high, wynikającymi z jednej podatności w picomatch oraz zależnych od niego pakietach. Poprzednie udane uruchomienie dotyczyło tego samego commita. Zgłoszenie w bazie zaktualizowano 17 listopada o 15:56 UTC, już po wcześniejszym zielonym CI. Na dzień decyzji najnowszy picomatch 4.0.7 nadal był podatny i nie było opublikowanej poprawki. `npm audit fix --force` proponował cofnięcie Astro do 5.3.0, więc go nie zastosowano.

Podatność pozwala przeciążyć Node.js przez złośliwe wzorce extglob. W tym repo wzorce pochodzą z zaufanej konfiguracji i plików autora. Wdrażany jest statyczny `dist/`, bez serwera Astro i bez biblioteki picomatch w kodzie przeglądarki; odwiedzający nie przekazują wzorców do narzędzi budowania. Ryzyko pozostaje w środowisku budowania. Dodanie renderowania serwerowego, adaptera, niezaufanego CMS lub wejścia użytkownika wymaga ponownego przeglądu.

Wyjątek jest ograniczony do:

- dokładnego URL i identyfikatora `GHSA-fc5q-39xc-vjpf`;
- pakietu `picomatch`, zakresu zgłoszenia `<=4.0.7`, klasyfikacji high;
- wersji z obecnego lockfile: `4.0.7` i pośredniej `2.3.2`;
- jawnego `output: "static"` bez adaptera w konfiguracji Astro;
- daty **2026-11-25 włącznie, według UTC**. Kolejne uruchomienia od 26 listopada ponownie blokują to zgłoszenie, jeżeli nadal występuje. Nie ma automatycznego przedłużania ani osobnego harmonogramu powiadomień.

## Działanie kontroli

`npm run audit:check` uruchamia rzeczywiste `npm audit --omit=dev --audit-level=moderate --json`, zapisuje pełny wynik w logach i ocenia łańcuchy `via`. Akceptacja pakietów nadrzędnych wynika wyłącznie z tego samego zgłoszenia. Nie ma listy pomijanych nazw Astro, Vite ani innych pakietów.

CI pokazuje ostrzeżenie o czasowej akceptacji. Nowe zgłoszenie w tym samym picomatch, inna podatność moderate/high/critical, wzrost klasyfikacji do critical, zmiana wersji lub zakresu, wygaśnięcie akceptacji albo niekompletny raport powodują błąd. Brak dostępu do rejestru, niepoprawny JSON i nieobsługiwany format audytu również nie mogą przejść jako czysty wynik. Poziomy info/low pozostają informacyjne, tak jak wcześniej przy progu moderate.

Zwykłe `npm audit --omit=dev --audit-level=moderate` nadal może kończyć się błędem - to oczekiwany surowy raport. Zależności i lockfile nie zostały zmienione przez ten wyjątek. Nie używamy `continue-on-error` ani podniesienia globalnego progu do critical. Ta sama kontrola działa w GitHub Actions oraz `npm run release:check`.

Implementacja: `scripts/check-audit.mjs`, `scripts/lib/audit-policy.ts`. Polityka jest sprawdzana przez TypeScript; testy w `tests/audit-policy.test.ts` obejmują akceptację znanego łańcucha oraz przypadki blokujące, w tym wygaśnięcie i nowe zgłoszenia.

## Usunięcie wyjątku

1. Przed 26 listopada sprawdzić zgłoszenie i dostępne wydania picomatch (`npm view picomatch version`). Jeżeli poprawki nadal nie ma, ponownie ocenić ryzyko; nie przesuwać daty automatycznie.
2. Gdy poprawka będzie opublikowana, zaktualizować zależności tak, aby oba podatne wystąpienia w `npm ls picomatch --all` zostały usunięte lub zastąpione poprawionymi wersjami. Nie wymuszać innego major bez sprawdzenia zgodności.
3. Uruchomić `npm ci`, `npm run validate` oraz surowe `npm audit --omit=dev --audit-level=moderate`. Sprawdzić stronę po aktualizacji.
4. Po czystym audycie usunąć wyjątek i jego konfigurację, przywrócić surowy audyt w CI oraz uaktualnić README i ten dokument. Ograniczenie to jest czasowe i nie stanowi ogólnej polityki ignorowania zgłoszeń bez poprawki.
