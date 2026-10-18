# kolodziejczak.me

Statyczna strona osobista w **Astro + TypeScript + MDX**, z pełnym HTML i adresami `/pl/` oraz `/en/`. Wybrany projekt: Leśna pracownia, Bricolage/Hanken, logotyp `kolodziejczak.me`, karty z pionowymi miniaturami i subtelny gradient z siatką.

**Prywatny podgląd w Tailscale:** [PL](http://vps.tailfb5686.ts.net:4322/pl/) · [EN](http://vps.tailfb5686.ts.net:4322/en/) · [Artykuły](http://vps.tailfb5686.ts.net:4322/pl/blog/) · [Artykuł](http://vps.tailfb5686.ts.net:4322/pl/blog/mniej-ale-lepiej/).

## Uruchomienie

Node.js **≥22.22.0** (sprawdzone na 24.21.0), npm.

```sh
npm ci
npm run dev
```

Astro: **7.4.0**, integracja MDX: **8.1.0**, TypeScript: **7.0.2**. To najnowsze stabilne wersje z npm zweryfikowane 18 października 2026; przypięte dokładnie i zapisane w `package-lock.json`.

```sh
npm run validate  # TypeScript, budowanie HTML i testy
npm run preview   # lokalny podgląd po buildzie
```

`npm run check` sprawdza moduły TypeScript; `npm run build` kompiluje pliki Astro i MDX. Testy czytające `dist/` wymagają wcześniejszego zbudowania strony, co zapewnia `validate`.

## Struktura

- `src/pages/`: wizytówka, lista i artykuły PL/EN, wybór języka oraz 404.
- `src/components/`, `src/layouts/`, `src/styles/`: wspólne komponenty i wybrany wygląd.
- `src/content/articles/{pl,en}/`: osobne publikacje MDX; wspólny `translationKey` paruje wersje, `urlSlug` wyznacza adres.
- `src/content.config.ts`: schemat metadanych, obowiązkowego hero i opcjonalnego audio.
- `src/assets/articles/`: lokalne zdjęcia z podpisami i źródłami, optymalizowane przez Astro.
- `src/config/site.ts`: dane autora, kontakty i status publikacji.
- `public/`: lokalne fonty z licencjami i favicon.

Pełne artykuły, linki językowe, spis treści, TL;DR i prompt działają bez JavaScriptu. Początek artykułu zawiera zdjęcie hero, czas z nagrania, dwa kompaktowe przełączniki TL;DR/spisu treści w jednym wierszu, ze wspólnym rozwijanym panelem. Mały skrypt dodaje filtrowanie, dialog promptu, kopiowanie, sugestię języka przeglądarki i postęp czytania. Brakujące nagranie ma widoczny mock odtwarzacza PL/EN. Kod zawija się, a dłuższe bloki mają przycisk rozwijania. W rogu znajduje się oznaczony placeholder rozmowy, a po połowie tekstu także strzałka powrotu. Natywne View Transitions animują przejście zdjęcia z listy do artykułu. Bez klientowego routera i zależności od kodu prototypów.

## Status

To działająca baza przed publikacją. Strona główna zawiera przekazany przez autora portret, optymalizowany responsywnie przez Astro. Bio i trzy pary artykułów są oznaczonymi materiałami przykładowymi. Brakujące adresy kontaktowe są nieaktywne. `readyToPublish: false` utrzymuje `noindex`; sam podgląd jest dostępny wyłącznie w Tailscale.

Przed publiczną premierą potrzebne są prawdziwe materiały autora, konfiguracja hostingu, SEO/RSS/sitemap i analityki od pierwszego publicznego uruchomienia. Audio, komentarze, polubienia, agent i offline pozostają kolejnymi etapami. Podgląd nie ładuje usług zewnętrznych.

- [Zakres implementacji, dodawanie artykułów i weryfikacja](docs/astro-foundation.md)
- [Poprawki narzędzi czytania i proponowane kategorie](docs/reading-refinements.md)
- [View Transitions, zdjęcia hero i pomiary wariantów mobilnych](docs/view-transitions-and-images.md)
- [Nagłówek, rozwijanie kodu i mock odtwarzacza](docs/code-and-audio-preview.md)
- [Kopiowanie do schowka i test przeglądarkowy](docs/clipboard.md)
- [Tooltip kopiowania i systemowe udostępnianie](docs/sharing-and-feedback.md)
- [Kolejność dalszych prac](docs/implementation-next.md)
- [Decyzje projektowe](docs/prototype-decision.md)
- [Archiwum prototypów i wcześniejszych porównań](docs/prototype-archive.md)

Archiwalny podgląd nadal działa na porcie **4321** (`npm run prototype`); właściwa implementacja ma osobny podgląd na **4322**. Szczegóły prywatnego serwera i jego restartu są w [opisie implementacji](docs/astro-foundation.md#podgląd-w-tailscale).

Wybrany zestaw logo D / karty C / tło D działa na porcie 4322. [Decyzja, wdrożenie i archiwum prototypów](docs/identity-card-background-study.md).
