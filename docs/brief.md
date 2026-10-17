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
