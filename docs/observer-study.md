# Prototypy obserwatora na górnej ramce wizytówki

Autor wybrał **B: Miękki kadr**, a następnie **A: Czysty profil** z próby włosów i lornetki. Usunięto wystający szałwiowy kształt za włosami. Wybrana postać jest wdrożona na stronie głównej PL i EN w `src/components/HeroObserver.astro`, a ruch w `src/scripts/hero-observer.ts`. Stoi pośrodku górnej ramki hero, patrzy w górę i subtelnie reaguje na mysz. Na telefonie spokojnie się rozgląda. Systemowe ograniczenie ruchu zatrzymuje animację; poza ekranem i w ukrytej karcie ruch jest wstrzymany. Bez JS pozostaje statyczna ilustracja. Wdrożenie nie zawiera przełącznika prototypów ani niewybranych postaci.

Kontrola wdrożenia: TypeScript, build 12 stron i 16 testów. Chromium: PL i EN przy 320/390/844/1440/3840 px bez przepełnienia, stopy na środku ramki, reakcja na mysz, zatrzymanie poza ekranem i wznowienie po powrocie, systemowe ograniczenie ruchu, spokojny ruch na urządzeniu dotykowym i statyczna ilustracja bez JS. Lista artykułów nie zawiera postaci.

## Dalsza próba: włosy i lornetka

Autor zwrócił uwagę na jasną obwódkę przy włosach i zasugerował lornetkę jako nawiązanie do ciekawości. Obwódka wynika z dodatkowego szałwiowego kształtu za ciemnymi włosami. Archiwalne porównanie: [prototyp z lornetką](http://vps.tailfb5686.ts.net:4328/pl/?variant=B). A: czysty profil bez obwódki, B: lornetka z profilu, C: ujęcie od tyłu z lornetką. Autor wybrał **A: Czysty profil**, zachowujący dotychczasową pozę i ruch, z usuniętą obwódką przy włosach. Wybrany wariant wdrożono w komponencie `HeroObserver.astro` dla PL i EN. Pełne źródła, opis i zrzuty: lokalna gałąź `codex/observer-binocular-study`, commit `f7f3c6a`, plik `docs/observer-binocular-study.md`. Worktree `/tmp/kolodziejczak-observer-binocular-study`, serwer `kolodziejczak-binocular-preview.service`, tylko Tailscale `100.113.202.72:4328`. Odtworzenie: `npm run prototype:binoculars`, build z `PROTOTYPE_BINOCULARS=1 npm run build`. Sprawdzono TypeScript, build, układ trzech wariantów przy 320/390/844/1440/3840 px, ruch, pauzę, ograniczenie animacji, przełączanie i języki; obiektywy nie są obcinane przy skrajnych wychyleniach.

## Archiwum pierwszego wyboru

Źródło pierwotne: lokalna gałąź **`codex/observer-study`**, commit **`47cb321`**. Zawiera cztery SVG, skrypt ruchu, CSS i przełącznik, pełny opis oraz zrzuty desktopowe, mobilne i porównanie postaci w `docs/previews/observer-study/`. Poniższe informacje opisują zarchiwizowany prototyp, z którego wybrano wariant B.

Prywatne porównanie na istniejącej stronie głównej:

- [A: Szkic z marginesu](http://vps.tailfb5686.ts.net:4327/pl/?variant=A). Kremowa kreska, wydłużone proporcje i dłonie w kieszeniach.
- [B: Miękki kadr](http://vps.tailfb5686.ts.net:4327/pl/?variant=B). Zaokrąglone formy, miodowa kurtka i ciepły charakter retro.
- [C: Pikselowy obserwator](http://vps.tailfb5686.ts.net:4327/pl/?variant=C). Schodkowy kontur i ograniczona paleta.
- [D: Cień i światło](http://vps.tailfb5686.ts.net:4327/pl/?variant=D). Oszczędna sylwetka, spokojna szałwia i twarz skierowana ku górze.

Stopy pozostają na środku ramki. Rusza się tylko głowa i spojrzenie. Na komputerze postać lekko reaguje na mysz, na telefonie spokojnie obserwuje niebo. Obsługiwane są pauza próbnika i systemowe ograniczenie ruchu. Ruch zatrzymuje się poza ekranem i w ukrytej karcie. Nie dodano widocznego obiektu na niebie ani nie zmieniono pozostałego wyglądu strony. Powiększono tylko odstęp nad hero potrzebny na postać. Bez JS widoczna jest statyczna A.

Wariant zmieniają dolne strzałki i klawiatura. Wybór jest w URL, także po przełączeniu PL/EN; nie ma cookies ani zapisu do storage. Podgląd właściwej strony na porcie 4322 zawiera wybrany wariant B bez narzędzi porównawczych.

Worktree `/tmp/kolodziejczak-observer-study`, jednostka `kolodziejczak-observer-preview.service`, wyłącznie Tailscale `100.113.202.72:4327`. Odtworzenie z gałęzi: `npm ci`, `npm run prototype:observer`; build statyczny z `PROTOTYPE_OBSERVER=1 npm run build`. Zwykły build bez flagi nie zawiera postaci ani próbnika.

Kontrola: TypeScript i build 12 stron; Chromium, cztery warianty PL przy 320/390/844/1440/3840 px, wersje EN przy 320 px i przełączanie języka z zachowaniem wariantu. Sprawdzono brak przepełnienia i błędów JS, stopy na ramce, wyśrodkowanie, reakcję na mysz, przyciski, klawiaturę, pauzę oraz ruch w emulacji telefonu i zatrzymanie po włączeniu `prefers-reduced-motion`. Nie dodano testów do kodu prototypu.
