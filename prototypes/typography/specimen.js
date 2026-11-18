/* Research specimen only. No new website layouts, services or persistent state. */
const $ = s => document.querySelector(s);
const pairings = [
  {id:'1',name:'Bricolage + Hanken',head:'Bricolage Grotesque',body:'Hanken Grotesk',ui:'Hanken Grotesk',headKey:'bricolagegrotesque',bodyKey:'hankengrotesk',uiKey:'hankengrotesk',tone:'Pogodny · popularniejszy punkt odniesienia',weight:700,vars:'"wdth" 100',bodyVars:'normal',note:'Wyrazisty nagłówek i spokojny tekst bez szeryfów. Bricolage ma wskaźnik popularity 62 w katalogu Google Fonts — pozostaje punktem odniesienia, nie obietnicą rzadkości.',risk:'Bricolage potrafi dominować — tutaj używamy go wyłącznie w dużych nagłówkach.',source:'https://github.com/ateliertriay/bricolage'},
  {id:'2',name:'Gabarito + Literata',head:'Gabarito',body:'Literata',ui:'Hanken Grotesk',headKey:'gabarito',bodyKey:'literata',uiKey:'hankengrotesk',tone:'Ciekawość i długa lektura',weight:700,vars:'normal',bodyVars:'normal',note:'Pogodny głos hasła, pod nim książkowy rytm artykułu. Sprawdź, czy taka zmiana tonu pasuje do Twoich poważniejszych publikacji.',risk:'Zbyt dużo miękkich ilustracji mogłoby przesunąć ten zestaw w stronę edukacyjnej strony dla dzieci.',source:'https://github.com/naipefoundry/gabarito'},
  {id:'3',name:'Commissioner × 2',head:'Commissioner',body:'Commissioner',ui:'Commissioner',headKey:'commissioner',bodyKey:'commissioner',uiKey:'commissioner',tone:'Jeden głos, dwa rejestry',weight:700,vars:'"FLAR" 70,"VOLM" 40',bodyVars:'"FLAR" 0,"VOLM" 0',note:'Jedna rodzina: w haśle rozszerzone zakończenia kresek, w tekście spokojniejszy rysunek. Sprawdź, czy zauważasz charakter bez dekoracji.',risk:'To subtelniejszy wyróżnik. Pochylenie pochodzi z osi slnt, a nie z osobno narysowanej kursywy.',source:'https://github.com/kosbarts/Commissioner'},
  {id:'4',name:'Schibsted + Newsreader',head:'Schibsted Grotesk',body:'Newsreader',ui:'Schibsted Grotesk',headKey:'schibstedgrotesk',bodyKey:'newsreader',uiKey:'schibstedgrotesk',tone:'Współczesny autor',weight:700,vars:'normal',bodyVars:'normal',note:'Rzeczowy nagłówek i szeryfowy tekst projektowany do czytania na ekranie. To spokojniejszy punkt odniesienia dla bardziej osobistych zestawów.',risk:'Może wyjść zbyt wydawniczo i zbyt mało indywidualnie. Oceń po dłuższym fragmencie, nie tylko haśle.',source:'https://github.com/productiontype/NewsReader'},
  {id:'5',name:'Alegreya + Hanken',head:'Alegreya',body:'Hanken Grotesk',ui:'Hanken Grotesk',headKey:'alegreya',bodyKey:'hankengrotesk',uiKey:'hankengrotesk',tone:'Żywa typografia',weight:700,vars:'normal',bodyVars:'normal',note:'Szeryfowy nagłówek z bardziej kaligraficznym rytmem, połączony ze spokojnym sansem w artykule. Inny rodzaj retro niż w pierwszym wariancie A.',risk:'Może brzmieć zbyt literacko dla Twojej strony. Warto sprawdzić bez ilustracji, jak tutaj.',source:'https://github.com/huertatipografica/Alegreya'},
  {id:'6',name:'Ysabeau × 2',head:'Ysabeau',body:'Ysabeau',ui:'Ysabeau',headKey:'ysabeau',bodyKey:'ysabeau',uiKey:'ysabeau',tone:'Nietypowy sans',weight:750,vars:'normal',bodyVars:'normal',note:'Bezszeryfowe litery o książkowym, kaligraficznym rytmie. To próba wyjścia poza znajomy wygląd stron technologicznych.',risk:'Delikatniejszy rysunek: porównaj tekst przy 20 i 22 px oraz zwróć uwagę na małe podpisy.',source:'https://github.com/CatharsisFonts/Ysabeau'}
];
const backgrounds = {reference:'#162823',deep:'#13231f','original-b':'#111b1c'};
const state={pair:'3',view:'sample',lang:'pl',size:20,leading:1.75,measure:64,bg:'reference'};
let manifest,loadSerial=0,copyTimer;
const pl = () => state.lang==='pl';
const tr = (a,b) => pl()?a:b;
const selected = () => pairings.find(p=>p.id===state.pair);
const safeNumber=(value,fallback,min,max)=>Number.isFinite(Number(value))&&value!==null?Math.min(max,Math.max(min,Number(value))):fallback;

