# Brief — kolodziejczak.me

## Cel obecnego etapu

Szybko porównać kilka **strukturalnie różnych** kierunków UI w HTML/CSS. Odpowiedzieć: „jaki charakter wizualny ma mieć osobista strona Marcina?”. Framework i wdrożenie wybieramy później. Nie publikujemy obecnych treści jako rzeczywistej biografii ani artykułów.

## Preferencje i wymagania z briefu

- Mobile first, ciemny motyw od początku, bez konieczności dodawania jasnego.
- Modern retro, charakterystyczna typografia, czytelna proza; inspiracje: Claude Community (redakcyjność i szkice), Obscura (pikselowe akcenty), Ko-fi (ilustracyjny klimat). Bez kopiowania marek.
- Osobista wizytówka na stronie głównej, zdjęcie, bio i kontakt: Facebook, WhatsApp, LinkedIn, Telegram.
- Osobne adresy PL/EN, zachowanie pary artykułów po zmianie języka. Delikatna sugestia języka według przeglądarki, bez przymusowego przekierowania. Geolokacja była pomysłem; propozycja: pominąć w pierwszej wersji.
- Blog i strony artykułów, treść Markdown/MDX. Pełny HTML od początku, także bez JS w docelowej implementacji. Next.js i typowe SPA wykluczone. Astro i TanStack Start do porównania.
- Artykuł: rzeczywisty czas lektora zamiast estymacji liczby słów, nagrania ElevenLabs generowane wcześniej osobno dla PL/EN, niezależny wybór języka audio.
- TLDR w pięciu zdaniach, kopiowalny prompt do pogłębienia tematu; redakcyjne treści razem z artykułem.
- Widget rozmowy ElevenLabs na żądanie, oparty na artykule i notatkach autora; reakcje, share i darmowe komentarze bez własnego backendu, jeżeli to wystarczy.
- Progres czytania, powrót do początku po połowie tekstu, dostępność klawiaturowa i ograniczenie ruchu według ustawień systemu.
- Privacy first, darmowa analityka SaaS od pierwszego prawdziwego wdrożenia, kandydat: Umami. Brak obietnicy zwolnienia ze zgody bez oceny konkretnej konfiguracji.
- Preferowany offline; zapis HTML/zasobów do czytania i ewentualnie wybranych nagrań, bez cachowania rozmów i analityki.

## Do dostarczenia przed produkcją

Zdjęcie, autorskie bio w PL/EN, prawdziwe adresy kontaktowe, pierwsze artykuły i tłumaczenia, wygenerowane audio, konta/identyfikatory integracji. Danych osobowych i uprawnień nie zgadujemy. Nie trzeba tego do porównania obecnych wariantów.

## Prototyp a produkcja

Prototypy pokazują wygląd i zachowanie interfejsu. Żadna integracja nie jest skonfigurowana. Docelowe SEO, statyczne generowanie HTML, analityka, Markdown, service worker i realny odtwarzacz są następnymi etapami po wyborze kierunku.
