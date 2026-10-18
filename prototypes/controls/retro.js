/* THROWAWAY controls round 4: one rounded family, three treatments of depth.
   Fit with Bricolage, Hanken and the forest palette matters more than novelty.
   No clipped faces. Keep fields quiet; compare the shadow on actual actions. */
Object.assign(controlVariants,{
  pixel:{round:4,name:'Zaokrąglony piksel',en:'Rounded pixel',
    description:'Zaokrąglona powierzchnia przycisku i schodkowy, pikselowy cień. Spokojne pola z pełną ramką; retro detal podkreśla akcje.',
    descriptionEn:'Rounded button faces with a stepped pixel shadow. Quiet fields have complete outlines; the retro detail emphasises actions.'},
  print:{round:4,name:'Ciepły druk',en:'Warm print',
    description:'Te same miękkie kształty z niskim, twardym cieniem pod przyciskiem. Mniej pikselowego rytmu, więcej wrażenia przycisku do wciśnięcia.',
    descriptionEn:'The same soft shapes with a low, hard shadow below each button. Less pixel rhythm, more of a physical press.'},
  calm:{round:4,name:'Spokojny kontur',en:'Quiet outline',
    description:'Te same proporcje i zaokrąglenia, bez cienia. Charakter budują liternictwo, miód i czytelny obrys; punkt odniesienia dla obu wersji retro.',
    descriptionEn:'The same proportions and curves without a shadow. Letterforms, honey and clear outlines provide character; a reference for both retro treatments.'}
});
function decorateRetroStudy(){
  const lab=document.querySelector('#palette-lab');if(!lab)return;
  lab.querySelector('.eyebrow').textContent=t('DOPASOWANIE · MIĘKKIE MODERN RETRO','FIT · SOFT MODERN RETRO');
  lab.querySelector('h2').textContent=t('Miękko. Z odrobiną charakteru.','Soft. With a little character.');
  lab.querySelector('.ctrl-intro').textContent=t('Jedna rodzina zaokrąglonych kontrolek w trzech wykończeniach. Porównaj cień schodkowy, niski cień i wersję płaską. Przytrzymaj przycisk, sprawdź fokus i zobacz go również przy haśle na górze strony.','One rounded control family in three finishes. Compare a stepped shadow, a low shadow and a flat version. Press and hold a button, check focus and see it beside the headline at the top of the page.');
  lab.querySelector('.ctrl-actions').insertAdjacentHTML('afterend',`<p class="retro-finish-note">${t(controlVariants[state.controls].description,controlVariants[state.controls].descriptionEn)}</p>`);
}
function decorateRetroComponents(root){
  root.querySelectorAll('.solid-link,.outline-button,.disabled-button,.fresh-icon-button,.article-actions button,.article-end button,.comments button,.audio-play,#demo-chat button').forEach(button=>{
    if(button.querySelector(':scope > .retro-face'))return;
    const face=document.createElement('span');face.className='retro-face';
    while(button.firstChild)face.append(button.firstChild);
    button.append(face);button.classList.add('retro-button');
    if(button.matches('.solid-link,.audio-play,#demo-chat button'))button.classList.add('retro-primary');
  });
}
