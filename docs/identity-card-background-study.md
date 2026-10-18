# Logotyp, proporcje kart i faktura tła — prototypy

18 października 2026. Pytanie: jaki logotyp pasuje do portretu w nagłówku, jak pokazać krótkie zajawki bez dużych pastelowych pudełek i czy niemal niewidoczna faktura wzbogaca leśną zieleń?

To niezależny eksperyment na gałęzi `codex/identity-card-background-study`, oparty na `263304f`. Zwycięzcy jeszcze nie wybrano. Źródła: `src/components/IdentityStudy.prototype.astro`, `src/scripts/identity-study.prototype.ts`, `src/styles/identity-study.prototype.css` oraz warunkowa miniatura w `ArticleCard.astro`. Nie przenosić przełącznika i wariantów do właściwej implementacji; po decyzji przepisać wybrany wariant i pozostawić ten eksperyment na jego gałęzi.

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
