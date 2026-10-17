/* THROWAWAY: appearance and interaction study; no accounts, tracking or remote widgets. */
const variants = { A: ['Margines', 'Redakcyjny spokój / editorial'], B: ['Sygnał', 'Cyfrowy warsztat / digital workshop'], C: ['Po godzinach', 'Ciekawość i zabawa / curiosity & play'] };
const state = { variant: 'A', palette: null, lang: 'pl', page: 'home', liked: false, filter: 'all', dismissed: false, audioLang: 'pl' };
const $ = (s) => document.querySelector(s);
const t = (pl, en) => state.lang === 'pl' ? pl : en;
const icons = {
  heart: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20 4.5 12.8C-2 6.5 7 0 12 7c5-7 14-.5 7.5 5.8Z" stroke="currentColor" stroke-width="1.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>',
  spark: '<svg viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M30 2v56M2 30h56M10 10l40 40M10 50l40-40M19 4l22 52M4 19l52 22M4 41L56 19M19 56 41 4" stroke="currentColor" stroke-width="2"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" stroke="currentColor" stroke-width="1.5"/></svg>'
};

const posts = [
  {
    id: 'less', category: 'engineering', number: '01', date: '12.10.2026',
    title: ['Mniej kodu. Więcej myślenia.', 'Less code. More thinking.'],
    desc: ['O tym, dlaczego najciekawszą częścią pracy z AI jest to, co dzieje się przed napisaniem pierwszej linijki.', 'Why the most interesting part of working with AI happens before the first line of code.'],
    slug: ['mniej-ale-lepiej', 'less-but-better'], label: ['Inżynieria', 'Engineering'],
    sections: [
      ['Najpierw dobre pytanie', 'Start with a good question', 'Otwierasz edytor. Masz pomysł, kawę i narzędzie, które potrafi napisać prawie wszystko. Pokusa jest prosta: od razu poprosić o kod. Ale co właściwie chcesz zbudować? I dla kogo?', 'You open your editor. You have an idea, a coffee, and a tool that can write almost anything. The temptation is simple: ask for code right away. But what are you actually trying to build? And who is it for?'],
      ['Szybciej nie zawsze znaczy bliżej', 'Faster does not always mean closer', 'Łatwo pomylić tempo pracy z postępem. Można w godzinę napisać mnóstwo kodu i ani o krok nie przybliżyć się do rozwiązania prawdziwego problemu. Warto zatrzymać się i nazwać to, czego jeszcze nie wiemy.', 'It is easy to confuse speed with progress. You can write a lot of code in an hour without getting any closer to solving the real problem. It helps to pause and name the things you do not yet know.'],
      ['Prototyp jako pytanie', 'A prototype is a question', 'Dobry prototyp nie musi przypominać gotowego produktu. Ma odpowiedzieć na jedno pytanie. Czy ten układ jest zrozumiały? Czy ta interakcja daje poczucie kontroli? Czy w ogóle potrzebujemy tej funkcji?', 'A good prototype does not have to resemble a finished product. It needs to answer one question. Is this layout understandable? Does this interaction give a sense of control? Do we even need this feature?'],
      ['Mniej decyzji na zapas', 'Fewer decisions in advance', 'Nie każda możliwość musi stać się wymaganiem. Gdy zaczynam nowy projekt, próbuję oddzielić to, co potrzebne dzisiaj, od tego, co być może przyda się kiedyś. To zostawia więcej miejsca na zmianę zdania.', 'Not every possibility needs to become a requirement. When starting a new project, I try to separate what is needed today from what might be useful someday. This leaves more room to change my mind.'],
      ['Człowiek zostaje w pętli', 'Keep a person in the loop', 'Narzędzie może podsunąć dziesięć rozwiązań. Wybór nadal należy do nas. Wymaga znajomości kontekstu, rozmowy z ludźmi i zgody na to, że pierwsza odpowiedź nie musi być najlepsza.', 'A tool can suggest ten solutions. The choice is still ours. It requires context, conversations with people, and accepting that the first answer may not be the best one.'],
      ['Co możesz sprawdzić jutro?', 'What can you try tomorrow?', 'Zanim zlecisz kolejną funkcję, zapisz jednym zdaniem pytanie, na które ma odpowiedzieć. Zbuduj najmniejszą rzecz, która pomoże to sprawdzić. Pokaż ją komuś. Dopiero potem zdecyduj, co dalej.', 'Before asking for another feature, write down the question it should answer in a single sentence. Build the smallest thing that helps you test it. Show it to someone. Then decide what comes next.']
    ]
  },
  {
    id: 'web', category: 'web', number: '02', date: '05.10.2026',
    title: ['Internet trochę bardziej ludzki.', 'A slightly more human internet.'],
    desc: ['Małe strony, własne miejsca i radość z tworzenia czegoś po swojemu.', 'Small websites, places of our own, and the joy of making things our way.'],
    slug: ['bardziej-ludzki-internet', 'a-more-human-internet'], label: ['Własny kawałek sieci', 'The personal web'],
    sections: [
      ['Miejsce na własny głos', 'Room for your own voice', 'Osobista strona może być mała. Nie musi walczyć o każdą sekundę uwagi. Wystarczy, że ma coś do powiedzenia i ułatwia czytelnikowi znalezienie tego, po co przyszedł.', 'A personal website can be small. It does not have to compete for every second of attention. It is enough to have something to say and help readers find what they came for.'],
      ['Poza gotowym szablonem', 'Beyond the default template', 'Własny krój pisma, trochę przestrzeni i nietypowy akcent mogą powiedzieć więcej niż najbardziej rozbudowana animacja. Forma ma wspierać treść i dawać jej charakter.', 'A distinctive typeface, some breathing room, and an unexpected accent can say more than an elaborate animation. Form should support the content and give it character.'],
      ['Spokojne czytanie', 'Quiet reading', 'Tekst potrzebuje dobrego kontrastu, odpowiedniej długości wiersza i rytmu. Te drobne decyzje sprawiają, że łatwiej zostać na dłużej i zrozumieć myśl autora.', 'Text needs good contrast, a comfortable line length, and rhythm. These small decisions make it easier to stay a little longer and understand what the author means.'],
      ['Rozmowa zamiast zasięgu', 'Conversation over reach', 'Może najcenniejszym rezultatem publikacji będzie jedna dobra rozmowa. Dlatego kontakt powinien być prosty, a wyjście ze strony równie łatwe jak wejście.', 'Maybe the most valuable result of publishing will be one good conversation. That is why getting in touch should be simple, and leaving should be as easy as arriving.']
    ]
  },
  {
    id: 'film', category: 'curiosity', number: '03', date: '28.09.2026',
    title: ['Czego montaż uczy o interfejsach?', 'What can editing teach us about interfaces?'],
    desc: ['Kilka luźnych myśli na styku filmu, rytmu i projektowania doświadczeń.', 'A few thoughts at the intersection of film, rhythm, and designing experiences.'],
    slug: ['montaz-i-interfejsy', 'editing-and-interfaces'], label: ['Poza kodem', 'Beyond code'],
    sections: [
      ['Wszystko ma swój rytm', 'Everything has a rhythm', 'W filmie znaczenie ma nie tylko to, co widzimy, ale też kiedy to widzimy. Podobnie działa interfejs: kolejność informacji może pomóc zrozumieć sytuację albo zupełnie z niej wybić.', 'In film, what matters is not just what we see but when we see it. Interfaces work in a similar way: the order of information can help us understand a situation or completely break our focus.'],
      ['Cięcie w dobrym momencie', 'A well-timed cut', 'Dobra zmiana widoku zostawia wystarczająco dużo kontekstu. Wiemy, skąd przyszliśmy i co wydarzy się dalej. Nie musimy składać całej historii od początku.', 'A good transition leaves enough context. We know where we came from and what happens next. We do not have to piece the whole story together again.'],
      ['Przestrzeń na oddech', 'Room to breathe', 'Cisza bywa równie wymowna jak dialog. Pusta przestrzeń na stronie może pełnić podobną rolę: pozwala zauważyć to, co naprawdę ważne.', 'Silence can be as expressive as dialogue. Empty space on a page can play a similar role: it helps us notice what actually matters.'],
      ['Jedna historia naraz', 'One story at a time', 'Gdy wszystko walczy o uwagę, trudno śledzić jakikolwiek wątek. Warto wybrać jedną myśl przewodnią i budować wokół niej doświadczenie, krok po kroku.', 'When everything competes for attention, it is hard to follow any thread. It helps to choose one central idea and build the experience around it, step by step.']
    ]
  }
];
const textOf = (arr) => arr[state.lang === 'pl' ? 0 : 1];
const href = (page = 'home', post = posts[0], lang = state.lang) => `/${lang}/${page === 'home' ? '' : page === 'blog' ? 'blog/' : `blog/${post.slug[lang === 'pl' ? 0 : 1]}/`}?variant=${state.variant}${state.palette?'&palette='+state.palette:''}`;
const currentPost = () => posts.find(p => p.slug.some(slug => location.pathname.includes(slug))) || posts[0];
const link = (page, label, cls = '', post = posts[0]) => `<a class="${cls}" data-route href="${href(page, post)}">${label}</a>`;
const button = (action, label, cls = '') => `<button class="${cls}" data-action="${action}">${label}</button>`;

