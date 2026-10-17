# Eksploracja UI — decyzja otwarta

**Pytanie:** jaki kierunek wizualny najlepiej oddaje osobistą stronę Marcina, z wygodnym blogiem po polsku i angielsku?

**Źródło pierwotne:** prototypy na gałęzi `codex/prototype-ui`, katalog `prototypes/`. Trzy projekty na tych samych ścieżkach, sterowane `?variant=A|B|C`. Uruchomienie: `npm run prototype`.

| Wariant | Co sprawdzamy |
| --- | --- |
| A — Margines | Czy ciepła redakcyjność, szkic i duża szeryfowa typografia pasują do strony osobistej? |
| B — Sygnał | Czy profil obok dziennika i cyfrowe, pikselowe akcenty lepiej pokazują techniczny charakter? |
| C — Po godzinach | Czy ilustracyjny humor, wyraziste liternictwo i pastelowe kartki pasują do autorskiego charakteru? |

**Werdykt:** czeka na obejrzenie przez Marcina. Żaden kierunek nie jest zatwierdzony. Można wybrać całość lub połączyć konkretne elementy.

Przy decyzji zapisać: wybrany kierunek, elementy zapożyczone z pozostałych, argumenty i rzeczy do zmiany. Potem przepisać zwycięski projekt do kodu produkcyjnego, zachowując te prototypy na gałęzi źródłowej. Nie przenosić przełącznika ani symulacji usług do produkcji.

Nie utworzono issue wdrożeniowego; ten dokument jest lokalnym odnośnikiem do prototypów. Po utworzeniu issue należy wkleić do niego ten odnośnik i werdykt.

## Sprawdzenie prototypów

W Chromium sprawdzono 72 kombinacje: trzy kierunki × PL/EN × wizytówka/lista/artykuł × szerokości 320, 390, 768 i 1440 px. Bez poziomego przepełnienia, błędów skryptów ani żądań do usług zewnętrznych. Przejrzano zrzuty na komputerze i telefonie.

Dodatkowo sprawdzono: bezpośrednie adresy wszystkich artykułów, zachowanie wariantu po odświeżeniu, parowanie językowych adresów artykułu, sugestię języka dla przeglądarki angielskiej, filtr notatek, TLDR w pięciu zdaniach, kopiowanie promptu, klawiaturowe przełączanie wariantów bez przechwytywania strzałek w polu tekstowym, demonstrację czatu oraz powrót na początek tekstu. To kontrola podglądu, nie walidacja integracji produkcyjnych ani pełny audyt dostępności.

Porównanie: [trzy kierunki](previews/directions.png). Kod kontroli przeglądarkowej i zależności do podglądów nie należą do projektu.
