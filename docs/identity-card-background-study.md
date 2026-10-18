# Logotyp, proporcje kart i faktura tła — prototypy

18 października 2026. Pytanie: jaki logotyp pasuje do portretu w nagłówku, jak pokazać krótkie zajawki bez dużych pastelowych pudełek i czy niemal niewidoczna faktura wzbogaca leśną zieleń?

Archiwum eksperymentu na gałęzi `codex/identity-card-background-study`, źródło kodu: `9a5d969` (baza `263304f`). Użytkownik wybrał **logo D — Własny adres, karty C — Obraz i zajawka, tło D — Gradient + siatka**. Zestaw wdrożono na `codex/astro-foundation`, w zwykłym podglądzie na porcie 4322. Źródła: `src/components/IdentityStudy.prototype.astro`, `src/scripts/identity-study.prototype.ts`, `src/styles/identity-study.prototype.css` oraz warunkowa miniatura w `ArticleCard.astro`. Do właściwej implementacji przepisano wyłącznie wybrany zestaw, bez przełącznika i pozostałych wariantów; pełny eksperyment pozostaje na swojej gałęzi.

Prywatny podgląd na dotychczasowej sieci Tailscale:

- [Logotypy](http://vps.tailfb5686.ts.net:4323/pl/?study=logo&variant=A): A — Nazwisko i kropka, B — Dwa wiersze, C — Po imieniu, D — Własny adres.
- [Karty](http://vps.tailfb5686.ts.net:4323/pl/?study=cards&variant=A#latest-title): A — Ciche panele, B — Redakcyjna lista, C — Obraz i zajawka.
- [Tło](http://vps.tailfb5686.ts.net:4323/pl/?study=background&variant=D): A — Sama zieleń, B — Oddech zieleni, C — Cicha siatka, D — Gradient + siatka.

Każdy obszar ma osobny wybór. Dolny pasek i klawisze strzałek zmieniają bieżący obszar; URL przechowuje całą kombinację. Wybranie zakładki przenosi do odpowiedniego miejsca na stronie. Karty porównujemy na stronie głównej. Przejścia do artykułów zachowują logotyp i tło, żeby można było ocenić także komfort czytania. Panel `?` wyjaśnia różnice. Bez cookies i localStorage.

Portret zastępuje kokardkę w nagłówku i stopce już w zwykłej implementacji. Nie powtarza się w bio. W prototypach zachowano Bricolage/Hanken, bazowe `#0e241d`, miodowe akcje i zaakceptowane kontrolki. Zmiany dotyczą wskazanych elementów, bez nowego układu całej strony.

## Różnice

Logotypy są typograficzne: nie dodają kolejnego symbolu obok portretu. A to pełne nazwisko i miodowa kropka; B to zwarty zapis małymi literami w dwóch wierszach; C skraca podpis do „marcin k.”; D wykorzystuje samą domenę i akcentuje `.me`.

Wszystkie karty usuwają minimalną wysokość 300 px i duże, jasne powierzchnie przypisane kategoriom. A zachowuje zwartą kartę w spokojnej zieleni; B usuwa pudełka i rozdziela tekst cienką linią; C dodaje małą miniaturę obok tekstu. W C na telefonie zajawka ma podgląd dwóch wierszy, tytuł pozostaje pełny. Kategorie, tytuły, daty, zdjęcia i opisy to dotychczasowe przykładowe artykuły. Dla pierwszego polskiego artykułu przy 390 px wysokości wyniosły odpowiednio około 224 / 212 / 178 px.

Tło nie zmienia bazowej zieleni. B dodaje dwa łagodne zielone gradienty przesuwane w cyklu 32 sekund; C nieruchomą siatkę 32 px z opacity 0,026; D łączy gradient z siatką o opacity 0,02. Faktura nie porusza się. Warstwy nie przechwytują dotyku i kliknięć. Animację można zatrzymać przyciskiem; `prefers-reduced-motion` całkowicie ją wyłącza. Nie użyto canvas, wideo ani zależności animacyjnych.

## Uruchomienie i kontrola

Na gałęzi eksperymentu: `npm ci`, potem `npm run prototype:identity` (buduje eksperyment i serwuje localhost:4323). Przełącznik jest renderowany tylko z `PROTOTYPE_EXPLORATION=1`; zwykły build nie włącza badania. Domyślna gałąź implementacji nie zawiera kodu eksperymentu.

Podgląd serwera udostępnia jednostka użytkownika `kolodziejczak-identity-preview.service`, wyłącznie na `100.113.202.72:4323`, z katalogu `dist` w `/tmp/kolodziejczak-identity-study`. Jednostka przeżywa sesję czatu, katalog roboczy jest tymczasowy; po restarcie trzeba odtworzyć worktree z gałęzi i zbudować podgląd. Nie zmieniano portów 4321/4322 ani domeny publicznej.

Build 12 statycznych stron i TypeScript przechodzą. Kontrola w Chromium: 18 widoków kart (PL/EN × 320/390/1440 px × 3 układy), cztery logotypy przy 320 px, brak poziomego przepełnienia i błędów JS, niezależność przełączników, link zachowujący wybór po przeładowaniu i zmianie języka, animacja/pauza i ograniczenie ruchu przez system. Nie tworzono zestawu testów dla kodu jednorazowych prototypów.

## Wdrożony zestaw D / C / D

Logotyp domenowy z miodowym `.me` oraz pełnym nazwiskiem poniżej występuje w nagłówku i stopce, obok portretu. Dawny znak kokardki usunięto również ze źródeł właściwej strony i faviconu; favicon to małe `k.` w tej samej palecie.

Jeden komponent `ArticleCard` obsługuje stronę główną i listę artykułów. Listę buduje z nagłówkami h2, stronę główną z h3. Miniatury mają szerokość 68/84/168 px zależnie od ekranu, zachowują nazwy View Transitions i korzystają z wariantu obrazów 240–800 px. Pole `sizes` uwzględnia również wysokość pionowego kadru, żeby obraz cover nie tracił ostrości; hero nadal korzysta z pełnych wersji do 1600 px. Wszystkie linki i teksty są w początkowym HTML; filtry działają jak wcześniej.

Animacja gradientu jest wstrzymana, dopóki JS nie sprawdzi preferencji użytkownika. Bez JS tło pozostaje statyczne. `prefers-reduced-motion` wyłącza animację bezwarunkowo, również po zmianie ustawienia w trakcie oglądania. Przycisk w stopce (także na wyborze języka i 404) pozwala zatrzymać/wznowić tło. Wybór zapisuje się jako pojedyncza preferencja `site.background-motion` w `sessionStorage`, żeby przechodzenie między statycznymi stronami w tej samej karcie nie włączało ruchu ponownie. Brak dostępu do storage nie blokuje przycisku. Siatka jest nieruchoma.

Weryfikacja właściwej implementacji: `npm run validate` (TypeScript, 12 stron, 13 istniejących testów). Chromium: 24 widoki PL/EN × 320/390/768/1440 px × główna/lista/artykuł, bez przepełnienia i błędów JS. Sprawdzono pojedyncze nazwy przejść obrazów, filtry (również pusty wynik), pauzę po przejściu do innej strony, zmianę preferencji ruchu, brak JS oraz wybór języka i 404 przy 320 px. Zrzuty: [główna mobile](previews/astro-home-mobile.png), [karty mobile](previews/selected-cards-mobile.png), [główna desktop](previews/astro-home-desktop.png).