function header() {
  return `<header class="site-header wrap">
    ${link('home', `<span class="brand-symbol">${state.variant === 'B' ? 'mk_' : state.variant === 'C' ? 'mk.' : icons.spark}</span><span class="brand-name">marcin<span class="brand-surname"> kołodziejczak</span><span class="brand-period">.</span></span>`, 'brand')}
    <nav aria-label="${t('Nawigacja główna', 'Main navigation')}">
      ${link('home', t('O mnie', 'About'), state.page === 'home' ? 'active' : '')}
      ${link('blog', t('Notatki', 'Notes'), state.page !== 'home' ? 'active' : '')}
      <span class="nav-divider"></span><a data-route class="locale" href="${href(state.page, currentPost(), state.lang === 'pl' ? 'en' : 'pl')}" lang="${state.lang === 'pl' ? 'en' : 'pl'}" aria-label="${t('Switch to English', 'Przełącz na polski')}"><b>${state.lang.toUpperCase()}</b><span> / ${state.lang === 'pl' ? 'EN' : 'PL'}</span></a>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="wrap site-footer"><div>${icons.star}<span>© 2026 Marcin Kołodziejczak</span></div><span>${t('Z ciekawości. Po swojemu.', 'Stay curious. Make it your own.')}</span><a href="https://about.me/marcin_kolodziejczak" target="_blank" rel="noreferrer">about.me ↗</a></footer>`;
}

