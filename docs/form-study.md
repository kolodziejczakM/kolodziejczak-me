# Forma — Leśna pracownia

**Status tej rundy:** miękki kierunek oceniono najlepiej, lecz potrzebuje więcej charakteru. Odrzucono przerywane i wyłącznie dolne ramki pól oraz przypadkowe linie na kartach. Kolejne cztery propozycje: [druga runda form](form-refinements.md). Poniżej zachowano źródło pierwszego porównania.

**Pytanie:** jakie kształty przycisków, obramowań, kontrolek, ikon i ozdobników najlepiej pasują do wybranej Leśnej pracowni?

**Zatwierdzone:** paleta `meadow`, Bricolage Grotesque w nagłówkach, Hanken Grotesk w tekście i UI. W tej rundzie nie zmieniamy tych decyzji. Kompozycja i treść pozostają wspólne, aby ocenić formę.

| Wariant | Główne różnice | Podgląd |
| --- | --- | --- |
| `soft` — Miękkie formy | Kapsułki, duże promienie narożników, delikatny cień, organiczna naklejka, obłe ikony | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=meadow&shape=soft) |
| `stamp` — Papier i pieczęć | Proste narożniki, podwójne i przerywane ramki, twardy cień, małe obroty, rysowane ikony | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=meadow&shape=stamp) |
| `cut` — Nacięte narożniki | Ścięte przyciski, proste linie i ramki, romby, ukośne detale, kanciaste ikony | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=meadow&shape=cut) |

## Jak porównać

Dolny pasek i strzałki ← → zmieniają formę, zachowując widok i język. Strzałki w polach i liście wyboru działają jak zwykle. Wybór jest w URL i przeżywa odświeżenie. `?` otwiera opis, bezpośredni wybór formy oraz bieżący stan.

Na Home „Wypróbuj detale” prowadzi do interaktywnych próbek: przycisków podstawowego, pomocniczego i wyłączonego, zakładek, pola tekstowego, przełącznika, checkboxa i selecta. Wpisany tekst oraz ustawienia pozostają w pamięci podczas zmiany formy. Checkbox ukrywa ilustrację i dodatkowe ozdobniki bez przestawiania układu. Select zmienia temat etykiety w sąsiedniej próbce. Poniżej jest osiem porównywalnych ikon: dalej, artykuł, lektor, kopiuj, rozmowa, gotowe, polubienie, ozdobnik. To autorskie SVG, bez zewnętrznych paczek.

Zmiany obejmują też logo typograficzne, ilustrację kursora, karty artykułów, filtry listy, player, przyciski TLDR i promptu, modale i widget rozmowy. Interakcje pozostają demonstracjami; nie uruchamiają integracji z usługami.

Przyciski mają stany hover, active i focus-visible. Ścięcia realizują dekoracyjne warstwy przycisków, by nie obcinać obrysu fokusu właściwego elementu. Kontrolki checkbox i select korzystają z natywnych elementów HTML. Ograniczenie ruchu respektuje `prefers-reduced-motion`.

## Wynik

**Wybór form pozostaje otwarty.** Można wybrać cały kierunek lub konkretne elementy kilku wariantów. Źródło pierwotne: gałąź `codex/prototype-ui`, katalog `prototypes/shapes/`. Uruchomienie: `npm run prototype`. To prototyp do przepisania po decyzji, nie gotowy system komponentów produkcyjnych.

## Sprawdzenie podglądu

W Chromium sprawdzono 54 kombinacje: trzy formy × PL/EN × Home/lista/artykuł × szerokości 320, 390 i 1440 px. Bez poziomego przepełnienia, błędów skryptów, brakujących fontów ani żądań do usług zewnętrznych. Przejrzano zrzuty trzech kierunków, próbek kontrolek, telefonu, artykułu i modala.

Osobno sprawdzono przełączanie paskiem i klawiaturą, działanie strzałek we wpisywanym tekście i selectach, zachowanie stanu próbek między formami, ukrywanie ozdobników, wybór tematu i zakładek, bezpośredni wybór formy z modala, nawigację i parowanie PL/EN oraz odświeżenie. Działają demonstracje TLDR, promptu, zmiany lektora, kopiowania adresu z ręcznym polem zastępczym przez HTTP i czatu. Historyczne adresy bez `shape` nadal otwierają poprzednie rundy. To kontrola prototypu, nie pełny audyt dostępności ani test integracji produkcyjnych.

[Zestawienie trzech form](previews/form-variants.png). Podgląd jest dostępny przez istniejącą jednostkę użytkownika `kolodziejczak-prototype.service` w Tailscale.
