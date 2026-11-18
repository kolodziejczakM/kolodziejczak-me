/* THROWAWAY controls round 2. Three restrained constructions, fixed Closer.
   Idle: one complete outline. Only actual focus draws an outside focus ring.
   Search has an accessible label without consuming a visible label row. */
Object.assign(controlVariants,{
  rim:{round:2,name:'Niski rant',en:'Low rim',
    description:'Pojedyncza ramka, krótki promień narożników i niski rant pod dolną krawędzią. Fokus pojawia się dopiero po wejściu w pole.',
    descriptionEn:'One outline, short corner curves and a low rim beneath the field. The focus ring appears only when the field is focused.'},
  arch:{round:2,name:'Łuk i kant',en:'Curve & edge',
    description:'Symetrycznie zaokrąglona góra i niemal prosta podstawa. Ten sam profil powtarza się w polach, przyciskach i przełącznikach.',
    descriptionEn:'A symmetrically curved top and almost square base. Fields, buttons and toggles repeat this same profile.'},
  module:{round:2,name:'Boczny moduł',en:'Side module',
    description:'Spokojne pole z akcją w prawym brzegu. Czyszczenie, wybór i stan adresu zajmują to samo uporządkowane miejsce.',
    descriptionEn:'A quiet field with its action built into the right edge. Clear, select and email status share one orderly location.'}
});
controlUI.fieldIcons=false;

function decorateRefinedControls(){
  const lab=document.querySelector('#palette-lab');if(!lab)return;
  lab.classList.add('refined-control-study');
  lab.querySelector('h2').textContent=t('Charakter w jednym detalu.','Character in one detail.');
  lab.querySelector('.ctrl-intro').textContent=t('Pola zaczynają bez fokusu. Kliknij lub przejdź klawiszem Tab, aby zobaczyć różnicę. Wyszukiwarka nie wymaga widocznej etykiety, a ikony pomocnicze możesz włączyć poniżej.','Fields start without focus. Click or use Tab to compare. Search needs no visible label, and you can enable optional icons below.');
  lab.querySelector('[data-ctrl-field=search] .ctrl-hint').textContent=t('Bez widocznej etykiety · wpisz tekst i wyczyść pole.','No visible label · type and clear the field.');
  const controls=lab.querySelector('.ctrl-choice-group');
  controls.insertAdjacentHTML('afterend',`<label class="ctrl-check ctrl-icon-option"><input type="checkbox" data-control-value="fieldIcons"><span class="ctrl-check-box" aria-hidden="true">${controlIcon('check')}</span><span>${t('Pokaż pomocnicze ikony pól','Show optional field icons')}</span></label>`);
}