function contacts() {
  return `<div class="contacts" id="contact"><span class="eyebrow">${t('Złapmy kontakt', 'Let’s connect')}</span><div>${['LinkedIn', 'WhatsApp', 'Telegram', 'Facebook'].map(name => `<button data-contact="${name}">${name} <span>↗</span></button>`).join('')}</div></div>`;
}

function portrait(style = '') {
  return `<div class="portrait ${style}" role="img" aria-label="${t('Miejsce na Twoje zdjęcie — tymczasowy monogram MK', 'Your photo goes here — temporary MK monogram')}"><div class="portrait-grid"></div><span class="portrait-monogram">mk.</span><span class="portrait-caption">${t('tu będzie Twój portret', 'your portrait goes here')}</span><span class="portrait-corner">↗</span></div>`;
}

function orbit() {
  return `<div class="orbit-art" aria-hidden="true"><svg viewBox="0 0 440 390" fill="none"><g stroke="currentColor" stroke-width="1.3"><ellipse cx="220" cy="192" rx="182" ry="73" transform="rotate(-30 220 192)"/><ellipse cx="220" cy="192" rx="182" ry="73" transform="rotate(31 220 192)"/><ellipse cx="220" cy="192" rx="174" ry="65" transform="rotate(90 220 192)"/><circle cx="220" cy="192" r="61"/><path d="m189 180-14 12 14 12m62-24 14 12-14 12m-24-28-14 32" stroke-width="2.4"/><path d="M344 79v24m-12-12h24M81 260v18m-9-9h18"/></g><circle cx="365" cy="130" r="8" fill="currentColor"/><circle cx="145" cy="312" r="5" fill="currentColor"/><circle cx="212" cy="18" r="4" fill="currentColor"/></svg><span class="orbit-label label-one">${t('technologia', 'technology')}</span><span class="orbit-label label-two">${t('ciekawość', 'curiosity')}</span><span class="orbit-label label-three">${t('człowiek', 'people')}</span></div>`;
}

function cursorArt() {
  return `<div class="cursor-art" aria-hidden="true"><svg viewBox="0 0 300 260" fill="none"><path d="M91 30 230 141l-72 6-33 68Z" fill="var(--art-paper,#e9dfc9)" stroke="var(--art-ink,#2b2032)" stroke-width="5" stroke-linejoin="round"/><path d="m91 30 67 117" stroke="var(--art-ink,#2b2032)" stroke-width="3"/><ellipse cx="143" cy="112" rx="5" ry="8" fill="var(--art-ink,#2b2032)"/><ellipse cx="165" cy="130" rx="5" ry="8" fill="var(--art-ink,#2b2032)"/><path d="M138 142q1 15 15 12M73 202q-23 1-28-19M219 59l9-19m7 27 20-5M54 84 38 73" stroke="var(--art-detail,#d8b2f2)" stroke-width="4" stroke-linecap="round"/><path d="m51 119 5 12 13 2-10 9 1 14-11-8-12 6 4-13-8-11 13-1Z" fill="var(--art-star,#d9ed7f)"/><path d="m236 185 5 12 13 2-10 9 1 14-11-8-12 6 4-13-8-11 13-1Z" fill="var(--art-star,#d9ed7f)"/></svg><span class="hand-note">${t('klik, i jesteś u siebie.', 'click. make yourself at home.')}</span></div>`;
}

function postRows() {
  return posts.map(p => `<a class="post-row" data-route href="${href('article', p)}"><span class="post-number">${p.number}</span><div><span class="eyebrow">${textOf(p.label)}</span><h3>${textOf(p.title)}</h3><p>${textOf(p.desc)}</p></div><span class="post-row-date">${p.date.slice(0,5)}<br><span>2026</span></span><span class="post-arrow">${icons.arrow}</span></a>`).join('');
}

function homeA() {
  return `<main id="main" class="wrap home-a"><div class="eyebrow intro-kicker"><span class="status-dot"></span>${t('Własny kawałek internetu', 'A little corner of the internet')}<span>01 / 03</span></div><section class="editorial-hero"><div><p class="hello">${t('Cześć, jestem Marcin.', 'Hi, I’m Marcin.')}</p><h1>${t('Technologia.<br>Człowiek.<br><em>Cała reszta.</em>', 'Technology.<br>People.<br><em>Everything else.</em>')}</h1><p class="hero-description">${t('Buduję interfejsy, zadaję pytania i szukam prostszych rozwiązań. Tu zapisuję to, czego uczę się po drodze.', 'I build interfaces, ask questions, and look for simpler solutions. This is where I share what I learn along the way.')}</p>${link('blog', t('Zajrzyj do notatek', 'Explore my notes') + icons.arrow, 'text-link')}</div><div class="hero-aside">${orbit()}<div class="about-mini">${portrait('small')}<div><strong>Marcin Kołodziejczak</strong><span>Front-end · AI · ${t('i nie tylko', 'and beyond')}</span></div></div></div></section><section class="latest"><div class="section-heading"><h2>${t('Ostatnio na marginesie', 'Recently in the margins')}</h2>${link('blog', t('Wszystkie notatki', 'All notes') + ' ↗')}</div>${postRows()}</section>${contacts()}</main>`;
}

