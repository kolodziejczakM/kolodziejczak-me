# Narzędzia czytania i kategorie — korekta po podglądzie Astro

18 października 2026. Uwagi użytkownika wraz z czterema screenshotami odnoszą się do właściwej implementacji Astro, na porcie 4322. Fonty, kolory i rodzina kontrolek pozostają ustalone.

## Zmiany

- Usunięto wszystkie odnośniki do about.me z wizytówki, stopki i artykułu oraz adres z konfiguracji. Strona zastępuje tę usługę.
- Kolejność przed tekstem: czas czytania, zwinięty TL;DR, zwinięty spis treści. Oba akordeony działają na wszystkich szerokościach, również bez JS. Nie ma dialogu TL;DR ani dodatkowego spisu w bocznej kolumnie.
- Czas pochodzi wyłącznie z `audio[locale].durationSeconds`, zaokrąglonego w górę do minut z polską/angielską odmianą. Brak nagrania oznacza kreskę i informację, kiedy czas się pojawi. Nie dodano fikcyjnych pięciu minut.
- Dialog promptu ma główny przycisk po prawej. Tę samą zasadę stosuje dialog udostępniania.
- W rogu artykułu znajduje się przycisk rozmowy. Otwiera oznaczony podgląd miejsca na ElevenLabs, bez wejścia tekstowego i pozorowania działającej odpowiedzi. Nie wysyła danych.
- Przycisk powrotu na górę był obecny, ale ukryty przed przekroczeniem połowy artykułu. Zachowano ten próg i umieszczono strzałkę nad przyciskiem rozmowy, z uwzględnieniem dolnego bezpiecznego obszaru ekranu.

## Proponowane kategorie

To robocza propozycja wdrożona w podglądzie, do oceny autora.

| PL | EN | Zakres |
| --- | --- | --- |
| Programowanie | Programming | Kod, architektura, narzędzia i budowanie oprogramowania |
| AI | AI | Modele, agenci, eksperymenty i zastosowania sztucznej inteligencji |
| Film | Film | Kino, montaż, opowiadanie obrazem |
| Książki | Books | Recenzje i przemyślenia po lekturze |
| Na styku | At the intersection | Połączenia dziedzin, np. film + interfejsy albo AI + programowanie |
| Poza kadrem | Beyond the frame | Osobiste obserwacje i tematy poza pozostałymi kategoriami |

Jedna główna kategoria na artykuł utrzymuje prostą nawigację. „Na styku” mieści teksty, w których samo połączenie dziedzin stanowi temat. Przykładowo tekst o montażu i interfejsach otrzymał tę kategorię. Puste tematy mają czytelny komunikat po wybraniu filtra, zamiast pustej listy. Typ treści, np. recenzja, nie jest osobną kategorią: recenzja książki trafia do Książek.

## Weryfikacja

`npm run validate`: kontrola TypeScript, 12 statycznych stron, 11 testów. Obejmują odmianę czasu z długości nagrania, kolejność elementów, brak dialogu TL;DR i brak about.me w wynikowych stronach.

Chromium: 40 widoków PL/EN przy 320/390/768/1440 px, brak poziomego przepełnienia, błędów JS i żądań zewnętrznych. Dodatkowo: rozwijanie TL;DR i spisu bez JS, dialog i kopiowanie promptu z przyciskiem wyrównanym do prawej, pusty filtr, otwieranie placeholdera oraz pojawianie się i działanie strzałki powrotu.

Podglądy: [artykuł mobile](previews/astro-article-mobile.png), [prompt](previews/astro-prompt-mobile.png), [placeholder rozmowy](previews/astro-agent-mobile.png).

## Prompt po lekturze

Po uwadze użytkownika o nadmiarze ramek nad tekstem przeniesiono prompt pod treść artykułu, po prawej stronie, przed podziękowaniem i udostępnianiem. Zachowano dotychczasowy przycisk oraz dialog z główną akcją po prawej. Osobny komponent `ArticlePrompt.astro` nie należy już do narzędzi nad tekstem. Bez JS treść promptu nadal otwiera się w natywnym `details`.

Weryfikacja: `npm run validate` (13 testów); osiem widoków PL/EN przy 320/390/768/1440 px, położenie po treści i przy prawej krawędzi, otwarcie/zamknięcie dialogu, przywracanie fokusu oraz rozwinięcie bez JS. [Podgląd na telefonie](previews/astro-prompt-after-article-mobile.png).

## Kompaktowe przełączniki TL;DR i spisu treści

Użytkownik zaproponował zamiast dwóch pełnych wierszy małe przyciski o szerokości dopasowanej do etykiet, w jednej linii, ze wspólnym miejscem rozwijania treści. Wdrożono „TL;DR · 5 zdań” i „Spis treści” z jednym panelem pod przyciskami. Początkowo panel jest zamknięty; kliknięcie innej akcji zastępuje jego zawartość, a ponowne kliknięcie aktywnej zamyka go. Aktywny przycisk ma szałwiowe wypełnienie.

Kontrolki są przyciskami rozwijania (`aria-expanded`, wspólne `aria-controls`, panel z `aria-labelledby`), a nie widgetem ARIA tabs wymagającym stale wybranej zakładki. Klawiatura działa natywnie: Tab, Enter, Spacja. Skrypt wykorzystuje istniejącą treść HTML i nie pobiera dodatkowych danych. Bez JS pozostają natywne `details` ze wspólnym `name`, dzięki czemu w obsługujących tę funkcję przeglądarkach również mogą być otwarte wyłącznie pojedynczo.

Weryfikacja: TypeScript, build i 13 testów; osiem widoków PL/EN przy 320/390/768/1440 px. Sprawdzono pojedynczy wiersz, szerokości według tekstu, wspólne położenie panelu, wyłączność treści, ponowne zwinięcie, klawiaturę i brak poziomego przepełnienia. Dodatkowo sprawdzono natywne rozwijanie i wyłączność bez JS.

Podglądy: [zwinięte przyciski](previews/astro-reading-controls-mobile.png), [TL;DR](previews/astro-reading-summary-mobile.png), [spis treści](previews/astro-reading-contents-mobile.png).
