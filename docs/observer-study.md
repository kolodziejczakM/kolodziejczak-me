# Prototypy obserwatora na górnej ramce wizytówki

Autor poprosił o małego ludzika stojącego pośrodku górnego obramowania hero, patrzącego w górę na coś poza stroną. Głowa ma spokojnie się poruszać albo delikatnie reagować na położenie myszy. Nie wybrano jeszcze wyglądu postaci.

Źródło pierwotne: lokalna gałąź **`codex/observer-study`**, commit **`47cb321`**. Zawiera cztery SVG, skrypt ruchu, CSS i przełącznik, pełny opis oraz zrzuty desktopowe, mobilne i porównanie postaci w `docs/previews/observer-study/`. Właściwa gałąź ma tylko ten wskaźnik. Po wyborze autora wybrany wariant należy przepisać do właściwej implementacji.

Prywatne porównanie na istniejącej stronie głównej:

- [A: Szkic z marginesu](http://vps.tailfb5686.ts.net:4327/pl/?variant=A). Kremowa kreska, wydłużone proporcje i dłonie w kieszeniach.
- [B: Miękki kadr](http://vps.tailfb5686.ts.net:4327/pl/?variant=B). Zaokrąglone formy, miodowa kurtka i ciepły charakter retro.
- [C: Pikselowy obserwator](http://vps.tailfb5686.ts.net:4327/pl/?variant=C). Schodkowy kontur i ograniczona paleta.
- [D: Cień i światło](http://vps.tailfb5686.ts.net:4327/pl/?variant=D). Oszczędna sylwetka, spokojna szałwia i twarz skierowana ku górze.

Stopy pozostają na środku ramki. Rusza się tylko głowa i spojrzenie. Na komputerze postać lekko reaguje na mysz, na telefonie spokojnie obserwuje niebo. Obsługiwane są pauza próbnika i systemowe ograniczenie ruchu. Ruch zatrzymuje się poza ekranem i w ukrytej karcie. Nie dodano widocznego obiektu na niebie ani nie zmieniono pozostałego wyglądu strony. Powiększono tylko odstęp nad hero potrzebny na postać. Bez JS widoczna jest statyczna A.

Wariant zmieniają dolne strzałki i klawiatura. Wybór jest w URL, także po przełączeniu PL/EN; nie ma cookies ani zapisu do storage. Podgląd zwykłej strony na porcie 4322 zachowuje poprzedni wygląd.

Worktree `/tmp/kolodziejczak-observer-study`, jednostka `kolodziejczak-observer-preview.service`, wyłącznie Tailscale `100.113.202.72:4327`. Odtworzenie z gałęzi: `npm ci`, `npm run prototype:observer`; build statyczny z `PROTOTYPE_OBSERVER=1 npm run build`. Zwykły build bez flagi nie zawiera postaci ani próbnika.

Kontrola: TypeScript i build 12 stron; Chromium, cztery warianty PL przy 320/390/844/1440/3840 px, wersje EN przy 320 px i przełączanie języka z zachowaniem wariantu. Sprawdzono brak przepełnienia i błędów JS, stopy na ramce, wyśrodkowanie, reakcję na mysz, przyciski, klawiaturę, pauzę oraz ruch w emulacji telefonu i zatrzymanie po włączeniu `prefers-reduced-motion`. Nie dodano testów do kodu prototypu.
