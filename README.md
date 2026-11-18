# kolodziejczak.me

Statyczna strona osobista w **Astro + TypeScript + MDX**, w językach PL i EN. Projekt: Leśna pracownia, Bricolage Grotesque / Hanken Grotesk, pionowe miniatury, gradient z siatką i obserwator nad hero.

**Prywatny podgląd:** [PL](http://vps.tailfb5686.ts.net:4322/pl/) · [EN](http://vps.tailfb5686.ts.net:4322/en/) · [Artykuły](http://vps.tailfb5686.ts.net:4322/pl/blog/).

## Uruchomienie

Node.js **≥22.22.0**, npm. Zależności są przypięte w `package.json` i `package-lock.json`; Astro **7.4.12** zawiera aktualizacje bezpieczeństwa względem poprzedniego 7.4.0.

```sh
npm ci
npm run dev
npm run validate     # TypeScript, build i testy gotowego HTML
npm run audit:check  # audyt z wąskim, czasowym wyjątkiem opisanym poniżej
npm run preview      # lokalny podgląd dist/ po buildzie
npm run release:check # dodatkowo sprawdza gotowość do publicznej premiery
```

Push i pull request uruchamiają walidację oraz audyt zależności w GitHub Actions. Nie ma automatycznego wdrażania na docelowy serwer.

Audyt ma jeden jawny wyjątek dla `GHSA-fc5q-39xc-vjpf` w `picomatch`, ważny do **25 listopada 2026 włącznie (UTC)**. Biblioteka pozostaje podatna; akceptacja dotyczy obecnego statycznego buildu. Pełny raport pozostaje w logach, a inne zgłoszenia od poziomu moderate nadal blokują CI. [Zakres, uzasadnienie i usunięcie wyjątku](docs/dependency-audit.md). `release:check` stosuje tę samą kontrolę.

## Publikowanie artykułu krok po kroku

1. **Utwórz dwa pliki:** `src/content/articles/pl/moj-artykul.mdx` i `src/content/articles/en/moj-artykul.mdx`. Najłatwiej skopiować istniejącą parę. Obie wersje muszą mieć ten sam `translationKey`; każda ma własne `locale`, tytuł, opis, tekst, alt zdjęcia i `urlSlug`. Aktualnie publikacja wymaga kompletnej pary PL/EN. Zostaw `draft: true` w obu plikach podczas pracy.
2. **Dodaj zdjęcie** do `src/assets/articles/moj-artykul.jpg`. W metadanych podaj ścieżkę względną, opis alternatywny, autora i źródło. Astro sam tworzy kadry, miniatury AVIF/WebP/JPEG i obrazek do udostępniania.
3. **Uzupełnij metadane.** Przykład nagłówka pliku PL (po drugim `---` piszesz treść):

   ```yaml
   ---
   title: "Mój nowy artykuł"
   description: "Krótki, konkretny opis tego, czego czytelnik dowie się z tekstu."
   locale: "pl"
   translationKey: "moj-artykul"
   urlSlug: "moj-nowy-artykul"
   publishedAt: "2026-11-17"
   # updatedAt: "2026-11-20" # przy istotnej późniejszej aktualizacji
   category: "programming"
   sample: false
   draft: true
   hero:
     src: "../../../assets/articles/moj-artykul.jpg"
     alt: "Opis tego, co przedstawia zdjęcie."
     photographer: "Marcin Kołodziejczak"
     source: "https://kolodziejczak.me/"
     sourceLabel: "Zdjęcie autora"
   summary:
     - "Pierwsza najważniejsza myśl."
     - "Druga najważniejsza myśl."
     - "Trzecia najważniejsza myśl."
     - "Czwarta najważniejsza myśl."
     - "Piąta najważniejsza myśl."
   prompt: "Pomóż mi zrozumieć temat tego artykułu. Zacznij od pytania o moje doświadczenie."
   ---
   ```

   Dozwolone kategorie: `programming`, `ai`, `film`, `books`, `intersections`, `other`. `summary` wymaga dokładnie pięciu pozycji. Opis ma maks. 300 znaków; zwykle wystarczy 1–2 krótkie zdania. `updatedAt` jest opcjonalne, nie może poprzedzać publikacji. W EN ustaw `locale: en`, np. `urlSlug: my-new-article`, i przetłumacz pozostałe treści.
4. **Napisz treść w MDX.** Tytuł H1 pochodzi z metadanych, więc zaczynaj sekcje od `##`, podsekcje od `###`. H2 automatycznie trafiają do spisu treści, nagłówki i cytaty `>` dostają linki do fragmentów. Kod zapisuj w blokach z nazwą języka. Wyróżnienie możesz dodać przez `import Callout from '../../../components/Callout.astro';` i `<Callout title="MAŁY EKSPERYMENT">...</Callout>`. MDX jest kodem: publikujemy tylko zaufane materiały autora.
5. **Przygotuj nagrania** osobno dla PL i EN, w zewnętrznym narzędziu lub własnym głosem. Strona nie generuje audio. Zalecany MP3; schemat przyjmuje też WAV i OGG. Pliki umieść np. w `public/audio/moj-artykul/pl.mp3` oraz `public/audio/moj-artykul/en.mp3`. Nazwy: litery ASCII, cyfry, `-`, `_` i katalogi. Nie używaj spacji ani polskich znaków w ścieżce.
6. **Połącz audio z artykułem.** Dodaj poniższe do nagłówka **obu** plików MDX. Ścieżka zaczyna się od `/audio/`, bez `public`. `durationSeconds` to rzeczywisty czas nagrania w pełnych sekundach, zaokrąglony w górę. Podane liczby są przykładem:

   ```yaml
   audio:
     pl:
       src: "/audio/moj-artykul/pl.mp3"
       durationSeconds: 367
     en:
       src: "/audio/moj-artykul/en.mp3"
       durationSeconds: 351
   ```

   Można dodać tylko jeden język lub pominąć całe `audio`. Po jego dodaniu pojawi się natywny odtwarzacz z przewijaniem, działający także bez JS, bez autoodtwarzania. Lokalna długość nagrania wyznacza wyświetlany czas czytania. Brakujący lub pusty plik zatrzymuje build. Długość sprawdzisz w edytorze audio albo, jeśli masz FFmpeg: `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public/audio/moj-artykul/pl.mp3`.
7. **Opublikuj parę:** ustaw `draft: false` w obu wersjach, zostaw `sample: false` i uruchom `npm run validate`, potem `npm run preview`. Szkice nie mają publicznego adresu, także w dev. Publikacje z datą w przyszłości pojawią się dopiero po ponownym buildzie w tym terminie; brak automatycznego harmonogramu. Daty bez godziny są liczone od północy UTC. Nie zmieniaj już opublikowanego sluga bez przekierowania 301.
8. **Wdróż cały nowy `dist/`** na serwer. Sam commit i push nie publikują strony. Artykuł automatycznie trafia na listę, a trzy najnowsze na stronę główną. Realne artykuły trafiają do RSS i, po odblokowaniu premiery, sitemapy. Meta tagi, podglądy social, canonical, powiązania językowe i dane strukturalne powstają automatycznie.

Przed wysłaniem sprawdź oba adresy, TL;DR, spis treści, link do nagłówka/cytatu oraz odsłuch i przewijanie nagrań PL/EN na telefonie. Gdy publikujesz samodzielnie po premierze, nie zmieniaj `readyToPublish` przy każdym wpisie.

## Design system: `/design/`

[Notatnik projektu w prywatnym podglądzie](http://vps.tailfb5686.ts.net:4322/design/) zawiera próbki kolorów z aktualnych tokenów CSS, kroje pisma, role i rozmiary typografii, działające komponenty, szerokości, promienie, odstępy i zasady animacji. Źródło: `src/pages/design.astro`; wspólne style: `src/styles/site.css`. Paleta odczytuje wartości CSS przy budowaniu, więc nie ma drugiej kopii kolorów. Zmieniając skalę typografii, aktualizuj także tabelę zastosowań.

Podstrona nie ma linków w publicznej nawigacji, w sitemapie ani RSS. Zawsze ma `noindex,nofollow`. Jest dostępna osobie znającej adres; to nie jest panel chroniony hasłem. Adres `/design` na docelowym serwerze powinien przekierowywać do `/design/`.

## SEO i premiera

Wspólny komponent `Seo.astro` zapewnia unikalne tytuły/opisy, canonical, wzajemne `hreflang` PL/EN i `x-default`, Open Graph, karty udostępniania, lokalne obrazy JPEG oraz JSON-LD: autor, strona, breadcrumbs i `BlogPosting` dla prawdziwych artykułów. Root `/` pozostaje wyborem języka, nie wymusza przekierowania według przeglądarki. Podgląd używa docelowej domeny w canonical celowo.

- `/sitemap.xml`: adresy publiczne i rzeczywiste daty aktualizacji, bez szkiców, próbek, `/design/` i 404. W trybie przedpremierowym jest pusta.
- `/pl/rss.xml`, `/en/rss.xml`: oddzielne kanały z opisami prawdziwych publikacji; próbki są pomijane.
- `/robots.txt`: pozwala przeczytać `noindex`; po premierze wskazuje sitemapę. Nie blokujemy `/design/` w robots.txt, bo robot musi móc odczytać zakaz indeksowania.
- `site.readyToPublish: false`: utrzymuje `noindex` na podglądzie. Dopiero przed publicznym buildem zmień na `true`. Build premiery odrzuca próbki oraz pustą listę publikacji. Ustaw `draft: true` w obu językach dla wycofywanych próbek lub zastąp je własnymi materiałami. Nie wystarczy zmienić samego `sample`.
- W publicznym buildzie atrapa asystenta i atrapa audio są ukrywane. Prawdziwe audio nadal działa, a brak nagrania nie obiecuje nieistniejącej funkcji.

**Do premiery pozostały:** prawdziwe teksty i ewentualne nagrania, wybór i konfiguracja hostingu, DNS/TLS, poprawne przekierowania/404/cache oraz sprawdzenie publicznego adresu w Search Console i PageSpeed. [Lista kontrolna i wynik przeglądu](docs/prelaunch.md). Analityka, komentarze, polubienia, agent i offline nie są podłączone i nie blokują podstawowej premiery. Nie ma obecnie trackerów ani banneru cookies; decyzję o pomiarze podejmiemy przy wyborze konkretnego narzędzia.

## Struktura i archiwa

- `src/pages/`: PL/EN, root, 404, notatnik `/design/`, sitemap, robots i RSS.
- `src/content/articles/{pl,en}/`: artykuły MDX; `translationKey` paruje języki, `urlSlug` wyznacza adres.
- `src/components/`, `src/layouts/`, `src/styles/`: wspólny wygląd i semantyka.
- `src/config/site.ts`: autor, kontakty, domena i status publikacji.
- `src/assets/articles/`: źródłowe zdjęcia. `public/audio/`: nagrania kopiowane do `dist/`.
- `public/fonts/`: lokalne fonty i licencje OFL.

[Założenia implementacji](docs/astro-foundation.md) · [Czytanie i kategorie](docs/reading-refinements.md) · [Zdjęcia i View Transitions](docs/view-transitions-and-images.md) · [Kopiowanie](docs/clipboard.md) · [Udostępnianie](docs/sharing-and-feedback.md) · [Nagłówki i cytaty](docs/article-fragments.md) · [Decyzje projektowe](docs/prototype-decision.md) · [Archiwum prototypów](docs/prototype-archive.md) · [Logo, karty i tło](docs/identity-card-background-study.md) · [Obserwator](docs/observer-study.md).

Archiwalne prototypy są oddzielone od właściwej implementacji. Instrukcje ich prywatnych podglądów znajdują się w dokumentach archiwalnych; właściwa strona jest pod portem **4322**.
