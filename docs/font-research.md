# Typografia kolodziejczak.me — research przed kolejną rundą UI

Data: 17 października 2026. Pytanie: które mniej oczywiste kroje łączą osobisty, pozytywny charakter z wygodnym czytaniem dłuższych artykułów po polsku i angielsku?

**Rekomendacja robocza:** porównać sześć zestawów typograficznych na tej samej ciemnej zieleni i tej samej treści. Po uwzględnieniu charakteru i dodatkowego wskaźnika popularności najmocniej proponuję **Commissioner użyty w dwóch odmianach**, **Gabarito + Literata** oraz odważniejszy **Ysabeau**. **Bricolage + Hanken** pozostaje porównaniem charakteru, ale nie trafia na czoło selekcji „mało spotykane”. To ocena projektowa, do sprawdzenia w próbniku, a nie zatwierdzenie fontu ani nowego layoutu strony.

## Co wynika z informacji zwrotnej

- Zostają hasła „Ciekawość to dobry początek.” i „Internet jest fajniejszy z ludźmi”.
- Nazwa sekcji: **Artykuły**, ponieważ treści będą dłuższe i poważniejsze.
- Tło: ciemna zieleń z przesłanego zrzutu. Pomiar przekazanego zrzutu wskazuje m.in. `#162823` w głównej powierzchni oraz `#13231f` w panelu bocznym. Próbnik powinien użyć tego samego zielonego tła we wszystkich zestawach.
- Poszukiwany ton: otwarty, ciekawy ludzi, z modern retro, ale bez dominujących fontów mono, fioletowego tła i powtórzenia redakcyjnej estetyki Claude.
- Inter, Lato, Roboto, Montserrat i Open Sans są wykluczone przez autora strony.

Własny charakter trzeba oceniać w polskich słowach i akapitach. Nie ustalamy popularności na podstawie intuicji, liczby gwiazdek GitHub ani obecności w Google Fonts. Dodatkowa weryfikacja znalazła porównywalny wskaźnik `popularity` oficjalnego katalogu Google Fonts (sekcja poniżej), ale nie jest to pomiar udziału krojów w całym internecie ani self-hostingu. Określenia „bardziej charakterystyczny” i „bardziej neutralny” poniżej są ocenami wizualnymi, a nie statystykami popularności.

## Dodatkowy filtr: popularność w katalogu Google Fonts

