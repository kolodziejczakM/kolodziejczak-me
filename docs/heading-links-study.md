# Porównanie odnośników przy nagłówkach

Użytkownik poprosił o prototypy, ponieważ hash przypięty do końca pierwszego wiersza wygląda na oderwany od tekstu. Rozważamy symbol związany z ostatnim słowem oraz ikonę linku przed nagłówkiem. Wybór pozostaje otwarty; zwykła implementacja nie została zmieniona.

Źródło pierwotne eksperymentu: gałąź **`codex/heading-links-study`**, commit **`4f65f6d`**. Zawiera komponent, CSS, skrypt, pełny opis i cztery zrzuty w `docs/previews/heading-study/`. Właściwa gałąź ma tylko ten wskaźnik, bez kodu próbnika.

Prywatne porównanie na tej samej stronie artykułu:

- [A: Hash przy ostatnim słowie](http://vps.tailfb5686.ts.net:4326/pl/blog/mniej-ale-lepiej/?variant=A#szybciej-nie-zawsze-znaczy-bli%C5%BCej). Symbol zawija się razem z ostatnim słowem.
- [B: Link przy ostatnim słowie](http://vps.tailfb5686.ts.net:4326/pl/blog/mniej-ale-lepiej/?variant=B#szybciej-nie-zawsze-znaczy-bli%C5%BCej). Ta sama zasada z ikoną linku.
- [C: Link na początku](http://vps.tailfb5686.ts.net:4326/pl/blog/mniej-ale-lepiej/?variant=C#szybciej-nie-zawsze-znaczy-bli%C5%BCej). Ikona przy pierwszym słowie, dalsze wiersze wracają do brzegu kolumny.
- [D: Link na marginesie](http://vps.tailfb5686.ts.net:4326/pl/blog/mniej-ale-lepiej/?variant=D#szybciej-nie-zawsze-znaczy-bli%C5%BCej). Ikona w osobnym lewym miejscu, wszystkie wiersze tekstu na jednej osi.

Dolny pasek i strzałki klawiatury zmieniają wariant. URL zachowuje wybór i fragment. Identyfikatory sekcji pozostają te same. Zachowano ustalony wygląd reszty strony, w tym wybrany cytat, tło i player o maksymalnej szerokości 560 px.

Worktree `/tmp/kolodziejczak-heading-study`, jednostka `kolodziejczak-heading-preview.service`, wyłącznie Tailscale `100.113.202.72:4326`. Odtworzenie z gałęzi: `npm ci`, `npm run prototype:headings`; build statyczny z `PROTOTYPE_HEADINGS=1 npm run build`. Bez flagi próbnik nie jest renderowany. Wybrane rozwiązanie należy później przepisać do generatora HTML i CSS; obecne warianty zmieniają nagłówki w przeglądarce.

Weryfikacja eksperymentu: build 12 stron, TypeScript, Chromium PL/EN × cztery warianty × 320/390/844/1440 px, bez przewijania poziomego i błędów JS. Sprawdzono grupowanie słowa z symbolem, linki do sekcji, przeładowanie z fragmentem, przyciski i klawiaturę. Zwykły build bez flagi nie zawiera próbnika w HTML. To kontrola działania prototypu, nie ostateczna implementacja wybranego wariantu.
