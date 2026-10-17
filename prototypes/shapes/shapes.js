/* Round 4: three form languages on the same route and approved meadow palette.
   Question: soft, stamped, or chamfered geometry for controls, borders and icons? */
const shapeVariants={
  soft:{name:'Miękkie formy',en:'Soft forms',description:'Duże zaokrąglenia, obłe ikony, lekkie obramowania i miękkie ozdobniki.',detail:'Płynne obrysy, kapsułki, zaokrąglone karty i ikony o pełniejszych kształtach.'},
  stamp:{name:'Papier i pieczęć',en:'Paper and stamps',description:'Proste narożniki, podwójne ramki, twardy cień i rysowane ikony.',detail:'Papierowe ramki, stemple, małe przesunięcia i lekko nieregularny rysunek.'},
  cut:{name:'Nacięte narożniki',en:'Cut corners',description:'Ścięte przyciski, proste obramowania, ukośne detale i kanciaste ikony.',detail:'Geometria narożników, odcinki i romby, bez efektu terminala i bez zmiany fontów.'}
};
const shapeUI={details:true,topic:'engineering'};
let shapeOriginalIcons;

function shapeIcon(name,kind=state.shape){
  const families={
    soft:{
      arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
      read:'<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1Z"/><path d="M12 6v14"/>',
      play:'<path d="M8 5q-1-1-1 1v12q0 2 2 1l10-6q2-1 0-2Z" fill="currentColor" stroke="none"/>',
      copy:'<rect x="8" y="8" width="12" height="13" rx="4"/><path d="M15 4H8Q3 4 3 9v7"/>',
      chat:'<path d="M12 3c6 0 9 3 9 8s-3 8-9 8H8l-5 2 1-6C0 8 4 3 12 3Z"/><path d="M8 11h8"/>',
      check:'<path d="m5 12 4 4 10-10"/>',
      heart:'<path d="M12 20C8 17 3 13 3 8c0-5 7-6 9-1 2-5 9-4 9 1 0 5-5 9-9 12Z"/>',
      spark:'<path d="M12 3q1 7 9 9-8 2-9 9-2-8-9-9 7-1 9-9Z"/>',
      close:'<path d="m6 6 12 12M18 6 6 18"/>'
    },
    stamp:{
      arrow:'<path d="m3 13 17-2m-7-6 7 6-6 7"/><path d="m4 15 9-1" stroke-width=".8"/>',
      read:'<path d="m3 4 9 2 9-1-1 15-9-1-9 1Z"/><path d="m12 6-1 13M6 9l3 1m-3 3 3 1m6-4 3-1m-3 5 3-1" stroke-width="1.3"/>',
      play:'<path d="m7 4 14 9-15 8Z"/><path d="m10 9 6 4-6 3Z" fill="currentColor" stroke="none"/>',
      copy:'<path d="m7 7 14 1-1 14-14-1Zm9-3L3 3l-1 14"/><path d="m10 12 7 1m-7 3 6 1" stroke-width="1.1"/>',
      chat:'<path d="m3 4 18 1-1 13-11-1-5 4v-5H2Z"/><path d="m6 9 11 1m-11 3 7 1" stroke-width="1.2"/>',
      check:'<path d="m3 12 6 7L21 4m-12 12 9-10"/>',
      heart:'<path d="M12 20 3 11C-1 3 7 0 12 7c7-8 15 1 7 8Z"/><path d="m5 9 1 3" stroke-width="1.1"/>',
      spark:'<path d="m12 1 2 8 8 2-8 3-3 8-2-8-8-3 8-2Z"/>',
      close:'<path d="m5 4 14 16M20 5 4 18"/>'
    },
    cut:{
      arrow:'<path d="M3 12h18m-8-8 8 8-8 8"/>',
      read:'<path d="M3 3h8l1 2 1-2h8v17h-8l-1 1-1-1H3Z"/><path d="M12 5v16M6 8h3m6 0h3M6 12h3m6 0h3"/>',
      play:'<path d="M6 3h3l12 9L9 21H6Z"/><path d="m10 8 6 4-6 4Z" fill="currentColor" stroke="none"/>',
      copy:'<path d="M8 8h10l3 3v10H8ZM4 16H3V3h13v1"/><path d="M17 8v4h4"/>',
      chat:'<path d="M3 3h15l3 3v12H9l-6 4Z"/><path d="M7 8h10M7 12h7"/>',
      check:'<path d="m3 12 6 6L21 6"/><path d="M3 18v3h5" stroke-width="1.2"/>',
      heart:'<path d="m12 21-10-10V5l4-3h3l3 4 3-4h3l4 3v6Z"/>',
      spark:'<path d="m12 1 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/>',
      close:'<path d="m4 4 16 16M20 4 4 20"/>'
    }
  };
  const kindName=kind||'soft',stroke=kindName==='soft'?2:kindName==='stamp'?1.7:1.6;
  return `<svg class="shape-icon" data-icon="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="${kindName==='cut'?'square':'round'}" stroke-linejoin="${kindName==='cut'?'miter':'round'}" aria-hidden="true">${families[kindName][name]||families[kindName].spark}</svg>`;
}

