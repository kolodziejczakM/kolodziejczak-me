/* THROWAWAY, form round 2: four softer systems on the existing route.
   Fixed meadow palette and typography. Full solid field borders in every state.
   Previous soft/stamp/cut remain a separate comparison group. */
Object.assign(shapeVariants,{
  press:{round:2,name:'Miękki druk',en:'Soft print',
    description:'Miękkie karty i wyraziste przyciski z twardym cieniem. Najbliżej połączenia pierwszego i drugiego wariantu.',
    descriptionEn:'Soft cards and bold buttons with a crisp offset shadow. A blend of the first two previous directions.',
    detail:'Obramowany przycisk ugina się przy kliknięciu, karty mają spokojny obrys, a ikony przypominają małe drukowane znaki.',
    detailEn:'Framed buttons press into their shadow, cards have quiet borders, and icons feel like small printed marks.'},
  bookmark:{round:2,name:'Zakładka',en:'Bookmark',
    description:'Asymetryczne zaokrąglenia inspirowane okładką książki. Jedna duża krzywizna staje się znakiem rozpoznawczym.',
    descriptionEn:'Asymmetric curves inspired by a book cover. One generous corner becomes a recurring signature.',
    detail:'Przycisk, karty, pola i player powtarzają ten sam układ narożników. Symbol zakładki jest osadzony w ilustracji książki.',
    detailEn:'Buttons, cards, fields, and the player repeat the same corner pattern. A bookmark is anchored inside the book illustration.'},
  orbit:{round:2,name:'Kontur i kropka',en:'Outline & dot',
    description:'Obłe ramki, kontrastowe kółka z ikoną i kapsułki. Charakter buduje powtarzalny motyw koła.',
    descriptionEn:'Rounded frames, contrasting icon discs, and capsules. A recurring circle gives the interface its character.',
    detail:'Główna akcja ma ikonę w osobnym kole, etykiety są obrysowane, a przełącznik ma pierścieniowe pokrętło. Bez dodatkowych kresek na kartach.',
    detailEn:'Primary actions have an icon inside a disc, labels are outlined, and the switch has a ring-shaped knob. Cards carry no extra decorative lines.'},
  ticket:{round:2,name:'Bilet do rozmowy',en:'A ticket to talk',
    description:'Zaokrąglony bilet z małymi wcięciami po bokach przycisku. Karty przypominają zaproszenia z osobną stopką.',
    descriptionEn:'A rounded ticket with small notches at the sides of buttons. Cards resemble invitations with a distinct footer.',
    detail:'Wcięcia są częścią kształtu przycisku i ilustracji. Ramki pól pozostają pełne, a stopka karty porządkuje datę i przejście do artykułu.',
    detailEn:'Notches belong to the button silhouette and illustration. Fields retain complete borders, while the card footer groups the date and article link.'}
});

function refinedShapeIcon(name,kind){
  const paths={
    press:{
      arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
      read:'<path d="M3 5h7l2 2 2-2h7v15h-7l-2 1-2-1H3Z"/><path d="M12 7v14M6 9h3m6 0h3"/>',
      play:'<path d="M7 5q0-2 2-1l12 7q2 1 0 2L9 20q-2 1-2-1Z" fill="currentColor" stroke="none"/>',
      copy:'<rect x="8" y="8" width="13" height="13" rx="3"/><path d="M15 3H6Q3 3 3 6v9"/>',
      chat:'<path d="M3 6q0-3 3-3h12q3 0 3 3v9q0 3-3 3H9l-6 3Z"/><path d="M7 9h10M7 13h6"/>',
      check:'<path d="m4 12 5 5L21 5"/>',
      heart:'<path d="M12 21C8 18 2 13 2 8c0-6 8-7 10-1 2-6 10-5 10 1 0 5-6 10-10 13Z"/>',
      spark:'<path d="M12 2q2 8 10 10-8 2-10 10Q10 14 2 12q8-2 10-10Z" fill="currentColor" stroke="none"/>'
    },
    bookmark:{
      arrow:'<path d="M3 15V9h17m-6-6 6 6-6 6"/>',
      read:'<path d="M5 3h13q3 0 3 3v15H6q-3 0-3-3V6q0-3 2-3Z"/><path d="M3 17h18M9 3v8l3-2 3 2V3"/>',
      play:'<path d="M6 4q0-2 2-1l13 8q2 1 0 2L8 21q-2 1-2-1Z"/><path d="m10 9 6 3-6 3Z" fill="currentColor" stroke="none"/>',
      copy:'<path d="M9 8h9q3 0 3 3v10H11q-3 0-3-3V8ZM4 16H3V3h10q3 0 3 3"/>',
      chat:'<path d="M3 3h12q6 0 6 6v9H9l-6 3Z"/><path d="M7 8h9M7 12h5"/>',
      check:'<path d="m4 12 5 5L21 5"/>',
      heart:'<path d="M12 21S3 15 3 8q0-5 4-5t5 4q1-4 5-4t4 5c0 7-9 13-9 13Z"/>',
      spark:'<path d="M7 3h10v19l-5-4-5 4Z"/><path d="M10 7h4"/>'
    },
    orbit:{
      arrow:'<path d="M5 12h15m-6-6 6 6-6 6"/><circle cx="4" cy="12" r="2" fill="currentColor" stroke="none"/>',
      read:'<path d="M3 5q5-3 9 0 4-3 9 0v15q-5-3-9 0-4-3-9 0Z"/><path d="M12 5v15"/>',
      play:'<path d="M8 5q-2-1-2 1v12q0 2 2 1l11-6q2-1 0-2Z" fill="currentColor" stroke="none"/>',
      copy:'<rect x="8" y="8" width="13" height="13" rx="5"/><path d="M14 3H8Q3 3 3 8v6"/><circle cx="3" cy="16" r="1.5" fill="currentColor" stroke="none"/>',
      chat:'<path d="M12 3q9 0 9 8t-9 8H7l-4 3 1-6Q0 3 12 3Z"/><circle cx="8" cy="11" r="1" fill="currentColor"/><circle cx="16" cy="11" r="1" fill="currentColor"/>',
      check:'<path d="m4 12 5 5L20 6"/><circle cx="20" cy="6" r="1.6" fill="currentColor" stroke="none"/>',
      heart:'<path d="M12 20C8 18 2 13 2 8 2 2 10 2 12 7c2-5 10-5 10 1 0 5-6 10-10 12Z"/>',
      spark:'<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>'
    },
    ticket:{
      arrow:'<path d="M3 12h17m-6-6 6 6-6 6"/><path d="M4 8v8"/>',
      read:'<path d="M4 3h16v18H4Z"/><path d="M8 3v18m4-13h4m-4 4h4m-4 4h2"/>',
      play:'<path d="M7 4q0-1 1 0l13 8L8 20q-1 1-1-1Z" fill="currentColor" stroke="none"/>',
      copy:'<path d="M8 8h13v5q-3 1 0 3v5H8v-5q3-2 0-3Zm8-4H3v13"/>',
      chat:'<path d="M3 4h18v4q-3 2 0 4v6H9l-6 4v-10q3-2 0-4Z"/><path d="M8 9h8M8 13h5"/>',
      check:'<path d="m4 12 5 5L21 5"/>',
      heart:'<path d="M12 21 3 12C-2 4 7 0 12 7c5-7 14-3 9 5Z"/>',
      spark:'<path d="M4 4h16v5q-4 3 0 6v5H4v-5q4-3 0-6Z"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>'
    }
  };
  return `<svg class="shape-icon" data-icon="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${kind==='press'?2.2:kind==='orbit'?2:1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[kind][name]||'<path d="m6 6 12 12M18 6 6 18"/>'}</svg>`;
}

