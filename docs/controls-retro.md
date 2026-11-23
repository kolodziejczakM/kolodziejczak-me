# Zaokrąglone kontrolki w charakterze strony

**Werdykt: Spokojny kontur zaakceptowany.** Po usunięciu podwójnych obramowań użytkownik potwierdził „Jest ok”. Wybrano `controls=calm`: zaokrąglone kontrolki z pojedynczą ramką, bez cienia. Błąd kaskady i jego poprawka są opisane poniżej. Dalsze porównywanie wykończeń nie jest potrzebne. Akceptacja dotyczy kontrolek, nie osobnego zatwierdzenia logo, materiałów autora ani gotowości produkcyjnej.

**Pytanie:** czy zaokrąglone przyciski z pikselowym cieniem pasują do Bricolage, Hanken i leśnej strony lepiej niż wersja z niskim cieniem albo bez niego?

Użytkownik zmienił priorytet: dopasowanie do charakteru strony i fontów jest ważniejsze od oryginalności. Faseta była najbliższa z poprzedniej rundy, ale wycięcie zaburzało rytm. Zaokrąglenia i pikselowy cień to wskazany przez niego kierunek dalszej próby. Nie oznacza to akceptacji starej Fasety ani wyboru nowego wykończenia.

**Świadomie porównujemy jedną rodzinę.** Te same proporcje i kontrolki izolują wpływ cienia, zgodnie z bieżącą prośbą. Nie tworzymy kolejnych odległych języków form. Stałe: Blisko i jego karty, Bricolage Grotesque + Hanken Grotesk oraz Leśna pracownia.

| Wykończenie | Akcje | Podgląd |
| --- | --- | --- |
| Zaokrąglony piksel | Pełna miękka powierzchnia, schodkowy cień odsunięty w prawo i w dół; wciśnięcie zbliża powierzchnię do cienia | [Otwórz](http://localhost:4321/pl/?controls=pixel#palette-lab) |
| Ciepły druk | Te same powierzchnie z niskim, twardym cieniem od dołu | [Otwórz](http://localhost:4321/pl/?controls=print#palette-lab) |
| Spokojny kontur | Te same zaokrąglenia bez cienia, aby ocenić samą zgodność z typografią | [Otwórz](http://localhost:4321/pl/?controls=calm#palette-lab) |

Przyciski mają symetryczne zaokrąglenia 16 px; pola 12 px, małe akcje 13 px. Ikony są proste i zaokrąglone, bez osobnego ciemnego modułu. W pikselowym wariancie schodki są geometrią samego cienia — powierzchnia akcji nie ma wycięć. Cień ma kolor wyprowadzony z istniejących tokenów leśnej palety. W polach nie dodajemy cienia: pozostają spokojną powierzchnią do pisania. Dodatkowy obrys pojawia się wyłącznie przy rzeczywistym fokusie.

Zestaw obejmuje wyszukiwanie, e-mail z walidacją, textarea, pole wyłączone, select, przyciski główne/pomocnicze/wyłączone, segmenty, checkbox, switch, radio, suwak i przyciski ikonowe. Wariant jest też widoczny przy głównym haśle, w filtrach listy, playerze i modalach artykułu. Formularze i audio pozostają demonstracją bez integracji. Stan próbek żyje w pamięci, przechodzi między trzema wykończeniami i znika po odświeżeniu.

Dolny pasek i klawisze ← → porównują trzy propozycje. Strzałki w polach nie zmieniają wariantu. `?` pokazuje opis, wybór i stan. Parametr przechodzi przez PL/EN, Home/listę/artykuł; stare rundy zachowują osobne cykle.

**Źródło pierwotne:** gałąź `codex/prototype-ui`, `prototypes/controls/retro.js` i `retro.css`. Istniejący próbnik i wspólne style `fresh.*` są użyte do porównania tej samej rodziny. Uruchomienie: `npm run prototype`. To kod demonstracyjny do przepisania po decyzji.

[Porównanie w kontekście strony](previews/controls-retro.png) · [Zaokrąglony piksel](previews/retro-pixel.png) · [Ciepły druk](previews/retro-print.png) · [Spokojny kontur](previews/retro-calm.png).

## Kontrola podglądu

Sprawdzono 54 widoki Chromium: trzy wykończenia × PL/EN × Home/lista/artykuł × 320/390/1440 px. Bez poziomego przepełnienia, błędów skryptów i brakujących zasobów. Sprawdzono spoczynek i fokus pól, fokus przycisku po użyciu klawiatury, brak wycięcia powierzchni, pojedyncze opakowanie akcji, wpisywanie i czyszczenie, walidację, radio, klawiaturę suwaka, zapisanie próbki i zachowanie wartości przy zmianie wykończenia. Działają cykl trzech propozycji oraz pola i przyciski w modalach promptu i rozmowy na telefonie. Wizualnie przejrzano trzy pełne zestawy, przycisk przy haśle, mobilny modal oraz hover, wciśnięcie i fokus wersji pikselowej. Wciśnięcie przesuwa jej powierzchnię o 4 px, a fokus ma 8 px odstępu od przycisku, żeby otoczyć cień. Poprzednie cykle pozostają dostępne. To weryfikacja prototypu, nie audyt produkcyjny.

## Poprawka ramek w artykule

Wcześniejsza kontrola podglądu nie wykryła dodatkowej ramki w akcjach artykułu. Przeglądarkowy reproduktor potwierdził dokładny objaw: TL;DR, prompt, polubienie, share i komentarze miały po 1 px obrysu oraz 10/15 px paddingu na przycisku zewnętrznym, a wewnętrzna `.retro-face` dodawała kolejną ramkę i odstęp. Reguły artykułu zawierały selektor typu `button` i wygrywały z ogólnym resetem `.retro-button`.

Reset zewnętrznej warstwy uwzględnia teraz ten sam selektor typu oraz hover, wciśnięcie i stan wybrany. Ramka, wypełnienie i odstęp pozostają na właściwej powierzchni. Usunięto również wewnętrzny obrys ikony z przycisku rozmowy. Kolory, kształty i różnice między trzema wykończeniami pozostają takie same. Fokus klawiatury jest zachowany jako osobny stan interakcji.

Kontrola stanu polubionego ujawniła też usuwanie `.retro-face` przy aktualizacji treści przycisku. Obsługa polubienia aktualizuje teraz zawartość istniejącej powierzchni. Reproduktor w Chromium najpierw wykazał podwójną ramkę, a następnie brak powierzchni po kliknięciu. Po poprawkach sprawdzono sześć widoków artykułu (trzy wykończenia × 390/1440 px), brak zewnętrznej ramki, paddingu i wypełnienia w spoczynku, hover, po polubieniu oraz w modalach promptu i rozmowy, a także obecność pojedynczej powierzchni, brak poziomego przepełnienia, fokus klawiatury i pojedynczy obrys przycisku rozmowy. Przejrzano aktualne mobilne zrzuty wskazanych sekcji.

[Poprawiony artykuł](http://localhost:4321/pl/blog/mniej-ale-lepiej/?controls=calm) · [mobilne akcje](previews/calm-article-actions.png) · [mobilny koniec artykułu](previews/calm-article-footer.png).
