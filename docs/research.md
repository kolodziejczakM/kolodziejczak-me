# kolodziejczak.me — research przed implementacją

Stan weryfikacji: **17 października 2026**. Dokument wspiera wybór po obejrzeniu prototypów; nie ustanawia jeszcze stacku. Fakty mają źródła pierwotne, a rekomendacje oznaczono jako propozycje.

## 1. Stack: oba spełniają wymóg HTML od początku

| Potrzeba | Astro | TanStack Start |
| --- | --- | --- |
| Statyczny HTML | Domyślnie prerenderuje strony podczas budowania. [Dokumentacja](https://docs.astro.build/en/guides/on-demand-rendering/) | Potrafi generować statyczne pliki HTML; prerendering trzeba włączyć, a dynamiczne ścieżki uwzględnić przez listę lub odkrywanie linków. [Dokumentacja](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering) |
| Późniejszy backend | Adapter pozwala dołączyć renderowanie na żądanie wybranych tras. [Dokumentacja](https://docs.astro.build/en/guides/on-demand-rendering/) | SSR, streaming, funkcje serwerowe i trasy serwerowe należą do frameworka. [Dokumentacja](https://tanstack.com/start/latest) |
| Markdown i MDX | Obsługa Markdown oraz oficjalna integracja `@astrojs/mdx`. [Markdown](https://docs.astro.build/en/guides/markdown-content/), [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) | Oficjalny poradnik proponuje pipeline unified i content-collections. MDX można dołączyć przez plugin Vite projektu MDX; wymaga złożenia integracji. [Markdown](https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown), [plugin MDX](https://mdxjs.com/packages/rollup/) |
| Dwa języki | Wbudowane helpery routingu i `prefixDefaultLocale: true` dla prefiksu także w domyślnym języku. [i18n](https://docs.astro.build/en/guides/internationalization/) | Router dostarcza mechanizmy do składania routingu językowego; dokumentuje m.in. integrację z Paraglide. [i18n](https://tanstack.com/router/latest/docs/guide/internationalization-i18n) |
| Interakcje | Wyspy: HTML i osobno aktywowane komponenty interaktywne; komponent Astro nie wymaga runtime po stronie klienta. [Wyspy](https://docs.astro.build/en/concepts/islands/) | SSR dostarcza HTML, który jest hydratowany; późniejsza nawigacja może odbywać się po stronie klienta. [Model frameworka](https://tanstack.com/start/latest) |
| Hosting | Statyczny wynik można wdrażać na hostingu plików; SSR wymaga odpowiedniego adaptera. [Wdrożenia](https://docs.astro.build/en/guides/deploy/) | Statyczny prerendering pozwala obsłużyć hosting bez SSR; dla serwera istnieją m.in. instrukcje Cloudflare, Netlify i Node. [SSG](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering), [hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) |

**Propozycja:** do tej wizytówki i bloga pierwszym kandydatem jest **Astro + Markdown/MDX + niewielki JavaScript**. To ocena dopasowania: główna treść jest dokumentem, a odtwarzacz, progres i panele to małe interakcje. TanStack Start zyskuje, gdy powstanie rozbudowana aplikacja z częstymi operacjami serwerowymi. Przyszły backend sam w sobie nie wyklucza Astro. Decyzję zostawmy do wyboru UI.

**Warunek odbioru niezależnie od stacku:** pełna treść artykułu ma być w odpowiedzi HTML i dostępna przy wyłączonym JavaScript. Uwaga na przykład z `useEffect` w poradniku Start: pokazany komponent przetwarza tekst po uruchomieniu klienta. W implementacji bloga należy renderować wynik przy budowaniu/SSR. To wniosek z kodu przykładu, a nie ograniczenie frameworka. [Kod w oficjalnym poradniku](https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown)

## 2. Języki, adresy i SEO

**Proponowana struktura:** `/pl/`, `/en/`, `/pl/blog/`, `/en/blog/`, `/pl/blog/slug/`, `/en/blog/slug/`. Język URL jest wiążący. `/` może być małą stroną wyboru PL/EN z linkami do obu wizytówek. Parę tłumaczeń łączymy stabilnym `translationKey`; slugi mogą się różnić.

Google zaleca wskazanie wersji językowych przez `hreflang`: każda wersja wymienia siebie i odpowiednik, linki są bezwzględne i wzajemne. `x-default` jest przeznaczony dla niedopasowanych języków i dobrze pasuje do strony wyboru. Pełne tłumaczenia nie są uznawane za duplikaty tylko dlatego, że przedstawiają ten sam temat. [Google: wersje językowe](https://developers.google.com/search/docs/specialty/international/localized-versions)

**Propozycja metadanych:** każda opublikowana wersja artykułu ma canonical do siebie, a nie z PL do EN. Na obu dodajemy `hreflang="pl"` i `hreflang="en"` do odpowiadających sobie artykułów. Dla strony głównej `x-default` wskazuje `/`; dla artykułów może wskazywać ich angielski odpowiednik jako fallback. Nie kierujemy wszystkich artykułów przez `x-default` na homepage. Canonical powinien zachować zgodny język przy stosowaniu `hreflang`. [Google: canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

Do tego proponuję osobny tytuł, opis i obraz udostępniania dla każdego języka, `html lang`, sitemap, RSS i dane artykułu z autorem i datą. To lista prac przy wdrożeniu, nie powód do opóźnienia prototypów.

**Propozycja detekcji:** mały, zamykany komunikat „This article is also available in English”, bez automatycznej zmiany otwartego `/pl/`. `navigator.languages` zwraca preferencje w kolejności użytkownika; przeglądarka może ograniczyć listę ze względu na prywatność. Można porównać pierwszy obsługiwany język z URL lokalnie. [Standard HTML](https://html.spec.whatwg.org/multipage/system-state.html#dom-navigator-languages), [dokumentacja Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages)

**Propozycja:** pominąć geolokację w pierwszej wersji. Preferencja językowa odpowiada bezpośrednio na potrzebę. Lokalny odczyt ustawień przeglądarki nie wymaga usługi GeoIP ani pytania o GPS. Dla serwisu statycznego taki komunikat może działać po załadowaniu HTML. Nie wysyłamy listy języków jako własnego eventu analitycznego.

## 3. Umami Cloud: darmowy plan i zgoda

Aktualny plan **Hobby kosztuje 0 USD**, obejmuje **100 000 zdarzeń miesięcznie, jedną witrynę i 6 miesięcy retencji**, ze wsparciem społeczności. Odsłona liczy się jako zdarzenie; własne zdarzenia i zapisane właściwości także zużywają limit. Plan Hobby nie obejmuje API ani MCP. Cennik nie wyjaśnia jednoznacznie zachowania Hobby po przekroczeniu limitu: ogólne FAQ mówi o nadpłatach, ale tabela nie podaje stawki Hobby — trzeba sprawdzić w panelu przed uruchomieniem. [Aktualny cennik i FAQ](https://umami.is/pricing)

Umami deklaruje brak cookies w trackerze, anonimizację i brak śledzenia pomiędzy witrynami. Zbiera m.in. odsłony, referrer, przeglądarkę, system, typ urządzenia i kraj. Opis sesji mówi o hashu z IP, user agenta i identyfikatora witryny. Brak zapisu surowego IP nie oznacza, że IP nie bierze udziału w przetwarzaniu. [FAQ](https://docs.umami.is/docs/faq), [sesje](https://docs.umami.is/docs/sessions)

**Odpowiedź na „czy uniknę banera?”:** Umami twierdzi, że tak, ale sama etykieta „cookieless” nie daje pewnej odpowiedzi dla całej strony w Polsce i UE. EDPB wyjaśnia, że art. 5(3) ePrivacy obejmuje też techniki bez cookies; analizuje m.in. identyfikatory, lokalne przetwarzanie i śledzenie po IP. Jednocześnie wskazuje, że zastosowanie przepisu nie przesądza o zgodzie: trzeba ocenić wyjątki. [EDPB: wytyczne 2/2023, pkt 1, 52–56](https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)

Polski art. 399 Prawa komunikacji elektronicznej obejmuje przechowywanie informacji lub dostęp do informacji w urządzeniu, ustanawia informowanie i zgodę oraz wyjątki dla transmisji i usługi żądanej przez użytkownika. Nie ogranicza się nazwą do ciasteczek. [Oficjalny tekst ustawy, art. 399–400](https://api.sejm.gov.pl/eli/acts/DU/2024/1221/text.html) Artykuł w Biuletynie UODO omawia również wyrok Planet49: domyślnie zaznaczone pole nie stanowi ważnej zgody na cookies (biuletyn zastrzega, że nie wszystkie publikacje są oficjalnym stanowiskiem organu). [Biuletyn UODO, omówienie wyroku Planet49](https://uodo.gov.pl/file/6227)

CNIL dopuszcza ograniczone wyjątki dla pomiaru widowni przy konkretnych warunkach, a anonimizacja deklarowana przez dostawcę sama nie wystarcza. Jest to stanowisko regulatora francuskiego, którego nie można automatycznie potraktować jako polskiego zwolnienia. [CNIL: pytania 9–11](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ)

**Proponowany zakres analityki od pierwszego wdrożenia:** odsłony i kilka eventów, np. play audio, rozwinięcie TLDR, kopiowanie promptu, kliknięcie kontaktu. Bez nazwisk odwiedzających, wiadomości, identyfikatorów kont, danych rozmowy i niekontrolowanych parametrów URL. Bez obchodzenia blokad użytkownika. Przed uruchomieniem zapisać ocenę konkretnej konfiguracji trackera i wymaganej podstawy przetwarzania; opisać dostawców w informacji o prywatności oraz sprawdzić region danych i DPA. To nie jest gwarancja prawna braku banera. Umami publikuje umowę powierzenia i opisuje hosting w USA i UE. [DPA](https://umami.is/dpa), [cennik: lokalizacja](https://umami.is/pricing)

## 4. Czytanie, audio i agent

ElevenLabs umożliwia wygenerowanie nagrania i pobranie MP3 lub WAV. **Propozycja:** nagrywać osobno PL/EN przed publikacją, przechowywać pliki razem z zasobami strony oraz faktyczną długość w metadanych. Podpis „Lektor: 6 min 12 s” jest dokładniejszy od sugerowania, że to pomiar tempa czytania każdego odwiedzającego. [Oficjalny poradnik TTS](https://elevenlabs.io/docs/eleven-creative/playground/text-to-speech)

**Propozycja UX:** przełączenie lektora jest niezależne od języka tekstu; używamy etykiet „Polski / English”, flagi mogą być dodatkiem. TLDR i prompt powstają redakcyjnie razem z artykułem, więc nie wymagają API w przeglądarce. Przy długich nagraniach nie pobieramy obu wersji od razu. Audio ładowane po kliknięciu nie obciąża każdego czytelnika transferem.

Widget ElevenLabs obsługuje rozmowę i tryb tekstowy. Ustawienia agenta obejmują nagrywanie i retencję rozmów. **Propozycja:** własny lekki przycisk, który dopiero po świadomym uruchomieniu ładuje integrację; informacja o wysyłaniu rozmowy do ElevenLabs przed startem. Agent ma bazować na konkretnym artykule i autorskich notatkach; bez tych notatek nie powinien wymyślać intencji autora. [Widget](https://elevenlabs.io/docs/eleven-agents/customization/widget), [prywatność](https://elevenlabs.io/docs/eleven-agents/customization/privacy)

Audio statyczne i agent to osobne integracje. **Propozycja:** player uruchomić wcześniej, agenta wdrożyć po przygotowaniu wiedzy, ograniczeń kosztów i prób jakości. Prototyp pokazuje jego miejsce, ale nie tworzy płatnych rozmów.

## 5. Komentarze, reakcje, udostępnianie

Giscus jest darmowy, bez reklam i śledzenia według deklaracji projektu; przechowuje komentarze i reakcje w GitHub Discussions. Wymaga publicznego repozytorium, włączonych Discussions i instalacji aplikacji. Piszący komentarz autoryzuje się przez GitHub OAuth; można moderować w GitHubie. [Oficjalna strona Giscus](https://giscus.app/)

**Propozycja:** Giscus ładowany po „Pokaż komentarze”, ze stabilnym kluczem artykułu; jeden wspólny wątek dla PL/EN albo dwa, jeżeli zależy nam na rozdzieleniu dyskusji. Wadą produktową jest konto GitHub — dobre dla czytelników technicznych, słabsze dla pozostałych. Reakcje mogą obsłużyć polubienia. Globalny licznik anonimowych polubień wymaga zaufanego magazynu danych lub zewnętrznej usługi; lokalny przycisk nie powinien udawać licznika całej społeczności. Do udostępniania proponuję kopiowanie adresu i systemowe menu tam, gdzie dostępne, bez osadzania skryptów portali społecznościowych.

## 6. Offline jako osobna warstwa

Service worker może przechwytywać żądania i przechowywać zasoby, co pozwala czytać pobraną treść bez sieci; działa w bezpiecznym kontekście HTTPS, z wyjątkiem lokalnego środowiska. Przeglądarki zarządzają limitami pamięci i mogą usuwać dane; offline nie jest gwarantowanym archiwum. [Mozilla: service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), [limity i usuwanie](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

**Propozycja polityki cache:** publiczne HTML, CSS, lokalne fonty i grafiki; artykuły odwiedzone lub wybrane przez „Zapisz offline”; audio wyłącznie po osobnym wyborze, z podanym rozmiarem. Klucze cache uwzględniają pełny URL PL/EN, a aktualizacja usuwa stare wersje. Nie zapisujemy rozmów, autoryzacji GitHub, odpowiedzi komentarzy ani żądań analitycznych. Bez kolejkowania eventów analityki do późniejszego wysłania. „Usuń zapisane dane” czyści cache tej funkcji. Rozmowa i komentarze offline są niedostępne — tekst, TLDR i prompt pozostają użyteczne. Zakres pamięci urządzenia należy też uwzględnić w ocenie art. 399; samo PWA nie daje ogólnego zwolnienia.

## 7. DEV jako dodatkowa dystrybucja

Forem/DEV pozwala przy tworzeniu lub edycji artykułu podać `canonical_url`. **Propozycja:** publikować oryginał na własnej domenie, a kopię na DEV ze wskazaniem odpowiedniego artykułu w tym samym języku. [Oficjalne API Forem](https://developers.forem.com/api/v1#tag/articles/operation/createArticle) Canonical jest sygnałem wyboru głównego URL, nie gwarancją, że wyszukiwarka zawsze wybierze wskazany adres. [Google: canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## 8. Proponowana kolejność prac

1. **Teraz:** kilka odmiennych prototypów HTML/CSS: ta sama wizytówka, lista wpisów i artykuł; sprawdzamy typografię, klimat i czytanie na telefonie. Bez produkcyjnych integracji.
2. **Po wyborze kierunku:** wybór stacku, prawdziwe zdjęcie, bio i kontakt; model par tłumaczeń, źródła MD/MDX i statyczne HTML. SEO i konfiguracja Umami w pierwszym wdrożeniu.
3. **Pierwszy pełny artykuł PL/EN:** rzeczywiste nagrania i długości, pięć zdań TLDR, prompt, progres, powrót do początku i udostępnianie. Weryfikacja klawiaturą, na telefonie i bez JavaScript.
4. **Następnie:** Giscus, zapis wybranych artykułów offline i test aktualizacji cache.
5. **Na końcu:** agent uruchamiany na żądanie, po przygotowaniu wiedzy i prób odpowiedzi; syndykacja na DEV.

Otwarte decyzje dla kolejnego etapu: wybrany wariant UI, docelowe bio i zdjęcie, publiczne kanały kontaktu, podział komentarzy PL/EN, plan ElevenLabs i ocena konfiguracji prywatności przed publikacją. Żadna z nich nie blokuje obecnego porównania wizualnego.