function homeB() {
  return `<main id="main" class="wrap home-b"><aside class="profile-sidebar"><span class="eyebrow">[ ${t('CZŁOWIEK ZA KURSOREM', 'HUMAN BEHIND THE CURSOR')} ]</span>${portrait()}<h1>Marcin<br> Kołodziejczak<span class="lime">_</span></h1><p>${t('Frontend, AI i rzeczy, które nie mieszczą się w jednej zakładce.', 'Frontend, AI, and things that don’t fit neatly into one browser tab.')}</p><span class="availability"><span class="status-dot"></span>${t('Ciekawość: zawsze online', 'Curiosity: always online')}</span>${contacts()}<span class="sidebar-index">PERSONAL WEB / EST. 2026</span></aside><div class="signal-main"><section class="signal-hero"><div class="signal-top"><span class="eyebrow">${t('NOTATKI Z WARSZTATU', 'NOTES FROM THE WORKSHOP')}</span><span class="signal-dot"><i></i><i></i><i></i></span></div><h2>${t('Mniej<br>szumu.<br><span>Więcej sensu.</span>', 'Less<br>noise.<br><span>More signal.</span>')}</h2><p>${t('O kodzie, narzędziach i myśleniu. Z praktyki, bez zadęcia.', 'On code, tools, and thinking. Practical notes, minus the hype.')}</p><div class="signal-line"><span>INPUT → QUESTION → EXPERIMENT → IDEA</span><span>↓</span></div></section><section><div class="section-heading"><h2>${t('Ostatnie transmisje', 'Latest transmissions')}</h2>${link('blog', t('Archiwum', 'Archive') + ' ↗')}</div>${posts.map(p => `<a data-route href="${href('article', p)}" class="transmission"><div class="transmission-meta"><span>LOG_${p.number}</span><span>${p.date}</span><span>${textOf(p.label)}</span></div><h3>${textOf(p.title)}<span>↗</span></h3><p>${textOf(p.desc)}</p></a>`).join('')}</section></div></main>`;
}

function homeC() {
  return `<main id="main" class="wrap home-c"><section class="play-hero"><div class="play-intro"><span class="eyebrow">${t('INTERNET JEST FAJNIEJSZY Z LUDŹMI', 'THE INTERNET IS BETTER WITH PEOPLE')}</span><h1>${t('Ciekawość to<br>dobry <em>początek.</em>', 'Curiosity is<br>a good <em>beginning.</em>')}</h1><div class="play-bio">${portrait('tiny')}<p>${t('Cześć, Marcin tutaj. Łączę kropki między kodem, AI i codziennym życiem. Czasem wychodzi z tego notatka.', 'Hi, Marcin here. Connecting the dots between code, AI, and everyday life. Sometimes it turns into a note.')}</p></div>${link('blog', t('Zobacz, co mi chodzi po głowie', 'See what’s on my mind') + icons.arrow, 'solid-link')}</div>${cursorArt()}<span class="round-sticker">${t('ROBIĘ RZECZY<br>PO SWOJEMU', 'MAKING THINGS<br>MY OWN WAY')}<span>${icons.spark}</span></span></section><section class="play-notes"><div class="section-heading"><h2>${t('Z mojej głowy do Twojej.', 'From my head to yours.')}</h2><span class="hand-note">${t('weź coś dla siebie ↓', 'take what you need ↓')}</span></div><div class="note-cards">${posts.map((p, i) => `<a data-route href="${href('article', p)}" class="note-card card-${i}"><div class="note-card-top"><span>${textOf(p.label)}</span><span>${[icons.spark,icons.arrow,icons.star][i]}</span></div><h3>${textOf(p.title)}</h3><p>${textOf(p.desc)}</p><div class="note-card-bottom"><span>${p.date}</span><span>↗</span></div></a>`).join('')}</div></section>${contacts()}</main>`;
}

