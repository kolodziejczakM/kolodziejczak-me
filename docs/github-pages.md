# Deployment na GitHub Pages i domena w Hostingerze

Docelowy adres: **https://kolodziejczak.me/**. To hosting strony bezpośrednio pod własną domeną, a nie przekierowanie na VPS. Publiczny ruch obsługuje GitHub Pages; VPS pozostaje prywatnym środowiskiem developmentu w Tailscale. Nie trzeba otwierać portów WWW w Hetznerze.

Proces odpowiada workflow w repozytorium `code-motion`: build na GitHubie, artefakt i deployment przez oficjalne akcje Pages. Tutaj przed publikacją dochodzą testy, audyt zależności i skan sekretów. Nie używamy klucza SSH, własnego PAT ani gałęzi `gh-pages`.

## Co uruchamia publikację

- PR uruchamia `Validate`: skan historii i plików, build/testy prywatnego podglądu oraz pełną kontrolę buildu produkcyjnego.
- Push do `main`, także merge PR, uruchamia jeden workflow `Deploy GitHub Pages`.
- Ręczne ponowienie: Actions → Deploy GitHub Pages → Run workflow, z wybraną gałęzią `main`. Inne gałęzie nie mogą się wdrożyć.
- Job `build` sprawdza konfigurację domeny, uruchamia `npm run release:check` i przekazuje tylko `dist-production/` do `upload-pages-artifact`. Job `deploy` startuje dopiero po sukcesie i używa środowiska `github-pages` oraz wbudowanego OIDC/GITHUB_TOKEN.
- Błąd walidacji, audytu lub skanu zatrzymuje wdrożenie. Poprzednia strona pozostaje opublikowana. Kolejne wdrożenia są kolejkowane przez concurrency.

Pliki: `.github/workflows/deploy-pages.yml`, `.github/workflows/validate.yml`. Uprawnienia `pages: write` i `id-token: write` ma tylko job wdrożenia. Akcje przypięto do konkretnych commitów; skaner Gitleaks do wersji i sumy SHA-256.

## Jednorazowa konfiguracja GitHuba

1. Przeczytaj [wynik audytu przed upublicznieniem](public-repository-audit.md). Zmiana widoczności udostępnia historię, a nie tylko aktualne pliki. Repo pozostaje prywatne do świadomej decyzji właściciela. Na GitHub Free Pages wymaga repo publicznego; GitHub Pro obsługuje również repo prywatne. Kod strony publikowanej na Pages jest dostępny publicznie niezależnie od prywatności źródeł.
2. Po decyzji o upublicznieniu: repo → Settings → General → Danger Zone → Change repository visibility → Public. Nie zmieniaj nazwy repo ani właściciela. Pole `private: true` w package.json chroni przed przypadkową publikacją w npm i może pozostać.
3. **Zweryfikuj domenę na swoim koncie GitHub:** ustawienia profilu → Pages → Add a domain → `kolodziejczak.me`. GitHub pokaże nazwę `_github-pages-challenge-kolodziejczakM` i wartość TXT. Dodaj je w Hostingerze dokładnie według instrukcji GitHuba, następnie wybierz Verify. Pozostaw rekord TXT po weryfikacji. Nie wpisujemy ani nie zgadujemy jego wartości w repo.
4. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
5. W tym samym miejscu ustaw **Custom domain: `kolodziejczak.me`** i zapisz. Zrób to przed przestawieniem rekordów ruchu WWW w DNS. Nie wpisuj `https://`, `www` ani ścieżki repozytorium. Workflow sprawdza domenę i zatrzyma się, jeśli Pages nadal wskazuje adres `github.io/kolodziejczak-me/`, bo strona używa ścieżek od korzenia domeny.
6. W Settings → Environments → `github-pages` ustaw Deployment branches and tags na gałąź `main`. Dla automatycznej publikacji bez dodatkowego kliknięcia nie dodawaj obowiązkowego zatwierdzającego. Jeżeli środowisko jeszcze nie istnieje, utwórz je ręcznie lub po pierwszym uruchomieniu deploymentu. Przy publikacji repo warto także chronić `main` i wymagać udanego `Validate` przed mergem; wdrożenia nie wymagają wtedy ręcznego kopiowania plików.

Przy custom workflow plik `public/CNAME` nie zastępuje ustawienia Custom domain i nie jest wymagany. Nie dodajemy `base: '/kolodziejczak-me'` - domena ma serwować stronę w `/`.

## Ustawienia DNS w Hostingerze

Jeżeli DNS domeny obsługuje Hostinger: hPanel → Domains → DNS → `kolodziejczak.me` → DNS records (także przez DNS / Nameservers w zarządzaniu domeną). Jeśli nameservery wskazują innego operatora, zmiany wykonuje się u niego. Nie trzeba przenosić domeny ani kupować hostingu WWW w Hostingerze.

Po weryfikacji TXT i zapisaniu domeny w GitHub Pages ustaw:

| Typ   | Nazwa / Host                                 | Wartość / Points to          |
| ----- | -------------------------------------------- | ---------------------------- |
| A     | `@`                                          | `185.199.108.153`            |
| A     | `@`                                          | `185.199.109.153`            |
| A     | `@`                                          | `185.199.110.153`            |
| A     | `@`                                          | `185.199.111.153`            |
| CNAME | `www`                                        | `kolodziejczakm.github.io`   |
| TXT   | nazwa wskazana przez GitHub przy weryfikacji | wartość skopiowana z GitHuba |

