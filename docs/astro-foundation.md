# Pierwsza implementacja Astro

Stan: 18 października 2026, gałąź `codex/astro-foundation`. Po rekomendacji kolejnych etapów użytkownik polecił kontynuować i wymagał najnowszych stabilnych zależności.

## Zależności

W npm sprawdzono tag `latest`, wymagania Node i zgodność integracji. Zainstalowano **Astro 7.4.0**, **@astrojs/mdx 8.1.0**, **TypeScript 7.0.2**. Wersje są dokładne w `package.json`, pełne drzewo jest w `package-lock.json`; `npm outdated --json` nie wskazał aktualizacji. Środowisko weryfikacji: Node 24.21.0, npm 11.19.0. Minimalny Node: 22.22.0.

`npm run check` uruchamia TypeScript dla modułów `.ts`; pliki `.astro` i MDX kompiluje `npm run build`. Nie dodano `@astrojs/check`, którego aktualna wersja 0.9.10 deklaruje zgodność z TypeScript 5/6, a nie 7. Nie obchodzimy peer dependencies przez `--force`.

## Zakres

- Statyczne `/pl/`, `/en/`, listy `/pl/blog/`, `/en/blog/`, sześć adresów artykułów, wybór języka `/` oraz plik `404.html`.
- Wspólne komponenty nagłówka, stopki, kart, kontaktu, znaku, autora i narzędzi czytania.
- Wybrany wygląd Blisko + Leśna pracownia + Bricolage/Hanken + Spokojny kontur. Pola i przyciski mają pojedyncze obramowania; zewnętrzny obrys pojawia się przy fokusie klawiatury.
- Fonty i ich licencje są lokalne. IBM Plex Mono służy wyłącznie blokom kodu w artykułach; nie zastępuje wybranych fontów interfejsu.
- Trzy pary przykładowych publikacji MDX. Treść, tytuły, opisy, daty, TL;DR i prompt pochodzą z plików treści, a nie przeglądarkowego renderera.
- Kanoniczne adresy i wzajemne `hreflang` są generowane dla odpowiadających sobie stron. Próbki pozostają `noindex,follow` przy `site.readyToPublish: false`.

Cały artykuł i zwykłe odnośniki są w początkowym HTML. Bez JS działają też natywne `details`: TL;DR, prompt, udostępnianie i mobilny spis treści. Kolejność przed treścią: czas czytania na podstawie nagrania w języku strony (bez nagrania: kreska i wyjaśnienie), kompaktowe przełączniki TL;DR/spisu treści ze wspólnym rozwijanym panelem, opcjonalny odtwarzacz. Prompt znajduje się pod treścią artykułu, po prawej stronie. JS dodaje filtrowanie, dialog promptu/udostępniania, kopiowanie, opcjonalny systemowy share, postęp oraz powrót do początku po przekroczeniu połowy tekstu. Kopiowanie przez prywatny HTTP używa rzeczywistego polecenia kopiowania jako fallback; sam wybór tekstu nie jest wynikiem tej akcji. [Przyczyna i test schowka](clipboard.md).

Sugestia języka korzysta z preferencji przeglądarki, bez przekierowania i bez geolokalizacji. Pokazuje link do tłumaczenia konkretnego artykułu. Nie zapisuje decyzji w cookies/localStorage; przejście wewnątrz strony nie wyświetla ponownie sugestii. `/` jest prostym wyborem PL/EN, także bez skryptu.

## Dodawanie publikacji

Utwórz dwa pliki, np. `src/content/articles/pl/moj-temat.mdx` i `src/content/articles/en/my-topic.mdx`. Mają ten sam `translationKey`, ale własne `locale`, `urlSlug`, tytuł i treść. `urlSlug` jest niezależny od nazwy pliku; nie używamy zarezerwowanego przez loader pola `slug`.

```yaml
---
title: "Mój tytuł"
description: "Krótki opis artykułu."
locale: "pl"
translationKey: "my-topic"
urlSlug: "moj-temat"
publishedAt: "2026-10-18"
category: "programming"
hero:
  src: "../../../assets/articles/forest-path.jpg"
  alt: "Leśna ścieżka znikająca we mgle między drzewami."
  photographer: "T (@tanyabarrow)"
  source: "https://unsplash.com/photos/misty-forest-path-with-green-foliage-and-tall-trees-WVUmdcmIuoc"
draft: true
sample: false
summary:
  - "Pierwsze zdanie podsumowania."
  - "Drugie zdanie podsumowania."
  - "Trzecie zdanie podsumowania."
  - "Czwarte zdanie podsumowania."
  - "Piąte zdanie podsumowania."
prompt: "Prompt rozwijający temat artykułu."
---
```

