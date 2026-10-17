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

Przy decyzji zapisać: wybrany kierunek, elementy zapożyczone z pozostałych, argumenty i rzeczy do zmiany. Potem przepisać zwycięski projekt do kodu produkcyjnego, zachowując te prototypy na gałęzi źródłowej. Nie przenosić przełącznika ani symulacji usług do produkcji.

Nie utworzono issue wdrożeniowego; ten dokument jest lokalnym odnośnikiem do prototypów. Po utworzeniu issue należy wkleić do niego ten odnośnik i werdykt.

## Sprawdzenie prototypów

W Chromium sprawdzono 72 kombinacje: trzy kierunki × PL/EN × wizytówka/lista/artykuł × szerokości 320, 390, 768 i 1440 px. Bez poziomego przepełnienia, błędów skryptów ani żądań do usług zewnętrznych. Przejrzano zrzuty na komputerze i telefonie.

Dodatkowo sprawdzono: bezpośrednie adresy wszystkich artykułów, zachowanie wariantu po odświeżeniu, parowanie językowych adresów artykułu, sugestię języka dla przeglądarki angielskiej, filtr notatek, TLDR w pięciu zdaniach, kopiowanie promptu, klawiaturowe przełączanie wariantów bez przechwytywania strzałek w polu tekstowym, demonstrację czatu oraz powrót na początek tekstu. To kontrola podglądu, nie walidacja integracji produkcyjnych ani pełny audyt dostępności.

Porównanie: [trzy kierunki](previews/directions.png). Kod kontroli przeglądarkowej i zależności do podglądów nie należą do projektu.