function blog() {
  const filtered = posts.filter(p => state.filter === 'all' || p.category === state.filter);
  return `<main id="main" class="wrap blog-page"><section class="blog-intro"><span class="eyebrow">${t('ZAPISKI, NIE ODPOWIEDZI OSTATECZNE', 'NOTES, NOT FINAL ANSWERS')}</span><h1>${t('Myśli w <em>toku.</em>', 'A work in <em>thought.</em>')}</h1><p>${t('O budowaniu rzeczy, nowych narzędziach i tym, co pomiędzy. Możesz czytać, słuchać albo zacząć rozmowę.', 'On building things, new tools, and everything in between. Read, listen, or start a conversation.')}</p><small>${t('Przykładowe wpisy przygotowane do porównania projektów.', 'Sample posts created to compare design directions.')}</small></section><div class="blog-filters" aria-label="${t('Tematy', 'Topics')}">${[['all', t('Wszystko','All')], ['engineering', t('Inżynieria','Engineering')], ['web', t('Własny internet','Personal web')], ['curiosity', t('Poza kodem','Beyond code')]].map(([key,label]) => `<button data-filter="${key}" aria-pressed="${state.filter === key}">${label}${key === 'all' ? ' <span>03</span>' : ''}</button>`).join('')}</div><div class="blog-list">${filtered.map(p=> `<a class="blog-entry" data-route href="${href('article',p)}"><div class="blog-entry-art art-${p.id}" aria-hidden="true">${p.id === 'less' ? orbit() : p.id === 'film' ? '<span class="film-frame">▷</span>' : '<span class="web-art">www<span>✳</span></span>'}</div><div class="blog-entry-copy"><span class="eyebrow">${textOf(p.label)} · ${p.date}</span><h2>${textOf(p.title)}</h2><p>${textOf(p.desc)}</p><span class="text-link">${t('Otwórz notatkę','Open note')}${icons.arrow}</span></div></a>`).join('')}</div></main>`;
}

function summary(post) {
  const intro = post.id === 'less' ? [
    ['Szybkie generowanie kodu nie zastępuje zrozumienia problemu.', 'Generating code quickly does not replace understanding the problem.'],
    ['Zanim zaczniesz budować, nazwij pytanie, na które szukasz odpowiedzi.', 'Before you build, name the question you are trying to answer.'],
    ['Mały prototyp pozwala szybko sprawdzić pomysł.', 'A small prototype lets you test an idea quickly.'],
    ['Odkładaj decyzje, które nie są jeszcze potrzebne.', 'Postpone decisions you do not need yet.'],
    ['Wybór rozwiązania wymaga ludzkiego kontekstu i rozmowy.', 'Choosing a solution requires human context and conversation.']
  ] : post.id === 'web' ? [
    ['Osobista strona daje przestrzeń na własny głos.', 'A personal website gives you room for your own voice.'],
    ['Nie musi walczyć o każdą sekundę uwagi czytelnika.', 'It does not need to fight for every second of a reader’s attention.'],
    ['Typografia i przestrzeń pomagają nadać treści charakter.', 'Typography and space help give content its character.'],
    ['Dobre proporcje tekstu sprzyjają spokojnemu czytaniu.', 'Comfortable text proportions make reading easier.'],
    ['Jedna dobra rozmowa może być cenniejsza niż duży zasięg.', 'One good conversation can be more valuable than a large audience.']
  ] : [
    ['Film i interfejs łączy znaczenie rytmu.', 'Film and interfaces share the importance of rhythm.'],
    ['Kolejność informacji wpływa na zrozumienie całości.', 'The order of information affects how we understand the whole.'],
    ['Zmiany widoku powinny zachowywać kontekst.', 'Transitions should preserve context.'],
    ['Pusta przestrzeń pozwala zauważyć ważne elementy.', 'Empty space helps us notice what matters.'],
    ['Jedna myśl przewodnia pomaga budować spójne doświadczenie.', 'One central idea helps create a coherent experience.']
  ];
  return intro.map(x=>textOf(x)).join(' ');
}

