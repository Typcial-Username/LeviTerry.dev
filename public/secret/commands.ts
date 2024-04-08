type Command = {
  name: string;
  content: string;
  synonyms: string[];
};

export const Commands: Command[] = [
  {
    name: "index",
    content: "redirect /",
    synonyms: ["main"],
  },
  {
    name: "about",
    content: "redirect /about",
    synonyms: ["about me", "who are you", "who are you"],
  },
  {
    name: "gallery",
    content: "redirect /gallery",
    synonyms: ["projects"],
  },
  {
    name: "help",
    content: ` ------------Help Menu------------
      Commands: 
      help: Show this help menu
      about: Open the about page
      index | main: Go to the home page
      gallery: Go to the gallery page
      ----------------------------------
      `,
    synonyms: ["?", "assistance"],
  },
];
