# Linki do nagłówków i cytatów

Nagłówki MDX miały identyfikatory, ale brakowało klikalnych odnośników. Cytaty nie miały identyfikatorów. Oba elementy mają teraz linki w statycznym HTML; wejście z `#fragmentem` korzysta z natywnego przewijania przeglądarki i działa bez JS.

`article-fragments.ts` rozszerza używany już przez Astro 7 procesor Satteri. Bezpośrednio zadeklarowano aktualne `@astrojs/markdown-satteri@0.4.4` (wcześniej było zależnością pośrednią MDX). Zachowano dotychczasowe ID nagłówków i spis treści. Link `#` jest dekoracją CSS, więc nie zanieczyszcza nazw nagłówków w spisie. Źródła API: [Satteri](https://docs.astro.build/en/reference/markdown-processors/satteri/), [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/).

Cytaty Markdown dostają ID `quote-` plus skrót SHA-256 tekstu. Dopisanie akapitu lub przestawienie różnych cytatów nie zmienia ich adresów. Identyczne cytaty dostają kolejne sufiksy. Zmiana treści cytatu zmienia jego domyślny identyfikator; dla trwałego adresu redagowanego cytatu można w MDX zaimportować `ArticleQuote.astro` i podać własne `id`.

`ArticleQuote.astro` renderuje tekst i dwie małe akcje: link do cytatu oraz kopiowanie samego tekstu. Bez JS pozostaje natywny link; przycisk kopiowania pokazuje się dopiero po inicjalizacji. Kliknięcie tekstu nagłówka lub cytatu aktualizuje hash. Zaznaczanie tekstu oraz kliknięcia w elementy interaktywne nie są przejmowane. Link cytatu z JS kopiuje pełny adres bieżącego podglądu z fragmentem, bez JS prowadzi do fragmentu. Obsługa schowka korzysta z istniejącego mechanizmu Clipboard API / HTTP fallback, a potwierdzenie pojawia się w tooltipie.

Weryfikacja: TypeScript, build 12 stron, 15 testów Node. Dwa nowe testy dotyczą stabilności adresów po zmianach niezwiązanych z cytatem, duplikatów oraz zachowania slugów i czystych nazw w spisie treści. Chromium: rzeczywisty odczyt schowka po kopiowaniu tekstu i linku w prywatnym HTTP, ponowne wejście z fragmentem, kliknięcie nagłówka, 8 widoków PL/EN przy 320/390/768/1440 px oraz nawigacja do cytatu i nagłówka bez JS.

Po porównaniu prototypów użytkownik wybrał formę B: wyśrodkowany cytat bez ramki, z dużym miodowym cudzysłowem nad tekstem. [Decyzja i weryfikacja wdrożenia](quote-design-study.md#wdrożony-wariant-b).
