# Układ po obróceniu telefonu i szerokość odtwarzacza

18 października 2026.

## Zmiany

- Odtwarzacz demonstracyjny i sekcja prawdziwych nagrań mają `width: 100%` i `max-width: 560px`. Są wyrównane do lewego brzegu treści. Węższy ekran nadal ogranicza ich szerokość.
- Gradient i siatka są teraz w osobnej, dekoracyjnej warstwie `BackgroundSurface.astro`. Warstwa jest przypięta do viewportu, przycina własne elementy i ma ograniczenie layoutu oraz malowania (`contain: strict`). Animowany gradient zachowuje zapas 15%, ale zapas nie wychodzi poza warstwę. Treść strony nie ma globalnego `overflow-x: hidden`.
- Na `html` ustawiono `text-size-adjust: 100%` wraz z prefiksem WebKit, aby zachować zaprojektowaną skalę tekstu przy zmianie orientacji. Nie zmieniono ustawień zoomu viewportu. [Dokumentacja Apple](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html) opisuje automatyczne skalowanie tekstu na iOS i możliwość jego przepełnienia. Jest to zabezpieczenie, a nie dowód, że skalowanie tekstu było przyczyną zgłoszenia.
- Wspólna warstwa tła jest używana także na wyborze języka i stronie 404. Pauza animacji i systemowe ograniczenie ruchu pozostają obsługiwane.

## Odtworzenie i ograniczenia

Przed zmianą `node scripts/check-responsive-layout.cjs` (z zewnętrznym Playwright wskazanym przez `PLAYWRIGHT_MODULE`) kończył się błędem:

```text
pl/blog/mniej-ale-lepiej/ 844x390 animation=0: audio is 772px wide, maximum is 560px
```

Poziomego przewijania ze zrzutów użytkownika nie udało się odtworzyć w Chromium ani desktopowym porcie WebKit z emulacją telefonu, także przed zmianą. Sprawdzono bezpośrednie otwarcie poziomego widoku, zmianę pion-poziom-pion oraz początek, środek i koniec animacji. Dlatego przycięcie dekoracyjnej warstwy i stabilizacja rozmiaru tekstu są zabezpieczeniami; nie potwierdzono jednej przyczyny na fizycznym iPhonie. Taki telefon pozostaje potrzebny do ostatecznego potwierdzenia zgłoszenia.

## Weryfikacja

- `npm run validate`: TypeScript, 12 stron statycznych, 15 testów Node.
- `scripts/check-responsive-layout.cjs`: Chromium i WebKit, PL/EN, główna/lista/artykuł. Widoki 320, 390, 760, 780, 844, 932, 1280 i 1440 px, obrót ze strony przewiniętej w dół, próbki animacji oraz ograniczenie ruchu. Test wymaga załadowania fontów. Sprawdza szerokość dokumentu, rzeczywiste przewijanie w poziomie, położenie marki/nawigacji oraz ograniczenie szerokości playera. `BROWSER_ENGINE=webkit` wybiera drugi silnik; `RESPONSIVE_TEST_URL` pozwala wskazać inny podgląd.
- Wizualnie sprawdzono listę w poziomie i szerokość odtwarzacza na desktopie.