function readURL(){
  const q=new URLSearchParams(location.search);
  state.pair=pairings.some(p=>p.id===q.get('pair'))?q.get('pair'):'3';
  state.view=['sample','compare','glyphs'].includes(q.get('view'))?q.get('view'):'sample';
  state.lang=q.get('lang')==='en'?'en':'pl';
  state.size=safeNumber(q.get('size'),20,18,24);state.leading=safeNumber(q.get('leading'),1.75,1.5,2);state.measure=safeNumber(q.get('measure'),64,48,74);
  state.bg=backgrounds[q.get('bg')]?q.get('bg'):'reference';
}

function writeURL(){const u=new URL(location.href);for(const[k,v]of Object.entries(state))u.searchParams.set(k,v);history.replaceState({},'',u);}
function styleFor(p){return `--head:'${p.head}';--body:'${p.body}';--sample-ui:'${p.ui}';--head-vars:${p.vars};--body-vars:${p.bodyVars};--weight:${p.weight}`;}
function headline(){return tr('Ciekawość to<br>dobry <span>początek.</span>','Curiosity is<br>a good <span>beginning.</span>');}
function paragraph(){return tr('Interfejs jest obietnicą: mówi, co możemy zrobić i czego spodziewać się po drugiej stronie. Gdy obietnica jest czytelna, nie musimy znać wszystkich szczegółów działania systemu. Gdy jest niejasna, nawet niewielka zmiana wymaga zaglądania w miejsca, o których wcześniej nie myśleliśmy.','An interface is a promise: it tells us what we can do and what to expect in return. When that promise is clear, we do not need to know every detail of the system. When it is vague, even a small change requires looking into places we had not thought about before.');}
function intro(){return tr('Cześć, jestem Marcin Kołodziejczak. Lubię rozumieć, jak działają rzeczy — i dzielić się tym, co odkryję po drodze.','Hi, I’m Marcin Kołodziejczak. I like understanding how things work — and sharing what I discover along the way.');}
function articleTitle(){return tr('Dobre pytanie zmienia perspektywę.','A good question changes the perspective.');}

function fontDetails(p){
  const files=manifest.files.filter(f=>[p.headKey,p.bodyKey,p.uiKey].includes(f.family));
  const unique=[...new Set([p.headKey,p.bodyKey,p.uiKey])];
  return `<details class="font-details"><summary>Co porównujemy? Źródła, odmiany i licencje</summary><p><b>Hasło:</b> ${p.head}, waga ${p.weight}. <b>Artykuł:</b> ${p.body}, waga 400. <b>Mały interfejs:</b> ${p.ui}, waga 500. ${p.id==='3'?'Nagłówek FLAR 70 / VOLM 40, tekst FLAR 0 / VOLM 0.':''}</p><p>${p.risk}</p><p>${p.id==='1'||p.id==='2'?'Hasło jest proste: w tej rodzinie nie ma osobnego italic. Nie generujemy sztucznej kursywy.':'Pogrubienie i pochylenie możesz ocenić w tekście poniżej oraz w zakładce „Sprawdź znaki”.'}</p><p>To ocena dopasowania do briefu. Raport podaje wskaźnik popularity oficjalnego katalogu Google Fonts; nie jest to pomiar udziału w całym internecie.</p><div class="sources"><a href="${p.source}" target="_blank" rel="noreferrer">Autor / projekt</a>${unique.map(key=>`<a href="/typography/fonts/${key}/OFL.txt" target="_blank">Licencja ${key}</a>`).join('')}<a href="/typography/fonts/source-manifest.json" target="_blank">Wersje i weryfikacja znaków</a><a href="/typography/fonts/popularity-snapshot.json" target="_blank">Wskaźnik popularności</a></div><p>Sprawdzone pliki: ${files.map(f=>`${f.postscriptName} (${f.version.split(';')[0]})`).join(' · ')}.</p></details>`;
}

