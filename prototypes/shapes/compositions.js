/* THROWAWAY round 3: four compositions on the existing C route.
   Question: can hierarchy, rhythm and a personal mark provide the missing character?
   Approved palette/fonts, solid field borders, separate cycle from earlier rounds. */
Object.assign(shapeVariants,{
  gesture:{round:3,iconStyle:'press',name:'Duży gest',en:'A bold gesture',
    description:'Duża typografia, jeden mocny znak i artykuł na pierwszym planie. Przyciski mają sprężysty, drukowany charakter.',
    descriptionEn:'Large typography, one bold mark, and a featured article. Buttons have a tactile printed character.',
    detail:'Hasło buduje całą kompozycję. Pierwszy artykuł jest większy, dwa kolejne tworzą spokojną kolumnę obok.',
    detailEn:'The headline anchors the composition. One large article sits beside a quiet column of two more.'},
  rhythm:{round:3,iconStyle:'orbit',name:'Własny rytm',en:'My own rhythm',
    description:'Wyraźny podział na myśl i osobę. Zamiast trzech kartek — rytm szerokich wierszy z numerem i okrągłą strzałką.',
    descriptionEn:'An idea and its author, side by side. Wide numbered article rows replace the three-card grid.',
    detail:'Krótkie bio ma własny panel. Artykuły tworzą jedną listę, a kontrastowe koło wskazuje miejsce działania.',
    detailEn:'The short bio has its own panel. Articles share one continuous list, with circles marking the actions.'},
  close:{round:3,iconStyle:'orbit',name:'Blisko',en:'Closer',
    description:'Centralna, otwarta wizytówka w jednej dużej ramie. Mały znak spotkania i spokojne, miękkie karty.',
    descriptionEn:'A centred introduction inside one generous frame. A small meeting mark and quiet, soft cards.',
    detail:'Osoba, hasło i kontakt są na wspólnej osi. Motyw dwóch stykających się form nawiązuje do rozmowy, bez narzucania tematu bloga.',
    detailEn:'Person, headline and contact share one axis. Two touching forms suggest conversation without imposing a subject on the site.'},
  signature:{round:3,iconStyle:'press',name:'Sygnatura',en:'Signature',
    description:'Autorski monogram zamiast ilustracji kursora. Spokojny układ z jednym bardzo wyrazistym elementem tożsamości.',
    descriptionEn:'A personal monogram replaces the cursor illustration. A quiet layout with one distinctive identity element.',
    detail:'Rysowany znak mk. pracuje w nagłówku i wizytówce. Dwa jasne artykuły otwiera ciemny, szeroki trzeci wpis.',
    detailEn:'A drawn mk. mark appears in the header and introduction. Two light articles are followed by a wide dark third entry.'}
});

function compositionMark(kind){
  if(kind==='signature')return `<svg class="signature-mark" viewBox="0 0 310 210" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"><path d="M30 161V88q0-29 23-29t23 29v73-73q0-29 23-29t23 29v73M177 31v130m0-47 62-55m-37 34 42 68"/></g><circle cx="282" cy="161" r="11" fill="currentColor"/></svg>`;
  if(kind==='close')return `<svg class="meeting-mark" viewBox="0 0 160 80" fill="none" aria-hidden="true"><path d="M13 40C13 7 48 4 72 27l8 8-8 13C48 80 13 72 13 40Z" fill="var(--secondary)" stroke="var(--bg)" stroke-width="3"/><path d="M147 40c0-33-35-36-59-13l-8 8 8 13c24 32 59 24 59-8Z" fill="var(--accent)" stroke="var(--bg)" stroke-width="3"/><circle cx="80" cy="38" r="7" fill="var(--text)"/></svg>`;
  return `<svg class="gesture-mark" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 10C122 10 120 54 136 64S190 77 190 100s-40 21-54 36-14 54-36 54-22-40-36-54-54-14-54-36 40-22 54-36S78 10 100 10Z" fill="currentColor"/><circle cx="100" cy="100" r="15" fill="var(--bg)"/></svg>`;
}

