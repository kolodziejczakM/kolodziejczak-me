# Następny etap po akceptacji podglądu

Stan: rekomendacja kolejności prac, nie zatwierdzona decyzja o stacku. Weryfikacja oficjalnych dokumentacji: 18 października 2026. Baza wizualna: [wybrany podgląd](selected-preview.md).

## Rekomendacja technologiczna

**Astro + TypeScript + Content Collections + MDX** najlepiej pasuje do obecnego zakresu: osobistej wizytówki i dłuższych artykułów w PL/EN. To ocena dopasowania do projektu na podstawie poniższych możliwości, a nie ograniczenie TanStack Start.

- Astro domyślnie generuje statyczny HTML podczas budowania. Później można dodać adapter i obsługę serwerową tylko do wybranych stron lub endpointów, zachowując statyczne artykuły. [Renderowanie i adaptery](https://docs.astro.build/en/guides/on-demand-rendering/).
- Content Collections porządkują lokalne treści i metadane, umożliwiają walidację schematu oraz renderowanie Markdown/MDX do HTML. Oficjalna integracja MDX pozwala używać komponentów w treści artykułu. [Kolekcje](https://docs.astro.build/en/guides/content-collections/), [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/).
- Routing i18n obsługuje prefiks również dla języka domyślnego (`prefixDefaultLocale: true`), co odpowiada ścieżkom `/pl/` i `/en/`. [Routing językowy](https://docs.astro.build/en/guides/internationalization/).
- TanStack Start również potrafi generować statyczne pliki HTML; pozostaje poprawną alternatywą. Konfiguracja prerenderingu obejmuje odkrywanie tras i przechodzenie po linkach. [Static Prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering).

## Proponowana kolejność

1. **Przygotować czysty projekt produkcyjny** z zaakceptowanym wyglądem, bez przełączników wariantów i symulacji usług. Zbudować wspólne komponenty oraz stronę główną, listę i stronę artykułu w `/pl/` i `/en/`. Dodać kolekcję MDX z parowaniem tłumaczeń. Warunek odbioru: pełna treść artykułu i zwykła nawigacja dostępne w HTML także przy wyłączonym JavaScript; JS obsługuje interakcje.
2. **Przygotować pierwsze publiczne wdrożenie**: metadane, canonical, hreflang, sitemap, RSS, podglądy udostępniania, kontrolę dostępności i wydajności oraz planowaną integrację Umami. Analityka ma działać od pierwszego publicznego uruchomienia; aktualną ofertę i konfigurację Umami trzeba sprawdzić przed tym etapem. Hosting i konfiguracja usług wymagają osobnego ustalenia przed publikacją.
3. **Podłączyć audio i funkcje czytania**: nagrania dla obu języków, czas oparty na długości nagrania, TL;DR, prompt, postęp czytania i udostępnianie. Przewidzieć pola na pliki audio już w schemacie treści etapu 1.
4. **Rozwijać pozostałe integracje**: komentarze i polubienia, zachowanie offline oraz agent wyjaśniający treść artykułu. Każdy element powinien otrzymać działającą implementację i jasne zachowanie przy braku sieci zamiast demonstracyjnego interfejsu.

Zdjęcie, końcowe bio, linki kontaktowe i pierwszy autorski artykuł są potrzebne przed publiczną premierą. Ich brak nie blokuje przygotowania struktury, komponentów i przykładowej pary MDX. Materiały zastępcze trzeba wyraźnie oznaczyć i usunąć przed publikacją.

W tej notatce nie wybrano hostingu, nie weryfikowano ofert analitycznych ani kwestii prawnych. Nie rozpoczęto implementacji stacku.
