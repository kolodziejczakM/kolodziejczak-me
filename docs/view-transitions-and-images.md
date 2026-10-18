# Przejścia między stronami i obrazy artykułów

18 października 2026. Użytkownik zamówił View Transitions i obowiązkowe zdjęcie hero tuż przed czasem czytania. Zakres obejmuje istniejącą statyczną stronę Astro oraz sześć przykładowych publikacji PL/EN.

## Przejścia

Wybrano natywne przejścia między dokumentami: `@view-transition { navigation: auto; }`. Wspólne zdjęcie na liście i w artykule ma unikalne `view-transition-name` oparte na `translationKey`. Animacja zdjęcia trwa 280 ms, a przenikanie pozostałej strony 160 ms. Działa także nawigacja wstecz. Nie dodano routera klientowego ani przechwytywania linków.

To świadomy wybór zgodny z pierwotnym wymaganiem pełnego HTML i zwykłej nawigacji. [Dokumentacja Astro](https://docs.astro.build/en/guides/view-transitions/#differences-between-browser-native-view-transitions-and-astros-clientrouter-) odróżnia natywne przejścia MPA od opcjonalnego `ClientRouter`. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition) opisuje opt-in obu dokumentów tego samego originu i ograniczenia wsparcia. Przy braku obsługi przeglądarka wykonuje zwykłą nawigację. `prefers-reduced-motion: reduce` wyłącza przejścia, również animacje pseudoelementów.

## Obrazy

`hero` jest obowiązkowym polem kolekcji, z obrazem walidowanym przez `image()`, tekstem alternatywnym, autorem i linkiem źródłowym. Plik znajduje się w `src/assets/articles/`; ścieżka w MDX jest względna do pliku artykułu.

```yaml
hero:
  src: "../../../assets/articles/forest-path.jpg"
  alt: "Leśna ścieżka znikająca we mgle między drzewami."
  photographer: "T (@tanyabarrow)"
  source: "https://unsplash.com/photos/misty-forest-path-with-green-foliage-and-tall-trees-WVUmdcmIuoc"
```

`ArticleImage.astro` używa `Picture` z `astro:assets`. W czasie budowania powstają AVIF, WebP i JPEG w szerokościach 400, 640, 800, 1200 i 1600 px. Atrybuty `srcset` i `sizes` opisują rzeczywistą szerokość w kolumnie artykułu oraz w siatce listy. Hero ma jawne proporcje 16:9, eager/high priority, miniatury lazy. Wspólne źródła PL/EN wykorzystują te same wygenerowane pliki. [Optymalizacja obrazów Astro](https://docs.astro.build/en/guides/images/), [obrazy w kolekcjach](https://docs.astro.build/en/guides/images/#images-in-content-collections).

Zdjęcia z Unsplasha są zapisane lokalnie, więc podgląd i przyszły build nie zależą od dostępności zewnętrznego serwera obrazów. [Autorzy i źródła plików](../src/assets/articles/README.md). Alt jest przetłumaczony; na liście miniatura ma pusty alt, ponieważ obok istnieje opisowy link z tytułem artykułu. Podpis źródła pokazujemy pod hero.

## Weryfikacja

Kontrola TypeScript i budowanie strony przeszły; 13 testów Node obejmuje pełny HTML, obrazy, fizyczne pliki wariantów, kolejność hero/czasu i unikalność nazw przejść.

W Chromium na istniejącym prywatnym HTTP Tailscale zaobserwowano rozpoczęcie i zakończenie natywnego przejścia przy otwarciu artykułu oraz powrót do listy. Kolejne strony mają nowe dokumenty; nie jest to SPA. Potwierdzono wyłączenie przejść dla ograniczonego ruchu i działanie zdjęć/linków bez JS.

Faktycznie pobrane warianty przykładowego leśnego hero:

| Szerokość ekranu | DPR | Wyświetlana szerokość | Pobrany obraz | Rozmiar AVIF |
| --- | --- | --- | --- | --- |
| 390 px | 1 | 350 px | 400 px | 18 641 B |
| 390 px | 2 | 350 px | 800 px | 72 339 B |
| 1440 px | 1 | 800 px | 800 px | 72 339 B |
| 1440 px | 2 | 800 px | 1600 px | 294 309 B |

Przeglądarka wybiera wariant również według gęstości ekranu, więc telefon o wysokim DPR może pobrać większy plik niż telefon o tej samej szerokości CSS i niższym DPR. To pomiar jednego obrazu w kontrolowanych kontekstach Chromium, a nie gwarancja rozmiaru dla każdego urządzenia.

Podglądy: [hero mobile](previews/astro-hero-mobile.png), [hero desktop](previews/astro-hero-desktop.png), [lista ze zdjęciami](previews/astro-photo-list-mobile.png).
