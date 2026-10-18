# Grupa czytania i sociale — porównanie

Użytkownik zamówił wizualnie połączone przełączniki TL;DR / spisu treści i alternatywne przyciski sociali. Ustalona kolejność kontaktów **Facebook → Telegram → LinkedIn → WhatsApp** jest już wdrożona w zwykłym podglądzie (`df2300f`). Wygląd kontrolek pozostaje do wyboru.

Eksperyment jest na gałęzi **`codex/reading-social-controls-study`**, commit **`d3a6745`**. To źródło pierwotne: komponenty `ControlStudy.prototype.astro` / `SocialIcon.prototype.astro`, skrypt, CSS oraz pełna dokumentacja i sześć zrzutów w `docs/previews/controls-study/`. Kod eksperymentu nie jest częścią właściwej implementacji. Po wyborze należy przepisać tylko zaakceptowane elementy i zachować resztę na gałęzi archiwum.

Prywatne porównania Tailscale:

- [Grupa czytania](http://vps.tailfb5686.ts.net:4324/pl/blog/mniej-ale-lepiej/?study=tabs&variant=A#reading-study): **A — Wspólna kapsuła**, **B — Zakładki na panelu**, **C — Wspólna linia**.
- [Sociale](http://vps.tailfb5686.ts.net:4324/pl/?study=socials&variant=A#contact): **A — Piktogram i nazwa**, **B — Lista kontaktów**, **C — Znaki z podpisem**.

Dolny pasek zmienia wariant i obszar, przenosząc do odpowiedniej strony/sekcji. Oba wybory są niezależne i zapisane w URL. Podsumowanie jest na początku rozwinięte; zachowano możliwość zamknięcia obu paneli i zastępowania jednego drugim. Linki kontaktowe pozostają nieaktywne do uzupełnienia adresów. Logo, karty, kolory, fonty i tło zachowują poprzedni wybór D/C/D.

Uruchomienie z gałęzi eksperymentu: `npm ci`, `npm run prototype:controls` (localhost:4324). Włączenie próbnika wymaga `PROTOTYPE_CONTROLS=1`. Serwer Tailscale `kolodziejczak-controls-preview.service` działa wyłącznie na `100.113.202.72:4324`, serwując katalog `/tmp/kolodziejczak-controls-study/dist`. Po restarcie trzeba odtworzyć podgląd z gałęzi.

Weryfikacja: build 12 stron i TypeScript; kontrola Chromium w 48 widokach (PL/EN × 320/390/768/1440 px × 3 warianty × 2 obszary), bez przepełnienia i błędów JS. Sprawdzono otwieranie, zastępowanie i zamykanie paneli, kolejność sociali, przełączanie obszarów, niezależne wybory, przeładowanie linku i sterowanie strzałkami. Potwierdzono również nową kolejność i brak próbnika na zwykłej stronie.