Odczyt publicznych [metadanych oficjalnego katalogu](https://fonts.google.com/metadata/fonts) z 17.10.2026 zawiera 1950 rodzin i pole `popularity`. Poniżej podaję surowe wartości tego pola: mniejsza wartość oznacza wyższą pozycję przy sortowaniu po tym wskaźniku. Nie są to liczby witryn, odsłon ani procenty rynku. Endpoint jest metadanymi aplikacji, a nie kontraktem publicznego Developer API; jego schemat może się zmienić. Oficjalne [Developer API](https://developers.google.com/fonts/docs/developer_api#Sorting) oddzielnie dokumentuje sortowanie popularity jako najpopularniejsze rodziny na początku.

| Rodzina | Pole popularity |
| --- | ---: |
| Roboto / Open Sans / Inter / Montserrat / Lato (wykluczone) | 2 / 3 / 5 / 7 / 9 |
| Bricolage Grotesque | 62 |
| Schibsted Grotesk | 101 |
| Newsreader | 121 |
| Hanken Grotesk | 140 |
| Literata | 241 |
| Alegreya | 251 |
| Commissioner | 328 |
| Gabarito | 342 |
| Ysabeau | 1336 |

Zapis źródła i wartości: [snapshot metadanych](../prototypes/typography/fonts/popularity-snapshot.json). To ograniczony wskaźnik porównawczy, nie gwarancja rzadkości danego kroju na wszystkich stronach. Nie obejmuje mierzenia wszystkich instalacji lokalnych, więc nie wyznaczamy na jego podstawie udziałów procentowych w internecie.

**Wniosek projektowy:** Bricolage jest zdecydowanie poza ścisłą czołówką wykluczonych rodzin, ale jest za wysoko, żeby bez zastrzeżeń nazwać go niszowym. Najmocniejsze kierunki do kolejnej selekcji to Commissioner (jeden głos i spokojna proza), Gabarito + Literata (pogodny nagłówek i książkowy tekst) oraz Ysabeau (najbardziej odmienna faktura i znacznie dalsza pozycja tego wskaźnika). Bricolage pozostaje celowym punktem odniesienia. Jakość czytania nadal rozstrzygamy na próbkach, nie po rankingu.

## Figma jako początek, źródła autorów jako weryfikacja

Przesłany [przegląd Figma](https://www.figma.com/resource-library/modern-fonts/) jest użytecznym katalogiem inspiracji: obejmuje Instrument Sans, Inclusive Sans, Rethink Sans, Charis SIL i wiele innych rodzin. Zawiera też kroje wykluczone w briefie oraz mono, więc nie jest gotową shortlistą dla tej strony.

Istotny przykład różnicy między ogólną rekomendacją a przeznaczeniem kroju: Figma wskazuje Instrument Serif m.in. do długich treści i książek. Tymczasem [repozytorium autorów Instrument Serif](https://github.com/Instrument/instrument-serif) opisuje go jako wąski krój **display**, zaprojektowany do dużych rozmiarów. Dlatego nie rekomenduję go jako głównego kroju artykułów. Jego ewentualne użycie w nagłówkach też nie jest priorytetem po odrzuceniu kierunku zbyt zbliżonego do Claude.

Oddzielamy trzy sprawy:

1. **Nagłówek i hasło:** osobowość, rytm, kształt słów.
2. **Długi tekst:** spokojna faktura, kursywa i pogrubienie, polskie znaki, mobilna kolumna.
3. **Nawigacja i elementy użytkowe:** krótkie etykiety czytelne w mniejszym rozmiarze.

Nie ma potrzeby, żeby jeden krój wykonywał wszystkie trzy zadania.

## Kandydaci — 14 rodzin

Zakresy i style w tabeli odnoszą się do konkretnej dystrybucji wskazanej w źródłach, najczęściej aktualnych metadanych Google Fonts. **D** oznacza udokumentowany deklarowany zestaw `latin-ext` lub wsparcie językowe. Nie oznacza ręcznego sprawdzenia wszystkich znaków w pobranym pliku. Uzupełnienie **V** dla dziewięciu rodzin shortlisty znajduje się w sekcji weryfikacji poniżej; pięć pozostałych rodzin pozostaje na poziomie deklaracji.

Oceny „rola / charakter / ryzyko” są moją interpretacją na potrzeby tego projektu. Fakty techniczne i licencje mają oddzielne odnośniki.

| Rodzina | Rola, charakter i kompromis | Udokumentowane odmiany | PL/EN i licencja |
| --- | --- | --- | --- |
| **Bricolage Grotesque** | Mocna, swobodna, lekko niepokorna; retro bez udawania pisma maszynowego. W długim tekście może być zbyt obecna. | Variable: waga 200–800, szerokość 75–100, rozmiar optyczny 12–96. Brak osobnej kursywy w tej dystrybucji. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/OFL.txt). |
| **Hanken Grotesk** | Mocny kandydat do tekstu, UI i podpisów; spokojniejsza przeciwwaga dla ekspresyjnego nagłówka. Sam może mieć za mało własnego głosu. | W dystrybucji GF: variable 100–900, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/hankengrotesk/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/hankengrotesk/OFL.txt). |
| **Commissioner** | Szczególnie ciekawy kierunek jednej rodziny. W nagłówku rozszerzone zakończenia, w artykule spokojny humanistyczny sans. Wymaga świadomego ustawienia osi. | Variable 100–900, pochylenie slnt −12–0, FLAR i VOLM po 0–100. Pochylenia nie należy utożsamiać z niezależnie narysowaną kursywą innej rodziny. [Metadane GF](https://raw.githubusercontent.com/google/fonts/main/ofl/commissioner/METADATA.pb). | D: latin + latin-ext; autor wymienia Polish. [Opis autora](https://github.com/kosbarts/Commissioner/blob/master/README.md), [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/commissioner/OFL.txt). |
| **Gabarito** | Pogodny, konkretny nagłówek; naturalnie pasuje do „Ciekawość…”. Zbyt mocna waga i zbyt wiele miękkich ilustracji mogą nadać stronie ton edukacyjny lub dziecięcy. | Variable 400–900; tylko styl prosty w GF. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/gabarito/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/gabarito/OFL.txt). |
| **Schibsted Grotesk** | Rzeczowy i ciepły kandydat do UI, treści i tytułów. Dobra kontrola dla bardziej ekspresyjnych propozycji; może wypaść zbyt „wydawniczo-profesjonalnie”. | Variable 400–900, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/schibstedgrotesk/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/schibstedgrotesk/OFL.txt). |
| **Instrument Sans** | Zwarty, współczesny sans; wartościowy wzorzec do porównania, ale mniej obiecujący jako główny wyróżnik. | Variable 400–700, szerokość 75–100, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/OFL.txt). |
| **Figtree** | Przyjazny sans do treści i UI, mniej surowy niż stylistyka terminalowa. Rezerwowy body font; w nagłówku nie daje takiego kontrastu jak Bricolage. | Variable 300–900, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/figtree/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/figtree/OFL.txt). |
| **Ysabeau** | Nieoczywisty pomost między sans a książkowym rytmem: miękki, kaligraficzny, o wyraźnej osobowości. Warto sprawdzić większy stopień tekstu; małe UI nie musi być jego mocną stroną. | Variable 1–1000, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/ysabeau/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/ysabeau/OFL.txt). |
| **Newsreader** | Kandydat do długich artykułów przy bezszeryfowym haśle. Elegancki, ale wykorzystany wszędzie może znów poprowadzić stronę w redakcyjne skojarzenia, których chcemy uniknąć. | Variable 200–800, rozmiar optyczny 6–72, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt). |
| **Literata** | Bardzo dobry kontrkandydat do artykułów: poważniejszy, bardziej książkowy rytm pod pogodnym nagłówkiem. Na zielonym tle wymaga obejrzenia drobniejszych elementów liter. | Variable 200–900, rozmiar optyczny 7–72, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/literata/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/literata/OFL.txt). |
| **Alegreya** | Najbardziej żywa z proponowanych szeryfowych rodzin. W tytule daje energię, w treści literackość; może być zbyt kaligraficzna dla pożądanego technicznego tonu. | Variable 400–900, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/alegreya/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/alegreya/OFL.txt). |
| **Petrona** | Rezerwowy szeryf z osobistymi detalami; dobry eksperyment, jeśli Literata wyda się zbyt spokojna, a Alegreya zbyt kaligraficzna. | Variable 100–900, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/petrona/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/petrona/OFL.txt). |
| **Vollkorn** | Mocny, solidny szeryf; może dać przyjazny modern retro bez bardzo cienkich włosowych kresek. Ryzyko: większa ciężkość całej kolumny. | Variable 400–900, prosta i kursywa. [Metadane](https://raw.githubusercontent.com/google/fonts/main/ofl/vollkorn/METADATA.pb). | D: latin + latin-ext. [SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/vollkorn/OFL.txt). |
| **Overused Grotesk** | Ciekawy eksploracyjny grotesk, ale rezerwowy wobec stabilniejszej shortlisty. Projekt rozwija odmiany i zestaw znaków; najpierw trzeba przypiąć konkretne wydanie. | Autor pokazuje 300–900 i odmiany pochylone, statyczne formaty oraz variable; równocześnie informuje o dalszym dopracowywaniu kursyw i zmianach przyszłego zestawu znaków. [Repozytorium autora](https://github.com/RandomMaerks/Overused-Grotesk). | Autor deklaruje SIL OFL 1.1 i wielojęzyczność. Polskie znaki w wybranej paczce niezweryfikowane; nie awansuje do wdrożenia tylko na podstawie opisu. [Źródło i licencja](https://github.com/RandomMaerks/Overused-Grotesk#license). |

### Dlaczego te rodziny, poza samym wyglądem?

**Bricolage** ma uzasadnioną historycznie osobowość: autor opisuje połączenie inspiracji francuskich i brytyjskich, a mniejsze rozmiary optyczne jako bardziej neutralne. To ciekawszy fundament modern retro niż dokładanie pikselowej czcionki do zwykłego sansa. [Opis projektu](https://github.com/ateliertriay/bricolage).

**Commissioner** pozwala zmieniać sposób zakończenia kresek: oś FLAR wprowadza rozszerzenia, a VOLM zmienia ich kształt. Autor określa rodzinę jako humanistyczną i opisuje ciepło wynikające z proporcji małych i wielkich liter. [Autor o osiach i projekcie](https://github.com/kosbarts/Commissioner/blob/master/README.md).

**Gabarito** powstał dla brazylijskiej platformy edukacyjnej; autorzy opisują pogodny głos i rozbudowane znaki szkolne, w tym matematyczne. Związek z ciekawością i uczeniem się jest tu realną historią projektu, choć nie dowodzi automatycznie dopasowania do osobistej strony. [Repozytorium autorów](https://github.com/naipefoundry/gabarito).

**Ysabeau** według autora łączy dziedzictwo kształtów Garamonda z bezszeryfowym, niskokontrastowym rysunkiem; jest projektowany zarówno do tekstu, jak i większych zastosowań. To dobry sposób wyjścia poza wybór „typowy tech sans albo klasyczny editorial serif”. [Repozytorium autora](https://github.com/CatharsisFonts/Ysabeau).

**Newsreader** jest projektowany do ciągłego czytania na ekranie, **Literata** do długich tekstów, a **Alegreya** do literatury i rytmu wieloakapitowego tekstu. To mocniejsza przesłanka do testów body niż samo przypisanie kategorii „serif”. Nie jest to dowód, że każdy odbiorca przeczyta je wygodniej od sansa. [Newsreader](https://github.com/productiontype/NewsReader), [Literata](https://github.com/googlefonts/literata), [Alegreya](https://github.com/huertatipografica/Alegreya).

**Petrona** jest przez autora opisana jako krój tekstowy o wyrazistych detalach, niskim kontraście i dużej wysokości małych liter; zachowuje pełne odmiany italic. Warto zachować ją jako dalszą ścieżkę, jeśli pierwsze propozycje nie przekonają. [Projekt Petrona](https://github.com/RingoSeeber/Petrona).

### Ważna rozbieżność: Hanken

Aktualny [README upstream Hanken](https://github.com/marcologous/hanken-grotesk) wymienia zakres 300–900 i inne szczegóły niż [dystrybucja Google Fonts](https://raw.githubusercontent.com/google/fonts/main/ofl/hankengrotesk/METADATA.pb), która deklaruje 100–900 i oddzielny italic. Nie należy mieszać opisu jednego wydania z binariami drugiego. Na potrzeby porównania i późniejszego wdrożenia trzeba zachować nazwę pliku oraz pochodzenie; tabela celowo przyjmuje dane GF.

## Sześć zestawów do porównania

To zestawy do **próbnika typografii**, nie sześć kolejnych projektów strony. Powinny mieć identyczny układ, tekst, kolory i zakres funkcji; inaczej efekt fontu zniknie w różnicach kompozycji.

| Zestaw | Nagłówek / hasło | Artykuł / UI | Co sprawdzamy |
| --- | --- | --- | --- |
| **1. Pogodny i autorski** | Bricolage Grotesque 650–700 | Hanken Grotesk 400–450 / 500 | Czy wyraziste liternictwo wystarczy do zbudowania charakteru bez ozdobników? Popularniejszy punkt odniesienia, nie główny kandydat do rzadkiego kroju. |
| **2. Ciekawość i długa lektura** | Gabarito 650–750 | Literata 400–450 / Hanken 500 do małego UI | Czy pozytywne hasło może współistnieć z poważnym, książkowym artykułem? |
| **3. Jeden głos, dwa rejestry** | Commissioner 650–750, FLAR około 70, VOLM około 40 | Commissioner 400–450, FLAR 0, VOLM 0 | Czy jedna rodzina może być charakterystyczna w haśle i spokojna w treści? Podane osie są punktem startu. |
| **4. Współczesny autor** | Schibsted Grotesk 650–750 | Newsreader 400–450 / Schibsted 500 do UI | Czy bardziej rzeczowy nagłówek i szeryf w tekście zachowają wystarczająco osobisty charakter? |
| **5. Żywa typografia** | Alegreya 650–750 | Hanken Grotesk 400–450 / 500 | Czy szeryfowy nagłówek może brzmieć swobodnie, bez odtwarzania wariantu A? |
| **6. Nietypowy sans** | Ysabeau 650–800 | Ysabeau 400–500 | Czy kaligraficzny sans daje czytelny, rozpoznawalny głos całej strony? Body trzeba też sprawdzić przy 20–21 px. |

Dodatkowe użyteczne porównanie po tej szóstce: **Bricolage + Literata**. To zamiana wyłącznie tekstu artykułu w zestawie 1; pozwoli rozstrzygnąć sans kontra serif bez zmieniania hasła.

Przy Bricolage i Gabarito nie należy bezwiednie pochylać słowa „początek” sztuczną kursywą. W tych rodzinach brak osobnego italic w badanej dystrybucji. Można nadać mu akcent wagą, kolorem lub po prostu pozostawić krój prosty. Kursywa z innej rodziny wymaga osobnej świadomej decyzji.

## Polskie znaki: deklaracja nie zastępuje sprawdzenia pliku

`latin-ext` jest sygnałem do dalszej kwalifikacji, nie raportem z testu. Przed wyborem sprawdzamy w rzeczywiście serwowanych plikach: **ĄĆĘŁŃÓŚŹŻ ąćęłńóśźż**, zwykły tekst angielski, cyfry, **„polski cudzysłów”**, **“English quotes”**, apostrof, półpauzę, pauzę, wielokropek oraz znaki techniczne potrzebne w artykułach. Osobno kontrolujemy regular, bold i italic.

Przykłady do oglądania:

> Zażółć gęślą jaźń. Łączę ciekawość z rzetelną pracą.  
> Ciekawość to dobry początek. Internet jest fajniejszy z ludźmi.  
> Dlaczego prostsze rozwiązanie bywa trudniejsze do zaprojektowania?  
> Curiosity is a good beginning. The internet is better with people.

Sprawdzenie musi obejmować mapę znaków w pliku i wygląd w przeglądarce. Sam fakt, że przeglądarka wyświetli „Ł”, nie dowodzi jeszcze, że pochodzi ono z badanego fontu — może pochodzić z fontu zastępczego. Dodatkowo warto obejrzeć gęste polskie akapity z wieloma znakami diakrytycznymi; komplet kodów znaków nie rozstrzyga ich optycznej jakości.

### V — sprawdzenie plików shortlisty

Po researchu, w trakcie przygotowania próbnika, pobrano oficjalne pliki TTF z repozytorium Google Fonts. Narzędzie fontkit potwierdziło obecność całego testowanego zestawu **ąćęłńóśźżĄĆĘŁŃÓŚŹŻ„”–—…** w każdym z 15 plików. Szczegółowy lokalny [manifest źródeł](../prototypes/typography/fonts/source-manifest.json) zawiera nazwy plików, adresy pobrania, wersje, osie, SHA-256 i puste listy brakujących znaków.

| Rodzina | Sprawdzone wydanie | Pliki z potwierdzonym zestawem znaków |
| --- | --- | --- |
| Bricolage Grotesque | 1.001 | variable prosta |
| Hanken Grotesk | 3.013 | variable prosta i italic |
| Gabarito | 1.000 | variable prosta |
| Literata | 3.103 | variable prosta i italic |
| Commissioner | 1.001 | variable z osią slnt (oblique) |
| Schibsted Grotesk | 1.100 | variable prosta i italic |
| Newsreader | 1.003 | variable prosta i italic |
| Alegreya | 2.009 | variable prosta i italic |
| Ysabeau | 2.002 | variable prosta i italic |

To potwierdzenie pokrycia znaków w konkretnych binariach, nie certyfikat ich optycznej jakości ani dowód działania dowolnego podzbioru WOFF2 po późniejszej konwersji. Przy zmianie plików trzeba powtórzyć kontrolę. Petrona, Vollkorn, Instrument Sans, Figtree i Overused Grotesk nie są objęte tą weryfikacją V.

## Licencja i lokalne serwowanie

Dla 13 rodzin z tabeli zweryfikowano linkowane pliki OFL; dla Overused — deklarację w repozytorium. SIL OFL 1.1 pozwala używać, osadzać i redystrybuować fonty z zachowaniem warunków, w szczególności informacji o prawach autorskich i licencji. Zmodyfikowane odmiany muszą respektować ewentualne Reserved Font Names. To daje możliwość lokalnego serwowania plików na stronie bez polegania na zewnętrznym API fontów; nie oznacza prawa do usunięcia licencji z paczki. [Oficjalny tekst SIL OFL 1.1](https://openfontlicense.org/open-font-license-official-text/).

Praktyczna propozycja: podczas wdrożenia zapisać pliki z konkretnego wydania razem z ich licencją i użyć lokalnego WOFF2. Osobno zaplanować potrzebne odmiany, żeby nie wysyłać całej biblioteki tylko dlatego, że próbniki porównują wiele rodzin.

Nie włączam Cabinet Grotesk, General Sans ani Satoshi do tej shortlisty: [Fontshare](https://www.fontshare.com/licenses) nie udostępnił przez narzędzie odczytu wystarczającej treści licencji i szczegółów rodzin. Nie wyciągam z „free font” wniosku o open source, prawie do modyfikacji ani konkretnym zakresie PL. To ograniczenie weryfikacji w tym badaniu, a nie stwierdzenie, że tych rodzin nie wolno użyć.

## Jak ocenić próbniki przed kolejnymi layoutami

Proponowane parametry startowe są decyzją projektową do regulacji: proza 18–21 px, interlinia około 1.6–1.75, kolumna około 60–70 znaków na większym ekranie; na telefonie naturalna szerokość pomniejszona o marginesy. Jasny tekst może być ciepłą złamaną bielą, ale żadna konkretna para kolorów nie jest zatwierdzona bez pomiaru kontrastu.

Dobór roli i oglądanie kroju w rzeczywistym rozmiarze są też osią [poradnika Google Design](https://design.google/library/choosing-web-fonts-beginners-guide). Próbniki powinny pokazywać akapit, a nie tylko duży alfabet.

Dla tekstu zwykłego przyjmujemy co najmniej **4.5:1** kontrastu, a dla dużego tekstu **3:1**, zgodnie z [wyjaśnieniem WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). To minimum; samo jego przekroczenie nie rozstrzyga komfortu dłuższej lektury.

Sprawdzamy też odporność układu na zmianę odstępów przez czytelnika. [WCAG 1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) nie nakazuje domyślnie stosować konkretnych odstępów: wymaga zachowania treści i funkcji po ich nadpisaniu (m.in. interlinia 1.5, odstęp akapitów 2 em, liter 0.12 em i słów 0.16 em). Nie należy cytować tych progów jako dowodu na jeden idealny wygląd tekstu.

W każdym zestawie oglądamy:

- oba zaakceptowane hasła i nazwisko „Marcin Kołodziejczak”;
- 3–5 akapitów rzeczywistego tekstu technicznego, także po angielsku;
- śródtytuł, listę, link w zdaniu, bold i italic, podpis oraz etykietę „Artykuły”;
- mobilny i większy ekran, zwykłą i nieco większą czcionkę;
- czy po minucie czytania pozostaje przyjemny rytm, czy tylko atrakcyjny pierwszy nagłówek.

Nie rozstrzygamy jeszcze logo, ilustracji, całego layoutu ani stacku. Po tym kroku warto wybrać dwa lub trzy głosy typograficzne i dopiero z nimi wrócić do eksploracji wyglądu.

## Wykonany próbnik i parametry

Próbnik znajduje się w `prototypes/typography/`, dostępny pod `/typography/` na dotychczasowym serwerze podglądu. Ma sześć zestawów, wspólny układ i tekst, próbkę PL/EN, jednoczesne porównanie sześciu par, widok diakrytyków oraz regulację wielkości prozy, interlinii i szerokości kolumny. Stan można zapisać w adresie. Oryginalne prototypy A/B/C pozostają historycznym zapisem pierwszej rundy; próbnik nie dodaje nowego projektu strony.

Domyślne parametry badania: tekst 20 px, interlinia 1.75, maksymalna kolumna 64 ch (jednostka zależna od szerokości znaku „0”, nie dokładny licznik znaków w wierszu). Wszystkie pary otrzymują takie same ustawienia. Na telefonie kolumnę ogranicza dostępna szerokość. Dla Ysabeau warto sprawdzić również 22 px. Mały UI w parze 2 używa Hanken, a w parze 4 Schibsted — nie zmuszamy szeryfowej prozy do obsługi wszystkich ról.

Tła `#162823` i `#13231f` odczytano z jednorodnych powierzchni oryginalnego załącznika, a `#111b1c` zachowuje tło B. Są to kolory obrazu, bez wnioskowania o kalibracji ekranu autora. Na domyślnym tle `#162823` obliczone kontrasty wynoszą: tekst `#e2e8df` **12.37:1**, tekst drugorzędny `#a9bbb0` **7.65:1**, akcent `#c8d8ad` **10.19:1**. To pomiar tych konkretnych pełnych kolorów, nie certyfikat dostępności całej strony.

Próbnik wczytuje pełną shortlistę TTF do badania (około 6.1 MiB), nie zoptymalizowaną paczkę produkcyjną. Licencje i metadane są obok plików; do wdrożenia zostaną tylko wybrane rodziny i potrzebne odmiany w WOFF2. Nie ma zewnętrznego API fontów, analityki ani utrwalania ustawień w cookies lub localStorage.

Kontrola przeglądarkowa: 30 kombinacji zestawów, PL/EN i widoków na szerokościach 320, 768 i 1440 px, w tym maksymalny rozmiar prozy 24 px. Poprawiono jeden zbyt szeroki polski śródtytuł przy Literata na 320 px; ponowne sprawdzenie tego widoku PL/EN nie wykazało przepełnienia. Nie wykryto błędów skryptów ani zewnętrznych żądań w tych próbach. Sprawdzono zmianę pary i języka, regulację ustawień, zachowanie ich po odświeżeniu, przejście z porównania do fragmentu oraz ręczne kopiowanie adresu przy HTTP. Przejrzano zrzuty wszystkich par. To kontrola próbnika, nie pomiar tempa czytania ani pełny audyt dostępności.
