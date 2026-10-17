/* THROWAWAY: four CONTROL studies on fixed Closer / meadow / Bricolage + Hanken.
   No redesign: vary input construction and interactive components only. */
const controlVariants={
  frame:{name:'Podwójna oprawa',en:'Double frame',description:'Dwa ciągłe obrysy i odstęp między nimi. Input przypomina osobny, starannie oprawiony element.',descriptionEn:'Two continuous outlines with a gap between them. Each input feels carefully framed.'},
  inset:{name:'Miękkie wgłębienie',en:'Soft recess',description:'Pole osadzone w powierzchni, z wewnętrznym cieniem i osobnym miejscem na ikonę.',descriptionEn:'A recessed field with an inner shadow and a dedicated icon well.'},
  label:{name:'Etykieta w ramce',en:'Label inside',description:'Etykieta jest stałą częścią pola, nad wpisywanym tekstem. Jedna pełna ramka porządkuje całość.',descriptionEn:'A fixed label sits inside the field above the text. One continuous frame groups everything.'},
  capsule:{name:'Kapsuła z akcją',en:'Action capsule',description:'Obły input z ikoną i okrągłym przyciskiem czyszczenia. Ten sam detal powtarza się w pozostałych kontrolkach.',descriptionEn:'A rounded input with an icon and circular clear button. The same detail repeats across the controls.'}
};
const controlUI={search:'',email:'marcin@',emailStatus:'invalid',message:'',topic:'engineering',mode:'read',remember:true,underline:true};