function sample(p){
  return `<section class="sample-sheet ${p.id==='3'?'commissioner':''}" style="${styleFor(p)}" lang="${state.lang}"><p class="sample-kicker">${tr('Internet jest fajniejszy z ludźmi','The internet is better with people')}</p><h2 class="sample-headline">${headline()}</h2><p class="sample-intro">${intro()}</p><div class="micro-sample" style="font-family:'${p.ui}';font-variation-settings:normal"><strong>Marcin Kołodziejczak</strong><div><span>${tr('O mnie','About')}</span><span class="current">${tr('Artykuły','Articles')}</span><span>${tr('Kontakt','Contact')}</span></div></div><p class="article-label">${tr('Przykładowy fragment do oceny typografii — to nie jest opublikowany artykuł','Sample passage for evaluating typography — this is not a published article')}</p><article class="body-sample"><h2>${articleTitle()}</h2><p>${paragraph()}</p><p>${tr('Weźmy pamięć podręczną. Sama operacja zapisania wyniku jest prosta. Trudniejsze pytania pojawiają się później: <strong>kto odpowiada za jego aktualność?</strong> Co ma się wydarzyć, gdy dane zmienią się w innym miejscu? Czy osoba korzystająca z modułu musi wiedzieć, kiedy wyczyścić zapis?','Consider a cache. Saving a result is straightforward. The harder questions come later: <strong>who is responsible for keeping it fresh?</strong> What should happen when the data changes elsewhere? Does the person using the module need to know when to clear it?')}</p><blockquote>${tr('Dobry punkt wyjścia: nazwać rzecz, którą chcemy zrozumieć, zanim wybierzemy narzędzie.','A good starting point: name the thing we want to understand before choosing a tool.')}</blockquote><h3>${tr('Gdzie przebiega odpowiedzialność?','Where does the responsibility lie?')}</h3><p>${tr('Jeżeli każdy fragment aplikacji sam zarządza tymi szczegółami, rozwiązanie zaczyna przeciekać poza własne granice. Warto wtedy wrócić do kontraktu. Zamiast dodawać kolejną instrukcję w dokumentacji, można zapytać, czy <em>to moduł powinien przejąć odpowiedzialność za unieważnianie danych</em>.','If every part of the application manages these details on its own, the solution starts leaking beyond its boundaries. That is a good time to revisit the contract. Rather than adding another instruction to the documentation, we can ask whether <em>the module itself should own the responsibility for invalidating data</em>.')}</p><p>${tr('Pomaga rozpisanie trzech spraw:','It helps to write down three things:')}</p><ul><li>${tr('Gdzie znajduje się źródło prawdy?','Where is the source of truth?')}</li><li>${tr('Jak długo wynik może pozostać nieaktualny?','How long can a result remain out of date?')}</li><li>${tr('Kto decyduje o ponownym odczycie?','Who decides when to read it again?')}</li></ul><p>${tr('Odpowiedzi nie muszą od razu prowadzić do dużej przebudowy. Czasem wystarczy zmienić jedną nazwę albo ukryć szczegół, którego użytkownik modułu nie powinien potrzebować. Więcej o kierunku tej strony znajdziesz w <a href="/typography/research.html">notatce z researchu</a>.','The answers do not need to lead to a major rewrite. Sometimes it is enough to change a name or hide a detail that a module’s users should not need to know. Read more about the direction of this website in the <a href="/typography/research.html">research notes</a>.')}</p><small>${tr('Marcin Kołodziejczak · przykład typograficzny · 17 października 2026','Marcin Kołodziejczak · typography sample · 17 October 2026')}</small></article><div class="small-sample" style="font-family:'${p.ui}';font-variation-settings:normal"><span>${tr('MAŁE LITERY TEŻ MAJĄ ZNACZENIE','SMALL TYPE MATTERS TOO')}</span>${tr('Artykuły · Posłuchaj lektora · Udostępnij · Przeczytaj w pięciu zdaniach. Źródła i przypisy powinny pozostać wygodne do odczytania.','Articles · Listen to narration · Share · Read it in five sentences. Sources and footnotes should remain comfortable to read.')}</div>${fontDetails(p)}</section>`;
}

