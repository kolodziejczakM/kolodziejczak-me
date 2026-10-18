/* THROWAWAY consolidated review: Closer + Forest workshop + Quiet outline.
   Bare PL/EN routes show one selected design; explicit experiment URLs survive.
   Author materials and integrations remain clearly marked samples. */
function selectedBrand(){
  return `<span class="selected-brand-mark" aria-hidden="true">${compositionMark('close')}</span><span class="selected-brand-name">Marcin Kołodziejczak<small>kolodziejczak.me</small></span>`;
}
function selectedHeader(){
  const other=state.lang==='pl'?'en':'pl';
  return `<header class="site-header wrap">${link('home',selectedBrand(),'brand')}<nav aria-label="${t('Nawigacja główna','Main navigation')}">${link('home',t('O mnie','About'),state.page==='home'?'active':'')}${link('blog',t('Artykuły','Articles'),state.page!=='home'?'active':'')}<a data-route href="${href('home')}#contact">${t('Kontakt','Contact')}</a><a data-route class="selected-locale" href="${href(state.page,currentPost(),other)}" lang="${other}" aria-label="${t('Switch to English','Przełącz na polski')}">${other.toUpperCase()}<span aria-hidden="true"> ↗</span></a></nav></header>`;
}
function selectedFooter(){
  return `<footer class="wrap site-footer"><div class="selected-footer-top">${link('home',selectedBrand(),'brand')}<span>${t('Z ciekawości. Po swojemu.','Stay curious. Make it your own.')}</span><nav aria-label="${t('Nawigacja w stopce','Footer navigation')}">${link('blog',t('Artykuły','Articles'))}<a data-route href="${href('home')}#contact">${t('Kontakt','Contact')}</a></nav></div><div class="selected-footer-bottom"><span>© 2026 Marcin Kołodziejczak</span><small>${t('Podgląd projektu · bio i publikacje są przykładowe.','Design preview · bio and articles are samples.')}</small><a href="https://about.me/marcin_kolodziejczak" target="_blank" rel="noreferrer">about.me ↗</a></div></footer>`;
}
function selectedContacts(){
  return `<section class="selected-contacts" id="contact" aria-labelledby="contact-title"><div><span class="eyebrow">${t('INTERNET JEST FAJNIEJSZY Z LUDŹMI','THE INTERNET IS BETTER WITH PEOPLE')}</span><h2 id="contact-title">${t('Złapmy kontakt.','Let’s connect.')}</h2><p>${t('Dobra rozmowa zaczyna się od zwykłego „cześć”.','A good conversation starts with a simple hello.')}</p><a class="selected-about-link" href="https://about.me/marcin_kolodziejczak" target="_blank" rel="noreferrer">${t('Znajdziesz mnie na about.me','Find me on about.me')}${icons.arrow}</a></div><div class="selected-contact-channels"><span class="selected-sample-label">${t('Kanały kontaktu · adresy do uzupełnienia','Contact channels · links to be added')}</span><div>${['LinkedIn','WhatsApp','Telegram','Facebook'].map(name=>`<button data-contact="${name}">${name}${icons.arrow}</button>`).join('')}</div></div></section>`;
}
function decorateSelectedPage(){
  document.querySelectorAll('#palette-lab,.palette-context,.composition-caption,.refinement-caption').forEach(e=>e.remove());
  document.querySelector('.site-header').outerHTML=selectedHeader();
  document.querySelector('.site-header nav>a.active')?.setAttribute('aria-current',state.page==='article'?'location':'page');
  document.querySelector('.site-footer').outerHTML=selectedFooter();
  const contacts=document.querySelector('#contact');if(contacts)contacts.outerHTML=selectedContacts();
  document.querySelector('.composition-bio p')?.insertAdjacentHTML('beforeend',`<small class="selected-sample-label">${t('Bio robocze · zdjęcie do uzupełnienia','Sample bio · photo to be added')}</small>`);
  const homeLabel=document.querySelector('.play-notes .eyebrow');if(homeLabel)homeLabel.textContent=t('PRZYKŁADOWE ARTYKUŁY','SAMPLE ARTICLES');
  const listTitle=document.querySelector('.blog-intro h1');if(listTitle)listTitle.innerHTML=t('Artykuły.<br><em>Z ciekawości.</em>','Articles.<br><em>Out of curiosity.</em>');
  const listKicker=document.querySelector('.blog-intro>.eyebrow');if(listKicker)listKicker.textContent=t('KOD, NARZĘDZIA I TO, CO POMIĘDZY','CODE, TOOLS AND EVERYTHING BETWEEN');
  const listHint=document.querySelector('.blog-intro>small');if(listHint)listHint.textContent=t('Przykładowe publikacje pokazujące docelowy układ strony.','Sample articles showing the selected page design.');
  const comments=document.querySelector('.comments');
  if(comments){
    comments.querySelector('p').textContent=t('Masz inne spojrzenie? Tutaj będzie miejsce na pytania, własne doświadczenia i dalszą rozmowę.','Have a different perspective? This will be a place for questions, personal experiences and further conversation.');
    comments.querySelector('button').textContent=t('O komentarzach','About comments');
    const toc=document.createElement('details');toc.className='selected-mobile-contents';toc.innerHTML=`<summary>${t('Spis treści','Contents')}${controlIcon('down')}</summary><nav aria-label="${t('Spis treści artykułu','Article contents')}">${currentPost().sections.map((s,i)=>`<a href="#part-${i}">${String(i+1).padStart(2,'0')} <span>${textOf(s)}</span></a>`).join('')}</nav>`;
    document.querySelector('.article-toolbox').before(toc);
    document.querySelector('.article-end [data-action=like]').setAttribute('aria-pressed',String(state.liked));
    const readNext=posts[(posts.indexOf(currentPost())+1)%posts.length];
    comments.insertAdjacentHTML('afterend',`<aside class="selected-read-next"><span class="eyebrow">${t('JESZCZE JEDNA MYŚL','ONE MORE THOUGHT')}</span>${link('article',`<span>${textOf(readNext.title)}</span>${icons.arrow}`,'selected-next-link',readNext)}</aside>`);
  }
  decorateFreshComponents(document.querySelector('#app'));
  document.title=(state.page==='article'?textOf(currentPost().title):state.page==='blog'?t('Artykuły','Articles'):'Marcin Kołodziejczak')+' · kolodziejczak.me';
  const skip=document.querySelector('.skip');skip.textContent=t('Przejdź do treści','Skip to content');
}
function decorateSelectedModal(){
  const chat=document.querySelector('.modal #demo-chat');
  if(chat)document.querySelector('.modal>small').textContent=t('Przykładowa rozmowa. Wiadomości nie są wysyłane.','Sample conversation. Messages are not sent.');
  const label=document.querySelector('.modal>.eyebrow');if(label)label.textContent=state.page==='article'?t('WOKÓŁ ARTYKUŁU','AROUND THE ARTICLE'):t('ZŁAPMY KONTAKT','LET’S CONNECT');
}
document.addEventListener('click',e=>{
  if(!state.selected)return;
  const contact=e.target.closest('[data-contact]');
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(contact){
    e.stopImmediatePropagation();modal(contact.dataset.contact,`<p>${t('Ten kanał jest częścią podglądu. Właściwy adres kontaktowy pojawi się przed uruchomieniem strony.','This channel is part of the preview. The actual contact link will be added before launch.')}</p><a class="text-link" href="https://about.me/marcin_kolodziejczak" target="_blank" rel="noreferrer">${t('Przejdź do mojego profilu about.me','Visit my about.me profile')}${icons.arrow}</a>`);
  }
  if(action==='comments'){
    e.stopImmediatePropagation();modal(t('Miejsce na dobrą rozmowę.','Room for a good conversation.'),`<p>${t('Komentarze są jeszcze podglądem. W gotowej stronie będzie można odnieść się do artykułu i wymienić doświadczeniami z innymi czytelnikami.','Comments are still a preview. The finished site will let readers respond to the article and share their experiences.')}</p>`);
  }
  if(action==='audio'){
    e.stopImmediatePropagation();toast(t('Nagranie do tego artykułu nie zostało jeszcze dodane.','Narration for this article has not been added yet.'));
  }
},true);
