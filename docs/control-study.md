# Kontrolki — stała baza Blisko

**Status po ocenie:** żaden z czterech wariantów nie został wybrany. Podwójna oprawa sugeruje fokus, wgłębienie jest za mało oryginalne, wewnętrzna etykieta bywa zbędna, a kapsuła jest generyczna. Aktualne porównanie: [druga runda samych kontrolek](control-refinements.md). Poniżej zachowano wcześniejsze źródło.

**Pytanie:** która konstrukcja inputów i spójnych z nimi kontrolek ma właściwy charakter?

Użytkownik skorygował poprzednią iterację: oczekiwał dopracowania kontrolek, a dostał redesigny. Inputy pozostają przeciętne. Blisko podoba się najbardziej; Sygnatura wypada najgorzej. Fonty i kolory są już dobre.

**Zamrożone na tę rundę:** układ Blisko, hero, treść, karty artykułów, znak, Bricolage + Hanken i Leśna pracownia. Zmieniają się wyłącznie komponenty interaktywne. Nie otwieramy wyboru layoutu ani logo.

| Wariant | Co porównujemy | Próbnik |
| --- | --- | --- |
| `frame` — Podwójna oprawa | Pełny zewnętrzny i wewnętrzny obrys z przerwą pomiędzy | [Inputy](http://localhost:4321/pl/?controls=frame#palette-lab) |
| `inset` — Miękkie wgłębienie | Głębia pola, wewnętrzny cień i osadzenie ikony | [Inputy](http://localhost:4321/pl/?controls=inset#palette-lab) |
| `label` — Etykieta w ramce | Stała etykieta wewnątrz pola, nad wpisywanym tekstem | [Inputy](http://localhost:4321/pl/?controls=label#palette-lab) |
| `capsule` — Kapsuła z akcją | Obłe pole, koło z ikoną i okrągły przycisk czyszczenia | [Inputy](http://localhost:4321/pl/?controls=capsule#palette-lab) |

## Jak ocenić

Linki otwierają tę samą sekcję istniejącej wizytówki. Próbki i ich kolejność są identyczne. Puste wyszukiwanie ma przycisk czyszczenia; e-mail zaczyna z przykładowym błędem. Wpisz poprawny adres i kliknij „Sprawdź adres”, by zobaczyć stan poprawny. Jest też textarea, pole wyłączone, natywny select, segmenty, checkbox, switch i przyciski. Walidacja służy wyłącznie demonstracji stanów. Nic nie jest wysyłane.

Ramka otacza cały komponent pola w każdym stanie; nie ma linii przerywanych ani wyłącznie dolnej krawędzi. Input/textarea/select są natywne, z etykietą i powiązanym opisem. Obramowanie należy do wspólnej osłony pola z ikoną i akcją; `focus-within` daje widoczny fokus podczas edycji. Wewnętrzna etykieta jest stała i nie przeskakuje podczas wpisywania. Błąd sygnalizuje tekst, symbol i `aria-invalid`, a nie sam kolor.

Wariant obejmuje także przyciski strony, selecty i przełączniki próbnika oraz pola w modalach promptu, rozmowy i udostępniania. Rozmieszczenie treści strony oraz karty pozostają wspólne. Wybrany wariant ma własny parametr `controls`; wymusza bazę `close`, niezależnie od innych parametrów.

Dolny pasek i ← → zmieniają wyłącznie kontrolki. Strzałki podczas edycji i w selectach działają natywnie. Wartości próbek pozostają w pamięci podczas porównywania. Wariant jest w linkach do listy, artykułu i PL/EN oraz po odświeżeniu. `?` pozwala wybrać wariant i pokazuje aktualny stan. Poprzednie adresy bez `controls` zachowują historyczne porównania.

## Stan decyzji

**Wybór kontrolek pozostaje otwarty.** Blisko to baza tej iteracji; wybrane fonty i paleta pozostają zatwierdzone.

Źródło pierwotne: gałąź `codex/prototype-ui`, pliki `prototypes/controls/controls.js` i `controls.css`. Uruchomienie: `npm run prototype`. Kod demonstracyjny, bez nowych zależności i aktywnych integracji. Po decyzji kontrolki wymagają przepisania do implementacji produkcyjnej.

[Zestawienie kontrolek](previews/controls.png).

## Sprawdzenie

W Chromium sprawdzono **72 widoki**: cztery warianty × PL/EN × Home/lista/artykuł × szerokości 320, 390 i 1440 px. Bez poziomego przepełnienia, błędów skryptów, błędów zasobów ani połączeń do usług zewnętrznych. Sprawdzono lokalne fonty. Porównanie potwierdziło identyczne hasło, znak, treść i wymiary kart oraz role kolorów między czterema wariantami.

Sprawdzono pełne ramki osłon pól, brak przepełnienia paneli, fokus, wpisywanie i czyszczenie wyszukiwania, przejście e-maila między stanem błędu i poprawnym, natywny select i strzałki podczas edycji. Działają zachowanie wartości i ustawień przy zmianie wariantu, cykl czterech kontrolek, modal opisu, PL/EN, odświeżenie oraz pola promptu i rozmowy. Wersja Blisko bez `controls` zachowuje poprzedni wygląd. Przejrzano zrzuty próbnika i modali na desktopie i telefonie. To kontrola demonstracji, nie pełny audyt dostępności ani test integracji produkcyjnych.
