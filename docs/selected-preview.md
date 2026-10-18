# Jeden spójny podgląd projektu

**Cel:** ocenić ustalony projekt jako całą stronę osobistą, bez próbnika kontrolek, opisów wariantów i dolnego przełącznika. Użytkownik zaakceptował tę rekomendację i zlecił wykonanie. To nadal prototyp wizualny przed wyborem stacku i integracjami.

**Status po pokazaniu całości:** użytkownik przyjął roboczo „Załóżmy że jest ok” i zapytał o następny etap. Można zakończyć poszukiwania wyglądu i planować implementację tego projektu. Nie jest to jeszcze wybór Astro/TanStack ani polecenie wdrożenia pod domenę. Materiały autora i integracje pozostają do przygotowania.

**Wybrane połączenie:** Blisko, Leśna pracownia, Bricolage Grotesque + Hanken Grotesk oraz Spokojny kontur. Zaokrąglone kontrolki mają pojedynczą ramkę, bez cienia. Hasła zachowane: „Ciekawość to dobry początek.” i „Internet jest fajniejszy z ludźmi”. Nie otwieramy kolejnego porównania wizualnych rodzin.

| Widok | PL | EN |
| --- | --- | --- |
| Wizytówka | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/) | [Open](http://vps.tailfb5686.ts.net:4321/en/) |
| Artykuły | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/blog/) | [Open](http://vps.tailfb5686.ts.net:4321/en/blog/) |
| Przykładowy artykuł | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/blog/mniej-ale-lepiej/) | [Open](http://vps.tailfb5686.ts.net:4321/en/blog/less-but-better/) |

## Co domknięto w podglądzie

- Nagłówek i stopka używają jednego znaku: motywu spotkania znanego z Blisko, połączonego z pełnym nazwiskiem i domeną. To konsekwentne użycie obecnego kierunku, nie nowa marka. Na telefonie nawigacja ma własny wiersz i nie wymaga menu ukrytego.
- Menu: O mnie, Artykuły, Kontakt oraz przejście do odpowiadającej wersji językowej. Adresy wybranego projektu są czyste; zachowanie języka i par artykułów nie wymaga parametrów prototypu.
- Wizytówka zachowuje centralną ramę, hasło, bio i trzy karty. Kontakt ma stałe miejsce i prawdziwy link about.me. Pozostałe kanały są oznaczone jako wymagające adresów; kliknięcie wyjaśnia stan zamiast prowadzić do wymyślonego profilu.
- Lista ma dopasowany nagłówek, filtry tematów i trzy przykładowe publikacje. Artykuł zachowuje player, TL;DR, prompt, rozmowę, polubienie, share, komentarze i progres czytania.
- Na telefonie artykuł ma zwijany spis treści. Na końcu jest przejście do następnego tekstu. Pływające akcje są przesunięte do dolnego brzegu po usunięciu przełącznika wariantów.
- Modale używają wybranych pól i przycisków. Kopiowanie promptu i udostępnianie zachowują ręczną możliwość skopiowania tekstu przy HTTP. Język audio domyślnie odpowiada stronie; ręczny wybór jest zachowany niezależnie w pamięci.
- Sugestia języka z ustawień przeglądarki nadal jest dobrowolna. Żadnej geolokacji, wymuszonego przekierowania ani zapisu preferencji do cookies.

## Materiały i funkcje demonstracyjne

Bio i artykuły są przykładowe. Monogram zastępuje zdjęcie; nie generowano portretu ani nie dopisywano faktów o autorze. LinkedIn, WhatsApp, Telegram i Facebook wymagają prawdziwych adresów. Link about.me pochodzi bezpośrednio z briefu.

Nagrania nie zostały dodane; nie pokazujemy zmyślonego czasu lektora. Rozmowa jest lokalną demonstracją formularza, a komentarze zapowiedzią sekcji. Polubienie żyje w pamięci. Wiadomości nie są wysyłane. Brak podłączonych agentów, analityki, systemu komentarzy, offline cache i produkcyjnego SEO. Strona ma `noindex`; nie jest publikacją pod domeną autora. Podgląd jest dostępny w istniejącym serwerze Tailscale.

## Źródło i uruchomienie

Gałąź `codex/prototype-ui`, `prototypes/selected/selected.js` i `selected.css`, wspólny szkielet i ustalone style w `prototypes/`. Uruchomienie: `npm run prototype`. Zwykłe `/pl/`, `/en/` i podstrony pokazują ten projekt; jawny parametr `variant`, `palette`, `shape` lub `controls` otwiera wcześniejsze porównania. Klawisze ← → w czystym podglądzie nie zmieniają projektu. Stan interakcji nie jest utrwalany.

Po ocenie całości kolejnym etapem jest wybór stacku i przepisanie zatwierdzonego projektu do statycznie renderowanej strony, wraz z rzeczywistymi materiałami i integracjami. Ta konsolidacja nie jest migracją prototypu na produkcję.

## Zrzuty do porównania

| Widok | Komputer | Telefon |
| --- | --- | --- |
| Główna | [Podgląd](previews/selected-home-desktop.png) | [Podgląd](previews/selected-home-mobile.png) |
| Artykuły | [Podgląd](previews/selected-articles-desktop.png) | [Podgląd](previews/selected-articles-mobile.png) |
| Artykuł | [Podgląd](previews/selected-article-desktop.png) | [Podgląd](previews/selected-article-mobile.png) |
| Prompt | [Podgląd](previews/selected-prompt-desktop.png) | [Podgląd](previews/selected-prompt-mobile.png) |
| Rozmowa | [Podgląd](previews/selected-chat-desktop.png) | [Podgląd](previews/selected-chat-mobile.png) |

## Weryfikacja podglądu

W Chromium sprawdzono **40 widoków**: PL/EN × główna/lista/trzy artykuły × szerokości 320, 390, 768 i 1440 px. Potwierdzono brak poziomego przepełnienia, próbnika, opisów wariantów i przełącznika. Wewnętrzne linki nie zawierają parametrów eksperymentów. Brak błędów skryptów, brakujących zasobów i żądań do zewnętrznych usług.

Pełna ścieżka objęła wizytówkę, kontakt, listę, filtr tematu, artykuł, TL;DR, prompt, polubienie, udostępnianie, demonstrację rozmowy i komentarze. Sprawdzono parowanie PL/EN, przejście do kontaktu z artykułu, niezależny wybór języka audio, sugestię języka przeglądarki, zwijany spis treści, pasek czytania, powrót do góry, ręczne kopiowanie promptu po HTTP i historię wstecz/dalej. Sprawdzono też zachowanie archiwalnych adresów `variant=A` oraz `controls=calm|pixel|facet|module|frame`; mają własne przełączniki i nie przyjmują stylów czystego podglądu.

Wizualnie przejrzano główną i listę na komputerze, główną PL/EN i artykuł na telefonie oraz mobilne modale promptu i rozmowy. Zapisano dziesięć zrzutów stron i modali. To kontrola spójnego prototypu, nie walidacja przyszłej implementacji statycznej ani integracji produkcyjnych.
