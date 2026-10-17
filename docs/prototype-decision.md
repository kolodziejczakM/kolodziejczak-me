# Eksploracja UI — decyzja otwarta

**Pytanie:** jaki kierunek wizualny najlepiej oddaje osobistą stronę Marcina, z wygodnym blogiem po polsku i angielsku?

**Źródło pierwotne:** prototypy na gałęzi `codex/prototype-ui`, katalog `prototypes/`. Trzy projekty na tych samych ścieżkach, sterowane `?variant=A|B|C`. Uruchomienie: `npm run prototype`.

| Wariant | Co sprawdzamy |
| --- | --- |
| A — Margines | Czy ciepła redakcyjność, szkic i duża szeryfowa typografia pasują do strony osobistej? |
| B — Sygnał | Czy profil obok dziennika i cyfrowe, pikselowe akcenty lepiej pokazują techniczny charakter? |
| C — Po godzinach | Czy ilustracyjny humor, wyraziste liternictwo i pastelowe kartki pasują do autorskiego charakteru? |

**Werdykt po pierwszej rundzie:** C jest najbardziej obiecującym punktem wyjścia. Zatwierdzony kierunek tonu: „Ciekawość to dobry początek.” i „Internet jest fajniejszy z ludźmi”. Nie zatwierdzono całego layoutu ani fontów. Fioletowe tło C odrzucone na rzecz ciemnej zieleni ze screenshotu (również tło B jest bliskie preferencjom). A odrzucone za podobieństwo do Claude, B za sztampowe hasła i dominację mono. Nawigacja docelowo „Artykuły / Articles”.

