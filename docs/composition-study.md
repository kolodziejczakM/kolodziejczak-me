# Kompozycja i tożsamość — cztery nowe prototypy

**Korekta po ocenie:** użytkownik oczekiwał dalszej eksploracji kontrolek, a nie redesignów. Ta runda była nietrafionym rozszerzeniem zakresu. Blisko podoba się najbardziej, Sygnatura najgorzej. Fonty i kolory są dobre; wracamy wyłącznie do dopracowania inputów i pozostałych kontrolek. [Aktualna runda](control-study.md). Poniższy opis zachowuje historyczną hipotezę i porównanie.

**Pytanie:** czy wyraźniejsza kompozycja i osobisty znak dadzą stronie charakter, którego zabrakło w dotychczasowych wariantach kontrolek?

Miękki druk i Kontur i kropka są najmocniejszymi punktami odniesienia. Zakładka była oryginalna, lecz chaotyczna, a Bilet narzucał skojarzenia niepasujące do zainteresowań autora. Nadal nie ma zatwierdzonej całości. Poszerzenie eksploracji o układ jest hipotezą projektową, nie nowym wymaganiem użytkownika.

## Cztery propozycje

| Wariant | Co się zmienia | Podgląd |
| --- | --- | --- |
| `gesture` — Duży gest | Duża, dwupoziomowa typografia; jeden abstrakcyjny znak; wyróżniony artykuł obok dwóch mniejszych | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=gesture) |
| `rhythm` — Własny rytm | Hasło i osobny panel autora; artykuły jako ciągła lista numerowanych wierszy | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=rhythm) |
| `close` — Blisko | Centralne hasło i bio we wspólnej ramie, abstrakcyjny znak spotkania, trzy spokojne karty | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=close) |
| `signature` — Sygnatura | Autorski SVG monogramu mk.; hasło obok znaku i bio; dwa jasne artykuły nad szerokim ciemnym | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=signature) |

Zatwierdzone kolory **Leśnej pracowni** i fonty **Bricolage Grotesque + Hanken Grotesk** pozostają wspólne. Zachowano oba lubiane hasła, miękkie, uporządkowane formy, pełne obramowania pól i native checkbox/select. Przedmiotem porównania są teraz także proporcje, rozmieszczenie treści i hierarchia. Nie ma metafory biletu ani motywu zakładki. Monogram i abstrakcyjne znaki to propozycje do oceny, nie zatwierdzone logo.

Główna różnica kompozycyjna dotyczy wizytówki i jej prezentacji artykułów. Lista oraz pojedynczy artykuł zachowują czytelny wspólny szkielet; dziedziczą obramowania, przyciski, ikony, player i modale wybranego wariantu. Ikony rozwijają dwa najlepiej ocenione style poprzedniej rundy, zamiast dodawać cztery kolejne biblioteki.

## Porównanie

Dolny pasek i ← → obejmują tylko te cztery propozycje. Wybór jest w URL i zachowuje się po zmianie strony, języka oraz odświeżeniu. „Wypróbuj detale” prowadzi do pól, przycisków, przełączników i ikon. `?` opisuje koncepcję i pokazuje stan. Stan próbki pozostaje w pamięci podczas zmiany wariantu. Poprzednie adresy i ich oddzielne cykle są zachowane.

Źródło pierwotne: gałąź `codex/prototype-ui`, pliki `prototypes/shapes/compositions.js` i `compositions.css`. Uruchomienie: `npm run prototype`. To nadal kod do wyrzucenia po decyzji i przepisania przed produkcją. Framework, integracje i prawdziwe treści pozostają poza tą rundą.

**Werdykt: otwarty.** Nie utożsamiamy mocniejszych punktów odniesienia z zachwytem ani końcowym wyborem.

[Porównanie czterech kompozycji](previews/compositions.png).

## Kontrola podglądu

W Chromium sprawdzono **96 kombinacji**: cztery kompozycje × PL/EN × Home/lista/artykuł × szerokości 320, 390, 768 i 1440 px. Bez poziomego przepełnienia, błędów skryptów, błędów ładowania zasobów ani żądań do usług zewnętrznych. Sprawdzono ładowanie obu fontów i obecność linku do próbnika w każdej kompozycji.

Osobno sprawdzono pełne ramki pól w stanach idle, hover i focus, selecty, pole promptu i rozmowy we wszystkich czterech wariantach. Przejrzano zrzuty desktopowych kompozycji i próbek, czterech mobilnych wizytówek, modali i artykułu. Działają cykl czterech projektów w obu kierunkach, natywne strzałki w polach, zachowanie tekstu i ustawień próbek, ukrywanie znaku, wybór wariantu z modala, nawigacja, parowanie PL/EN, odświeżenie, TLDR, prompt i demonstracja czatu. Starsze warianty zachowują oddzielne cykle. To kontrola prototypów, nie pełny audyt dostępności ani walidacja integracji produkcyjnych.
