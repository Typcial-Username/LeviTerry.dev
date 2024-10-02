type Command = {
  name: string;
  content: string;
  synonyms: string[];
};

export const Commands: Command[] = [
  {
    name: "index",
    content: "redirect /",
    synonyms: ["main", "home", "home page", "index.html"],
  },
  {
    name: "about",
    content: "redirect /about",
    synonyms: [
      "about me",
      "who are you",
      "who are you",
      "about page",
      "about.html",
    ],
  },
  {
    name: "gallery",
    content: "redirect /gallery",
    synonyms: ["projects", "gallery page", "gallery.html"],
  },
  {
    name: "help",
    content: `\n     ————————————Help Menu————————————
      Commands: 
      help: Show this help menu
      about: Open the about page
      index | main: Go to the home page
      gallery: Go to the gallery page
      ——————————————————————————————————
      `,
    synonyms: ["?", "assistance", "commands"],
  },
  {
    name: "contact",
    content: "open contact",
    synonyms: ["contact me", "contact page", "contact.html"],
  },
  {
    name: 'terminal',
    content: 'open terminal',
    synonyms: ['console', 'command line', 'cmd']
  },
  {
    name: "GitHub",
    content: "redirect https://github.com/Typcial-Username",
    synonyms: ["git", "git hub", "source code", "source"],
  },
  {
    name: "LinkedIn",
    content: "redirect https://linkedin.com/in/levi-terry-dev/",
    synonyms: ["linkedin", "linked in", "professional", "network"],
  },
  {
    name: "Stack Overflow",
    content:
      "redirect https://stackoverflow.com/users/15316502/typical-username",
    synonyms: ["stack overflow", "stackoverflow", "stack", "overflow"],
  },
];
