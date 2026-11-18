/* Throwaway colour study hosted by the existing C route. No persistence. */
const colorUI={tab:'read',text:'',underline:true};
function applyColorPalette(){
  document.body.classList.toggle('palette-mode',Boolean(state.palette));
  document.body.style.cssText='';
  if(!state.palette){delete document.body.dataset.palette;document.querySelector('meta[name=theme-color]').content={A:'#201e1b',B:'#111b1c',C:'#292132'}[state.variant];return;}
  document.body.dataset.palette=state.palette;
  for(const[key,value]of Object.entries(colorPalettes[state.palette].tokens))document.body.style.setProperty('--'+key,value);
  document.querySelector('meta[name=theme-color]').content=colorPalettes[state.palette].tokens.bg;
}

function restoreColorUI(){
  const field=document.querySelector('#color-sample-field');if(!field)return;
  field.value=colorUI.text;
  document.querySelector('[data-color-underline]').checked=colorUI.underline;
  document.querySelector('.sample-inline-copy').classList.toggle('no-underlines',!colorUI.underline);
  document.querySelectorAll('[data-color-tab]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.colorTab===colorUI.tab));
  document.querySelector('.control-tab-copy').textContent=colorUI.tab==='read'?t('Tutaj liczą się spokojne tło, czytelne litery i link, który łatwo zauważyć.','A quiet background, readable type, and links that are easy to spot.'):t('Tu sprawdzisz kolor aktywnej zakładki. Odtwarzacz z nagraniem pozostaje podglądem na stronie artykułu.','This shows the active tab colour. The narration player remains a preview on the article page.');
  if(state.shape)document.querySelector('.control-tab-copy').textContent=colorUI.tab==='read'?t('Sprawdź kształt przycisków, ramki i detale ikon. Kolory pozostają z Leśnej pracowni.','Explore button shapes, borders, and icon details. The Forest workshop colours stay fixed.'):t('Tak wygląda aktywna zakładka. Odtwarzacz i jego kontrolki znajdziesz w przykładowym artykule.','This is the active tab. Find the player and its controls in the sample article.');
}

function colorPrototypeTools(){
  const keys=Object.keys(colorPalettes),p=colorPalettes[state.palette],n=keys.indexOf(state.palette)+1;
  return `<div class="prototype-switcher color-switcher" aria-label="${t('Porównaj palety','Compare palettes')}"><button data-cycle="-1" aria-label="${t('Poprzednia paleta','Previous palette')}">${icons.arrow}</button><div class="prototype-label" aria-live="polite"><small>${t('KOLOR','COLOUR')} · BRICOLAGE + HANKEN · ${state.lang.toUpperCase()}</small><strong>${t(p.name,p.en)} <span>${n}/4</span></strong><div class="mini-swatches" aria-hidden="true">${['bg','panel','text','muted','accent','link'].map(k=>`<i style="background:${p.tokens[k]}"></i>`).join('')}</div></div><button data-cycle="1" aria-label="${t('Następna paleta','Next palette')}">${icons.arrow}</button><button class="prototype-info" data-action="palette-info" aria-label="${t('Kolory i role','Colours and roles')}">?</button></div>`;
}

function colorPlayground(){
  return `<section id="palette-lab" class="color-lab"><div class="section-heading"><div><span class="eyebrow">${t('SPRÓBUJ KOLORÓW W DZIAŁANIU','TRY THE COLOURS IN CONTEXT')}</span><h2>${t('Wszystko ma swój odcień.','A colour for every little thing.')}</h2></div><span class="lab-demo-label">${t('Interaktywna próbka UI','Interactive UI sample')}</span></div><div class="color-lab-grid"><div class="control-sheet"><div class="control-tabs" role="group" aria-label="${t('Przykładowe zakładki','Sample tabs')}"><button data-color-tab="read" aria-pressed="true">${t('Czytam','Reading')}</button><button data-color-tab="listen" aria-pressed="false">${t('Słucham','Listening')}</button></div><p class="control-tab-copy">${t('Tutaj liczą się spokojne tło, czytelne litery i link, który łatwo zauważyć.','A quiet background, readable type, and links that are easy to spot.')}</p><div class="control-buttons">${link('article',t('Czytaj artykuł','Read article')+icons.arrow,'solid-link')}${button('share',t('Skopiuj link','Copy link'),'outline-button')}<button disabled class="disabled-button">${t('Już wkrótce','Coming soon')}</button></div><label class="field-label" for="color-sample-field">${t('Wypróbuj pole tekstowe','Try the text field')}</label><input id="color-sample-field" class="color-input" placeholder="${t('Napisz coś, co Cię ciekawi…','What are you curious about…?')}" autocomplete="off"><small class="field-hint">${t('Kliknij lub przejdź klawiszem Tab. Tekst pozostaje tylko w podglądzie.','Click or use Tab to focus. Your text stays in this preview.')}</small><label class="switch-label"><input type="checkbox" data-color-underline checked><span class="switch-track" aria-hidden="true"></span>${t('Podkreślaj linki w próbce','Underline links in the sample')}</label><div class="sample-inline-copy">${t('Dobry tekst prowadzi wzrok. <strong>Ważna myśl</strong> może mieć większy ciężar, a <a href="#color-text-sample">link w zdaniu</a> własny kolor.','Good writing guides the eye. An <strong>important thought</strong> can carry more weight, while an <a href="#color-text-sample">inline link</a> has its own colour.')}</div></div><div class="text-sheet" id="color-text-sample"><span class="color-tag">${t('Inżynieria i ciekawość','Engineering & curiosity')}</span><h3>${t('Małe detale.<br>Duża różnica.','Small details.<br>A big difference.')}</h3><p>${t('To jest podstawowy tekst: powinien dać się czytać spokojnie, również w dłuższym artykule. <a data-route href="'+href('article')+'">Zajrzyj do przykładowej lektury</a> i sprawdź, jak ta paleta działa na większej ilości treści.','This is the main text: it should feel comfortable, even in a longer article. <a data-route href="'+href('article')+'">Open the sample article</a> to see these colours across a longer read.')}</p><p class="secondary-copy">${t('Tekst drugorzędny dopowiada kontekst. Powinien być cichszy, ale nadal czytelny.','Secondary text adds context. It should be quieter and remain readable.')}</p><blockquote>${t('Ciekawość to dobry początek. Reszta zaczyna się od rozmowy.','Curiosity is a good beginning. The rest starts with a conversation.')}</blockquote><small class="caption-copy">${t('Przypis · Hanken Grotesk · przykład podpisu pod ilustracją','Caption · Hanken Grotesk · a sample illustration caption')}</small><div class="semantic-messages"><p class="message-success"><span aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3 3 7-7" stroke="currentColor" stroke-width="1.7"/></svg></span>${t('Gotowe — zmiana została zastosowana.','Done — your change has been applied.')}</p><p class="message-warning"><span aria-hidden="true">!</span>${t('Warto sprawdzić jeszcze jeden szczegół.','One more detail is worth checking.')}</p><p class="message-error"><span aria-hidden="true">!</span>${t('Coś wymaga poprawki. Spróbuj ponownie.','Something needs fixing. Please try again.')}</p></div><small class="field-hint">${t('Przykładowe komunikaty do porównania kolorów.','Sample messages for comparing colour roles.')}</small></div></div></section>`;
}

function colorPage(html){
  const p=colorPalettes[state.palette];
  html=html.replace('<main id="main" class="wrap home-c">',`<main id="main" class="wrap home-c"><div class="palette-context"><span>${t('PALETA','PALETTE')} 0${Object.keys(colorPalettes).indexOf(state.palette)+1} · ${t(p.name,p.en)}</span><a href="#palette-lab">${t('Wypróbuj kontrolki','Try the controls')} ${icons.arrow}</a></div>`);
  if(state.page==='home')html=html.replace(contacts(),colorPlayground()+contacts());
  const wording=[['Wszystkie notatki','Wszystkie artykuły'],['All notes','All articles'],['Notatki','Artykuły'],['Notes','Articles'],['Otwórz notatkę','Czytaj artykuł'],['Open note','Read article'],['NOTATKA','ARTYKUŁ'],['weź coś dla siebie ↓','weź coś dla siebie'],['take what you need ↓','take what you need'],['Ask about this note','Ask about this article'],['NOTE /','ARTICLE /'],['Czasem wychodzi z tego notatka.','Tutaj dzielę się tym, czego uczę się po drodze.'],['Sometimes it turns into a note.','This is where I share what I learn along the way.']];
  for(const[from,to]of wording)html=html.replaceAll(from,to);
  html=html.replace('<span class="film-frame">▷</span>','<span class="film-frame">'+icons.play+'</span>').replace('<span>✳</span>','<span>'+icons.spark+'</span>');
  return html;
}

function paletteInformation(){
  const p=colorPalettes[state.palette],labels={bg:t('Tło strony','Page background'),panel:t('Panele i odtwarzacz','Panels and audio player'),text:t('Główny tekst','Main text'),muted:t('Podpisy i tekst drugorzędny','Captions and secondary text'),accent:t('Akcent i wyróżnienie hasła','Accent and headline emphasis'),link:t('Linki w tekście','Inline links'),primary:t('Główny przycisk','Primary button'),secondary:t('Akcent pomocniczy','Secondary accent'),line:t('Obramowania','Borders'),focus:t('Obramowanie fokusu','Focus outline'),success:t('Sukces','Success'),warning:t('Uwaga','Warning'),error:t('Błąd','Error')};
  modal(t(p.name,p.en),`<p>${t(p.description,'The same layout, fonts, and content. Compare the colours of backgrounds, text, links, and controls.')}</p><div class="palette-choices">${Object.entries(colorPalettes).map(([key,item])=>`<button data-set-palette="${key}" aria-pressed="${key===state.palette}"><i style="background:${item.tokens.accent}" aria-hidden="true"></i>${t(item.name,item.en)}</button>`).join('')}</div><div class="color-role-list">${Object.entries(labels).map(([key,label])=>`<div><i style="background:${p.tokens[key]}" aria-hidden="true"></i><span>${label}</span><code>${p.tokens[key]}</code></div>`).join('')}</div><p class="palette-explanation">${t('Sprawdź też artykuł, filtr tematów, player i okna TLDR / promptu. Strzałki ← → zmieniają tylko paletę. Wszystkie integracje pozostają demonstracjami.','Try the article, topic filters, player, and TLDR / prompt dialogs too. Arrow keys change only the palette. Integrations remain demonstrations.')}</p>`);
}

document.addEventListener('click',e=>{
  if(e.target.closest('[data-action="palette-info"]'))paletteInformation();
  const pick=e.target.closest('[data-set-palette]');
  if(pick){const u=new URL(location.href);u.searchParams.set('palette',pick.dataset.setPalette);u.searchParams.set('variant','C');history.replaceState({},'',u);render();}
  const tab=e.target.closest('[data-color-tab]');
  if(tab){colorUI.tab=tab.dataset.colorTab;restoreColorUI();}
});
document.addEventListener('change',e=>{if(e.target.matches('[data-color-underline]')){colorUI.underline=e.target.checked;restoreColorUI();}});
document.addEventListener('input',e=>{if(e.target.matches('#color-sample-field'))colorUI.text=e.target.value;});
