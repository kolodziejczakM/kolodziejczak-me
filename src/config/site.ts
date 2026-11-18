export const site = {
  name: "Marcin Kołodziejczak",
  domain: "kolodziejczak.me",
  origin: "https://kolodziejczak.me",
  // Keep indexing off while the author materials and public launch are pending.
  readyToPublish: false,
  description: {
    pl: "Osobista strona Marcina Kołodziejczaka. Programowanie, tworzenie filmów i eksperymenty z AI. Artykuły z ciekawości i własnego doświadczenia.",
    en: "Marcin Kołodziejczak’s personal website. Programming, filmmaking and experiments with AI. Articles inspired by curiosity and personal experience.",
  },
  bio: {
    pl: "Cześć, z tej strony Marcin. Zawodowo realizuję swoją pasję do programowania, a po godzinach tworzę filmy i eksperymentuję z AI. Czasem łączę te światy i wychodzi z tego coś ciekawego - o tym piszę tutaj.",
    en: "Hi, I'm Marcin. Programming is my passion and my day job. In my free time, I make films and experiment with AI. Sometimes I bring these worlds together and something interesting comes out of it - that's what I write about here.",
  },
  contacts: [
    { name: "Facebook", url: "https://www.facebook.com/kolodziejczakMn" },
    { name: "Telegram", url: "https://t.me/kolodziejczakM" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/m-kolodziejczak/" },
    { name: "WhatsApp", url: "https://wa.me/48576142399" },
  ] as { name: string; url: string | null }[],
};