function applyShapeTheme(){
  if(!shapeOriginalIcons)shapeOriginalIcons={...icons};
  Object.assign(icons,shapeOriginalIcons);
  document.body.classList.toggle('shape-mode',Boolean(state.shape));
  if(!state.shape){delete document.body.dataset.shape;delete document.body.dataset.shapeDetails;return;}
  document.body.dataset.shape=state.shape;
  for(const key of ['arrow','play','heart','spark','star'])icons[key]=shapeIcon(key==='star'?'spark':key);
  document.body.dataset.shapeDetails=shapeUI.details?'on':'off';
}

function shapeHero(){
  const kind=state.shape;
  const soft=`<g stroke="var(--secondary)" stroke-width="3" fill="none" stroke-linecap="round"><path d="M38 81q-15-8-23 6m226-34 17-15m-3 124q17 4 21-7M44 209q-13 8-21-2"/><circle cx="258" cy="207" r="12"/><path d="M37 138q10-1 14-14 5 14 16 15-14 3-16 15-3-13-14-16Z"/></g><path d="M100 32q-9-6-7 6l24 170q2 12 9 2l34-57 68-4q13-1 3-10Z" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="4" stroke-linejoin="round"/><path d="m100 38 60 115" stroke="var(--art-ink)" stroke-width="3"/><ellipse cx="141" cy="108" rx="5" ry="8" fill="var(--art-ink)"/><ellipse cx="162" cy="128" rx="5" ry="8" fill="var(--art-ink)"/><path d="M134 137q1 13 15 13" fill="none" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round"/>`;
  const stamp=`<path d="m48 40 224 8-7 174-226-8Z" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="2"/><path d="m57 50 205 7-5 154-207-8Z" fill="none" stroke="var(--art-ink)" stroke-width="1.3" stroke-dasharray="4 4"/><path d="m107 72 104 91-56 1-31 43Z" fill="var(--primary)" stroke="var(--art-ink)" stroke-width="3" stroke-linejoin="round"/><path d="m107 72 48 92" fill="none" stroke="var(--art-ink)" stroke-width="2"/><circle cx="143" cy="131" r="3.5" fill="var(--art-ink)"/><circle cx="160" cy="146" r="3.5" fill="var(--art-ink)"/><path d="m136 150 7 5 7-1M72 76l14 2m-15 6 17 1M211 189l24 1m-24 5 17 1" stroke="var(--art-ink)" fill="none" stroke-width="1.8" stroke-linecap="round"/><g fill="none" stroke="var(--secondary)" stroke-width="2"><path d="m22 27 17 4m-7-15 1 17M276 69l16 8m-7-18 1 19"/><circle cx="253" cy="216" r="23" stroke-dasharray="2 3"/><circle cx="253" cy="216" r="18"/></g>`;
  const cut=`<g fill="none" stroke="var(--secondary)" stroke-width="1.6"><path d="M31 79V34h45m155 0h45v45m0 107v45h-45m-155 0H31v-45M9 132h37m-18-18v36m240-39 16 16-16 16-16-16Z"/><path d="m60 18 7 7m8-7 7 7m8-7 7 7M223 247l7 7m8-7 7 7m8-7 7 7"/></g><path d="M99 43h12l119 95v12l-69 1-33 60h-12Z" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/><path d="m108 52 53 99" fill="none" stroke="var(--art-ink)" stroke-width="2"/><path d="m134 106 8 4v9l-8-4Zm24 17 8 4v9l-8-4Z" fill="var(--art-ink)"/><path d="m132 137 1 10 12 6 7-2" fill="none" stroke="var(--art-ink)" stroke-width="2"/>`;
  return `<div class="cursor-art shape-hero" aria-hidden="true"><svg viewBox="0 0 310 270" fill="none">${{soft,stamp,cut}[kind]}</svg><span class="hand-note">${t('klik, i jesteś u siebie.','click. make yourself at home.')}</span></div>`;
}

