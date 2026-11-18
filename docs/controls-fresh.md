# Nowa runda wszystkich kontrolek

**Późniejsze doprecyzowanie:** Faseta była najbliższa gustowi użytkownika, ale wycięcie zaburzało rytm. Kolejne prace mają stawiać dopasowanie do strony i fontów ponad oryginalnością, z bardziej zaokrąglonymi przyciskami i próbą pikselowego cienia. [Aktualne porównanie](controls-retro.md). To zastępuje wcześniejszy brak wskazania preferowanej części rundy; żaden z archiwalnych zestawów nie został zatwierdzony w całości.

**Werdykt:** wszystkie cztery propozycje odrzucone. Użytkownik: „Żaden mi się nie podoba”. Brak wskazania przyczyny lub preferowanego elementu tej rundy. Nie rozwijać żadnej z tych propozycji jako wybranego kierunku. Poproszono o referencje pól/przycisków lub opis tego, co najbardziej przeszkadza. Dalsza część dokumentu opisuje archiwalny próbnik.

**Pytanie:** która konstrukcja działa jako kompletny zestaw — od wyszukiwarki po przycisk główny i mały przełącznik?

Ostatnia poprawka przycisków Bocznego modułu została oceniona jako gorsza. Marcin poprosił o krok wstecz i zupełnie nowe prototypy wszystkich kontrolek. Nie wybrano zwycięzcy. To dalsza eksploracja form, bez ponownego wyboru fontów, palety i kompozycji strony.

**Stałe:** Blisko, jego treści i karty, Bricolage Grotesque + Hanken Grotesk, Leśna pracownia. Jasny wariant wykorzystuje krem i szałwię z tej samej palety jako powierzchnie kontrolek. Żaden wariant nie wprowadza podwójnej ramki w spoczynku, przerywanego obrysu pola ani obowiązkowych etykiet wewnętrznych.

| Zestaw | Konstrukcja | Próbnik |
| --- | --- | --- |
| Faseta | Pełna sylwetka ze ściętym narożnikiem; ten sam skos na akcjach i znacznikach | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?controls=facet#palette-lab) |
| Jasny środek | Kremowe powierzchnie z ciemnym tekstem, spłaszczone krzywizny i szałwiowe akcje pomocnicze | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?controls=paper#palette-lab) |
| Pionowy brzeg | Ramka z mocniejszym lewym brzegiem, pionowy znacznik wyboru i kanciaste ikony | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?controls=spine#palette-lab) |
| Osobna akcja | Oddzielny przycisk czyszczenia obok kompletnego pola, ikona przed tekstem, niezależne opcje i switch z otwartym torem | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?controls=pair#palette-lab) |

Każdy próbnik ma: pusty input, błąd i stan poprawny adresu, textarea, pole wyłączone, select, przycisk główny, pomocniczy i wyłączony, segmenty, checkbox, switch, radio, suwak i przyciski ikonowe. Przyciski są na początku prawego panelu, aby można było oceniać je razem z inputami. Na telefonie panele układają się pionowo. Zasady form powtarzają się na liście artykułów oraz w playerze, akcjach i modalach artykułu. Czas i głośność są demonstracją bez podłączonego nagrania.

Pola zaczynają bez fokusu; dodatkowy obrys pojawia się dopiero po wejściu. Wyszukiwarka ma ukrytą wizualnie etykietę. Pomocnicze ikony pól można włączyć checkboxem. Ikony przycisków są częścią akcji, bez kontrastowego modułu na brzegu. Wartości pól, walidacja, wybór treści, radio, głośność i zapisanie przykładowego artykułu żyją wyłącznie w pamięci i pozostają podczas zmiany propozycji. Formularz niczego nie wysyła.

Dolny pasek i ← → obejmują cztery nowe zestawy. Klawisze w polach nie zmieniają wariantu; `?` pokazuje opis, wybór zestawu i stan. Parametr `controls` przechodzi do PL/EN i Home/listy/artykułu. Poprzednie `rim|arch|module` oraz `frame|inset|label|capsule` pozostają w osobnych cyklach.

**Źródło pierwotne:** gałąź `codex/prototype-ui`, `prototypes/controls/fresh.js` i `fresh.css`, wspólny próbnik w `controls.js`. Uruchomienie: `npm run prototype`. Kod demonstracyjny, do przepisania po decyzji.

[Porównanie całego zestawu](previews/controls-fresh.png) · [Faseta](previews/controls-facet.png) · [Jasny środek](previews/controls-paper.png) · [Pionowy brzeg](previews/controls-spine.png) · [Osobna akcja](previews/controls-pair.png).

## Kontrola podglądu

Sprawdzono w Chromium 72 widoki: cztery zestawy × PL/EN × Home/lista/artykuł × 320/390/1440 px. Bez poziomego przepełnienia, błędów skryptów i brakujących zasobów. Sprawdzono spoczynek i rzeczywisty fokus, wpisywanie i czyszczenie, walidację adresu, radio, klawiaturę suwaka i zgodność odczytu, zapisanie próbki oraz zachowanie wartości podczas przełączania. Cztery nowe zestawy mają własny cykl; stare grupy zachowują swoje cykle. Na telefonie sprawdzono pola i przyciski promptu oraz rozmowy. Przejrzano rzeczywiste zrzuty pełnych zestawów, porównanie i mobilny podgląd. To weryfikacja prototypu, nie audyt produkcyjny.
