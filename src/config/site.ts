export const site = {
  name: "Marcin Kołodziejczak",
  domain: "kolodziejczak.me",
  origin: "https://kolodziejczak.me",
  // Keep indexing off while the author materials and public launch are pending.
  readyToPublish: false,
  bio: {
    pl: "Cześć, z tej strony Marcin. Zawodowo realizuję swoją pasję do programowania, a po godzinach tworzę filmy i eksperymentuję z AI. Czasem łączę te światy i wychodzi z tego coś ciekawego - o tym piszę tutaj.",
    en: "Hi, I'm Marcin. Programming is my passion and my day job. In my free time, I make films and experiment with AI. Sometimes I bring these worlds together and something interesting comes out of it - that's what I write about here.",
  },
  contacts: [
    { name: "Facebook", url: null },
    { name: "Telegram", url: null },
    { name: "LinkedIn", url: null },
    { name: "WhatsApp", url: null },
  ] as { name: string; url: string | null }[],
};
