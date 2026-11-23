# Prototypy formy cytatu

Użytkownik zamówił mocniejsze wyróżnienie ważnych cytatów, cudzysłów zamiast bocznej linii, klikalne nagłówki i cytaty z własnym fragmentem oraz małą akcję kopiowania.

Funkcje linkowania i schowka są już wdrożone w zwykłej stronie (`e80ddfe`). [Implementacja, stabilność ID, testy i źródła API](article-fragments.md). Użytkownik wybrał **B: Myśl na pierwszym planie**. Wariant jest wdrożony w zwykłym podglądzie na porcie 4322.

Źródło pierwotne eksperymentu: gałąź **`codex/quote-design-study`**, commit **`15a0c33`**. Obejmuje komponent, CSS, skrypt próbnika, pełny opis i trzy zrzuty w `docs/previews/quote-study/`. We właściwej gałęzi nie ma kodu wariantów. Wybraną formę przepisano do właściwego komponentu i CSS; próbnik i pozostałe warianty pozostają w archiwum.

- [A: Cudzysłów na karcie](http://localhost:4325/pl/blog/mniej-ale-lepiej/?variant=A#quote-2ab8b43fc0cc): duży znak nad tekstem, miękka karta, szałwiowy tekst.
- [B: Myśl na pierwszym planie](http://localhost:4325/pl/blog/mniej-ale-lepiej/?variant=B#quote-2ab8b43fc0cc): wyśrodkowany cytat bez pudełka i większa typografia.
- [C: Cudzysłów na marginesie](http://localhost:4325/pl/blog/mniej-ale-lepiej/?variant=C#quote-2ab8b43fc0cc): znak obok tekstu, osobna kolumna, zwarta forma.

Każdy wariant zachowuje funkcjonalne linki i kopiowanie. Dolny pasek i strzałki zmieniają A/B/C. Adres zapisuje wariant i fragment. Nie zmieniano pozostałych wybranych elementów strony.

Podgląd Tailscale jest na `100.x.y.z:4325`, w jednostce użytkownika `kolodziejczak-quote-preview.service`, serwującej `/tmp/kolodziejczak-quote-study/dist`. Odtworzenie: z gałęzi eksperymentu `npm ci` i `npm run prototype:quotes` (localhost:4325). Próbnik wymaga `PROTOTYPE_QUOTES=1`. Worktree i jednostka są tymczasowe; po restarcie odtworzyć podgląd z gałęzi.

Kontrola eksperymentu: TypeScript, build 12 stron, Chromium w 24 widokach PL/EN przy 320/390/768/1440 px. Brak przepełnienia i błędów JS. Sprawdzono rzeczywistą zawartość schowka po kopiowaniu tekstu i adresu dla każdego wariantu, wejście z fragmentem, przełączanie, przeładowanie URL i informacje próbnika.


## Wdrożony wariant B

Cytat jest wyśrodkowany, bez ramki, kolorowego pudełka i bocznej linii. Ma duży miodowy cudzysłów nad tekstem, responsywną typografię 29-38 px oraz wyśrodkowane akcje linku i kopiowania. Cudzysłów jest dekoracyjnym elementem `aria-hidden`, nie trafia do kopiowanego tekstu i nie zmienia identyfikatora fragmentu. Nie dodano próbnika do właściwej strony.

Weryfikacja: `npm run validate` (TypeScript, build 12 stron, 15 testów Node). Chromium: osiem widoków PL/EN przy 320/390/768/1440 px; odczyt rzeczywistego schowka po kopiowaniu tekstu i linku przez HTTP, ponowne wejście z fragmentem, kliknięcie nagłówka oraz natywne linki bez JS. Dodatkowo sprawdzono wyśrodkowanie, brak ramki i tła oraz ukrycie dekoracji przed czytnikami ekranu. [Wybrany cytat na telefonie](previews/selected-quote-mobile.png).