function article() {
  const post = currentPost();
  return `<div class="reading-progress" aria-hidden="true"><span></span></div><main id="main" class="wrap article-page"><div class="article-topline">${link('blog', '← ' + t('Wszystkie notatki', 'All notes'))}<span class="eyebrow">${textOf(post.label)} · ${post.date}</span></div><header class="article-header"><span class="eyebrow">${t('NOTATKA', 'NOTE')} / ${post.number}</span><h1>${textOf(post.title)}</h1><p class="article-lead">${textOf(post.desc)}</p><div class="article-author">${portrait('tiny')}<div>Marcin Kołodziejczak<span>${t('Przykładowy artykuł · prototyp UI', 'Sample article · UI prototype')}</span></div></div></header><div class="article-layout"><aside class="table-of-contents"><span class="eyebrow">${t('NA TEJ STRONIE', 'ON THIS PAGE')}</span>${post.sections.map((s,i)=>`<a href="#part-${i}">${String(i+1).padStart(2,'0')} <span>${s[state.lang === 'pl' ? 0 : 1]}</span></a>`).join('')}<div class="toc-note">${icons.star}<p>${t('Wolisz rozmowę?<br>Zapytaj o ten tekst.', 'Prefer a conversation?<br>Ask about this note.')}</p>${button('chat',t('Porozmawiaj ↗','Let’s talk ↗'),'text-link')}</div></aside><div class="article-column"><div class="article-toolbox"><div class="audio-heading"><span>${icons.play}<strong>${t('Posłuchaj zamiast czytać', 'Listen instead of reading')}</strong></span><div class="audio-language"><button data-audio="pl" aria-pressed="${state.audioLang === 'pl'}" aria-label="Polski lektor"><span class="flag flag-pl" aria-hidden="true"></span> PL</button><button data-audio="en" aria-pressed="${state.audioLang === 'en'}" aria-label="English narration"><span class="flag flag-en" aria-hidden="true"></span> EN</button></div></div><div class="audio-demo">${button('audio', icons.play, 'audio-play')}<div class="wave" aria-hidden="true">${Array.from({length:44},(_,i)=>`<i style="height:${8+((i*17+13)%25)}px"></i>`).join('')}</div><span>—:—</span></div><small class="audio-note">${t('Podgląd playera · czas pojawi się po dodaniu nagrania.', 'Player preview · duration will appear once narration is added.')}</small><div class="article-actions">${button('tldr', t('TL;DR · w 5 zdaniach', 'TL;DR · in 5 sentences'))}${button('prompt', t('Prompt: pogłęb temat ↗', 'Prompt: explore further ↗'))}</div></div><div class="prose"><p class="prose-intro">${t('Ten tekst jest szkicem pokazującym, jak może wyglądać czytanie na tej stronie. To miejsce na myśl, która zasługuje na trochę więcej przestrzeni niż post w mediach społecznościowych.', 'This sample shows what reading on this website could feel like. A place for a thought that deserves a little more space than a social media post.')}</p>${post.sections.map((s,i)=>`<section id="part-${i}"><h2>${s[state.lang === 'pl' ? 0 : 1]}</h2><p>${s[state.lang === 'pl' ? 2 : 3]}</p>${i===1 ? `<blockquote>${t('Najlepsza linijka kodu? Czasem ta, której nie trzeba było napisać.', 'The best line of code? Sometimes it is the one you never needed to write.')}</blockquote>` : ''}${i===2 ? `<div class="inset-note"><span class="eyebrow">${t('MAŁY EKSPERYMENT', 'A SMALL EXPERIMENT')}</span><p>${t('Weź pomysł, nad którym teraz pracujesz. Opisz go bez używania nazw technologii. Co pozostaje?', 'Take an idea you are currently working on. Describe it without naming any technologies. What remains?')}</p></div>` : ''}</section>`).join('')}<div class="article-end"><span>${icons.spark}</span><p>${t('Dzięki, że dotarłeś aż tutaj.', 'Thanks for reading this far.')}</p><div>${button('like', icons.heart + t('Dobra myśl', 'Good thought'), state.liked ? 'liked' : '')}${button('share', t('Udostępnij ↗', 'Share ↗'))}</div></div></div><section class="comments"><h2>${t('Rozmowa zaczyna się tutaj.', 'The conversation starts here.')}</h2><p>${t('Miejsce na komentarze. Docelowo np. giscus — dyskusja przez konto GitHub.', 'A space for comments. A possible choice: giscus, with GitHub sign-in.')}</p>${button('comments', t('Jak działałyby komentarze? ↗', 'How would comments work? ↗'))}</section></div></div></main>${button('top','↑','back-top')}${button('chat',`<span class="chat-orb">${icons.spark}</span><span>${t('Chcesz to lepiej zrozumieć?', 'Want to understand it better?')}<small>${t('Zacznij rozmowę ↗', 'Start a conversation ↗')}</small></span>`,'chat-launcher')}`;
}

function readLocation() {
  const path = location.pathname;
  state.lang = path.startsWith('/en') ? 'en' : 'pl';
  state.page = /\/blog\/[^/]+/.test(path) ? 'article' : path.includes('/blog') ? 'blog' : 'home';
  const variant = new URLSearchParams(location.search).get('variant');
  state.variant = variants[variant] ? variant : 'A';
  const palette = new URLSearchParams(location.search).get('palette');
  state.palette = Object.hasOwn(colorPalettes,palette) ? palette : null;
  if(state.palette) state.variant='C';
}

function render() {
  readLocation();
  document.body.dataset.variant = state.variant;
  document.body.dataset.page = state.page;
  applyColorPalette();
  document.documentElement.lang = state.lang;
  document.title = `${state.page === 'article' ? textOf(currentPost().title) : state.page === 'blog' ? t('Notatki','Notes') : 'Marcin Kołodziejczak'} · ${variants[state.variant][0]} · UI prototype`;
  $('#app').innerHTML = header() + (state.page === 'home' ? ({A:homeA,B:homeB,C:homeC}[state.variant])() : state.page === 'blog' ? blog() : article()) + footer();
  if(state.palette){
    $('#app').innerHTML=colorPage($('#app').innerHTML);
    restoreColorUI();
    document.title=`${t(colorPalettes[state.palette].name,colorPalettes[state.palette].en)} · ${state.page==='article'?textOf(currentPost().title):t('Kolorystyka','Colours')} · kolodziejczak.me`;
  }
  $('#prototype-tools').innerHTML = `<div class="prototype-switcher" aria-label="${t('Porównaj projekty','Compare designs')}"><button data-cycle="-1" aria-label="${t('Poprzedni projekt','Previous design')}">←</button><div class="prototype-label" aria-live="polite"><small>${t('PROTOTYP','PROTOTYPE')} · ${state.lang.toUpperCase()} · ${state.page === 'home' ? t('Start','Home') : state.page === 'blog' ? t('Notatki','Notes') : t('Artykuł','Article')}</small><strong>${state.variant} — ${variants[state.variant][0]} <span>${Object.keys(variants).indexOf(state.variant)+1}/3</span></strong></div><button data-cycle="1" aria-label="${t('Następny projekt','Next design')}">→</button><button class="prototype-info" data-action="info" aria-label="${t('O prototypie','About this prototype')}">?</button></div>`;
  $('#overlay').innerHTML = '';
  if(state.palette) $('#prototype-tools').innerHTML=colorPrototypeTools();
  document.body.classList.remove('modal-open');
  languageSuggestion();
  progress();
}