function compositionBio(){
  return `<div class="composition-bio">${portrait('tiny')}<p>${t('Cześć, Marcin tutaj. Łączę kropki między kodem, AI i codziennym życiem. Tutaj dzielę się tym, czego uczę się po drodze.','Hi, Marcin here. Connecting the dots between code, AI, and everyday life. This is where I share what I learn along the way.')}</p></div>`;
}
function compositionCTA(){return link('blog',t('Zobacz, co mi chodzi po głowie','See what’s on my mind')+icons.arrow,'solid-link composition-cta');}
function compositionKicker(){return `<span class="eyebrow composition-kicker">${t('INTERNET JEST FAJNIEJSZY Z LUDŹMI','THE INTERNET IS BETTER WITH PEOPLE')}</span>`;}
function compositionTitle(kind){
  const text=kind==='gesture'?t('<span>Ciekawość to dobry</span><em>początek.</em>','<span>Curiosity is a good</span><em>beginning.</em>'):kind==='signature'?t('Ciekawość<br>to dobry<br><em>początek.</em>','Curiosity<br>is a good<br><em>beginning.</em>'):t('Ciekawość to<br>dobry <em>początek.</em>','Curiosity is<br>a good <em>beginning.</em>');
  return `<h1>${text}</h1>`;
}
function compositionCards(){
  return `<div class="note-cards">${posts.map((p,i)=>`<a data-route href="${href('article',p)}" class="note-card card-${i}"><span class="composition-index" aria-hidden="true">0${i+1}</span><div class="note-card-top"><span>${textOf(p.label)}</span><span>${icons.spark}</span></div><h3>${textOf(p.title)}</h3><p>${textOf(p.desc)}</p><div class="note-card-bottom"><span>${p.date}</span><span>${icons.arrow}</span></div></a>`).join('')}</div>`;
}

function compositionHome(){
  const kind=state.shape;
  const heroes={
    gesture:()=>`<section class="composition-hero gesture-hero">${compositionKicker()}<div class="gesture-title">${compositionTitle(kind)}<div class="composition-art shape-extra">${compositionMark(kind)}</div></div><div class="gesture-intro">${compositionBio()}${compositionCTA()}</div></section>`,
    rhythm:()=>`<section class="composition-hero rhythm-hero"><div class="rhythm-thought">${compositionKicker()}${compositionTitle(kind)}${compositionCTA()}</div><aside class="rhythm-person"><div class="person-heading"><span class="eyebrow">${t('CZŁOWIEK PO DRUGIEJ STRONIE','THE PERSON ON THE OTHER SIDE')}</span>${icons.spark}</div><strong class="person-name">Marcin <br>Kołodziejczak<span>.</span></strong>${compositionBio()}<a class="composition-contact" href="#contact">${t('Złapmy kontakt','Let’s connect')}${icons.arrow}</a></aside></section>`,
    close:()=>`<section class="composition-hero close-hero"><div class="composition-art shape-extra">${compositionMark(kind)}</div>${compositionKicker()}${compositionTitle(kind)}${compositionBio()}${compositionCTA()}</section>`,
    signature:()=>`<section class="composition-hero signature-hero"><div>${compositionKicker()}${compositionTitle(kind)}</div><div class="signature-person"><div class="composition-art shape-extra">${compositionMark(kind)}<span class="hand-note">${t('Z ciekawości. Po swojemu.','Stay curious. Make it your own.')}</span></div>${compositionBio()}${compositionCTA()}</div></section>`
  };
  return `<main id="main" class="wrap home-c">${heroes[kind]()}<section class="play-notes"><div class="section-heading"><div><span class="eyebrow">${t('ARTYKUŁY','ARTICLES')}</span><h2>${t('Z mojej głowy do Twojej.','From my head to yours.')}</h2></div>${link('blog',t('Wszystkie artykuły','All articles')+icons.arrow,'composition-all')}</div>${compositionCards()}</section>${contacts()}</main>`;
}

function decorateCompositions(){
  const p=shapeVariants[state.shape];
  const banner=document.querySelector('.palette-context');if(banner)banner.insertAdjacentHTML('afterend',`<p class="composition-caption">${t(p.description,p.descriptionEn)}</p>`);
  document.querySelectorAll('.note-card-top>span:last-child').forEach(e=>e.classList.add('composition-card-icon'));
  document.querySelectorAll('.solid-link').forEach(e=>{if(!e.querySelector('.shape-icon'))e.insertAdjacentHTML('beforeend',icons.arrow);});
  const title=document.querySelector('.color-lab h2');if(title)title.textContent=t('Ten sam charakter w detalach.','The same character in every detail.');
  if(state.shape==='signature')document.querySelector('.brand-symbol').innerHTML=compositionMark('signature');
}
