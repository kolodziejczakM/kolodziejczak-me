# kolodziejczak.me

Pierwszy etap: **prototypy wizualne do porównania**, przed wyborem stacku i implementacją strony.

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
