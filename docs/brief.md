# Brief — kolodziejczak.me

**Bieżący etap:** użytkownik polecił kontynuować po rekomendacji Astro i wymaga najnowszych stabilnych zależności. Powstała [pierwsza implementacja Astro](astro-foundation.md), zachowująca ustalone fonty, paletę, kompozycję i kontrolki. Poniżej zapis kolejnych decyzji, w tym historycznych otwartych pytań.

## Pierwotny cel etapu wizualnego

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

## Feedback po pierwszej rundzie — 17 października 2026

- Zachowujemy hasła z C: **„Ciekawość to dobry początek.”** oraz **„Internet jest fajniejszy z ludźmi”**. Pozytywny, osobisty ton jest właściwy; hasła z A/B były zbyt sztampowe.
- Nawigację kierujemy w **„Artykuły”**, po angielsku **„Articles”**. Publikacje mają być dłuższe i poważniejsze niż luźne notatki.
- C jest najbardziej obiecującym punktem wyjścia, ale jego kompozycja ani typografia nie są zatwierdzone. Fioletowe tło jest odrzucone.
- Preferowane tło: ciemna zieleń. Załączony screenshot wskazuje wyłącznie kolor tła, nie jego fonty, układ ani zawartość. Tło B również ocenione pozytywnie.
- A za bardzo przypomina Claude i jest odrzucone jako kierunek wizualny. Nie traktować początkowej inspiracji Claude jako zgody na podobną markę.
- Mono z B nie odpowiada preferencjom. Pikselowe i monospaced fonty nie są kierunkiem głównej typografii.
- Zanim powstaną nowe układy, potrzebny szerszy research fontów: unikalny charakter, czytelność długiej prozy, PL/EN i polskie znaki. Wykluczone: **Inter, Lato, Roboto, Montserrat, Open Sans**.
- Rzadziej spotykany wygląd oceniamy osobno od faktycznej popularności; nie nazywamy fontu „mało popularnym” bez danych. Nie ma jeszcze zatwierdzonej rodziny.
- Następny artefakt to próbnik typografii na wspólnym tekście i zielonym tle, a nie kolejna runda całych stron. Historyczne A/B/C zachowujemy jako zapis pierwszej rundy.

## Prototyp a produkcja

Prototypy pokazują wygląd i zachowanie interfejsu. Żadna integracja nie jest skonfigurowana. Docelowe SEO, statyczne generowanie HTML, analityka, Markdown, service worker i realny odtwarzacz są następnymi etapami po wyborze kierunku.

## Wybór typografii i runda kolorystyczna

Marcin wskazał **Bricolage Grotesque + Hanken Grotesk** jako ulubiony zestaw. Przyjmujemy Bricolage do nagłówków, Hanken do tekstu i UI; nie otwieramy ponownie selekcji rodzin z powodu wskaźnika popularności. Kolory tekstów i linków z próbnika również oceniono pozytywnie.

Obecne pytanie: jaka paleta najlepiej pasuje do tej typografii? Porównujemy tła, panele, karty, tekst podstawowy i drugorzędny, linki, przyciski, stany interakcji, fokus i komunikaty. W tej rundzie **układ, treść i typografia są wspólne**, żeby różnice kompozycji nie zakłócały oceny kolorów. To świadome zawężenie do koloru, wynikające z prośby użytkownika.

Cztery palety na bazie C: Leśny spokój (referencja + szałwia), Leśna pracownia (zieleń + miód), Sosna i glina (zieleń + koral), Noc nad wodą (chłodna zieleń + mięta). Adresy zachowują `variant=C` i dodają `palette=forest|meadow|clay|tide`. Wybór palety pozostaje otwarty. Kolorystyka obejmuje również listę i artykuł PL/EN oraz demonstracje kontrolek.

## Wybór palety i runda form

Marcin wybrał **Leśną pracownię** (`meadow`): tło `#0e241d`, kremowy tekst, miodowy akcent i szałwiowe detale. Ta decyzja zamyka poprzednie pytanie o kolorystykę.