function compare(){return `<p class="compare-intro">Ten sam nagłówek i akapit, te same rozmiary. Kliknij „Przeczytaj dłuższy fragment”, żeby ocenić wybrany zestaw w kontekście.</p><div class="compare-grid">${pairings.map(p=>`<section class="compare-card" style="${styleFor(p)}" lang="${state.lang}"><small>0${p.id} / ${p.head} + ${p.body}</small><h2>${headline()}</h2><p>${paragraph()}</p><button data-open="${p.id}">Przeczytaj dłuższy fragment</button></section>`).join('')}</div>`;}
function glyphs(p){return `<section class="glyph-sheet ${p.id==='3'?'commissioner':''}" style="${styleFor(p)}"><h2>Diakrytyki, rytm, detale.</h2><div class="glyph-block"><small>HASŁO / ${p.head}</small><p class="glyph-head">ĄĆĘŁŃÓŚŹŻ<br>ąćęłńóśźż<br>Kołodziejczak<br>Zażółć gęślą jaźń.</p></div><div class="glyph-block"><small>PROZA / ${p.body}</small><p class="glyph-body">Łączę ciekawość z rzetelną pracą.<br>„Dobry początek” — a później?<br>“Curiosity”, questions & ideas…<br><br>Il1 · O0 · rn m · aą · eę · lł<br>0123456789 · 2026 · 5 min 42 s<br><br>Zwykły tekst. <strong>Pogrubiony fragment.</strong><br><em>${p.id==='3'?'Pochylenie z osi slnt (−12°).':'Kursywa z osobnego pliku italic.'}</em></p></div><p class="glyph-confirm">Polskie litery oraz „”–—… potwierdzono bezpośrednio w ${manifest.files.filter(f=>[p.headKey,p.bodyKey].includes(f.family)).length} plikach tego zestawu. To kontrola obecności znaków, nie certyfikat jakości optycznej. <a href="/typography/fonts/source-manifest.json">Zobacz wersje i wyniki</a></p>${fontDetails(p)}</section>`;}

function updateSettings(){
  const style=document.documentElement.style;style.setProperty('--bg',backgrounds[state.bg]);style.setProperty('--size',state.size+'px');style.setProperty('--leading',state.leading);style.setProperty('--measure',state.measure+'ch');
  for(const key of ['size','leading','measure']){$('#'+key).value=state[key];document.querySelector(`output[for="${key}"]`).textContent=key==='size'?state[key]+' px':key==='measure'?state[key]+' ch':state[key].toFixed(2);}
  document.querySelectorAll('[data-view]').forEach(e=>e.setAttribute('aria-pressed',e.dataset.view===state.view));document.querySelectorAll('[data-lang]').forEach(e=>e.setAttribute('aria-pressed',e.dataset.lang===state.lang));document.querySelectorAll('[data-bg]').forEach(e=>e.setAttribute('aria-pressed',e.dataset.bg===state.bg));
  $('#state-readout').textContent=`Zestaw ${state.pair} · ${state.lang.toUpperCase()} · ${state.view} · ${state.size} px / ${state.leading.toFixed(2)} / ${state.measure} ch · ${backgrounds[state.bg]}`;
}

