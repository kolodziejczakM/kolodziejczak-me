# kolodziejczak.me

Statyczna strona osobista w **Astro + TypeScript + MDX**, w językach PL i EN. Projekt: Leśna pracownia, Bricolage Grotesque / Hanken Grotesk, pionowe miniatury, gradient z siatką i obserwator nad hero.

**Deployment:** GitHub Pages pod `https://kolodziejczak.me/`. [Jednorazowa konfiguracja GitHuba i DNS w Hostingerze](docs/github-pages.md). Rzeczywisty adres prywatnego podglądu Tailscale przechowujemy poza repozytorium.

## Uruchomienie

Node.js **≥22.22.0**, npm. Zależności są przypięte w `package.json` i `package-lock.json`; Astro **7.4.12** zawiera aktualizacje bezpieczeństwa względem poprzedniego 7.4.0.

```sh
npm ci
npm run dev
npm run validate     # TypeScript, build i testy gotowego HTML
npm run audit:check  # standardowy audyt, bez wyjątków
npm run secrets:check # skan sekretów w historii i źródłach (Linux)
npm run preview      # lokalny podgląd dist/ po buildzie
npm run build:production # sam build do dist-production/
npm run release:check # produkcyjny build, testy, audyt i kontrola publikacji
```

PR uruchamia Validate dla obu wariantów strony. Merge lub push do **main** uruchamia jeden workflow **Deploy GitHub Pages**: skan sekretów → build i testy produkcji → audyt → upload `dist-production/` → publikacja. Nie ma kopiowania na VPS ani własnych tokenów/kluczy deploymentu. Błąd kontroli zatrzymuje nowe wdrożenie. Ręczne ponowienie jest dostępne w Actions, wyłącznie dla main.

| Polecenie / wariant                            | Wynik              | Artykuły przykładowe               | Indeksowanie                   |
| ---------------------------------------------- | ------------------ | ---------------------------------- | ------------------------------ |
| `npm run build` lub `validate`                 | `dist/`            | widoczne                           | noindex                        |
| `npm run build:production` lub `release:check` | `dist-production/` | wykluczone, także bezpośrednie URL | włączone poza `/design/` i 404 |

`validate` zawiera `build`; nie trzeba wywoływać go drugi raz. `preview` tylko pokazuje istniejący `dist/`. Wariant produkcyjny ustawia `SITE_ENV=production`; nie edytuj ręcznie `readyToPublish`. Osobny katalog produkcji pozwala zachować dotychczasowy podgląd Tailscale bez nadpisania go wydaniem publicznym.

23 listopada 2026 surowy audyt ponownie jest czysty: wcześniejsze zgłoszenie picomatch zostało wycofane i czasowy wyjątek usunięto. [Historia decyzji](docs/dependency-audit.md). Przed upublicznieniem repo przeczytaj też [wynik przeglądu sekretów i danych historycznych](docs/public-repository-audit.md).

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
8. **Utwórz PR i zmerguj do `main`.** Po udanym Validate i jednorazowej konfiguracji Pages workflow sam zbuduje i opublikuje nowy `dist-production/`. Nie kopiujesz plików na VPS. Lokalnie ten sam wynik sprawdzisz przez `npm run release:check`. Artykuł automatycznie trafia na listę, a trzy najnowsze na stronę główną. Realne artykuły trafiają do RSS i produkcyjnej sitemapy. Meta tagi, podglądy social, canonical, powiązania językowe i dane strukturalne powstają automatycznie.

Przed wysłaniem sprawdź oba adresy, TL;DR, spis treści, link do nagłówka/cytatu oraz odsłuch i przewijanie nagrań PL/EN na telefonie. W publicznym repo także pliki `draft: true` i ich historia są czytelne dla innych; draft ukrywa je na stronie, nie w GitHubie. Trzy dotychczasowe pary z `sample: true` zachowujemy jako wzorce, ale produkcja zawsze je pomija. Pusty blog nie blokuje publikacji wizytówki.

## Design system: `/design/`

