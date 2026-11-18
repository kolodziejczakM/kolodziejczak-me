# Forma — druga runda, cztery nowe prototypy

**Status po ocenie:** Miękki druk i Kontur i kropka wypadły najlepiej, ale żaden projekt nie został zatwierdzony. Zakładka była chaotyczna, a Bilet narzucał obce autorowi skojarzenia. Następny etap: [cztery różne kompozycje](composition-study.md). Poniżej zachowano zapis drugiej rundy form.

**Pytanie:** jak nadać miękkim formom więcej rozpoznawalnego charakteru, zachowując czytelne kontrolki i uporządkowane ozdobniki?

Marcin uznał Miękkie formy za najlepiej dopasowane do charakteru strony, lecz zbyt typowe. Z Papieru i pieczęci podobają mu się główne przyciski. Nacięte narożniki miały najwięcej oryginalności, ale linie na kartach wyglądały przypadkowo. Przerywane ramki pól i pola z samym podkreśleniem są odrzucone.

**Stałe:** Leśna pracownia (`meadow`), Bricolage Grotesque + Hanken Grotesk, treść i układ strony. Eksperyment dotyczy geometrii i detali zgodnie z prośbą użytkownika, bez ponownego wyboru palety i typografii.

| Forma | Co sprawdzamy | Podgląd |
| --- | --- | --- |
| `press` — Miękki druk | Miękkie karty i przyciski z twardym cieniem: połączenie preferencji z pierwszych dwóch wariantów | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=press) |
| `bookmark` — Zakładka | Czy jedna powtarzana, asymetryczna krzywizna może być znakiem rozpoznawczym strony? | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=bookmark) |
| `orbit` — Kontur i kropka | Obłe ramki, etykiety, ikony w kołach i pierścieniowy przełącznik jako spójny motyw | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=orbit) |
| `ticket` — Bilet do rozmowy | Łagodne wcięcia sylwetki przycisku oraz zaproszeniowy charakter kart z wydzieloną stopką | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?shape=ticket) |

## Wspólne zasady

Pola tekstowe, selecty, pole pytania i textarea promptu mają **pełną, ciągłą ramkę od początku**. Fokus dodaje wyraźny zewnętrzny obrys, zachowując wszystkie cztery boki. Nie ma kresek dodanych nad kartami, losowych znaczników ani nakładających się drobnych ozdobników. Ikony są osadzone w nagłówku karty, a separatory w wariantach Zakładka i Bilet oddzielają metadane w stopce. Ilustracje grupują kursor z konkretnym kształtem: drukiem, książką, kołem lub biletem.

Każdy wariant obejmuje stronę główną, listę, artykuł, player, modal TLDR, prompt i demonstrację rozmowy. Próbnik pokazuje przyciski, zakładki, input, select, checkbox, przełącznik i osiem autorskich ikon SVG. Maskę wcięcia biletu ma wyłącznie dekoracyjna warstwa przycisku, dzięki czemu obrys fokusu pozostaje pełny.

Dolny pasek i ← → przechodzą przez **cztery nowe propozycje**. `?` opisuje różnice i umożliwia bezpośredni wybór. Wybór formy jest w URL; zachowuje się w nawigacji, po zmianie PL/EN i po odświeżeniu. Wpisany tekst, zakładka i stan próbek pozostają w pamięci podczas porównania. Strzałki w polach i selectach działają natywnie.

Stare `shape=soft|stamp|cut` pozostają dostępne w osobnym cyklu trzech wariantów. To zapis wcześniejszego porównania, także elementów odrzuconych przez użytkownika. Nowe adresy nie kierują do nich podczas przełączania.

## Stan decyzji

**Wybór pozostaje otwarty.** Miękki kierunek jest preferencją, nie kompletnym zatwierdzonym systemem. Można wybrać konkretne przyciski, karty lub kontrolki z różnych wariantów.

Źródło pierwotne: `codex/prototype-ui`, pliki `prototypes/shapes/refinements.js` i `refinements.css`. Wspólne przełączanie wykorzystuje `shapes.js` oraz dotychczasowe ścieżki. Uruchomienie: `npm run prototype`. Bez nowych zależności. Nadal jest to kod demonstracyjny do przepisania przed produkcją, bez aktywnych integracji.

[Zestawienie czterech wariantów](previews/form-refinements.png).

## Kontrola podglądu

W Chromium sprawdzono **72 kombinacje**: cztery nowe formy × PL/EN × Home/lista/artykuł × szerokości 320, 390 i 1440 px. Nie ma poziomego przepełnienia, błędów skryptów, błędów pobierania zasobów ani żądań do usług zewnętrznych. Fonty są lokalne.

Osobno sprawdzono wszystkie cztery boki ramek w stanie zwykłym, hover i focus, ramki selecta, textarea promptu i pola rozmowy. Przejrzano desktopowe próbniki, cztery mobilne strony główne, modale i artykuł. Sprawdzono cykl czterech wariantów w obu kierunkach, strzałki w polu i selectach, zachowanie stanu próbek, wybór z modala, przejście do artykułu, PL/EN, odświeżenie, TLDR, prompt i demonstrację czatu. Poprzedni cykl trzech form pozostaje oddzielny. To kontrola demonstracji, nie pełny audyt dostępności ani walidacja integracji produkcyjnych.