function preload(keys){
  for(const f of manifest.files.filter(f=>keys.includes(f.family))){const url=`/typography/fonts/${f.family}/${encodeURIComponent(f.file)}`;if([...document.querySelectorAll('link[rel=preload]')].some(l=>new URL(l.href).pathname===url))continue;const link=document.createElement('link');link.rel='preload';link.as='font';link.type='font/ttf';link.crossOrigin='anonymous';link.href=url;document.head.append(link);}
}

async function render(){
  const serial=++loadSerial,p=selected();
  preload(state.view==='compare'?pairings.flatMap(x=>[x.headKey,x.bodyKey]):[p.headKey,p.bodyKey,p.uiKey]);
  $('#pairings').innerHTML=pairings.map(x=>`<button class="pair-option" data-pair="${x.id}" aria-pressed="${x.id===state.pair}"><span class="pair-index">0${x.id}</span><span><strong>${x.name}</strong><small>${x.tone}</small></span></button>`).join('');
  $('#selection-note').innerHTML=`<div class="selection-meta"><span>${state.view==='compare'?'SZEŚĆ ZESTAWÓW / JEDEN PUNKT ODNIESIENIA':`0${p.id} / ${p.head} + ${p.body}`}</span><button data-copy>Kopiuj link do ustawień</button></div><p class="selection-note">${state.view==='compare'?'Ocena własnego charakteru jest subiektywna. Odrzucone Inter, Lato, Roboto, Montserrat i Open Sans nie występują w żadnym zestawie.':p.note}</p><div class="font-status" aria-live="polite">Wczytuję lokalne kroje…</div>`;
  $('#specimen').innerHTML=state.view==='sample'?sample(p):state.view==='compare'?compare():glyphs(p);updateSettings();
  document.title=`${state.view==='compare'?'Porównanie 6 zestawów':p.name} · Typografia · kolodziejczak.me`;
  await new Promise(requestAnimationFrame);
  await document.fonts.ready;
  if(serial!==loadSerial)return;
  const failed=[...document.fonts].filter(f=>f.status==='error');
  $('.font-status').textContent=failed.length?'Nie udało się wczytać części krojów — odśwież stronę, zanim porównasz wygląd.':'Fonty wczytane lokalnie. Układ i tekst pozostają takie same.';
}

document.addEventListener('click',async e=>{
  const pair=e.target.closest('[data-pair]'),view=e.target.closest('[data-view]'),lang=e.target.closest('[data-lang]'),bg=e.target.closest('[data-bg]'),open=e.target.closest('[data-open]');
  if(pair){state.pair=pair.dataset.pair;writeURL();render();}
  if(view){state.view=view.dataset.view;writeURL();render();}
  if(lang){state.lang=lang.dataset.lang;writeURL();render();}
  if(bg){state.bg=bg.dataset.bg;writeURL();updateSettings();}
  if(open){state.pair=open.dataset.open;state.view='sample';writeURL();render();$('#selection-note').scrollIntoView({block:'start'});}
  if(e.target.closest('[data-copy]')){
    writeURL();try{await navigator.clipboard.writeText(location.href);$('.copy-status').textContent='Link skopiowany.';$('.copy-status').classList.add('visible');clearTimeout(copyTimer);copyTimer=setTimeout(()=>$('.copy-status').classList.remove('visible'),2500);}
    catch{let field=$('.manual-copy');if(!field){field=document.createElement('input');field.className='manual-copy';field.readOnly=true;field.setAttribute('aria-label','Link do porównania — skopiuj ręcznie');$('#selection-note').append(field);}field.value=location.href;field.focus();field.select();}
  }
});
for(const key of ['size','leading','measure'])$('#'+key).addEventListener('input',e=>{state[key]=Number(e.target.value);writeURL();updateSettings();});
addEventListener('popstate',()=>{readURL();render();});
readURL();
fetch('/typography/fonts/source-manifest.json').then(r=>r.json()).then(data=>{manifest=data;render();}).catch(()=>{$('#specimen').textContent='Nie udało się wczytać danych próbnika. Odśwież stronę.';});
