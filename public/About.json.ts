const Birthday = new Date("2005-02-17");
const Today = new Date();

const age = Today.getFullYear() - Birthday.getFullYear();

export const AboutData = {
  name: "Levi Terry",
  // age: age,
  education: {
    school: "University of Advancing Technology (UAT)",
    degree: "Robotics and Embedded Systems (B.S.) - Digital Maker and Fabrication (B.S.)",
    year: "Sophomore",
    expectedGraduation: "May 2026",
    roboticsObjectives: [
      "Design and complete robotic and embedded systems solutions that apply to real-world situations and challenges.",
      "Implement a simple microprocessor using digital logic design.",
      "Demonstrate embedded system design skills including, but not limited to, microcontroller selection, schematic design, printed circuit board layout, design for electromagnetic compatibility and design for manufacturing.",
      "Apply knowledge of transducers, actuators and simultaneous hardware and software development in the design of an embedded system.",
      "Design and analyze real-time embedded systems, including advanced digital logic design, signal processing and high-speed digital systems.",
      "Implement and evaluate algorithms and methods enabling autonomy in a mobile robot.",
    ],
    digitalMakerAndFabricationObjectives: [
      "Demonstrate the ability to evaluate material and build technique options during the creation of products and their prototypes.",
      "Demonstrate the ability to effectively implement embedded systems and fundamental electronics into product builds.",
      "Place prototype and builds within the Agile and MVP development frameworks.",
      "Create product designs that incorporate engineering factors using solid modeling and design tools.",
      "Build physical products while demonstrating technique and safety competency across commonly accepted prototyping devices and maker tools and techniques.",
      "Produce products that balance form and function while reflecting current and future trends in design and human factors."
    ],
  },
  hobbies: ["Programming", "Gaming"],
  skills: {
    programmingLanguages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C++",
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
