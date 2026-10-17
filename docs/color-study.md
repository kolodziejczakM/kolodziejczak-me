# Runda 3 — kolor na bazie Bricolage + Hanken

**Pytanie:** jaka kolorystyka pasuje do wybranej typografii i osobistego, pozytywnego tonu strony? Fonty są już bazą tej rundy: Bricolage Grotesque do nagłówków, Hanken Grotesk do prozy i UI. Wybór koloru pozostaje otwarty.

Użytkownik poprosił o izolowaną eksplorację kolorystyki, dlatego palety mają **ten sam układ i treść**. Hostem jest istniejący wariant C na `/pl/` i `/en/`, z parametrem `palette`. Nie zmieniono archiwalnych A/B/C bez tego parametru. Nie wybrano frameworka ani nie podłączono produkcyjnych usług.

| Parametr | Nazwa | Hipoteza |
| --- | --- | --- |
| `forest` | Leśny spokój | Najbliżej barw polubionego próbnika: zieleń `#162823`, tekst `#e2e8df`, szałwiowe linki `#c8d8ad`. Ciemne karty i spokojna hierarchia. |
| `meadow` | Leśna pracownia | Ciemniejsza zieleń `#0e241d`, miodowy główny przycisk `#f2c76e`, jaśniejsze słomkowe linki `#e6db9f`. Kartki w papierowych odcieniach i jedna ciemna. |
| `clay` | Sosna i glina | Zieleń `#102b28`, koralowy przycisk `#f0b19b`, piaskowe linki `#e7c497`; pastelowe karty ocieplają całość. |
| `tide` | Noc nad wodą | Chłodniejsza zieleń `#0b2022`, mięta `#9bd9c5`, błękitne linki `#b9dcf0`. Dwie ciemne karty i jedna jasna. |

Pełne źródło ról: `prototypes/palettes/data.js`. Migawka do odczytu: `palettes.json`. Przy zmianie źródła należy odświeżyć migawkę i pomiary `contrast.json`.

## Zakres porównania

- Strona główna, lista artykułów i trzy przykładowe artykuły po polsku i angielsku.
- Tło strony, podniesione powierzchnie paneli, karty, główny tekst, kontekst, podpisy, akcent hasła, linki i cytaty.
- Główny przycisk: normalny, hover, naciśnięcie; przycisk z obramowaniem i przycisk wyłączony.
- Aktywne i nieaktywne zakładki, pole tekstowe, placeholder, fokus klawiatury, przełącznik podkreślania linków.
- Etykieta tematu i komunikaty sukcesu, uwagi i błędu. Tekst i symbol określają znaczenie niezależnie od samego koloru.
- Odtwarzacz, filtry, modale TLDR i promptu, przyciski udostępniania i rozmowy. Integracje pozostają opisanymi demonstracjami.

Stan palety jest w adresie, np. `/en/blog/less-but-better/?variant=C&palette=clay`. Zmiana palety nie zmienia tekstu ani strony. Strzałki w polu tekstowym nadal edytują pole. Stan próbek (tekst, aktywna zakładka, podkreślenie linków) pozostaje w pamięci przy przełączaniu palet; odświeżenie go resetuje. Żadne dane próbki nie są wysyłane ani zapisywane w localStorage/cookies.

## Pomiary kolorów

Pomiary oparto na luminancji względnej sRGB i pełnych nieprzezroczystych wartościach tokenów. `contrast.json` zawiera konkretne pary z nazwami ról i wyniki. Wśród sprawdzonych par tekstowych najniższy wynik wynosi odpowiednio **5.44:1**, **4.72:1**, **4.65:1**, **4.82:1**. Obejmują prozę, tekst drugorzędny na tle/panelu/kontrolce, linki, etykietę, napisy na przyciskach w trzech stanach, komunikaty i teksty na każdej karcie.

Sprawdzone zestawienia obramowań i fokusu mają minimum odpowiednio **3.21:1**, **3.10:1**, **3.31:1**, **3.27:1**. Wyłączony przycisk jest celowo spokojniejszy i nie należy do tej grupy aktywnych kontrolek. Nie jest to pełny audyt dostępności całej witryny ani ocena każdego piksela dekoracji, antyaliasingu i tekstury tła.

## Odbiór

Źródła są zachowane na gałęzi `codex/prototype-ui`, obok poprzednich rund. Po wskazaniu palety lub kombinacji elementów należy zapisać wybrane role i przenieść zatwierdzony system kolorów do późniejszej implementacji. Nie promować bezpośrednio tego kodu demonstracyjnego do produkcji.

Kontrola w Chromium: 72 kombinacje czterech palet, PL/EN, strony głównej/listy/artykułu i szerokości 320, 390, 1440 px. Bez poziomego przepełnienia, błędów skryptów, błędów ładowania fontów i żądań do usług zewnętrznych. Sprawdzono osobno: zachowanie palety po zmianie języka i nawigacji, odświeżenie URL, zmianę palety z modala, narzędzia artykułu, edycję pola bez przechwytywania strzałek oraz zachowanie stanu próbek przy przełączeniu palety. Przejrzano podglądy czterech palet, wersji mobilnej i artykułu. Historyczne A/B/C nie uruchamiają trybu palet.

Przegląd: [cztery palety](previews/color-palettes.png). Podgląd Tailscale działa przez istniejącą jednostkę użytkownika `kolodziejczak-prototype.service`.
