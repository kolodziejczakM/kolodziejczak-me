# Kontrolki — umiarkowana oryginalność

**Runda archiwalna:** użytkownik ocenił poprawkę przycisków Bocznego modułu jako gorszą i poprosił o zupełnie nowe prototypy wszystkich kontrolek. Dalszy kierunek: [cztery kompletne zestawy](controls-fresh.md). Poniżej zachowano przebieg poprzedniego porównania.

**Aktualny feedback:** Boczny moduł wypada najlepiej, ale jego przyciski wymagają dopracowania. Główny wyglądał na urwany, pomocniczy był zbyt pospolity. Punktowa poprawka pod tym samym adresem zachowuje pola: miodowe tło głównego przycisku jest ciągłe, mała ikona ma odstęp od brzegu, a pomocniczy otrzymał delikatne wypełnienie i własne pole ikony. [Otwórz przyciski](http://vps.tailfb5686.ts.net:4321/pl/?controls=module#ctrl-actions) · [podgląd](previews/module-buttons.png). Przyciski czekają na ocenę; najmocniejszy kierunek pól nie oznacza zatwierdzenia całego systemu.

**Pytanie:** który pojedynczy, powtarzalny detal nada polom charakter bez sugerowania fokusu ani dodawania zbędnej etykiety?

W poprzedniej rundzie nie wybrano żadnego wariantu. Podwójna oprawa była myląca, wgłębienie za mało oryginalne, etykieta wewnętrzna nie zawsze potrzebna, a kapsuła zbyt generyczna. Użytkownik chce oryginalności bez przesady. Zakres pozostaje ograniczony do kontrolek.

**Stałe:** Blisko, jego kompozycja, treści i karty, Bricolage + Hanken i Leśna pracownia. Brak redesignu strony.

| Wariant | Jeden główny detal | Próbnik |
| --- | --- | --- |
| `rim` — Niski rant | Pojedynczy pełny obrys z niskim dolnym rantem | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?controls=rim#palette-lab) |
| `arch` — Łuk i kant | Symetryczna, zaokrąglona góra i niemal prosta podstawa | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?controls=arch#palette-lab) |
| `module` — Boczny moduł | Akcja lub status w wydzielonym prawym brzegu pola | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?controls=module#palette-lab) |

## Warunki porównania

Pola zaczynają **bez fokusu**. Każde ma jeden pełny obrys; zewnętrzny jasny obrys pojawia się dopiero po kliknięciu lub wejściu klawiszem Tab. Dolny rant jest powierzchnią wyłącznie pod polem, nie obwódką wokół niego. Boczny separator zajmuje miejsce faktycznej akcji lub statusu.

Wyszukiwanie ma etykietę dostępną dla czytnika ekranu, bez widocznego dodatkowego wiersza. E-mail i pytanie zachowują etykiety tam, gdzie dopowiadają kontekst. Żaden wariant nie wymusza etykiety wewnątrz pola. Pola jednowierszowe mają 48 px wysokości. Pomocnicze ikony są początkowo ukryte; checkbox pozwala ocenić każdy wariant także z ikonami. Czyszczenie, strzałka selecta i stan walidacji pozostają widoczne jako funkcje.

Te same próbki: wyszukiwanie, e-mail z błędem/poprawny, textarea, pole wyłączone, select, segmenty, checkbox, switch i przyciski. Wartości i ustawienie ikon pozostają w pamięci podczas zmiany wariantu. Kontrolki działają też w modalach artykułu. Nie ma wysyłania ani przechowywania danych.

Dolny pasek i ← → obejmują trzy nowe propozycje. `?` opisuje bieżącą konstrukcję i pokazuje stan. Stare `frame|inset|label|capsule` mają osobny cykl czterech wariantów i zachowują poprzedni wygląd. Linki PL/EN oraz nawigacja zachowują parametr `controls`.

**Decyzja pozostaje otwarta.** Źródło pierwotne: gałąź `codex/prototype-ui`, `prototypes/controls/refinements.js` i `refinements.css`. Uruchomienie: `npm run prototype`. To kod demonstracyjny do przepisania po decyzji.

[Porównanie: spoczynek i rzeczywisty fokus](previews/control-refinements.png).

## Kontrola podglądu

W Chromium sprawdzono **54 widoki**: trzy nowe warianty × PL/EN × Home/lista/artykuł × szerokości 320, 390 i 1440 px. Bez poziomego przepełnienia, błędów skryptów, błędów zasobów i połączeń do usług zewnętrznych. Porównanie potwierdziło niezmienione hasło, znak, karty i role kolorów.

Sprawdzono wysokość pól 48 px, kompletność pojedynczej ramki, brak zewnętrznego obrysu w spoczynku i po najechaniu oraz jego obecność po faktycznym fokusie. Sprawdzono dostępną nazwę wyszukiwarki z wizualnie ukrytą etykietą, opcjonalne ikony i zachowanie ustawienia między wariantami, wpisywanie i czyszczenie, walidację e-maila, select i klawiaturę. Działają cykl trzech propozycji, stan próbek, wybór z modala, PL/EN, odświeżenie, pola promptu i demonstracja rozmowy. Archiwalne kontrolki zachowują oddzielny cykl czterech wariantów. Przejrzano podglądy desktopowe i mobilne oraz porównanie spoczynku z rzeczywistym fokusem. To kontrola prototypów, nie pełny audyt dostępności ani integracji produkcyjnych.

Po poprawce przycisków Bocznego modułu sprawdzono 12 widoków: PL/EN × Home/artykuł × 320/390/1440 px. Potwierdzono odstęp ikony od krawędzi głównego przycisku, pojedynczą ikonę pomocniczego, fokus, udostępnianie i przycisk kopiowania promptu. Bez błędów skryptów i poziomego przepełnienia. Bezpośredni link `#ctrl-actions` prowadzi do próbnika przycisków; podglądy zostały odświeżone.
