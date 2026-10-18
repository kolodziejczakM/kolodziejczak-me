export const site = {
  name: "Marcin Kołodziejczak",
  domain: "kolodziejczak.me",
  origin: "https://kolodziejczak.me",
  // Keep indexing off while the author materials and public launch are pending.
  readyToPublish: false,
  bio: {
    pl: "Cześć, Marcin tutaj. Łączę kropki między kodem, AI i codziennym życiem. Tutaj dzielę się tym, czego uczę się po drodze.",
    en: "Hi, Marcin here. Connecting the dots between code, AI, and everyday life. This is where I share what I learn along the way.",
  },
  contacts: [
    { name: "LinkedIn", url: null },
    { name: "WhatsApp", url: null },
    { name: "Telegram", url: null },
    { name: "Facebook", url: null },
  ] as { name: string; url: string | null }[],
};