TTL może zostać domyślny. CNAME `www` nie zawiera protokołu ani `/kolodziejczak-me/`. Zastąp konfliktujące rekordy WWW dla `@` i `www`, np. parking Hostingera lub adres VPS. Usuń stare AAAA prowadzące gdzie indziej albo ustaw komplet IPv6 poniżej. Nie zmieniaj MX ani TXT dla poczty, SPF, DKIM i DMARC. Nie ustawiaj wildcardu `*` i nie korzystaj z funkcji URL forwarding.

Opcjonalne IPv6, obok powyższych rekordów A:

| Typ  | Nazwa | Wartość               |
| ---- | ----- | --------------------- |
| AAAA | `@`   | `2606:50c0:8000::153` |
| AAAA | `@`   | `2606:50c0:8001::153` |
| AAAA | `@`   | `2606:50c0:8002::153` |
| AAAA | `@`   | `2606:50c0:8003::153` |

Jeżeli są rekordy CAA ograniczające wystawianie certyfikatów, sprawdź, czy dopuszczają `letsencrypt.org`. Nie usuwaj ich wszystkich bez sprawdzenia przeznaczenia. Po zmianach poczekaj na aktualizację DNS; GitHub podaje, że może to potrwać do 24 godzin.

## Pierwsze wydanie i HTTPS

1. Po mergu tego wdrożenia do `main` lub po wykonaniu jednorazowych ustawień uruchom Deploy GitHub Pages ręcznie z `main`. Jeśli workflow wystartował przed konfiguracją Pages/domeny i się zatrzymał, ponów go po ustawieniu obu.
2. W Actions sprawdź sukces builda i deploya. W Settings → Pages powinien pojawić się adres `https://kolodziejczak.me/`.
3. Po poprawnej kontroli DNS i wystawieniu certyfikatu zaznacz **Enforce HTTPS** w Settings → Pages. Obsługę i odnawianie certyfikatu zapewnia GitHub. `www.kolodziejczak.me` powinno przekierowywać na domenę główną.
4. Bez Tailscale sprawdź root, PL/EN, `/pl/blog/`, `/design/`, RSS i sitemap oraz nieistniejący adres z odpowiedzią HTTP 404. Obecne próbki nie powinny mieć routingu ani odsyłaczy. HTTPS dla obu nazw może wymagać czasu na certyfikat.

Pomocnicze polecenia do kontroli (niczego nie zmieniają):

```sh
dig +short kolodziejczak.me A
dig +short www.kolodziejczak.me CNAME
curl -I https://kolodziejczak.me/
curl -I https://www.kolodziejczak.me/
curl -I https://kolodziejczak.me/adres-ktorego-nie-ma/
```

## Kolejne artykuły i powrót do poprzedniej wersji

Edycja MDX i audio → PR → zielony Validate → merge do main → automatyczny deployment. Nie kopiujesz dist na VPS. Lokalny `npm run release:check` generuje identyczny publiczny wynik w `dist-production/`; `npm run validate` i dotychczasowy podgląd używają osobnego `dist/` z próbkami i noindex.

Nie zmieniaj ręcznie `readyToPublish` w kodzie: wybór wynika z `SITE_ENV=production`, ustawianego przez polecenie produkcyjne. Próbki pozostają `sample: true` w źródłach i są zawsze wykluczone z produkcji. Prawdziwy wpis ma `sample: false` i `draft: false`. Pusty blog nie blokuje wydania wizytówki; pierwsza prawdziwa publikacja automatycznie przywraca sekcję najnowszych artykułów.

Rollback: revert niepożądanej zmiany w main i ponowny merge. Workflow zbuduje poprzedni stan przy aktualnych kontrolach. Nie przestawiaj DNS ani domeny przy każdym wydaniu. Zmiana daty przyszłego artykułu nie uruchamia automatycznie builda w tym terminie - potrzebny jest kolejny push lub ręczne Run workflow.

## Granice GitHub Pages

Hosting nie obsługuje dowolnej konfiguracji Caddy/Nginx i własnych nagłówków HTTP. `/design/` jest niepodlinkowany i ma noindex, ale pozostaje publicznym plikiem; w publicznym repo publiczne są także szkice, przykłady i historia. Nigdy nie dodawaj prywatnych plików do `public/`, bo są kopiowane do artefaktu. Audio musi mieścić się w limitach repo i Pages: pojedynczy plik GitHub nie powinien przekraczać 100 MiB, a rozmiar opublikowanej strony 1 GB. Przy dużej bibliotece audio będzie potrzebny osobny hosting plików. Nie używamy Git LFS do nagrań publikowanych przez ten workflow.

## Źródła

- [GitHub: custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
- [GitHub: domena, rekordy A/AAAA/CNAME i HTTPS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- [GitHub: weryfikacja domeny](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
- [GitHub: limity Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
- [Hostinger: zarządzanie rekordami DNS](https://www.hostinger.com/support/1583249-how-to-manage-dns-records-at-hostinger/).
- [GitHub: CAA i rozwiązywanie problemów z HTTPS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).
- [Astro: GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).
