/* THROWAWAY, controls round 3: four complete systems on the existing Closer page.
   Question: which construction works across fields, buttons and choices?
   Fonts, palette, page composition and cards remain fixed. */
Object.assign(controlVariants,{
  facet:{round:3,name:'Faseta',en:'Facet',
    description:'Jeden ścięty narożnik zamiast zaokrągleń. Pełna sylwetka pola, przycisku i znacznika wyboru powtarza ten sam skos.',
    descriptionEn:'One clipped corner instead of rounding. Fields, buttons and selection marks repeat the same complete, angled silhouette.'},
  paper:{round:3,name:'Jasny środek',en:'Light centre',
    description:'Kremowa powierzchnia pola i ciemny tekst. Miękka, lekko spłaszczona geometria; przyciski pomocnicze mają szałwiowe wypełnienie.',
    descriptionEn:'Cream field surfaces and dark text. Soft, slightly flattened geometry; secondary actions have a sage fill.'},
  spine:{round:3,name:'Pionowy brzeg',en:'Vertical edge',
    description:'Pełna ramka ma jeden mocniejszy, lewy brzeg. W wyborach ten sam detal wskazuje aktywną opcję, a ikony są proste i kanciaste.',
    descriptionEn:'A complete frame with a stronger left edge. The same detail identifies selected options, with simple angular icons.'},
  pair:{round:3,name:'Osobna akcja',en:'Separate action',
    description:'Pole i przycisk czyszczenia to dwa osobne elementy. Przyciski mają ikonę przed tekstem, opcje są niezależne, a switch ma otwarty tor.',
    descriptionEn:'The field and clear action are separate elements. Buttons place icons before text, options stand independently, and the switch has an open track.'}
});
Object.assign(controlUI,{delivery:'all',volume:60,saved:false});

function decorateFreshControls(){
  const lab=document.querySelector('#palette-lab');
  if(lab){
    lab.classList.add('fresh-control-study');
    lab.querySelector('.eyebrow').textContent=t('NOWA RUNDA · CAŁY ZESTAW','FRESH ROUND · THE WHOLE SET');
    lab.querySelector('h2').textContent=t('Od pola po przycisk.','From field to button.');
    lab.querySelector('.ctrl-intro').textContent=t('Porównaj cały zestaw: przyciski, wpisywanie, wybór i małe akcje. Kliknij w pole, sprawdź błąd i wypróbuj klawiaturę. Strzałki na dolnym pasku zmieniają propozycję; wartości zostają w tym podglądzie.','Compare the full set: buttons, typing, choices and small actions. Focus a field, check the error and try the keyboard. The bottom arrows change the proposal; values stay in this preview.');
    lab.querySelector('[data-ctrl-field=search] .ctrl-hint').textContent=t('Wyszukiwanie · wpisz tekst i wyczyść pole.','Search · type and clear the field.');
    const panel=lab.querySelectorAll('.ctrl-demo-panel')[1];
    panel.querySelector('h3').textContent=t('Akcje i wybieranie','Actions & choices');
    panel.querySelector('h3').after(panel.querySelector('.ctrl-actions'));
    panel.querySelector('.ctrl-article-sample').insertAdjacentHTML('beforebegin',`
      <fieldset class="fresh-radios"><legend>${t('Co pokazać?','What to show?')}</legend>
      ${[['all',t('Wszystkie artykuły','All articles')],['new',t('Tylko nieprzeczytane','Unread only')]].map(([value,label])=>`<label><input type="radio" name="delivery" data-fresh-delivery="${value}" ${controlUI.delivery===value?'checked':''}><span class="fresh-radio-mark" aria-hidden="true"></span><span>${label}</span></label>`).join('')}</fieldset>
      <div class="fresh-volume"><label for="fresh-volume">${t('Głośność lektora','Narration volume')} <output for="fresh-volume">${controlUI.volume}%</output></label><input id="fresh-volume" type="range" min="0" max="100" value="${controlUI.volume}" aria-label="${t('Głośność lektora','Narration volume')}"></div>
      <div class="fresh-small-actions"><span class="field-label">${t('Małe akcje','Small actions')}</span><div><button class="fresh-icon-button" data-fresh-save aria-pressed="${controlUI.saved}" aria-label="${t('Zapisz artykuł w podglądzie','Save article in preview')}">${freshBookmarkIcon()}</button>${button('share',controlIcon('link'),'fresh-icon-button')}${button('tldr',refinedShapeIcon('read','press'),'fresh-icon-button')}</div><p>${t('Zapisz · udostępnij · streszczenie','Save · share · summary')}</p></div>`);
    panel.querySelector('.fresh-small-actions [data-action=share]').setAttribute('aria-label',t('Udostępnij','Share'));
    panel.querySelector('.fresh-small-actions [data-action=tldr]').setAttribute('aria-label',t('Otwórz streszczenie','Open summary'));
    const choices=lab.querySelector('.ctrl-choice-group');
    choices.insertAdjacentHTML('afterend',`<label class="ctrl-check ctrl-icon-option"><input type="checkbox" data-control-value="fieldIcons"><span class="ctrl-check-box" aria-hidden="true">${controlIcon('check')}</span><span>${t('Pokaż pomocnicze ikony pól','Show optional field icons')}</span></label>`);
  }
  decorateFreshComponents(document.querySelector('#app'));
  lab?.querySelector('#fresh-volume')?.style.setProperty('--volume',controlUI.volume+'%');
}
function freshBookmarkIcon(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4Z"/></svg>';}
function decorateFreshComponents(root){
  if(!root)return;
  root.querySelectorAll('.outline-button').forEach(button=>{if(!button.querySelector('svg'))button.insertAdjacentHTML('beforeend',refinedShapeIcon('copy','press'));});
  if(state.controls==='pair'){
    root.querySelectorAll('.solid-link,.outline-button').forEach(button=>{const icon=button.querySelector(':scope > svg');if(icon)button.prepend(icon);});
    root.querySelectorAll('.ctrl-clear').forEach(action=>{
      const shell=action.closest('.ctrl-shell');if(!shell)return;
      const row=document.createElement('div');row.className='fresh-field-pair';shell.before(row);row.append(shell,action);
    });
  }
  root.querySelectorAll('.ctrl-shell svg,.solid-link svg,.outline-button svg,.ctrl-segments svg,.fresh-icon-button svg').forEach(icon=>{
    icon.setAttribute('stroke-width',state.controls==='spine'?'2':state.controls==='facet'?'1.7':'1.8');
    icon.setAttribute('stroke-linecap',['facet','spine'].includes(state.controls)?'square':'round');
    icon.setAttribute('stroke-linejoin',state.controls==='facet'?'miter':'round');
  });
}
document.addEventListener('input',e=>{
  if(e.target.id==='fresh-volume'){
    controlUI.volume=Number(e.target.value);
    e.target.style.setProperty('--volume',e.target.value+'%');
    e.target.closest('.fresh-volume').querySelector('output').textContent=e.target.value+'%';
  }
});
document.addEventListener('change',e=>{if(e.target.dataset.freshDelivery)controlUI.delivery=e.target.dataset.freshDelivery;});
document.addEventListener('click',e=>{const save=e.target.closest('[data-fresh-save]');if(save){controlUI.saved=!controlUI.saved;save.setAttribute('aria-pressed',String(controlUI.saved));toast(t(controlUI.saved?'Zapisano w tym podglądzie.':'Usunięto z zapisanych.',controlUI.saved?'Saved in this preview.':'Removed from saved.'));}});