Kategorie: `programming`, `ai`, `film`, `books`, `intersections`, `other`. Opisy i uzasadnienie: [kategorie i poprawki](reading-refinements.md). `draft: true` wyklucza wpis z tras i list. Zdejmij draft w obu językach, gdy para będzie gotowa. Build odrzuca kolizje adresów, duplikaty języka w parze i brak opublikowanego tłumaczenia. Podsumowanie musi mieć pięć wpisów. MDX pozwala importować własne komponenty; istniejący artykuł `less.mdx` pokazuje `Callout.astro` oraz blok kodu.

Opcjonalne nagrania dodaj do `public/audio/`, a do metadanych:

```yaml
audio:
  pl:
    src: "/audio/moj-temat-pl.mp3"
    durationSeconds: 302
  en:
    src: "/audio/my-topic-en.mp3"
    durationSeconds: 287
```

Podaj rzeczywiste czasy plików; odtwarzacz natywny i etykiety czasu korzystają z tych danych. W bieżących próbkach nie ma audio, więc strona pokazuje oznaczony mock odtwarzacza PL/EN z nieaktywnym odtwarzaniem. Generowanie lektora i pomiar długości plików należą do następnego etapu.

## Weryfikacja

`npm run validate`: TypeScript, build 12 stron i trzynaście testów Node. Testy sprawdzają parowanie różnych slugów, błędy indeksu publikacji, daty/czasy oraz wynikowe pliki HTML: pełną treść MDX, komponent, blok kodu, pary językowe, natywne narzędzia czytania i link do kolejnego artykułu.

Dodatkowo Chromium: 40 widoków (10 tras × 320/390/768/1440 px), bez poziomego przepełnienia, błędów JS i zewnętrznych żądań. Sprawdzono widok telefonu i desktopu, działanie artykułu i nawigacji bez JS, filtry, pięć zdań TL;DR, prompt, kopiowanie/fallback HTTP, zamykanie Escape i przywracanie fokusu, progres oraz sugestię języka. To kontrola bieżącego zakresu, nie pełny audyt dostępności i wszystkich przeglądarek.

Zrzuty aktualnej implementacji: [główna desktop](previews/astro-home-desktop.png), [główna mobile](previews/astro-home-mobile.png), [lista mobile](previews/astro-list-mobile.png), [artykuł desktop](previews/astro-article-desktop.png), [artykuł mobile](previews/astro-article-mobile.png).

## Podgląd w Tailscale

[PL](http://vps.tailfb5686.ts.net:4322/pl/) · [EN](http://vps.tailfb5686.ts.net:4322/en/). Wymaga urządzenia w tej samej sieci Tailscale.

Na obecnym serwerze statyczny katalog `dist/` udostępnia jednostka użytkownika `kolodziejczak-astro-preview.service`, związana tylko z adresem `100.113.202.72:4322`. Nie korzysta z dev servera i nie udostępnia kodu repo. Status:

```sh
systemctl --user status kolodziejczak-astro-preview
```

To jednostka tymczasowa, niezależna od sesji czatu, do restartu serwera. Po restarcie, z katalogu repo, można odtworzyć ją tak:

```sh
npm run build
systemd-run --user \
  --unit=kolodziejczak-astro-preview --collect \
  --working-directory="$PWD" \
  /usr/bin/python3 -m http.server 4322 \
  --bind 100.113.202.72 --directory "$PWD/dist"
```

Archiwalne eksperymenty nadal są w `prototypes/`, na gałęzi `codex/prototype-ui` i porcie 4321. Źródła Astro nie importują ich kodu ani CSS. Przykładową treść oraz zaakceptowane fonty przeniesiono jednorazowo do właściwej struktury.

## Co pozostaje

Przed publiczną premierą: zdjęcie, potwierdzone bio, prawdziwe linki kontaktowe i pierwszy autorski artykuł z tłumaczeniem; docelowy hosting, sitemap/RSS, podglądy udostępniania oraz Umami od pierwszego publicznego uruchomienia. Dopiero po przeglądzie gotowej strony należy zmienić flagę publikacji i usunąć próbki. Bieżący etap nie publikuje domeny.

Audio wymaga plików. W artykule znajduje się oznaczony placeholder rozmowy ElevenLabs; otwiera informację o planowanej funkcji i nie łączy się z usługą. Agent, komentarze, polubienia i offline wymagają kolejnych działających integracji. Nie przeniesiono symulowanych rozmów, odtwarzania ani polubień z prototypu. Strona nie wykonuje obecnie żądań do zewnętrznych usług i nie ma service workera.

## View Transitions i hero

Każda publikacja wymaga metadanych `hero`. Zdjęcie znajduje się bezpośrednio przed czasem czytania. Miniatury listy i hero korzystają z lokalnych wariantów wygenerowanych przez Astro; nawigacja ma natywne przejścia między dokumentami. [Implementacja, pomiary i źródła](view-transitions-and-images.md).

## Dopracowanie czytania

Usunięto dodatkowy podpis autora z nagłówka. Kod zawija się i ma ograniczony podgląd z rozwijaniem; brakujące nagrania mają wizualny mock. [Zakres i weryfikacja](code-and-audio-preview.md).
