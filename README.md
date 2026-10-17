# kolodziejczak.me

Pierwszy etap: **prototypy wizualne do porównania**, przed wyborem stacku i implementacją strony.

**Aktualna runda: kształty, obramowania, kontrolki i ikony.** Marcin wybrał paletę **Leśna pracownia** oraz fonty **Bricolage Grotesque + Hanken Grotesk**. Pozostają wspólne we wszystkich trzech propozycjach.

| Forma | Kierunek | Podgląd w Tailscale |
| --- | --- | --- |
| Miękkie formy | Kapsułki, zaokrąglone karty, obłe ikony i organiczne ozdobniki | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=meadow&shape=soft) |
| Papier i pieczęć | Proste narożniki, podwójne ramki, twardy cień i rysowane ikony | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=meadow&shape=stamp) |
| Nacięte narożniki | Ścięte przyciski, cienkie linie, ukośne detale i geometryczne ikony | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=meadow&shape=cut) |

Przełączaj dolnym paskiem lub klawiszami ← →. „Wypróbuj detale” przewija do próbki przycisków, zakładek, pola, przełącznika, checkboxa, selecta i ośmiu ikon. Przejdź też do artykułu, playera i okien TLDR / promptu. `?` pozwala wybrać formę i pokazuje stan. Wybrana forma pozostaje w adresach PL/EN; stan próbek jest tylko w pamięci. [Opis rundy](docs/form-study.md) · [porównanie detali](docs/previews/form-variants.png).

**Poprzednia runda: kolorystyka. Zwyciężyła Leśna pracownia.** Poniższe adresy zachowują wcześniejsze porównanie kolorów bez nowych form.

| Paleta | Kierunek | Podgląd w Tailscale |
| --- | --- | --- |
| Leśny spokój | Referencyjna zieleń, szałwiowe akcenty, ciemne karty | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=forest) |
| Leśna pracownia | Głęboka zieleń, miód, mieszanka jasnych i ciemnych kart | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=meadow) |
| Sosna i glina | Zieleń, ciepły koral, piaskowe linki i pastelowe karty | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=clay) |
| Noc nad wodą | Chłodna zieleń, mięta i jasne błękitne linki | [Otwórz](http://vps.tailfb5686.ts.net:4321/pl/?variant=C&palette=tide) |

Palety przełącza dolny pasek i klawisze ← →. Wybór zachowuje się w linkach do listy, artykułu i odpowiedniej wersji językowej. Na stronie głównej link „Wypróbuj kontrolki” prowadzi do próbek przycisków, pola, przełącznika, zakładek, tekstów i komunikatów. `?` pokazuje role kolorów i pozwala wybrać dowolną paletę. Dane i stan próbki kontrolek pozostają wyłącznie w pamięci podglądu. [Opis rundy i pomiary](docs/color-study.md).

Poprzedni etap: **research i próbnik typografii**, przed kolejnymi układami. [Otwórz próbnik przez Tailscale](http://vps.tailfb5686.ts.net:4321/typography/) lub [lokalnie](http://localhost:4321/typography/). [Pełny raport w przeglądarce](http://vps.tailfb5686.ts.net:4321/typography/research.html) jest kopią [źródła researchu](docs/font-research.md).

Próbnik porównuje sześć zestawów na tym samym tekście i zieleni `#162823` z referencji. Można zmienić zestaw, PL/EN, rozmiar tekstu, interlinię, szerokość kolumny i odcień tła; ustawienia są w URL. Przykład: `/typography/?pair=3&view=sample&lang=pl&size=20&leading=1.75&measure=64&bg=reference`. Są też widoki `compare` i `glyphs`. Kopiowanie adresu przez HTTP ma ręczne pole zastępcze. Stan nie trafia do localStorage ani cookies. Raport opisuje również ograniczony wskaźnik popularności z oficjalnych danych Google Fonts.

Historyczna shortlista badania obejmowała Commissioner, Gabarito + Literata, Ysabeau, Bricolage + Hanken, Schibsted + Newsreader i Alegreya + Hanken. Po obejrzeniu Marcin wybrał **Bricolage + Hanken**, użyte we wszystkich nowych paletach. Oryginalne A/B/C poniżej zachowują pierwszą rundę, a ich treść i kolory nie reprezentują aktualnego briefu.

## Uruchomienie

```sh
npm run prototype
```

Wymagane jedynie Node/npm (do skrótu) i Python 3. Bez instalowania paczek. Alternatywnie: `python3 prototypes/serve.py`.

Podgląd: [localhost:4321/pl/?variant=A](http://localhost:4321/pl/?variant=A).

Podgląd na serwerze w sieci Tailscale: [vps.tailfb5686.ts.net:4321](http://vps.tailfb5686.ts.net:4321/pl/?variant=A). Wymaga połączenia urządzenia z tą samą siecią Tailscale. Serwer nasłuchuje na prywatnym adresie Tailscale, bez wiązania do wszystkich interfejsów. Ponowne uruchomienie na tym serwerze:

```sh
npm run prototype -- --host 100.113.202.72 --port 4321
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

- [Brief i granice etapu](docs/brief.md)
- [Research: stack, języki, SEO, prywatność, Umami i integracje](docs/research.md)
- [Decyzja projektowa — do uzupełnienia po obejrzeniu](docs/prototype-decision.md)