function controlIcon(name){
  const paths={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',message:'<path d="M4 4h16v13H9l-5 4Z"/><path d="M8 8h8M8 12h5"/>',link:'<path d="m10 7 3-3a5 5 0 0 1 7 7l-3 3M14 17l-3 3a5 5 0 0 1-7-7l3-3m1 6 8-8"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',close:'<path d="m7 7 10 10M17 7 7 17"/>',down:'<path d="m6 9 6 6 6-6"/>',check:'<path d="m4 12 5 5L20 6"/>'};
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.message}</svg>`;
}
function applyControlTheme(){
  document.body.classList.toggle('control-mode',Boolean(state.controls));
  if(state.controls)document.body.dataset.controls=state.controls;else delete document.body.dataset.controls;
}
function controlField(key,label,icon,element,hint,extra=''){
  const tag=`<label class="ctrl-label" for="ctrl-${key}">${label}</label>`;
  return `<div class="ctrl-field ${extra}" data-ctrl-field="${key}">${state.controls==='label'?'':tag}<div class="ctrl-shell">${state.controls==='label'?tag:''}<div class="ctrl-entry"><span class="ctrl-leading">${controlIcon(icon)}</span>${element}</div></div><p id="ctrl-${key}-hint" class="ctrl-hint">${hint}</p></div>`;
}
function controlStudy(){
  return `<section id="palette-lab" class="control-study color-lab"><div class="section-heading"><div><span class="eyebrow">${t('DOPRACOWUJEMY KONTROLKI','REFINING THE CONTROLS')}</span><h2>${t('Zacznij od inputów.','Start with the inputs.')}</h2></div><span class="lab-demo-label">${t('Układ Blisko · fonty i paleta bez zmian','Closer layout · fixed fonts and palette')}</span></div><p class="ctrl-intro">${t('Kliknij w pola, wpisz tekst i przejdź klawiszem Tab. Wpisane wartości zostają podczas zmiany wariantu. To próbnik wyglądu — formularz niczego nie wysyła.','Click the fields, type, and use Tab to focus. Values stay while you switch variants. This is a visual sample — nothing is submitted.')}</p><div class="ctrl-study-grid"><section class="ctrl-demo-panel"><h3>${t('Wpisywanie','Typing')}</h3>
  ${controlField('search',t('Czego szukasz?','What are you looking for?'),'search',`<input id="ctrl-search" data-control-value="search" type="search" autocomplete="off" placeholder="${t('Wyszukaj artykuł…','Search articles…')}" aria-describedby="ctrl-search-hint"><button class="ctrl-clear" data-control-action="clear" aria-label="${t('Wyczyść wyszukiwanie','Clear search')}">${controlIcon('close')}</button>`,t('Puste pole · wypróbuj wpisywanie i czyszczenie.','Empty field · try typing and clearing.'))}
  ${controlField('email',t('Adres e-mail','Email address'),'mail',`<input id="ctrl-email" data-control-value="email" type="email" autocomplete="off" required aria-describedby="ctrl-email-hint" aria-invalid="true"><span class="ctrl-status" aria-hidden="true">!</span>`,t('Wpisz pełny adres, np. marcin@example.com.','Enter a complete address, e.g. marcin@example.com.'))}
  <button class="ctrl-validate outline-button" data-control-action="validate">${t('Sprawdź adres','Check address')}${controlIcon('check')}</button>
  ${controlField('message',t('Twoje pytanie','Your question'),'message',`<textarea id="ctrl-message" data-control-value="message" rows="3" autocomplete="off" placeholder="${t('Co Cię zaciekawiło?','What caught your interest?')}" aria-describedby="ctrl-message-hint"></textarea>`,t('Textarea · także w oknie rozmowy.','Textarea · also used in the conversation dialog.'),'ctrl-multiline')}
  ${controlField('disabled',t('Pole wyłączone','Disabled field'),'lock',`<input id="ctrl-disabled" value="${t('Dostępne wkrótce','Coming soon')}" disabled aria-describedby="ctrl-disabled-hint">`,t('Stan nieaktywny do porównania.','Disabled state for comparison.'),'ctrl-disabled')}
  </section><section class="ctrl-demo-panel"><h3>${t('Wybieranie i akcje','Choices & actions')}</h3>
  ${controlField('topic',t('Temat artykułów','Article topic'),'message',`<select id="ctrl-topic" data-control-value="topic" aria-describedby="ctrl-topic-hint"><option value="engineering">${t('Inżynieria i ciekawość','Engineering & curiosity')}</option><option value="web">${t('Własny kawałek sieci','The personal web')}</option><option value="curiosity">${t('Poza kodem','Beyond code')}</option></select><span class="ctrl-select-arrow">${controlIcon('down')}</span>`,t('Natywny select · sprawdź też klawiaturę.','Native select · try using the keyboard too.'))}
  <div class="ctrl-choice-group"><span class="field-label">${t('Jak wolisz poznawać treść?','How do you prefer the content?')}</span><div class="ctrl-segments" role="group" aria-label="${t('Sposób odbioru','Content format')}"><button data-control-mode="read">${icons.arrow}${t('Czytam','Reading')}</button><button data-control-mode="listen">${icons.play}${t('Słucham','Listening')}</button></div></div>
  <label class="ctrl-check"><input type="checkbox" data-control-value="remember"><span class="ctrl-check-box" aria-hidden="true">${controlIcon('check')}</span><span>${t('Zapamiętaj wybór w tym podglądzie','Keep my choice in this preview')}</span></label>
  <label class="ctrl-toggle"><input type="checkbox" data-control-value="underline"><span class="ctrl-track" aria-hidden="true"><span></span></span><span>${t('Podkreślaj link w próbce','Underline the sample link')}</span></label>
  <p class="ctrl-link-sample">${t('Dobry tekst prowadzi wzrok. <a href="#ctrl-actions">Ten link ma wyraźny cel.</a>','Good writing guides the eye. <a href="#ctrl-actions">This link has a clear purpose.</a>')}</p>
  <div id="ctrl-actions" class="ctrl-actions"><span class="field-label">${t('Przyciski','Buttons')}</span>${link('article',t('Czytaj artykuł','Read article')+icons.arrow,'solid-link')}${button('share',t('Skopiuj link','Copy link'),'outline-button')}<button class="disabled-button" disabled>${t('Już wkrótce','Coming soon')}</button></div>
  <div class="ctrl-article-sample"><span class="eyebrow">${t('SPRAWDŹ W UŻYCIU','TRY IN CONTEXT')}</span><p>${t('Otwórz artykuł i okno promptu lub rozmowy. Pola i przyciski korzystają z wybranego stylu.','Open the article and its prompt or chat dialog. Fields and buttons use the selected control style.')}</p>${link('article',t('Przejdź do artykułu','Open the article')+icons.arrow,'text-link')}</div>
  </section></div></section>`;
}
function decorateControlStudy(){
  const lab=document.querySelector('#palette-lab');if(lab)lab.outerHTML=controlStudy();
  const context=document.querySelector('.palette-context>span');if(context)context.textContent=t('KONTROLKI · BAZA: BLISKO','CONTROLS · BASE: CLOSER');
  const caption=document.querySelector('.composition-caption');if(caption)caption.textContent=t(controlVariants[state.controls].description,controlVariants[state.controls].descriptionEn);
  const jump=document.querySelector('.palette-context>a');if(jump)jump.innerHTML=t('Porównaj kontrolki','Compare controls')+icons.arrow;
  document.title=t(controlVariants[state.controls].name,controlVariants[state.controls].en)+' · '+t('Kontrolki','Controls')+' · kolodziejczak.me';
  restoreControlStudy();
}
function restoreControlStudy(){
  for(const [key,value]of Object.entries(controlUI)){
    const el=document.querySelector(`[data-control-value="${key}"]`);if(!el)continue;
    if(el.type==='checkbox')el.checked=value;else el.value=value;
  }
  document.querySelectorAll('[data-control-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.controlMode===controlUI.mode)));
  document.querySelector('.ctrl-link-sample a')?.classList.toggle('no-underline',!controlUI.underline);
  updateControlEmail();
  const clear=document.querySelector('.ctrl-clear');if(clear)clear.disabled=!controlUI.search;
}
function updateControlEmail(){
  const field=document.querySelector('[data-ctrl-field=email]');if(!field)return;
  const status=controlUI.emailStatus;
  field.dataset.status=status||'idle';
  field.querySelector('input').setAttribute('aria-invalid',String(status==='invalid'));
  field.querySelector('.ctrl-status').innerHTML=status==='valid'?controlIcon('check'):'!';
  field.querySelector('.ctrl-status').style.visibility=status?'visible':'hidden';
  field.querySelector('.ctrl-hint').textContent=status==='invalid'?t('Wpisz pełny adres, np. marcin@example.com.','Enter a complete address, e.g. marcin@example.com.'):status==='valid'?t('Adres wygląda poprawnie. Niczego nie wysyłamy.','The address looks valid. Nothing is sent.'):t('Kliknij „Sprawdź adres”, aby zobaczyć stan pola.','Click “Check address” to see the field state.');
}
function cycleControls(direction){
  const keys=Object.keys(controlVariants),u=new URL(location.href);
  u.searchParams.set('controls',keys[(keys.indexOf(state.controls)+direction+keys.length)%keys.length]);u.searchParams.set('shape','close');
  history.replaceState({},'',u);render();
}
function controlPrototypeTools(){
  const v=controlVariants[state.controls],keys=Object.keys(controlVariants);
  return `<div class="prototype-switcher color-switcher form-switcher" aria-label="${t('Porównaj kontrolki','Compare controls')}"><button data-cycle="-1" aria-label="${t('Poprzedni wariant kontrolek','Previous controls')}">${shapeOriginalIcons.arrow}</button><div class="prototype-label" aria-live="polite"><small>${t('KONTROLKI · BLISKO','CONTROLS · CLOSER')} · ${state.lang.toUpperCase()}</small><strong>${t(v.name,v.en)} <span>${keys.indexOf(state.controls)+1}/4</span></strong></div><button data-cycle="1" aria-label="${t('Następny wariant kontrolek','Next controls')}">${shapeOriginalIcons.arrow}</button><button class="prototype-info" data-control-action="info" aria-label="${t('O kontrolkach','About controls')}">?</button></div>`;
}
function decorateControlModal(){
  document.querySelectorAll('.modal input:not([type=checkbox]),.modal textarea').forEach(el=>{
    const shell=document.createElement('div');shell.className='ctrl-shell';if(el.tagName==='TEXTAREA')shell.classList.add('ctrl-multiline');
    const entry=document.createElement('div');entry.className='ctrl-entry';
    const icon=document.createElement('span');icon.className='ctrl-leading';icon.innerHTML=controlIcon(el.classList.contains('share-url')?'link':'message');
    el.before(shell);shell.append(entry);entry.append(icon,el);
    if(state.controls==='label'){
      document.querySelectorAll('.modal label').forEach(label=>{if(label.htmlFor===el.id)label.remove();});
      const label=document.createElement('label');label.className='ctrl-label';if(!el.id)el.id='control-modal-field';label.htmlFor=el.id;
      label.textContent=el.getAttribute('aria-label')||t('Twoje pytanie','Your question');shell.prepend(label);
    }
  });
}
document.addEventListener('input',e=>{
  const key=e.target.dataset.controlValue;if(!key||e.target.type==='checkbox')return;
  controlUI[key]=e.target.value;
  if(key==='search')document.querySelector('.ctrl-clear').disabled=!e.target.value;
  if(key==='email'){controlUI.emailStatus=null;updateControlEmail();}
});
document.addEventListener('change',e=>{
  const key=e.target.dataset.controlValue;if(!key)return;
  controlUI[key]=e.target.type==='checkbox'?e.target.checked:e.target.value;
  if(key==='underline')document.querySelector('.ctrl-link-sample a').classList.toggle('no-underline',!e.target.checked);
});
document.addEventListener('click',e=>{
  const mode=e.target.closest('[data-control-mode]');if(mode){controlUI.mode=mode.dataset.controlMode;document.querySelectorAll('[data-control-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===mode)));}
  const action=e.target.closest('[data-control-action]')?.dataset.controlAction;
  if(action==='clear'){controlUI.search='';const el=document.querySelector('#ctrl-search');el.value='';document.querySelector('.ctrl-clear').disabled=true;el.focus();}
  if(action==='validate'){controlUI.emailStatus=document.querySelector('#ctrl-email').checkValidity()?'valid':'invalid';updateControlEmail();}
  if(action==='info'){
    const v=controlVariants[state.controls];modal(t(v.name,v.en),`<p>${t(v.description,v.descriptionEn)}</p><p>${t('Stałe: Blisko, Leśna pracownia, Bricolage + Hanken. Porównujemy wyłącznie kontrolki. Strzałki ← → zmieniają ich wariant.','Fixed: Closer, Forest workshop, Bricolage + Hanken. Only the controls vary. Use ← → to change the control variant.')}</p><div class="ctrl-variant-choices">${Object.entries(controlVariants).map(([key,v])=>`<button data-control-pick="${key}" aria-pressed="${key===state.controls}">${t(v.name,v.en)}</button>`).join('')}</div><pre id="ctrl-state"></pre>`);document.querySelector('#ctrl-state').textContent=JSON.stringify({controls:state.controls,shape:state.shape,palette:state.palette,language:state.lang,page:state.page,...controlUI},null,2);
  }
  const pick=e.target.closest('[data-control-pick]');if(pick){const u=new URL(location.href);u.searchParams.set('controls',pick.dataset.controlPick);history.replaceState({},'',u);render();}
});
