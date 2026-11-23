> Archiwum eksploracji UI. Bieżąca implementacja Astro: [README](../README.md). Historyczne statusy i demonstracje poniżej nie opisują gotowości aktualnej strony.

# kolodziejczak.me

Pierwszy etap: **prototypy wizualne do porównania**, przed wyborem stacku i implementacją strony.

**Jeden spójny podgląd wybranego projektu:** [PL](http://localhost:4321/pl/) · [EN](http://localhost:4321/en/) · [Artykuły](http://localhost:4321/pl/blog/) · [Artykuł](http://localhost:4321/pl/blog/mniej-ale-lepiej/).

Zwykłe adresy pokazują Blisko + Leśną pracownię + Bricolage/Hanken + Spokojny kontur. Bez próbnika, przełącznika i opisów wariantów. Nagłówek, stopka i kontakt tworzą jedną całość; motyw spotkania jest użyty jako wspólny znak. PL/EN zachowuje parę artykułu. [Zakres i podglądy](selected-preview.md). Zdjęcie, bio, adresy kontaktowe i autorskie publikacje pozostają do dostarczenia. Audio, rozmowa i komentarze są oznaczonymi demonstracjami.

Wcześniejsze eksperymenty zachowują jawne parametry, np. `?controls=calm` albo `?variant=A`; są archiwum. Dalsze tabele opisują przebieg wyboru. Uruchomienie całości nadal jednym poleceniem: `npm run prototype`.

**Aktualny kierunek: dopasowanie do strony, fontów i modern retro.** Użytkownik doprecyzował, że oryginalność nie jest celem samym w sobie. Z poprzedniej rundy najbliższa była Faseta, lecz wycięcie zaburzało rytm. Nowe kontrolki są zaokrąglone i mają pełne powierzchnie. Bazą pozostają **Blisko**, **Bricolage + Hanken** i **Leśna pracownia**.

**Kontrolki zaakceptowane:** po poprawce podwójnych ramek użytkownik potwierdził „Jest ok”. Wybrany zestaw to **Spokojny kontur** (`controls=calm`): zaokrąglone powierzchnie, pojedynczy obrys i brak cienia. Nie potrzeba kolejnej rundy wyboru kontrolek. [Artykuł](http://localhost:4321/pl/blog/mniej-ale-lepiej/?controls=calm) · [akcje](previews/calm-article-actions.png) · [stopka artykułu](previews/calm-article-footer.png). Pozostaje domknięcie całości na prawdziwych treściach i przegląd stron; logo/znak i materiały autora nie były osobno zatwierdzone. Integracje i implementacja produkcyjna są kolejnym etapem.

| Wykończenie | Co porównujemy | Podgląd w Tailscale |
| --- | --- | --- |
| Zaokrąglony piksel | Miękka powierzchnia i schodkowy cień pod akcjami | [Otwórz](http://localhost:4321/pl/?controls=pixel#palette-lab) |
| Ciepły druk | Te same kształty z niskim, twardym cieniem | [Otwórz](http://localhost:4321/pl/?controls=print#palette-lab) |
| Spokojny kontur | Ta sama rodzina bez cienia, jako punkt odniesienia | [Otwórz](http://localhost:4321/pl/?controls=calm#palette-lab) |

Dolne strzałki i ← → zachowują porównanie trzech wykończeń. Wybrano Spokojny kontur; pozostałe są archiwalnymi alternatywami. [Opis](controls-retro.md) · [porównanie](previews/controls-retro.png).

**Archiwum poprzedniej rundy:** cztery propozycje początkowo odrzucone. W późniejszym doprecyzowaniu użytkownik wskazał Fasetę jako najbliższą; nie zaakceptował wycięcia. Poniżej wcześniejsze warianty.

| Nowe kontrolki | Zasada zestawu | Próbnik w Tailscale |
| --- | --- | --- |
| Faseta | Ścięty narożnik w polach, przyciskach i małych akcjach | [Otwórz](http://localhost:4321/pl/?controls=facet#palette-lab) |
| Jasny środek | Kremowe pola i miękka geometria, szałwiowe akcje pomocnicze | [Otwórz](http://localhost:4321/pl/?controls=paper#palette-lab) |
| Pionowy brzeg | Mocniejsza lewa krawędź i oszczędne, kanciaste ikony | [Otwórz](http://localhost:4321/pl/?controls=spine#palette-lab) |
| Osobna akcja | Czyszczenie obok pola, niezależne opcje i otwarty tor switcha | [Otwórz](http://localhost:4321/pl/?controls=pair#palette-lab) |

Dolny pasek i ← → przechodzą przez cztery propozycje. Przyciski są pokazane na początku prawego panelu, obok pól. Próbnik zawiera też radio, suwak i przyciski ikonowe. Wartości zostają w pamięci podczas porównywania. [Opis rundy](controls-fresh.md) · [zestawienie](previews/controls-fresh.png). Wszystkie propozycje tej rundy zostały odrzucone.

**Archiwum — Boczny moduł:** pola wcześniej oceniono najlepiej, ale punktowa poprawka przycisków pogorszyła odbiór. Nie traktować jej jako zatwierdzonego kierunku. [Poprzednie przyciski](http://localhost:4321/pl/?controls=module#ctrl-actions) · [podgląd](previews/module-buttons.png).

**Poprzednie porównanie: trzy spokojniejsze konstrukcje.** Pojedyncza ramka w spoczynku, dodatkowy obrys wyłącznie przy fokusie. Wyszukiwanie nie zajmuje osobnego wiersza etykietą; ikony pomocnicze można opcjonalnie włączyć.

| Kontrolki | Detal | Próbnik w Tailscale |
| --- | --- | --- |
| Niski rant | Jeden obrys i niski dolny rant | [Otwórz](http://localhost:4321/pl/?controls=rim#palette-lab) |
| Łuk i kant | Symetrycznie zaokrąglona góra i niemal prosta podstawa | [Otwórz](http://localhost:4321/pl/?controls=arch#palette-lab) |
| Boczny moduł | Akcja lub status w prawym brzegu pola | [Otwórz](http://localhost:4321/pl/?controls=module#palette-lab) |

Dolny pasek i ← → przechodzą przez te trzy propozycje. Wpisane wartości pozostają podczas porównania. [Opis i feedback](control-refinements.md) · [spoczynek i fokus](previews/control-refinements.png).

**Poprzednia runda:** żaden z poniższych wariantów nie został wybrany. Podwójna oprawa myli się z fokusem, wgłębienie jest za mało oryginalne, wewnętrzna etykieta nie zawsze potrzebnie zabiera miejsce, a kapsuła wygląda generycznie. Adresy pozostają osobnym archiwalnym cyklem.

| Kontrolki | Konstrukcja pola | Próbnik w Tailscale |
| --- | --- | --- |
| Podwójna oprawa | Dwa ciągłe obrysy z odstępem pomiędzy | [Otwórz inputy](http://localhost:4321/pl/?controls=frame#palette-lab) |
| Miękkie wgłębienie | Wewnętrzny cień i osobne miejsce na ikonę | [Otwórz inputy](http://localhost:4321/pl/?controls=inset#palette-lab) |
| Etykieta w ramce | Stała etykieta wewnątrz pełnej ramki | [Otwórz inputy](http://localhost:4321/pl/?controls=label#palette-lab) |
| Kapsuła z akcją | Obły obrys, ikona i okrągły przycisk czyszczenia | [Otwórz inputy](http://localhost:4321/pl/?controls=capsule#palette-lab) |

Te same próbki w każdym wariancie: input pusty, e-mail z błędem i stanem poprawnym, textarea, pole wyłączone, select, checkbox, switch, segmenty i przyciski. Wpisz adres i kliknij „Sprawdź adres”; nic nie jest wysyłane. ← → zmieniają wyłącznie kontrolki. Wartości próbek pozostają w pamięci. Styl działa też w modalach artykułu. [Opis rundy](control-study.md) · [zestawienie inputów](previews/controls.png).

**Poprzednia runda: kompozycje.** Blisko podoba się najbardziej, Sygnatura wypada najgorzej. Użytkownik wskazał, że ta eksploracja wyszła poza właściwy temat: dopracowanie kontrolek. Poniżej zachowano historyczne porównanie.

| Wariant | Kierunek | Tailscale |
| --- | --- | --- |
| Duży gest | Duże hasło, abstrakcyjny znak, pierwszy artykuł na pierwszym planie | [Otwórz](http://localhost:4321/pl/?shape=gesture) |
| Własny rytm | Osobny panel autora i szerokie, numerowane wiersze artykułów | [Otwórz](http://localhost:4321/pl/?shape=rhythm) |
| Blisko | Centralna wizytówka w jednej ramie i miękkie karty | [Otwórz](http://localhost:4321/pl/?shape=close) |
| Sygnatura | Autorski monogram, spokojna kompozycja i dwa jasne artykuły nad szerokim ciemnym | [Otwórz](http://localhost:4321/pl/?shape=signature) |

Dolny pasek i ← → przechodzą przez cztery nowe propozycje. „Wypróbuj detale” prowadzi do próbnika kontrolek. Wybór pozostaje w adresach Home/listy/artykułu i PL/EN. [Opis rundy](composition-study.md) · [zestawienie](previews/compositions.png).

**Poprzednia runda: cztery propozycje miękkich form z charakterem.** Zakładka została oceniona jako oryginalna, ale chaotyczna; Bilet do rozmowy ma zbyt silne, niepasujące do autora skojarzenie tematyczne. Poniższe adresy zachowują wcześniejsze porównanie.

| Forma | Kierunek | Podgląd w Tailscale |
| --- | --- | --- |
| Miękki druk | Zaokrąglone karty, wyraziste przyciski i twardy cień | [Otwórz](http://localhost:4321/pl/?shape=press) |
| Zakładka | Asymetryczne zaokrąglenia powtarzane na przyciskach, kartach i kontrolkach | [Otwórz](http://localhost:4321/pl/?shape=bookmark) |
| Kontur i kropka | Obłe ramki, etykiety i kontrastowe kółka z ikoną | [Otwórz](http://localhost:4321/pl/?shape=orbit) |
| Bilet do rozmowy | Łagodne wcięcia przycisków i karty z osobną stopką | [Otwórz](http://localhost:4321/pl/?shape=ticket) |

Przełączaj dolnym paskiem lub klawiszami ← →. „Wypróbuj detale” prowadzi do interaktywnych kontrolek i ośmiu ikon. Sprawdź też player i modale w artykule. `?` pokazuje opis i wybór czterech nowych form. [Opis rundy i feedback](form-refinements.md) · [zestawienie](previews/form-refinements.png).

**Poprzednia runda form:** Miękkie formy pasują najlepiej do charakteru strony, lecz są zbyt typowe. Podobają się główne przyciski wariantu Papier i pieczęć. Przerywane ramki pól, pola z samym podkreśleniem i przypadkowe linie na kartach są odrzucone. Poniższe trzy adresy pozostają osobną grupą porównawczą.

| Forma | Kierunek | Podgląd w Tailscale |
| --- | --- | --- |
| Miękkie formy | Kapsułki, zaokrąglone karty, obłe ikony i organiczne ozdobniki | [Otwórz](http://localhost:4321/pl/?variant=C&palette=meadow&shape=soft) |
| Papier i pieczęć | Proste narożniki, podwójne ramki, twardy cień i rysowane ikony | [Otwórz](http://localhost:4321/pl/?variant=C&palette=meadow&shape=stamp) |
| Nacięte narożniki | Ścięte przyciski, cienkie linie, ukośne detale i geometryczne ikony | [Otwórz](http://localhost:4321/pl/?variant=C&palette=meadow&shape=cut) |

Przełączaj dolnym paskiem lub klawiszami ← →. „Wypróbuj detale” przewija do próbki przycisków, zakładek, pola, przełącznika, checkboxa, selecta i ośmiu ikon. Przejdź też do artykułu, playera i okien TLDR / promptu. `?` pozwala wybrać formę i pokazuje stan. Wybrana forma pozostaje w adresach PL/EN; stan próbek jest tylko w pamięci. [Opis rundy](form-study.md) · [porównanie detali](previews/form-variants.png).

**Poprzednia runda: kolorystyka. Zwyciężyła Leśna pracownia.** Poniższe adresy zachowują wcześniejsze porównanie kolorów bez nowych form.

| Paleta | Kierunek | Podgląd w Tailscale |
| --- | --- | --- |
| Leśny spokój | Referencyjna zieleń, szałwiowe akcenty, ciemne karty | [Otwórz](http://localhost:4321/pl/?variant=C&palette=forest) |
| Leśna pracownia | Głęboka zieleń, miód, mieszanka jasnych i ciemnych kart | [Otwórz](http://localhost:4321/pl/?variant=C&palette=meadow) |
| Sosna i glina | Zieleń, ciepły koral, piaskowe linki i pastelowe karty | [Otwórz](http://localhost:4321/pl/?variant=C&palette=clay) |
| Noc nad wodą | Chłodna zieleń, mięta i jasne błękitne linki | [Otwórz](http://localhost:4321/pl/?variant=C&palette=tide) |

Palety przełącza dolny pasek i klawisze ← →. Wybór zachowuje się w linkach do listy, artykułu i odpowiedniej wersji językowej. Na stronie głównej link „Wypróbuj kontrolki” prowadzi do próbek przycisków, pola, przełącznika, zakładek, tekstów i komunikatów. `?` pokazuje role kolorów i pozwala wybrać dowolną paletę. Dane i stan próbki kontrolek pozostają wyłącznie w pamięci podglądu. [Opis rundy i pomiary](color-study.md).

Poprzedni etap: **research i próbnik typografii**, przed kolejnymi układami. [Otwórz próbnik przez Tailscale](http://localhost:4321/typography/) lub [lokalnie](http://localhost:4321/typography/). [Pełny raport w przeglądarce](http://localhost:4321/typography/research.html) jest kopią [źródła researchu](font-research.md).

Próbnik porównuje sześć zestawów na tym samym tekście i zieleni `#162823` z referencji. Można zmienić zestaw, PL/EN, rozmiar tekstu, interlinię, szerokość kolumny i odcień tła; ustawienia są w URL. Przykład: `/typography/?pair=3&view=sample&lang=pl&size=20&leading=1.75&measure=64&bg=reference`. Są też widoki `compare` i `glyphs`. Kopiowanie adresu przez HTTP ma ręczne pole zastępcze. Stan nie trafia do localStorage ani cookies. Raport opisuje również ograniczony wskaźnik popularności z oficjalnych danych Google Fonts.

Historyczna shortlista badania obejmowała Commissioner, Gabarito + Literata, Ysabeau, Bricolage + Hanken, Schibsted + Newsreader i Alegreya + Hanken. Po obejrzeniu Marcin wybrał **Bricolage + Hanken**, użyte we wszystkich nowych paletach. Oryginalne A/B/C poniżej zachowują pierwszą rundę, a ich treść i kolory nie reprezentują aktualnego briefu.

## Uruchomienie

```sh
npm run prototype
```

Wymagane jedynie Node/npm (do skrótu) i Python 3. Bez instalowania paczek. Alternatywnie: `python3 prototypes/serve.py`.

Podgląd: [localhost:4321/pl/?variant=A](http://localhost:4321/pl/?variant=A).

Podgląd na serwerze w sieci Tailscale: [localhost:4321](http://localhost:4321/pl/?variant=A). Wymaga połączenia urządzenia z tą samą siecią Tailscale. Serwer nasłuchuje na prywatnym adresie Tailscale, bez wiązania do wszystkich interfejsów. Ponowne uruchomienie na tym serwerze:

```sh
npm run prototype -- --host 100.x.y.z --port 4321
```

Na obecnym serwerze podgląd uruchomiono jako jednostkę użytkownika `kolodziejczak-prototype.service` przez `systemd-run --user`; jest niezależny od sesji czatu. Status: `systemctl --user status kolodziejczak-prototype`. Jednostka jest tymczasowa do restartu systemu; po restarcie można ponownie uruchomić powyższe polecenie lub utworzyć tę jednostkę ponownie.

| Wariant | Kierunek | Podgląd |
| --- | --- | --- |
| A — Margines | Ciepła, ciemna publikacja; szeryfowe nagłówki, szkic, redakcyjne wiersze | [Otwórz A](http://localhost:4321/pl/?variant=A) |
| B — Sygnał | Cyfrowy warsztat; profil z boku, pikselowy akcent, dziennik wpisów | [Otwórz B](http://localhost:4321/pl/?variant=B) |
| C — Po godzinach | Ilustracyjny modern retro; kursor z charakterem, pastelowe kartki | [Otwórz C](http://localhost:4321/pl/?variant=C) |

Przełączaj projekty dolnym paskiem lub klawiszami ← →. W każdym są: wizytówka, lista notatek, trzy przykładowe artykuły, PL/EN. Stan jest zapisany w URL, np. `/en/blog/less-but-better/?variant=B`. Przycisk `?` opisuje ograniczenia i pokazuje aktualny stan prototypu.

To **kod do wyrzucenia po decyzji**. Podgląd renderuje treść w przeglądarce dla szybkości iteracji; docelowa strona ma dostarczać pełny HTML także bez JavaScript. Nie wybrano frameworka. Prototyp jest oznaczony `noindex` i służy wyłącznie do lokalnego porównania.

Zdjęcie, bio, artykuły i daty są przykładowe. Kontakty nie prowadzą do wymyślonych profili. Player, agent i komentarze są oznaczonymi demonstracjami, bez podłączenia usług. Polubienie jest lokalne dla podglądu. Nie ma cookies, analityki, geolokacji ani zewnętrznych requestów; fonty i ich licencje są w repo. Po wczytaniu podgląd nie potrzebuje sieci do interakcji, lecz **nie jest jeszcze PWA** i nie działa po zamknięciu lokalnego serwera.

- [Brief i granice etapu](brief.md)
- [Research: stack, języki, SEO, prywatność, Umami i integracje](research.md)
- [Decyzja projektowa — do uzupełnienia po obejrzeniu](prototype-decision.md)