Aktualne pytanie dotyczy **kształtów przycisków, obramowań, kontrolek, ozdobników i ikon**. Trzy propozycje: Miękkie formy, Papier i pieczęć, Nacięte narożniki. Układ, tekst, fonty i role kolorów są celowo wspólne, zgodnie z zawężeniem użytkownika. Formy obejmują całą stronę, także karty, player i modale, zamiast samych próbek przycisków. Szczegóły i adresy: [runda form](form-study.md). Wybór form pozostaje otwarty; można łączyć elementy z kilku wariantów.

## Feedback po pierwszej rundzie form

- **Miękkie formy** pasują najlepiej do charakteru strony, ale wyglądają zbyt typowo. To punkt wyjścia do dalszej eksploracji, nie ostatecznie zatwierdzony system.
- Z wariantu **Papier i pieczęć** podobają się główne przyciski.
- Odrzucone: przerywane obramowania pól oraz pola z samym podkreśleniem przed kliknięciem. Nowe pola mają pełną, ciągłą ramkę od początku, także w modalach.
- **Nacięte narożniki** miały najwięcej oryginalności, ale dekoracyjne linie na kartach wyglądały na przypadkowe i psuły wygląd. Ozdobniki powinny mieć czytelny związek z kształtem lub funkcją elementu.
- Użytkownik zamówił kolejne **cztery** prototypy. Kolory i fonty nadal pozostają zatwierdzone. Kierunki: Miękki druk, Zakładka, Kontur i kropka, Bilet do rozmowy. [Opis nowej rundy](form-refinements.md).

## Feedback po drugiej rundzie form

- **Miękki druk** i **Kontur i kropka** wypadają najlepiej, ale nadal nie ma wariantu, który zachwycił użytkownika. Nie traktować tego jako zatwierdzenia projektu.
- **Zakładka** jest najbardziej oryginalna, ale tworzy wrażenie wizualnego chaosu. Oryginalność wymaga spokojnego porządku.
- **Bilet do rozmowy** jest oryginalny, ale zbyt mocno narzuca tematykę. Użytkownik nie prowadzi bloga kolejowego; skojarzenia z biletem nie są związane z jego zainteresowaniami. Nie rozwijać tej metafory.
- Kolejna runda poszerza eksperyment o kompozycję, rytm artykułów, skalę typografii i osobisty monogram. To hipoteza projektowa: dalsze drobne zmiany promieni narożników mogą nie wystarczyć do oczekiwanego efektu. Paleta, fonty, pozytywne hasła i pełne ramki pól pozostają wspólne. [Cztery kompozycje](composition-study.md).

## Korekta zakresu po kompozycjach — kontrolki

Użytkownik wyjaśnił, że **nie oczekiwał redesignów**. Zatrzymaliśmy się na kontrolkach i to one wymagają dopracowania. **Inputy nadal są przeciętne.** Fonty i kolorystyka są już dobre; nie otwierać ich ponownie. Sygnatura wypada najgorzej, Blisko podoba się najbardziej, a dwa pierwsze układy nie wniosły oczekiwanej nowości.

**Dalszy zakres: wyłącznie design kontrolek.** Bazą porównania jest Blisko; zachowujemy jego kompozycję, nagłówek, karty i dekoracje. Eksperymentujemy z konstrukcją inputów, etykietami, obrysami, ikonami wewnątrz pola, stanami oraz spójnymi selectami, checkboxami, switchami i przyciskami. Pełne, ciągłe obramowania pozostają wymaganiem. Nie rozszerzać zadania na layout, typografię, branding czy nowe metafory tematyczne. [Próbnik kontrolek](control-study.md).

## Feedback po pierwszym porównaniu samych kontrolek

