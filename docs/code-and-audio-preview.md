# Czytanie: krótszy nagłówek, zawijanie kodu i mock audio

18 października 2026. Użytkownik poprosił o usunięcie zbędnego podpisu autora między opisem i hero, zawijanie dłuższych linii kodu, ograniczenie wysokości przykładów oraz widoczny placeholder odtwarzacza.

## Wdrożenie

- Z nagłówka artykułu usunięto avatar, nazwisko i notkę o przykładowym autorstwie. Zdjęcie hero następuje po opisie. Ogólne oznaczenia przykładowych treści pozostają w treści i stopce; podpis fotografa jest nadal pod zdjęciem.
- Bloki kodu zachowują formatowanie i podświetlanie, ale dłuższe linie zawijają się (`pre-wrap`, `overflow-wrap: anywhere`). Treść źródłowa i białe znaki nie są zmieniane na potrzeby zawijania.
- Dłuższe bloki mają podgląd do 220 px na telefonie i do 300 px na większym ekranie, z przyciskiem „Rozwiń kod” / „Zwiń kod”. Krótkie bloki nie otrzymują zbędnego przycisku. Kontrolka ma `aria-expanded` i `aria-controls`; po zwinięciu długiego bloku użytkownik wraca do jego początku, jeśli znajdował się poniżej.
- Ulepszenie bloków jest dodawane po załadowaniu fontów. Font kodu jest wstępnie ładowany na stronach artykułów. Bez JS cały kod pozostaje rozwinięty i nadal się zawija; pełna treść jest w początkowym HTML.
- Pasek czytania obserwuje zmianę rozmiaru treści, więc rozwinięcie lub zwinięcie kodu aktualizuje postęp.
- Gdy brak plików audio, pod spisem treści pojawia się `NarrationPlaceholder.astro`: nagłówek, wybór PL/EN, nieaktywny play, nieaktywna oś czasu, 0:00 / —:— i jasne oznaczenie podglądu. Domyślny język odpowiada stronie; można porównać zaznaczenie PL/EN także bez JS. Nie ma symulacji odtwarzania ani fikcyjnej długości nagrania. Przy podanych plikach zachowany jest prawdziwy odtwarzacz audio.
- W pierwszej przykładowej parze MDX umieszczono dłuższy blok TypeScript, żeby można było ocenić zawijanie i rozwijanie w podglądzie.

## Weryfikacja

`npm run validate`: TypeScript, 12 statycznych stron i 13 testów Node. W Chromium sprawdzono 320/390/768/1440 px: brak przewijania poziomego wewnątrz kodu i strony, ograniczenie wysokości, rozwinięcie całego przykładu, ponowne zwinięcie, brak przycisku dla krótkiego fragmentu, PL/EN oraz zachowanie bez JS. Sprawdzono też domyślny język mocka audio, wybór drugiego języka i nieaktywne odtwarzanie. Bez błędów skryptów i żądań zewnętrznych.

Podglądy: [kod zwinięty](previews/astro-code-collapsed-mobile.png), [kod rozwinięty](previews/astro-code-expanded-mobile.png), [mock audio](previews/astro-audio-preview-mobile.png), [cały artykuł](previews/astro-article-tools-mobile.png).
