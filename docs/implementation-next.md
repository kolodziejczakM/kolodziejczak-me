# Kolejne kroki po akceptacji wyglądu

Stan na 18 października 2026: autor zaakceptował wygląd strony i zlecił wysłanie aktualnego kodu do repozytorium. Etap projektowania wizualnego jest zamknięty. Implementacja jest na gałęzi `codex/astro-foundation`; gałęzie porównań i prototypów są lokalnym archiwum. Używamy Astro, TypeScript, Content Collections i MDX.

## Co już jest gotowe

- Strona główna, lista i artykuły w PL/EN, osobne adresy i parowanie tłumaczeń.
- Zatwierdzone zdjęcie, bio, logo, typografia, kolory, karty i tło.
- Pełny HTML, optymalizacja zdjęć i natywne przejścia między stronami.
- TL;DR i spis treści, prompt, kopiowanie, udostępnianie, postęp czytania i powrót do góry.
- Wyróżnione cytaty z kopiowaniem oraz linki do sekcji. Hash podróżuje z ostatnim słowem, ma przygaszony kolor i korektę optyczną o 1 px w dół.
- Prywatny podgląd Tailscale. `npm run validate` sprawdza TypeScript, build 12 stron i 16 testów Node.

## 1. Uporządkować proces pracy i publikowania

To rekomendowany następny krok.

Dodać CI uruchamiające `npm ci` i `npm run validate` na zmianach w repozytorium. Przygotować szablon i krótką instrukcję dodawania artykułu: PL/EN, metadane, hero, kategoria, pięć zdań TL;DR, prompt oraz szkic. Schemat już obsługuje `draft` i parowanie języków.

Przejść cały proces na pierwszej prawdziwej publikacji: od szkicu przez podgląd do gotowej pary językowej. Efekt: kolejny artykuł można dodać bez ponownego poznawania kodu, a błędy są wykrywane przed wdrożeniem.

## 2. Uzupełnić treści do premiery

Portret i bio są już gotowe. Potrzebne są prawdziwe adresy Facebooka, Telegrama, LinkedIna i ewentualnie WhatsAppa oraz przynajmniej jedna autorska publikacja w obu językach, z właściwym zdjęciem i podpisem.

Trzy obecne pary artykułów są przykładami. Przed publiczną premierą należy je wycofać z publicznych list i adresów albo świadomie pozostawić jako materiały demonstracyjne.

## 3. Przygotować publiczne uruchomienie

- Wybrać hosting statyczny i skonfigurować domenę `kolodziejczak.me`, HTTPS oraz automatyczne wdrożenia z repozytorium.
- Uzupełnić istniejące metadane i linki językowe o podglądy udostępniania, sitemap, robots.txt i RSS PL/EN.
- Podłączyć Umami przed pierwszym publicznym uruchomieniem. Zweryfikować bieżącą konfigurację, zakres danych i potrzebną informację o prywatności na etapie tej integracji.
- Wykonać końcowy przegląd dostępności, wydajności i rzeczywistych telefonów, w tym Safari na iPhonie w obu orientacjach.
- Ustalić zachowanie demonstracyjnych elementów w wersji publicznej. Audio, agent i komentarze powinny być rzeczywiście dostępne albo odpowiednio ukryte; podgląd deweloperski może je nadal pokazywać.

`readyToPublish` pozostaje `false` do premiery. Wysłanie kodu na GitHub nie publikuje strony pod domeną.

## 4. Uruchomić audio na pierwszym artykule

Przygotować nagrania PL/EN, podłączyć je do istniejącego odtwarzacza i określać czas czytania z rzeczywistej długości pliku. Model ma opcjonalne pliki i `durationSeconds`; brakuje samych nagrań i procesu ich przygotowywania. Po uzupełnieniu nagrań mock playera przestaje być potrzebny.

Ten etap można wykonać przed premierą, jeśli audio ma być częścią pierwszej publikacji. Brak nagrania nie powinien blokować czytania.

## 5. Dodawać pozostałe integracje osobno

Po sprawdzeniu podstawowego procesu publikacji: komentarze i ewentualne polubienia, rozmowa o artykule przez ElevenLabs oraz czytanie offline. Każdy element wymaga własnej konfiguracji i zachowania przy błędzie lub braku sieci. Nie trzeba kończyć wszystkich tych funkcji, żeby opublikować wizytówkę i pierwsze artykuły.

Następne zadania są rekomendacją. Nie wybrano hostingu ani nie podłączono analityki, komentarzy, agenta czy offline. Akceptacja wyglądu i polecenie wysłania kodu nie uruchamiają jeszcze publicznego wdrożenia ani płatnych usług.