- **Podwójna oprawa** jest myląca: w spoczynku może wyglądać jak fokus. Odrzucona. W kolejnych propozycjach zewnętrzny obrys fokusu pojawia się dopiero po rzeczywistym wejściu w pole.
- **Miękkie wgłębienie** jest w porządku, lecz niewystarczająco oryginalne. Nie uznawać go za wybraną kontrolkę.
- **Etykieta w ramce** jest ciekawa, ale etykieta bywa zbędna i zwiększa zużycie miejsca. Nie wymuszać widocznego nagłówka wewnątrz każdego pola. Zachować dostępną nazwę również przy wizualnym pominięciu etykiety.
- **Kapsuła z akcją** wygląda generycznie. Nie rozwijać kolejnych wariacji kapsułki jako głównego wyróżnika.
- Celem jest **oryginalność bez przesady**, nadal wyłącznie w kontrolkach, na niezmienionej bazie Blisko. Trzy kolejne propozycje: Niski rant, Łuk i kant, Boczny moduł. [Druga runda kontrolek](control-refinements.md).

## Ocena drugiej rundy kontrolek — dopracowanie przycisków

**Boczny moduł** wypada najlepiej. Dalsza iteracja dotyczy jego przycisków: główny z ciemnym modułem przy samym brzegu wyglądał na urwany, a pomocniczy był zbyt pospolity. Zachowujemy pola. Główny przycisk powinien wyglądać jak jedna kompletna powierzchnia; pomocniczy potrzebuje własnego, spokojnego detalu. W poprawce oba mają małe pole ikony odsunięte od brzegu, a pomocniczy dodatkowo delikatne wypełnienie. Nowe przyciski nie zostały jeszcze zatwierdzone.

## Odrzucenie poprawki — nowa runda całego zestawu

Użytkownik ocenił poprawione przyciski jako gorsze i poprosił o krok wstecz oraz **zupełnie nowe prototypy wszystkich kontrolek**. Nie rozwijać dalej Bocznego modułu jako domyślnego zwycięzcy. Nowa runda obejmuje pola, przyciski główne i pomocnicze, selecty, checkboxy, switche, radio, segmenty, suwak i małe akcje, wraz ze stanami. Fonty, leśna paleta i układ Blisko pozostają bazą. Cztery propozycje: [Faseta, Jasny środek, Pionowy brzeg, Osobna akcja](controls-fresh.md). Wybór pozostaje otwarty.

## Ocena nowych kompletnych zestawów

„Żaden mi się nie podoba” — odrzucone zostały Faseta, Jasny środek, Pionowy brzeg i Osobna akcja. Użytkownik nie podał dodatkowej przyczyny. Nie dopisywać mu preferencji ani traktować żadnego elementu tej rundy jako zaakceptowanego. Poproszono o 1–3 referencje kontrolek lub opis tego, co najbardziej przeszkadza. Fonty, paleta i zakres samych kontrolek nie zostały zakwestionowane.

## Doprecyzowanie — dopasowanie ważniejsze niż oryginalność

Użytkownik chce, aby kontrolki pasowały do charakteru strony i fontów; nie muszą być szczególnie oryginalne. Z ostatniej rundy najbardziej podobała mu się **Faseta**, ale wycięcie zaburzało rytm designu. To doprecyzowanie zastępuje wcześniejszy brak wskazania bliższego kierunku. Przyciski powinny być bardziej zaokrąglone. **Pikselowy cień modern retro jest propozycją do sprawdzenia**, nie zatwierdzoną decyzją.

Nowe porównanie celowo trzyma jedną rodzinę form: pełne zaokrąglone powierzchnie, spokojne pola, proste ikony. Trzy wykończenia: Zaokrąglony piksel, Ciepły druk i Spokojny kontur. Różnicujemy głównie cień, by ocenić dopasowanie w kontekście fontów, hasła i leśnej palety. Bez zmiany kompozycji i kart. [Próbnik](controls-retro.md).

## Spokojny kontur — poprawka podwójnych ramek