function refinedShapeHero(kind){
  const frames={
    press:'<rect x="48" y="42" width="222" height="196" rx="30" fill="var(--art-ink)"/><rect x="40" y="34" width="222" height="196" rx="30" fill="var(--secondary)" stroke="var(--art-ink)" stroke-width="3"/>',
    bookmark:'<path d="M31 44h209q35 0 35 35v143H64q-33 0-33-27Z" fill="var(--secondary)" stroke="var(--art-ink)" stroke-width="3"/><path d="M31 194q0-15 30-15h214v43H62q-31 0-31-28Z" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/><path d="M214 45h27v61l-14-10-13 10Z" fill="var(--primary)" stroke="var(--art-ink)" stroke-width="2"/>',
    orbit:'<circle cx="155" cy="133" r="111" fill="var(--secondary)" stroke="var(--art-ink)" stroke-width="3"/><circle cx="155" cy="133" r="99" fill="none" stroke="var(--art-ink)" stroke-width="1.5"/><circle cx="253" cy="84" r="15" fill="var(--primary)" stroke="var(--art-ink)" stroke-width="3"/>',
    ticket:'<path d="M49 39h212q15 0 15 15v65q-26 13 0 26v67q0 15-15 15H49q-15 0-15-15v-67q26-13 0-26V54q0-15 15-15Z" fill="var(--secondary)" stroke="var(--art-ink)" stroke-width="3"/><path d="M72 196h166" stroke="var(--art-ink)" stroke-width="2"/><circle cx="82" cy="211" r="3" fill="var(--art-ink)"/><circle cx="96" cy="211" r="3" fill="var(--art-ink)"/>'
  };
  const cursor='<path d="M112 53q-5-4-5 3l10 137q1 7 6 1l32-44 54-4q7-1 1-6Z" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3.5" stroke-linejoin="round"/><path d="m112 59 43 91" stroke="var(--art-ink)" stroke-width="2.5"/><ellipse cx="141" cy="107" rx="3.5" ry="6" fill="var(--art-ink)"/><ellipse cx="159" cy="122" rx="3.5" ry="6" fill="var(--art-ink)"/><path d="M135 131q1 12 13 12" fill="none" stroke="var(--art-ink)" stroke-width="2.5" stroke-linecap="round"/>';
  return `<div class="cursor-art shape-hero refined-hero" aria-hidden="true"><svg viewBox="0 0 310 270" fill="none">${frames[kind]}${cursor}</svg><span class="hand-note">${t('klik, i jesteś u siebie.','click. make yourself at home.')}</span></div>`;
}

function decorateRefinedShapes(){
  const p=shapeVariants[state.shape];
  const heading=document.querySelector('.color-lab h2');if(heading)heading.textContent=t('Miękko, ale z charakterem.','Soft, with a character.');
  const banner=document.querySelector('.palette-context');if(banner)banner.insertAdjacentHTML('afterend',`<p class="refinement-caption">${t(p.description,p.descriptionEn)}</p>`);
  document.querySelectorAll('.solid-link').forEach(e=>{if(!e.querySelector('.shape-icon'))e.insertAdjacentHTML('beforeend',shapeIcon('arrow'));});
  document.querySelectorAll('.note-card').forEach(card=>{
    card.querySelector('.note-card-top>span:last-child').classList.add('refined-card-icon');
  });
}

function decorateRefinedModal(){
  document.querySelector('.modal-close').innerHTML=shapeIcon('close');
  document.querySelectorAll('.modal .solid-link').forEach(e=>{
    e.innerHTML=e.innerHTML.replace(' ↗','')+shapeIcon('copy');
  });
  const send=document.querySelector('#demo-chat button');if(send)send.innerHTML=shapeIcon('arrow');
}