**Następny krok:** szerszy research i porównanie typografii, przed nowymi prototypami układów. Dokładne preferencje i wykluczone fonty: [aktualny brief](brief.md#feedback-po-pierwszej-rundzie--17-października-2026). Stare A/B/C pozostają bez zmian jako zapis porównania, a nie aktualna rekomendacja.

**Etap typograficzny:** [research 14 rodzin](font-research.md) i próbnik `/typography/` na tej samej gałęzi. Sześć zestawów na identycznej treści i tle z referencji. Weryfikacja plików obejmuje polskie znaki, wersje i licencje; dodatkowy snapshot oficjalnych metadanych Google Fonts odróżnia charakter od wskaźnika popularności. Wstępnie najmocniejsze kierunki: Commissioner, Gabarito + Literata, Ysabeau. Bricolage zachowano jako popularniejszy punkt odniesienia. Żaden nowy layout nie powstał; wybór typografii pozostaje otwarty.

**Decyzja po próbniku:** Marcin wybrał Bricolage Grotesque + Hanken Grotesk. Ta preferencja zastępuje roboczą kolejność rekomendacji badania. Nagłówki: Bricolage; proza i kontrolki: Hanken.

**Runda 3 — kolor:** cztery palety na wspólnym układzie C i wybranych fontach, na istniejącej trasie `?variant=C&palette=forest|meadow|clay|tide`. Stały układ jest celowy: pytanie użytkownika dotyczy teraz koloru. Prototypy obejmują Home, Artykuły, pojedynczy artykuł, player i modale oraz próbki stanów UI. Źródło: `prototypes/palettes/`, pomiary par kolorów: `contrast.json`, pełne role: `palettes.json`. Żadna paleta nie jest jeszcze wybrana.

**Decyzja po rundzie 3:** Marcin wskazał „Leśna pracownia wygrywa”. Wybrana paleta to `meadow`. Ta decyzja zastępuje wcześniejszy status otwarty, bez ponownego wyboru typografii.

**Runda 4 — forma:** trzy języki kształtów na tej samej trasie z `shape=soft|stamp|cut`. Każdy wymusza paletę `meadow` i wariant C. Pytanie: jaki charakter mają mieć przyciski, obramowania, kontrolki, ikony i ozdobniki? Kolory, typografia i kompozycja pozostają wspólne, bo użytkownik prosi o eksperymenty z detalami. Źródło: `prototypes/shapes/` na `codex/prototype-ui`. [Opis i kontrola podglądu](form-study.md). Formy nie zostały jeszcze wybrane.

**Feedback po rundzie 4:** Miękkie formy pasują najlepiej, lecz są zbyt typowe. Główne przyciski Papieru i pieczęci podobają się. Odrzucono przerywane i wyłącznie dolne obramowania pól oraz dekoracyjne kreski na kartach z wariantu cut. Doceniono jego oryginalność. Potrzebne są cztery dalsze propozycje, bez zamykania wyboru.

**Runda 5 — miękko, ale z charakterem:** `shape=press|bookmark|orbit|ticket`, oddzielny cykl czterech nowych form. Baza pozostaje ta sama, zgodnie z prośbą o rozwinięcie detali. Pytanie: jak dodać rozpoznawalność do miękkiej geometrii, zachowując pełne obramowania pól i porządek dekoracji? Źródło: `prototypes/shapes/refinements.js` i `refinements.css`, gałąź `codex/prototype-ui`. [Kierunki i warunki porównania](form-refinements.md). Poprzednie adresy zachowują osobny cykl trzech form. Wybór nowej formy pozostaje otwarty.

**Feedback po rundzie 5:** Miękki druk i Kontur i kropka są najlepsze. Zakładka jest oryginalna, ale chaotyczna. Motyw biletu narzuca skojarzenie z koleją, obce zainteresowaniom autora. Żaden wariant nie zachwycił użytkownika; wyboru nie zamykamy.

**Runda 6 — kompozycja i tożsamość:** cztery nowe propozycje z `shape=gesture|rhythm|close|signature`, oddzielny cykl. Badamy większą zmianę: skalę hasła, relację bio do nagłówka, hierarchię artykułów oraz autorski monogram. Oryginalność ma wynikać z powtarzalnego języka form i kompozycji, bez narzucającej temat metafory. Zatwierdzone paleta i fonty pozostają. Źródło pierwotne: `codex/prototype-ui`, `prototypes/shapes/compositions.js` i `compositions.css`. [Opis rundy](composition-study.md). Wybór pozostaje otwarty.

**Korekta po rundzie 6:** użytkownik wskazał, że rozszerzenie na redesign nie odpowiadało prośbie. Sygnatura jest najgorsza; Blisko podoba się najbardziej. Fonty i paleta są dobre, ale inputy nadal przeciętne. Prace wracają wyłącznie do kontrolek. Blisko jest bazą bieżącego porównania, nie zatwierdzeniem wszystkich szczegółów produkcyjnego UI.

**Runda 7 — same kontrolki:** `controls=frame|inset|label|capsule` na istniejących trasach, zawsze z bazą `shape=close` i paletą `meadow`. Zmienia się konstrukcja pól i wygląd komponentów interaktywnych. Układ strony, teksty i karty pozostają stałe. Źródło: `prototypes/controls/`, gałąź `codex/prototype-ui`. [Zakres i próbnik](control-study.md). Wybór kontrolek pozostaje otwarty.

**Feedback po rundzie 7:** podwójna oprawa w spoczynku sugeruje fokus; wgłębienie nie ma wystarczającej oryginalności; wewnętrzna etykieta jest ciekawa, lecz bywa zbędna i marnuje miejsce; kapsuła jest generyczna. Żadna kontrolka nie została zatwierdzona. Szukamy umiarkowanej oryginalności i czytelnych stanów.

**Runda 8 — pojedynczy obrys, kompaktowe pole:** `controls=rim|arch|module`, osobny cykl trzech propozycji. Na tej samej bazie Blisko porównujemy dolny rant, profil z zaokrągloną górą i krótszymi dolnymi narożnikami oraz funkcjonalny moduł po prawej stronie. Wyszukiwanie ma dostępną nazwę bez widocznego wiersza etykiety; ikony pomocnicze są opcjonalne. Stan spoczynku nie ma zewnętrznego obrysu. Źródło pierwotne: `codex/prototype-ui`, `prototypes/controls/refinements.js` i `refinements.css`. [Opis](control-refinements.md). Wybór pozostaje otwarty.

Przy decyzji zapisać: wybrany kierunek, elementy zapożyczone z pozostałych, argumenty i rzeczy do zmiany. Potem przepisać zwycięski projekt do kodu produkcyjnego, zachowując te prototypy na gałęzi źródłowej. Nie przenosić przełącznika ani symulacji usług do produkcji.

Nie utworzono issue wdrożeniowego; ten dokument jest lokalnym odnośnikiem do prototypów. Po utworzeniu issue należy wkleić do niego ten odnośnik i werdykt.

## Sprawdzenie prototypów

W Chromium sprawdzono 72 kombinacje: trzy kierunki × PL/EN × wizytówka/lista/artykuł × szerokości 320, 390, 768 i 1440 px. Bez poziomego przepełnienia, błędów skryptów ani żądań do usług zewnętrznych. Przejrzano zrzuty na komputerze i telefonie.

Dodatkowo sprawdzono: bezpośrednie adresy wszystkich artykułów, zachowanie wariantu po odświeżeniu, parowanie językowych adresów artykułu, sugestię języka dla przeglądarki angielskiej, filtr notatek, TLDR w pięciu zdaniach, kopiowanie promptu, klawiaturowe przełączanie wariantów bez przechwytywania strzałek w polu tekstowym, demonstrację czatu oraz powrót na początek tekstu. To kontrola podglądu, nie walidacja integracji produkcyjnych ani pełny audyt dostępności.

Porównanie: [trzy kierunki](previews/directions.png). Kod kontroli przeglądarkowej i zależności do podglądów nie należą do projektu.