Notatnik projektu pod `/design/` zawiera próbki kolorów z aktualnych tokenów CSS, kroje pisma, role i rozmiary typografii, działające komponenty, szerokości, promienie, odstępy i zasady animacji. Źródło: `src/pages/design.astro`; wspólne style: `src/styles/site.css`. Paleta odczytuje wartości CSS przy budowaniu, więc nie ma drugiej kopii kolorów. Zmieniając skalę typografii, aktualizuj także tabelę zastosowań.

Podstrona nie ma linków w publicznej nawigacji, w sitemapie ani RSS. Zawsze ma `noindex,nofollow`. Jest dostępna osobie znającej adres; to nie jest panel chroniony hasłem. Adres `/design` na docelowym serwerze powinien przekierowywać do `/design/`.

## SEO i premiera

Wspólny komponent `Seo.astro` zapewnia unikalne tytuły/opisy, canonical, wzajemne `hreflang` PL/EN i `x-default`, Open Graph, karty udostępniania, lokalne obrazy JPEG oraz JSON-LD: autor, strona, breadcrumbs i `BlogPosting` dla prawdziwych artykułów. Root `/` pozostaje wyborem języka, nie wymusza przekierowania według przeglądarki. Podgląd używa docelowej domeny w canonical celowo.

- `/sitemap.xml`: adresy publiczne i rzeczywiste daty aktualizacji, bez szkiców, próbek, `/design/` i 404. W trybie przedpremierowym jest pusta.
- `/pl/rss.xml`, `/en/rss.xml`: oddzielne kanały z opisami prawdziwych publikacji; próbki są pomijane.
- `/robots.txt`: pozwala przeczytać `noindex`; po premierze wskazuje sitemapę. Nie blokujemy `/design/` w robots.txt, bo robot musi móc odczytać zakaz indeksowania.
- Domyślny podgląd jest noindex. `SITE_ENV=production` włącza publikację i wyklucza wszystkie `sample: true` z tras, list i artefaktu treści. Nie trzeba usuwać przykładów z repo ani ręcznie przełączać flag przy kolejnych publikacjach.
- W publicznym buildzie atrapa asystenta i atrapa audio są ukrywane. Prawdziwe audio nadal działa. Bez realnych artykułów nie ma pustej sekcji najnowszych na home, a lista pokazuje krótki komunikat.

Do pierwszego uruchomienia pozostają ustawienia repo/Pages, świadoma decyzja o publiczności historii, DNS w Hostingerze i Enforce HTTPS. [Instrukcja Pages](docs/github-pages.md) · [Audyt przed upublicznieniem](docs/public-repository-audit.md). DNS i widoczność nie są zmieniane przez workflow. Analityka, komentarze, agent i offline nie są podłączone i nie blokują premiery wizytówki.

## Struktura i archiwa

- `src/pages/`: PL/EN, root, 404, notatnik `/design/`, sitemap, robots i RSS.
- `src/content/articles/{pl,en}/`: artykuły MDX; `translationKey` paruje języki, `urlSlug` wyznacza adres.
- `src/components/`, `src/layouts/`, `src/styles/`: wspólny wygląd i semantyka.
- `src/config/site.ts`: autor, kontakty, domena i wariant buildu.
- `src/assets/articles/`: źródłowe zdjęcia. `public/audio/`: nagrania kopiowane do katalogu wynikowego wybranego wariantu.
- `public/fonts/`: lokalne fonty i licencje OFL.

[Założenia implementacji](docs/astro-foundation.md) · [Czytanie i kategorie](docs/reading-refinements.md) · [Zdjęcia i View Transitions](docs/view-transitions-and-images.md) · [Kopiowanie](docs/clipboard.md) · [Udostępnianie](docs/sharing-and-feedback.md) · [Nagłówki i cytaty](docs/article-fragments.md) · [Decyzje projektowe](docs/prototype-decision.md) · [Archiwum prototypów](docs/prototype-archive.md) · [Logo, karty i tło](docs/identity-card-background-study.md) · [Obserwator](docs/observer-study.md).

Archiwalne prototypy są oddzielone od właściwej implementacji. Instrukcje ich prywatnych podglądów znajdują się w dokumentach archiwalnych; właściwa strona jest pod portem **4322**.