function navigate(url) {
  const oldLang = state.lang;
  history.pushState({}, '', url);
  readLocation();
  if(oldLang !== state.lang) state.dismissed = true;
  state.filter = 'all';
  render();
  window.scrollTo(0,0);
}

function cycle(direction) {
  if(state.palette){
    const keys=Object.keys(colorPalettes),next=keys[(keys.indexOf(state.palette)+direction+keys.length)%keys.length];
    const url=new URL(location.href);url.searchParams.set('variant','C');url.searchParams.set('palette',next);
    history.replaceState({},'',url);render();return;
  }
  const keys = Object.keys(variants);
  const next = keys[(keys.indexOf(state.variant)+direction+keys.length)%keys.length];
  const url = new URL(location.href); url.searchParams.set('variant',next);
  history.replaceState({},'',url); render();
}

function languageSuggestion() {
  const pref = (navigator.languages?.[0] || navigator.language || '').slice(0,2);
  const suggested = pref === 'pl' ? 'pl' : 'en';
  if (suggested === state.lang || state.dismissed) return;
  $('#app').insertAdjacentHTML('beforeend', `<aside class="language-nudge" aria-label="Language suggestion"><span>${suggested==='en' ? 'Prefer English?' : 'Wolisz po polsku?'}</span><a data-route href="${href(state.page,currentPost(),suggested)}">${suggested==='en' ? 'Read in English ↗' : 'Czytaj po polsku ↗'}</a><button data-action="dismiss-language" aria-label="${t('Zamknij','Dismiss')}">×</button></aside>`);
}

let toastTimeout;
function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('visible'); clearTimeout(toastTimeout); toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),4500); }
let previousFocus;
function modal(title, body) {
  previousFocus=document.activeElement;
  $('#overlay').innerHTML=`<div class="modal-backdrop"><section role="dialog" aria-modal="true" aria-labelledby="modal-title" class="modal"><button class="modal-close" data-action="close" aria-label="${t('Zamknij','Close')}">×</button><span class="eyebrow">${t('NA MARGINESIE TEKSTU','IN THE MARGINS')}</span><h2 id="modal-title">${title}</h2>${body}</section></div>`;
  document.body.classList.add('modal-open'); $('.modal-close').focus();
}
function closeModal(){ $('#overlay').innerHTML='';document.body.classList.remove('modal-open');previousFocus?.focus(); }

