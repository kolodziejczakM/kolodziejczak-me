> Aktualny proces publikacji od 23 listopada 2026: [GitHub Pages](github-pages.md). Poniższy przegląd opisuje stan z 17 listopada, przed wyborem hostingu. Produkcja teraz pomija próbki, dopuszcza pusty blog i używa osobnego `dist-production/`; podgląd pozostaje w `dist/`. Nie edytujemy ręcznie flagi readyToPublish. Audyt nie wymaga już wyjątku po wycofaniu zgłoszenia picomatch.

# Przegląd przed premierą

Stan: 17 listopada 2026. Właściwa implementacja: `codex/astro-foundation`. Nie wdrożono strony na publiczny serwer i nie przełączono `readyToPublish`.

## Gotowe w kodzie

- Statyczny HTML z treścią i semantyką nagłówków, natywne linki, działające narzędzia czytania bez JS.
- Meta title/description/author, canonical i wzajemne PL/EN/x-default. Domena ma jedno źródło w `site.origin`, także w konfiguracji Astro.
- Open Graph i karty udostępniania. Artykuł używa hero w JPEG 1200 × 630; pozostałe strony portretu autora 1200 × 1200. Obrazy generowane lokalnie podczas builda, bez zewnętrznych zapytań przeglądarki.
- JSON-LD autora i strony, breadcrumbs oraz BlogPosting z datą publikacji i opcjonalnym updatedAt. Przykładowe teksty nie dostają deklaracji autorstwa BlogPosting.
- Automatyczne sitemap.xml i RSS PL/EN. Szkice i przyszłe publikacje nie mają routingu; materiały sample nie trafiają do discovery. Sitemap na podglądzie jest pusta. Daty lastmod opisują rzeczywiste publikacje/aktualizacje, nie każdy build.
- Brakujący lub pusty plik zadeklarowanego audio zatrzymuje budowanie. Gotowy odtwarzacz działa bez JS i bez autoplay. Publiczny build nie pokazuje atrapy nagrania ani niepodłączonego asystenta.
- Publikacja w trybie readyToPublish odrzuca próbki i brak prawdziwych artykułów. `npm run release:check` sprawdza również wynikowy HTML, odblokowanie indeksowania i sitemapę. Nie wdraża strony.
- `/design/` ma zawsze noindex,nofollow, nie jest linkowane ze strony i nie trafia do RSS ani sitemapy. To adres dostępny bez hasła, a nie zabezpieczony panel.
- Responsywne zdjęcia, wymiary obrazów i lokalne fonty; eager/high priority dla hero, lazy dla miniatur, audio preload=none. Zarezerwowane miejsce na scrollbar, brak poziomego przepełnienia, stopka przy dole krótkiej strony.
- Link pominięcia nawigacji, widoczny fokus, etykiety kontrolek, obsługa klawiatury i prefers-reduced-motion.
- CI buduje stronę, uruchamia testy i audytuje zależności. Testy odkrywają faktyczne artykuły w dist zamiast wymagać nazw próbek, dzięki czemu wymiana treści ich nie psuje.
- Astro zaktualizowano z 7.4.0 do 7.4.12 po audycie. Dwie znalezione podatności dotyczyły dynamicznych nazw znaczników oraz endpointu obrazów adaptera Node. Ten projekt jest statyczny, bez adaptera Node i bez niezaufanych dynamicznych nazw znaczników; aktualizacja usuwa też zgłoszenia z audytu zależności.

## Kolejność premiery