function shapeControls(){
  return `<div class="shape-control-extras"><label class="shape-check-label"><input type="checkbox" data-shape-details ${shapeUI.details?'checked':''}><span class="shape-check-mark" aria-hidden="true">${shapeIcon('check')}</span><span>${t('Pokaż ozdobniki','Show ornaments')}</span></label><label class="field-label" for="shape-topic">${t('Wypróbuj listę wyboru','Try the select control')}</label><div class="shape-select-wrap"><select id="shape-topic">${[['engineering',t('Inżynieria i ciekawość','Engineering & curiosity')],['web',t('Własny kawałek sieci','The personal web')],['curiosity',t('Poza kodem','Beyond code')]].map(([key,label])=>`<option value="${key}" ${shapeUI.topic===key?'selected':''}>${label}</option>`).join('')}</select>${shapeIcon('arrow')}</div></div>`;
}

function shapeIconGallery(){
  const items=[['arrow',t('Dalej','Next')],['read',t('Artykuł','Article')],['play',t('Lektor','Audio')],['copy',t('Kopiuj','Copy')],['chat',t('Rozmowa','Chat')],['check',t('Gotowe','Done')],['heart',t('Polubienie','Like')],['spark',t('Ozdobnik','Ornament')]];
  return `<section class="shape-icon-section"><div class="shape-section-label"><span class="eyebrow">${t('JEDEN JĘZYK IKON','ONE ICON LANGUAGE')}</span><span>${t('Ten sam zestaw funkcji w trzech stylach','The same actions in three styles')}</span></div><div class="shape-icon-grid">${items.map(([key,label])=>`<div class="shape-icon-item"><span>${shapeIcon(key)}</span><small>${label}</small></div>`).join('')}</div><p>${t('Ikony w przyciskach i odtwarzaczu korzystają z tego samego stylu. Przejdź do artykułu, żeby sprawdzić je w użyciu.','Buttons and the player use this same style. Open an article to see the icons in use.')}</p></section>`;
}

function decorateShapePage(){
  const p=shapeVariants[state.shape];
  const context=document.querySelector('.palette-context>span');if(context)context.textContent=`${t('FORMA','FORM')} 0${Object.keys(shapeVariants).indexOf(state.shape)+1} · ${t(p.name,p.en)}`;
  const jump=document.querySelector('.palette-context>a');if(jump)jump.innerHTML=t('Wypróbuj detale','Try the details')+icons.arrow;
  const hero=document.querySelector('.cursor-art');if(hero)hero.outerHTML=shapeHero();
  document.querySelectorAll('.note-card').forEach((card,i)=>{
    card.querySelector('.note-card-top>span:last-child').innerHTML=shapeIcon(['spark','read','chat'][i]);
    card.querySelector('.note-card-bottom>span:last-child').innerHTML=shapeIcon('arrow');
    card.insertAdjacentHTML('beforeend',`<span class="shape-card-mark shape-extra" aria-hidden="true">${state.shape==='cut'?`0${i+1}`:shapeIcon('spark')}</span>`);
  });
  document.querySelectorAll('.outline-button[data-action=share]').forEach(e=>e.insertAdjacentHTML('afterbegin',shapeIcon('copy')));
  document.querySelectorAll('[data-action=tldr]').forEach(e=>e.insertAdjacentHTML('afterbegin',shapeIcon('read')));
  document.querySelectorAll('[data-action=prompt]').forEach(e=>e.insertAdjacentHTML('afterbegin',shapeIcon('spark')));
  document.querySelectorAll('.audio-play').forEach(e=>e.setAttribute('aria-label',t('Odtwórz nagranie — podgląd','Play narration — preview')));
  document.querySelectorAll('.contacts button').forEach(e=>{e.querySelector('span').innerHTML=shapeIcon('arrow');});
  document.querySelectorAll('.semantic-messages p>span').forEach((e,i)=>{e.innerHTML=i===0?shapeIcon('check'):'!';});
  const title=document.querySelector('.color-lab .section-heading h2');if(title)title.textContent=t('Detale tworzą charakter.','Details make the character.');
  const kicker=document.querySelector('.color-lab .section-heading .eyebrow');if(kicker)kicker.textContent=t('PRZYCISKI, KONTROLKI I IKONY','BUTTONS, CONTROLS & ICONS');
  const controls=document.querySelector('.control-sheet');if(controls)controls.insertAdjacentHTML('beforeend',shapeControls());
  const sample=document.querySelector('.text-sheet>p');if(sample)sample.innerHTML=t('To jest podstawowy tekst: powinien dać się czytać spokojnie, również w dłuższym artykule. <a data-route href="'+href('article')+'">Zajrzyj do przykładowej lektury</a> i sprawdź detale playera, przyciski i okna dialogowe.','This is the main text: it should feel comfortable, even in a longer article. <a data-route href="'+href('article')+'">Open the sample article</a> to explore player controls, buttons, and dialogs.');
  const hint=document.querySelector('.text-sheet>.field-hint');if(hint)hint.textContent=t('Te same komunikaty, różne kształty ich ikon i obramowań.','The same messages with different icon shapes and borders.');
  const lab=document.querySelector('#palette-lab');if(lab)lab.insertAdjacentHTML('beforeend',shapeIconGallery());
  restoreShapeControls();
}