Użytkownik wskazał, że **wariant 3, Spokojny kontur, byłby odpowiedni bez dziwnych podwójnych obramowań przycisków**. Screeny pokazują TL;DR, prompt, polubienie, udostępnianie i komentarze w mobilnym artykule. To warunkowa akceptacja kierunku, nie prośba o nową rundę. Usunięto odziedziczoną ramkę, tło i padding z zewnętrznej warstwy akcji, zachowując jedną powierzchnię oraz fokus klawiatury. Przycisk rozmowy także ma pojedynczy obrys. Poprawka wspólnej konstrukcji obejmuje trzy wykończenia; nie dodano nowego wariantu.

## Akceptacja kontrolek i status całości

Po poprawce użytkownik potwierdził „Jest ok”. **Spokojny kontur (`controls=calm`) jest zaakceptowanym zestawem kontrolek**: zaokrąglone powierzchnie, pojedyncza ramka, bez cienia. Ta decyzja zamyka porównanie kontrolek; nie wracać do poszukiwania oryginalności ani do pikselowego cienia bez nowej prośby.

Ustalone są fonty, leśna paleta, pozytywny ton i hasła oraz kontrolki; Blisko pozostaje wybraną bazą kompozycji. Nie utożsamiać tej akceptacji z osobnym zatwierdzeniem znaku/logo, materiałów autora czy wszystkich szczegółów ekranów produkcyjnych. Domknięcie wyglądu wymaga jednego spójnego przeglądu głównej, listy, artykułu i modali, z docelowymi treściami i bez narzędzi porównawczych. Zdjęcie i bio są zastępcze. Wybór stacku, integracje, SEO i wdrożenie pozostają pracą implementacyjną po etapie wizualnym.

## Zlecenie spójnego podglądu

Użytkownik zaakceptował rekomendację i polecił przygotować jeden projekt do końcowej oceny. Zwykłe `/pl/` i `/en/` pokazują ustalone połączenie, bez parametrów wariantów, próbnika i dolnego przełącznika. Podstrony listy i artykułów oraz modale używają tego samego systemu. Nagłówek i stopka wykorzystują istniejący motyw spotkania z Blisko wraz z nazwiskiem autora; to dopracowanie bieżącego znaku, bez nowej rundy brandingu. Przykładowe bio, zastępczy monogram zamiast zdjęcia, artykuły i brak docelowych adresów kontaktowych są oznaczone. Prawdziwy link about.me pochodzi z briefu. Nie zgadywać innych profili ani biografii.

Dodano kontakt w nawigacji, zwijany spis treści na telefonie i przejście do kolejnego przykładowego artykułu. Język nagrania domyślnie odpowiada językowi strony, a jawny wybór użytkownika pozostaje niezależny w pamięci podglądu. Usunięto z wybranego widoku opisy konfiguracji usług; demonstracje nadal jasno informują, że nie wysyłają wiadomości i nie odtwarzają nagrań. [Opis i artefakty](selected-preview.md). To konsolidacja wizualna; wybór stacku i integracje nie zostały podjęte przez samo zatwierdzenie wyglądu.

## Przejście od podglądu do implementacji

Po pokazaniu spójnego podglądu użytkownik przyjął roboczo, że wygląd jest w porządku, i zapytał „Co dalej?”. Zamykamy dalsze poszukiwania wyglądu na potrzeby planowania. Kolejny krok to wybór stacku i przeniesienie ustalonego projektu do właściwej strony, zamiast publikowania demonstracyjnego renderera. Samo pytanie o następny etap nie zatwierdza konkretnego frameworka ani publicznego wdrożenia.

## Zlecenie implementacji

Po rekomendacji Astro + TypeScript + MDX użytkownik napisał „Ok kontynuuj”, następnie doprecyzował wymaganie najnowszych wersji zależności, w tym Astro. Wdrożono statyczną bazę PL/EN z treściami MDX i pełnym HTML bez JS; [opis](astro-foundation.md). Archiwalne prototypy pozostają osobno. Publiczna premiera i konfiguracja usług są kolejnym etapem.

## Poprawki po pierwszym podglądzie Astro