1. Zastąpić przykładowe publikacje tekstami autora lub ustawić obu wersjom `draft: true`. Dodać przynajmniej jedną prawdziwą parę PL/EN, sprawdzić podpisy/licencje zdjęć. Samo przestawienie sample na false nie zamienia przykładowego tekstu w autorski.
2. Dodać i odsłuchać docelowe MP3, jeżeli artykuły mają wystartować z lektorem. Nagranie jest opcjonalne; strona bez niego nie pokazuje martwego odtwarzacza. Instrukcja w README.
3. Wybrać hosting statycznego `dist/`. Potwierdzić, gdzie kierują DNS dla domeny i www; przed przełączeniem sprawdzić, czy nie zastępujemy działającej strony, która wymaga zachowania dotychczasowych adresów i przekierowań.
4. Skonfigurować HTTPS z odnawianiem certyfikatu, jedno kanoniczne `https://kolodziejczak.me`, przekierowania 301 z HTTP i www oraz normalizację katalogów do końcowego `/`. Dla `/design` oczekiwane przekierowanie na `/design/`.
5. Serwer ma zwracać pliki statyczne i **prawdziwe HTTP 404** z treścią `404.html` dla nieznanych adresów. Nie stosować fallbacku SPA zwracającego wszędzie stronę główną z kodem 200. Nie wystawiać repozytorium, plików MDX, `.git` ani `node_modules` - tylko katalog wynikowy.
6. Włączyć kompresję Brotli/gzip, cache dla hashowanych `/_astro/` na rok z immutable, a dla HTML, sitemap, RSS i robots rewalidację lub krótki cache. Niezmieniane nazwy fontów i audio wymagają rewalidacji albo nowych nazw po wymianie. Ustawić MIME dla MP3/WAV/OGG/JPEG/XML i sprawdzić obsługę Range/206, żeby przewijanie audio działało. `X-Content-Type-Options: nosniff` i `Referrer-Policy: strict-origin-when-cross-origin` to rozsądna baza nagłówków. Docelową politykę CSP dobieramy po decyzji o usługach zewnętrznych.
7. Dopiero dla gotowej premiery ustawić `readyToPublish: true` w `src/config/site.ts`, uruchomić `npm ci`, `npm run release:check` i wdrożyć **ten** kompletny `dist/`. Wdrożenie najlepiej robić do nowego katalogu wydania z atomowym przełączeniem, zachowując poprzedni build do powrotu. Aktualny podgląd i przyszłe wersje robocze pozostawić prywatne, z noindex; nie publikować produkcyjnego builda na otwartym adresie stagingowym.
8. Pod docelową domeną sprawdzić root, PL/EN, artykuł, link do fragmentu, sociale, obraz udostępniania, RSS, sitemap, robots, 404, audio i jego przewijanie. Powtórzyć na prawdziwym iPhonie/Safari i w Chrome. Test lokalnej przeglądarki nie zastępuje sprawdzenia hostingu i telefonu.
9. Zweryfikować domenę w Google Search Console, zgłosić sitemap.xml, sprawdzić kilka adresów i dane strukturalne. Skontrolować podgląd linków Facebook/LinkedIn po wystawieniu ich robotom, a następnie PageSpeed Insights dla telefonu i desktopu. Bez publicznej domeny nie potwierdzamy indeksowania ani realnych Core Web Vitals. Cele Google: LCP ≤2.5 s, INP <200 ms, CLS <0.1; to cele do pomiaru, nie uzyskane wyniki tej strony.
10. Zachować możliwość rollbacku i ustalić prosty proces kolejnych publikacji: edycja pary MDX, walidacja, build, wdrożenie całości. Analityka, rozmowa głosowa, komentarze, polubienia i offline mogą wejść później. Obecnie nie ma trackerów. Dodając usługę zewnętrzną, trzeba osobno ustalić zasady prywatności i ładowania jej kodu.

## Weryfikacja tej zmiany

- `npm run validate`: poprawny build i 20 testów. Audyt z 17 listopada rano zgłaszał 0 znanych podatności. Późniejsza aktualizacja bazy objęła picomatch; od 18 listopada obowiązuje [jawny wyjątek do 25 listopada](dependency-audit.md), bez zmiany wersji Astro.
- Chromium: `/design/`, home PL/EN, blog i artykuł przy 320/390/844/1440/3840 px. Brak poziomego przepełnienia i błędów JS; działające kopiowanie cytatu w notatniku, właściwe kolory i noindex.
- Osobna kopia testowa, poza właściwą treścią: próbki jako szkice, prawdziwa para MDX, updatedAt i dwujęzyczne odwołanie do poprawnego dwusekundowego WAV. Pełne `npm run release:check` przechodzi. Sprawdzono JSON-LD, indeksowanie, parsowanie XML sitemapy i obu RSS, natywne odtwarzanie/przewijanie oraz dostępność kontrolek bez JS na `astro preview`.
- Na właściwej kopii `readyToPublish: false` nadal zatrzymuje kontrolę premiery. Nie odblokowano indeksowania i nie wdrożono publicznie strony.
- Test odsłonił znaczenie konfiguracji serwera: prosty prywatny podgląd Python nie zapewniał poprawnego przewijania tego WAV, podczas gdy `astro preview` je obsługuje. Dlatego Range/206 i przewijanie plików należy sprawdzić na docelowym hoście, a nie zakładać na podstawie samego HTML.

## Źródła decyzji SEO

- [Google: wersje językowe i hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions).
- [Google: robots meta i noindex](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag). Zakaz indeksowania musi być odczytywalny; robots.txt nie służy tu do blokowania pobrania strony.
- [Google: dane strukturalne Article/BlogPosting](https://developers.google.com/search/docs/appearance/structured-data/article).
- [Google: sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- [Open Graph: wymagane właściwości podglądu](https://ogp.me/).
- [Astro: statyczne endpointy](https://docs.astro.build/en/guides/endpoints/).
- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
- [Astro: poprawka nazw dynamicznych znaczników](https://github.com/withastro/astro/security/advisories/GHSA-mh32-jxcr-mh9f) i [poprawka endpointu obrazów Node](https://github.com/withastro/astro/security/advisories/GHSA-r3h5-4585-7x3w).
