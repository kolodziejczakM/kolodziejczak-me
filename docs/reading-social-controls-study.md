# Grupa czytania i sociale — porównanie

Użytkownik zamówił wizualnie połączone przełączniki TL;DR / spisu treści i alternatywne przyciski sociali. Ustalona kolejność kontaktów **Facebook → Telegram → LinkedIn → WhatsApp** jest już wdrożona w zwykłym podglądzie (`df2300f`). Użytkownik wybrał **A — Wspólna kapsuła** oraz **A — Piktogram i nazwa**; zestaw jest wdrożony w zwykłym podglądzie.

Eksperyment jest na gałęzi **`codex/reading-social-controls-study`**, commit **`d3a6745`**. To źródło pierwotne: komponenty `ControlStudy.prototype.astro` / `SocialIcon.prototype.astro`, skrypt, CSS oraz pełna dokumentacja i sześć zrzutów w `docs/previews/controls-study/`. Kod eksperymentu nie jest częścią właściwej implementacji. Do właściwej implementacji przepisano wyłącznie wybrane A/A, pozostawiając resztę na gałęzi archiwum.

Prywatne porównania Tailscale:

- [Grupa czytania](http://localhost:4324/pl/blog/mniej-ale-lepiej/?study=tabs&variant=A#reading-study): **A — Wspólna kapsuła**, **B — Zakładki na panelu**, **C — Wspólna linia**.
- [Sociale](http://localhost:4324/pl/?study=socials&variant=A#contact): **A — Piktogram i nazwa**, **B — Lista kontaktów**, **C — Znaki z podpisem**.

Dolny pasek zmienia wariant i obszar, przenosząc do odpowiedniej strony/sekcji. Oba wybory są niezależne i zapisane w URL. Podsumowanie jest na początku rozwinięte; zachowano możliwość zamknięcia obu paneli i zastępowania jednego drugim. Linki kontaktowe pozostają nieaktywne do uzupełnienia adresów. Logo, karty, kolory, fonty i tło zachowują poprzedni wybór D/C/D.

Uruchomienie z gałęzi eksperymentu: `npm ci`, `npm run prototype:controls` (localhost:4324). Włączenie próbnika wymaga `PROTOTYPE_CONTROLS=1`. Serwer Tailscale `kolodziejczak-controls-preview.service` działa wyłącznie na `100.x.y.z:4324`, serwując katalog `/tmp/kolodziejczak-controls-study/dist`. Po restarcie trzeba odtworzyć podgląd z gałęzi.

Weryfikacja: build 12 stron i TypeScript; kontrola Chromium w 48 widokach (PL/EN × 320/390/768/1440 px × 3 warianty × 2 obszary), bez przepełnienia i błędów JS. Sprawdzono otwieranie, zastępowanie i zamykanie paneli, kolejność sociali, przełączanie obszarów, niezależne wybory, przeładowanie linku i sterowanie strzałkami. Potwierdzono również nową kolejność i brak próbnika na zwykłej stronie.


## Wdrożenie A / A

Wspólna kapsuła ma jedną zewnętrzną ramkę i wypełnienie aktywnego segmentu; przyciski nie mają osobnych ramek. Panele pozostają początkowo zwinięte. Zachowano wspólny pojedynczy panel, `aria-expanded`, `aria-controls`, nazwę aktywnego przycisku i natywne rozwinięcia bez JS. Grupa przycisków ma lokalizowaną etykietę i `role="group"`; nie narzucono roli klasycznych tabów, ponieważ nadal można zamknąć oba panele. Fokus klawiatury pozostaje widoczny wewnątrz segmentu.

Sociale mają lokalne piktogramy SVG, nazwy i strzałki, w kolejności Facebook / Telegram / LinkedIn / WhatsApp. Komponent `SocialIcon.astro` używa neutralnego symbolu kontaktu dla przyszłego kanału bez własnej ikony. Obecne brakujące adresy pozostają nieaktywne i oznaczone; nie dodano fikcyjnych profili, bibliotek ani żądań zewnętrznych. Bio pozostaje bez zmian, do wyboru jednej z propozycji autora.

Weryfikacja wdrożenia: `npm run validate` — TypeScript, build 12 stron i 13 istniejących testów. Chromium — 16 widoków PL/EN × 320/390/768/1440 px × główna/artykuł, brak przepełnienia i błędów JS; otwieranie, zamiana i zamykanie paneli, sterowanie klawiaturą, kolejność i obecność piktogramów. Dodatkowo natywne rozwinięcia i ikony kontaktów bez JS. [Kapsuła](previews/selected-reading-capsule-mobile.png), [sociale](previews/selected-socials-mobile.png).
