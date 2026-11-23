# Przegląd przed upublicznieniem repozytorium

Data: 23 listopada 2026. Punkt odniesienia: `d772c07` (main po PR #1). Repozytorium podczas kontroli pozostało prywatne. Nie zmieniono historii, widoczności, DNS ani reguł firewalla.

## Wynik skanowania sekretów

- Gitleaks 8.30.1: 73 lokalnie dostępne commity (`--all --full-history`), w tym 63 commity osiągalne z pobranych gałęzi origin. Bez znalezisk. Obejmuje pliki usunięte i wcześniejsze wersje, a także lokalne archiwa prototypów, których nie wypchnięto.
- Dodatkowe wzorce na 496 historycznych blobach tekstowych: brak nagłówków kluczy prywatnych, poświadczeń w URL i podejrzanych przypisań password/api-key/client-secret/access-token.
- Przegląd nazw plików: brak śledzonych `.env`, `.npmrc` z poświadczeniami, kluczy SSH/TLS i paczek kopii zapasowych. Standardowe `.env` i nowe lokalne katalogi narzędzi/kluczy są wykluczone w `.gitignore`; to nie zastępuje skanera śledzonych plików.
- Sprawdzono metadane 59 obrazów w src/assets i docs/previews. Portret zawiera podstawowe EXIF dotyczące orientacji, przestrzeni barw i wymiarów; bez GPS i danych aparatu. Pozostałe sprawdzone pliki nie miały EXIF/XMP/IPTC wymagających usunięcia.
- Dodano `npm run secrets:check` do walidacji PR i workflow produkcyjnego. Skanuje historię i bieżące pliki źródłowe; nie wypisuje wartości znalezionych sekretów. Do publikacji trafia wyłącznie zbudowane `dist-production/`.

To wynik dostępnego skanu i przeglądu, nie gwarancja braku wszystkich możliwych danych poufnych. Ustawienia sekretów Actions nie były dostępne dla użytego tokenu API; wartości przechowywane w GitHub nie są częścią plików Git. Ten deployment nie wymaga żadnych własnych sekretów repozytorium.

## Dane widoczne po zmianie na public

**Brak wykrytych haseł nie oznacza, że historia nie zawiera danych prywatnych organizacyjnie.** W historii są:

- rzeczywista nazwa hosta i adres Tailscale z instrukcji podglądu;
- lokalne ścieżki i nazwa użytkownika VPS;
- osobisty adres e-mail autora w metadanych części commitów;
- materiały i zrzuty wcześniejszych prototypów, przykładowe publikacje;
- portret, imię i nazwisko oraz kontakty, w tym numer WhatsApp, które autor świadomie przekazał do publicznej strony.

Adresy Tailscale i ścieżki usunięto z aktualnych instrukcji/skryptów na tej gałęzi, zastępując je lokalnymi adresami lub placeholderami. **Nie usunięto ich z dawnych commitów.** Źródła przykładów zachowano celowo zgodnie z prośbą autora; wyłączono je tylko z produkcyjnej strony.

Przed zmianą widoczności właściciel powinien zdecydować, czy akceptuje publiczną historię z tymi informacjami. Jeśli nie, potrzebna jest osobna operacja oczyszczenia historii wszystkich publicznych gałęzi/tagów albo nowe publiczne repo z czystym pierwszym commitem. Sama nowa poprawka lub usunięcie pliku na main nie wystarczy. Alternatywnie źródła mogą pozostać prywatne przy planie GitHub obsługującym Pages dla prywatnego repo lub przy osobnym publicznym repo artefaktów; ten PR przygotowuje prosty deployment z obecnego repo.

Nie wykonano przepisywania historii ani force-pusha. Dla przyszłych commitów można włączyć prywatność e-maila na GitHub i używać adresu noreply; to nie zmienia wcześniejszych commitów. Prywatnego adresu podglądu nie zapisujemy już w publicznych instrukcjach. Adresy localhost i `100.x.y.z` w archiwalnych dokumentach są przykładami.

## Utrzymanie kontroli

`npm run secrets:check` pobiera przypięty Gitleaks i weryfikuje SHA-256 przed uruchomieniem (Linux x64/arm64). Alternatywnie lokalnie ustaw `GITLEAKS_BIN` na zaufany skaner. Workflow wykonuje pełny checkout historii. Raporty z wartościami sekretów nie są dodawane do repo ani artefaktu Pages.

W razie przyszłego wykrycia prawdziwego sekretu: nie upubliczniać repo, unieważnić/obrócić poświadczenie, usunąć je z plików i właściwej historii, a potem ponowić skan. Nie dodawać ogólnego wyjątku tylko po to, by CI było zielone.