document.addEventListener('click', async e => {
  const route = e.target.closest('[data-route]');
  if(route && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && e.button===0){ e.preventDefault();navigate(route.href);return; }
  const cycleButton=e.target.closest('[data-cycle]');if(cycleButton){cycle(Number(cycleButton.dataset.cycle));return;}
  const filter=e.target.closest('[data-filter]');if(filter){state.filter=filter.dataset.filter;render();return;}
  const audio=e.target.closest('[data-audio]');if(audio){state.audioLang=audio.dataset.audio;document.querySelectorAll('[data-audio]').forEach(b=>b.setAttribute('aria-pressed',b===audio));toast(t('Wybrany lektor: ','Selected narration: ')+(state.audioLang==='pl'?'PL':'EN'));return;}
  const contact=e.target.closest('[data-contact]');if(contact){toast(t('Dodamy Twój prawdziwy link do ','We’ll add your real link for ')+contact.dataset.contact+t(' po wybraniu projektu.',' once a design is chosen.'));return;}
  const action=e.target.closest('[data-action]')?.dataset.action;
  const post=currentPost();
  if(action==='close')closeModal();
  if(e.target.classList.contains('modal-backdrop'))closeModal();
  if(action==='dismiss-language'){state.dismissed=true;$('.language-nudge')?.remove();}
  if(action==='audio')toast(t('To podgląd playera. Nagranie ElevenLabs nie zostało jeszcze dodane.','This is a player preview. ElevenLabs narration has not been added yet.'));
  if(action==='tldr')modal(t('W pięciu zdaniach.','In five sentences.'),`<p class="summary-text">${summary(post)}</p><span class="modal-footnote">${t('Przykładowe streszczenie redakcyjne.','Sample editorial summary.')}</span>`);
  if(action==='prompt')modal(t('Zabierz tę myśl dalej.','Take this thought further.'),`<p>${t('Skopiuj ten prompt do wybranego asystenta AI.','Copy this prompt into your preferred AI assistant.')}</p><textarea id="prompt-text" rows="7" aria-label="Prompt">${t(`Chcę lepiej zrozumieć temat „${textOf(post.title)}”. Zacznij od pytania o moje doświadczenie. Następnie wyjaśnij główne pojęcia na konkretnym przykładzie, pokaż ograniczenia tego podejścia i zaproponuj mały eksperyment. Nie przypisuj autorowi poglądów, których nie wyraził.`,`I want to better understand “${textOf(post.title)}”. Start by asking about my experience. Explain the main concepts using a concrete example, describe the limitations of this approach, and suggest a small experiment. Do not attribute opinions to the author that they have not expressed.`)}</textarea>${button('copy-prompt',t('Kopiuj prompt ↗','Copy prompt ↗'),'solid-link')}`);
  if(action==='copy-prompt'){try{await navigator.clipboard.writeText($('#prompt-text').value);toast(t('Prompt skopiowany.','Prompt copied.'));}catch{$('#prompt-text').select();toast(t('Zaznaczono tekst — skopiuj go ręcznie.','Text selected — copy it manually.'));}}
  if(action==='chat')modal(t('Rozłóżmy to na części.','Let’s unpack this.'),`<div class="chat-demo-label">${t('Podgląd rozmowy · bez połączenia z AI','Conversation preview · no AI connected')}</div><div class="chat-bubble">${t('Cześć! Od którego fragmentu chcesz zacząć? Docelowo porozmawiasz tu z asystentem o treści artykułu.','Hi! Which part would you like to start with? An assistant will eventually help you explore this article here.')}</div><form id="demo-chat"><label for="chat-question">${t('Twoje pytanie','Your question')}</label><div><input id="chat-question" required autocomplete="off" placeholder="${t('Co autor ma na myśli…?','What does the author mean…?')}"><button type="submit" aria-label="${t('Wyślij pytanie','Send question')}">↑</button></div></form><small>${t('W docelowej wersji widget ElevenLabs załaduje się dopiero po Twoim kliknięciu.','In the final version, the ElevenLabs widget will load only when you click.')}</small>`);
  if(action==='like'){state.liked=!state.liked;const b=e.target.closest('button');b.classList.toggle('liked',state.liked);b.setAttribute('aria-pressed',state.liked);b.innerHTML=icons.heart+t('Dobra myśl','Good thought');toast(t('Polubienie tylko w tym podglądzie.','Like saved only in this preview.'));}
  if(action==='share'){try{await navigator.clipboard.writeText(location.href);toast(t('Link skopiowany.','Link copied.'));}catch{modal(t('Udostępnij notatkę','Share this note'),`<input class="share-url" aria-label="URL" readonly value="${location.href}">`);}}
  if(action==='comments')modal(t('Miejsce na dobrą rozmowę.','Room for a good conversation.'),`<p>${t('Propozycja: darmowy giscus oparty na GitHub Discussions. Czytelnik potrzebowałby konta GitHub. Widget ładowałby się na żądanie. W tym prototypie nic nie jest wysyłane ani publikowane.','Proposal: free giscus powered by GitHub Discussions. Readers would need a GitHub account. The widget would load on demand. Nothing is sent or published in this prototype.')}</p>`);
  if(action==='top')window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  if(action==='info')modal(t('Trzy pomysły. Jeszcze bez zobowiązań.','Three ideas. No commitments yet.'),`<p>${t('Porównaj kompozycję, typografię i klimat. Przejdź do notatek, otwórz artykuł, sprawdź wersję angielską. Strzałkami ← → zmieniasz projekt.','Compare layouts, typography, and atmosphere. Explore the notes, open an article, and try the English version. Use ← → to change designs.')}</p><ul>${Object.entries(variants).map(([key,[name,desc]])=>`<li><b>${key} — ${name}:</b> ${desc}</li>`).join('')}</ul><p>${t('Treści i daty są przykładowe, zdjęcie jest zastępcze, linki kontaktowe czekają na Twoje adresy. Audio, komentarze i agent pokazują planowane doświadczenie. Brak analityki i połączeń do usług zewnętrznych.','Content and dates are samples, the portrait is a placeholder, and contact links need your addresses. Audio, comments, and the agent preview the planned experience. No analytics or external service connections.')}</p><small>${t('Stan','State')}: ${JSON.stringify({variant:state.variant,lang:state.lang,page:state.page,filter:state.filter,audioLang:state.audioLang,liked:state.liked})}</small>`);
});

document.addEventListener('submit',e=>{if(e.target.id!=='demo-chat')return;e.preventDefault();const field=$('#chat-question');if(!field.value.trim())return;const bubble=document.createElement('div');bubble.className='chat-bubble chat-answer';bubble.textContent=t('Tak wyglądałaby odpowiedź. Do wyjaśnienia tego fragmentu potrzebne będzie połączenie agenta ElevenLabs z treścią artykułu.','This is where the answer would appear. Explaining this passage requires connecting the ElevenLabs agent to the article’s content.');$('#demo-chat').before(bubble);field.value='';});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeModal();return;}
  if($('.modal')){if(e.key==='Tab'){const items=[...$('.modal').querySelectorAll('button,a[href],input,textarea')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}return;}
  if(e.target.closest('input,textarea,select,[contenteditable],audio,video,[role="slider"]')||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();cycle(e.key==='ArrowRight'?1:-1);}
});
function progress(){const prose=$('.prose');if(!prose)return;const rect=prose.getBoundingClientRect();const ratio=Math.max(0,Math.min(1,-rect.top/Math.max(1,prose.offsetHeight-innerHeight)));$('.reading-progress span').style.transform=`scaleX(${ratio})`;$('.back-top')?.classList.toggle('visible',ratio>.5);}
addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress);addEventListener('popstate',render);
render();
