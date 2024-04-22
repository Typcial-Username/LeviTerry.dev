const Birthday = new Date("2005-02-17");
const Today = new Date();

const age = Today.getFullYear() - Birthday.getFullYear();

export const AboutData = {
  name: "Levi Terry",
  // age: age,
  education: {
    school: "University of Advancing Technology (UAT)",
    degree: "Technology Studies",
    year: "Freshmen",
    expectedGraduation: "May 2026",
    programObjectives: [
      "Demonstrate the ability to analyze and act on creative and entrepreneurial processes of technological innovation.",
      "Demonstrate the ability to forecast and act upon potential impacts of nascent and emerging technologies in ways that benefit organizations, governments and individuals.",
      "Meet four approved objectives from other UAT undergraduate degree programs.",
    ],
  },
  hobbies: ["Programming", "Gaming"],
  skills: {
    programmingLanguages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C#",
      "HTML",
      "CSS",
    ],
    frameworks: ["React", "Next.js", "Node.js", "Express"],
    databases: ["MongoDB"],
    tools: ["Git", "GitHub", "VS Code", "Netlify"],
    operatingSystems: ["Windows", "Linux"],
  },
};