Użytkownik wykluczył wszelkie odnośniki do about.me: nowa strona ma je zastąpić. Przed artykułem ma być czas na podstawie nagrania, potem zwinięty akordeon TL;DR i zwinięty spis treści. Prompt pozostaje w dialogu z głównym przyciskiem po prawej. Użytkownik zamówił placeholder rozmowy ElevenLabs oraz potwierdzenie działania powrotu na górę. Poprosił też o propozycję kategorii obejmujących film, programowanie, AI, połączenia dziedzin i inne tematy, np. książki. [Wdrożone poprawki i propozycja kategorii](reading-refinements.md).

## View Transitions i hero artykułu

Użytkownik zamówił animacje przejścia między listą i artykułem oraz zdjęcie hero bezpośrednio przed informacją o czasie czytania, z responsywną optymalizacją Astro i przykładami z Unsplasha. Wdrożono natywne przejścia MPA i wymagane obrazy w schemacie MDX. [Zakres, źródła i weryfikacja](view-transitions-and-images.md).

## Nagłówek, kod i mock audio

Użytkownik wskazał zbędny podpis autora między opisem a zdjęciem oraz potrzebę zawijania kodu bez poziomego przewijania, z ograniczeniem wysokości i małym przyciskiem rozwijania. Zamówił także widoczny placeholder odtwarzacza audio, analogicznie do mocka rozmowy ElevenLabs. [Wdrożenie i podglądy](code-and-audio-preview.md).

## Odciążenie przestrzeni przed artykułem

Użytkownik zauważył nadmiar obramowanych elementów nad treścią i zaproponował tekstową akcję promptu albo przeniesienie przycisku pod artykuł, po prawej. Wdrożono drugą propozycję, zachowując zaakceptowany wygląd przycisku. [Podgląd i weryfikacja](reading-refinements.md#prompt-po-lekturze).

## Kopiowanie do schowka

Użytkownik zgłosił, że oba przyciski kopiowania tylko zaznaczają tekst. Zastąpiono ręczne zaznaczenie mechanizmem rzeczywistego kopiowania przy braku lub odmowie Clipboard API; potwierdzono odczytem zawartości schowka. [Diagnoza, ograniczenia i test regresji](clipboard.md).

## TL;DR i spis w jednej linii

Użytkownik poprosił o małe kontrolki dopasowane szerokością do tekstu, obok siebie, rozwijające treść we wspólnym miejscu. Tylko jedna treść może być otwarta naraz. Wdrożono dwa przełączniki ze wspólnym panelem i możliwością ponownego zwinięcia. [Zachowanie i podglądy](reading-refinements.md#kompaktowe-przełączniki-tldr-i-spisu-treści).

## Tooltip i systemowe udostępnianie

Użytkownik poprosił o potwierdzenie kopiowania w tooltipie, zamiast widocznej notki w dialogu, oraz zasugerował systemowy panel przez Web Share API. Wdrożono tooltip bez zmiany układu oraz bezpośrednie wywołanie API. Na HTTP i przy braku obsługi przycisk kopiuje link bez własnego dialogu. Systemowy panel wymaga HTTPS; konfiguracja w Tailscale wymaga brakujących uprawnień administratora. [Szczegóły i weryfikacja](sharing-and-feedback.md).


## Zdjęcie, logotyp, karty i tło — dalsza eksploracja

Użytkownik doprecyzował, że zdjęcie ma zastąpić kokardkę w rogu nagłówka. Kokardka jako logo została odrzucona. Poprosił o kilka propozycji logotypu, mniejsze karty o lepszych proporcjach do treści i spokojniejszych kolorach oraz bardzo delikatnie animowany gradient i prawie niewidoczną siatkę przy zachowaniu obecnej bazowej zieleni. Przykład Binary Lens jest odniesieniem faktury; nie zmienia zatwierdzonych fontów ani palety. Eksperymenty mają niezależne przełączniki, żeby wybór logo nie narzucał kart lub tła.