function restoreShapeControls(){
  document.body.dataset.shapeDetails=shapeUI.details?'on':'off';
  const topic=document.querySelector('#shape-topic');if(!topic)return;
  topic.value=shapeUI.topic;
  document.querySelector('input[data-shape-details]').checked=shapeUI.details;
  document.querySelector('.color-tag').textContent={engineering:t('Inżynieria i ciekawość','Engineering & curiosity'),web:t('Własny kawałek sieci','The personal web'),curiosity:t('Poza kodem','Beyond code')}[shapeUI.topic];
}

function shapePrototypeTools(){
  const p=shapeVariants[state.shape],n=Object.keys(shapeVariants).indexOf(state.shape)+1;
  return `<div class="prototype-switcher color-switcher form-switcher" aria-label="${t('Porównaj formy','Compare forms')}"><button data-cycle="-1" aria-label="${t('Poprzedni wariant','Previous variation')}">${shapeOriginalIcons.arrow}</button><div class="prototype-label" aria-live="polite"><small>${t('FORMA · LEŚNA PRACOWNIA','FORM · FOREST WORKSHOP')} · ${state.lang.toUpperCase()}</small><strong>${t(p.name,p.en)} <span>${n}/3</span></strong></div><button data-cycle="1" aria-label="${t('Następny wariant','Next variation')}">${shapeOriginalIcons.arrow}</button><button class="prototype-info" data-action="shape-info" aria-label="${t('Porównanie detali','Compare details')}">?</button></div>`;
}

function shapeInformation(){
  const p=shapeVariants[state.shape];
  modal(t(p.name,p.en),`<p>${t(p.description,'The selected Forest workshop palette and Bricolage + Hanken stay fixed. Compare the shapes, borders, shadows, icons, and ornaments.')}</p><div class="shape-choices">${Object.entries(shapeVariants).map(([key,item])=>`<button data-set-shape="${key}" aria-pressed="${key===state.shape}">${shapeIcon('spark',key)}<span>${t(item.name,item.en)}</span></button>`).join('')}</div><p>${t(p.detail,'The form language is used across buttons, cards, fields, checkboxes, the switch, player, and dialogs.')}</p><p>${t('Wypróbuj kontrolki, najedź na przyciski i przejdź po nich klawiszem Tab. Na dole próbki jest zestaw ośmiu ikon. Strzałki ← → zmieniają wariant bez zmiany kolorów. Paleta: Leśna pracownia. Fonty: Bricolage + Hanken.','Try the controls, hover over buttons, and use Tab to focus them. Eight icons appear below the control samples. Arrow keys change the form language while keeping the colours fixed.')}</p><small>${t('Stan','State')}: ${JSON.stringify({shape:state.shape,palette:state.palette,language:state.lang,page:state.page,ornaments:shapeUI.details,topic:shapeUI.topic,controls:colorUI})}</small>`);
}

document.addEventListener('click',e=>{
  if(e.target.closest('[data-action=shape-info]'))shapeInformation();
  const pick=e.target.closest('[data-set-shape]');if(!pick)return;
  const u=new URL(location.href);u.searchParams.set('shape',pick.dataset.setShape);u.searchParams.set('palette','meadow');u.searchParams.set('variant','C');history.replaceState({},'',u);render();
});
document.addEventListener('change',e=>{
  if(e.target.matches('[data-shape-details]')){shapeUI.details=e.target.checked;restoreShapeControls();}
  if(e.target.matches('#shape-topic')){shapeUI.topic=e.target.value;restoreShapeControls();}
});
