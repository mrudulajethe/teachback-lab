export type Mission = {
  id: string;
  title: string;
  world: string;
  emoji: string;
  color: string;
  question: string;
  intro: string;
  facts: string[];
  steps: string[];
  starter: string;
  hint: string;
  misconception: string;
  correction: string;
  check: {
    question: string;
    choices: string[];
    answer: number;
    explanation: string;
  };
};
export const missions: Mission[] = [
  {
    id: "water-cycle",
    title: "The puddle puzzle",
    world: "Waterfall Valley",
    emoji: "💧",
    color: "blue",
    question: "Where did my puddle go?",
    intro:
      "Pip found a puddle after the rain. The next sunny day, it was gone. Did the ground drink it all?",
    facts: [
      "The Sun warms water. Some liquid water turns into water vapor in the air. This is evaporation.",
      "Water vapor can cool into tiny liquid drops. Many drops together form a cloud.",
      "When cloud drops get heavy enough, water falls as rain. The water cycle keeps going.",
    ],
    steps: ["Sun warms water", "Vapor rises", "Cloud drops form", "Rain falls"],
    starter: "The puddle got smaller because…",
    hint: "Tell Pip what the Sun does to the water, and where that water goes.",
    misconception: "The water disappears forever.",
    correction:
      "The water changes into water vapor in the air. It is still water!",
    check: {
      question:
        "A wet towel dries in the sunshine. Where does much of its water go?",
      choices: [
        "It becomes water vapor in the air",
        "It stops existing",
        "It turns into sunlight",
      ],
      answer: 0,
      explanation:
        "Sunlight warms the water. Evaporation moves it into the air as water vapor.",
    },
  },
  {
    id: "plant-food",
    title: "The hungry sunflower",
    world: "Wonder Woods",
    emoji: "🌱",
    color: "green",
    question: "Do plants eat dirt for lunch?",
    intro:
      "Pip packed a sandwich for a sunflower. A kind thought… but plants have another way to make food!",
    facts: [
      "Green plants use energy from sunlight to make their own food.",
      "Plants take in water through their roots and carbon dioxide from the air.",
      "With sunlight, plants use water and carbon dioxide to make sugar. Sugar is their food. They also release oxygen.",
    ],
    steps: ["Sunlight + water", "Carbon dioxide", "Sugar + oxygen"],
    starter: "A plant makes its own food by…",
    hint: "Explain how sunlight, water, and air help a plant make sugar.",
    misconception: "Soil is a plant’s food.",
    correction:
      "Soil gives plants water and minerals. Plants make their sugar food using sunlight, water, and carbon dioxide.",
    check: {
      question:
        "Two similar seedlings have water. One is kept in a dark cupboard. Why will it struggle?",
      choices: [
        "Plants are afraid of the dark",
        "It needs light energy to make food",
        "The cupboard eats its food",
      ],
      answer: 1,
      explanation: "A green plant needs light energy to make its food.",
    },
  },
  {
    id: "circuits",
    title: "Light up Pip’s lab",
    world: "Spark Station",
    emoji: "💡",
    color: "yellow",
    question: "Why won’t my little bulb glow?",
    intro:
      "Pip has a battery, wires, and a bulb. There is just one tiny gap in the wire. Let’s investigate!",
    facts: [
      "A simple circuit is a path from one battery terminal, through a bulb, and back to the other terminal.",
      "Electric current flows when the conducting path is closed. A gap breaks the path.",
      "The battery supplies energy. The bulb changes some electrical energy into light and heat.",
    ],
    steps: ["Battery", "Closed wire path", "Glowing bulb"],
    starter: "The bulb will light when…",
    hint: "Explain why the path must make a complete loop.",
    misconception: "The bulb uses up all the current.",
    correction:
      "Current flows around the whole closed circuit. The bulb transfers energy into light and heat.",
    check: {
      question:
        "A switch opens a gap in a simple circuit. What happens to the bulb?",
      choices: [
        "It gets brighter",
        "It keeps glowing forever",
        "It turns off because the path is broken",
      ],
      answer: 2,
      explanation:
        "An open switch breaks the conducting path, so current stops flowing through the bulb.",
    },
  },
  {
    id: "shadows",
    title: "The sneaky shadow",
    world: "Sunshine Meadow",
    emoji: "☀️",
    color: "orange",
    question: "Why is a shadow following me?",
    intro:
      "Pip’s shadow is long in the morning and shorter around midday. Is it playing a trick?",
    facts: [
      "Light travels in straight lines. An opaque object blocks light.",
      "A shadow forms on a surface where that light is blocked.",
      "A light source’s position changes a shadow’s direction and length. A low Sun often makes long shadows.",
    ],
    steps: ["Light source", "Object blocks light", "Shadow forms"],
    starter: "A shadow appears because…",
    hint: "Talk about the light, the object, and the surface behind it.",
    misconception: "A shadow is something an object sends out.",
    correction:
      "A shadow is an area receiving less light because an object blocks the light.",
    check: {
      question:
        "You move a flashlight around a toy. Why does the toy’s shadow move?",
      choices: [
        "The light comes from a different direction",
        "The shadow is alive",
        "The toy makes extra darkness",
      ],
      answer: 0,
      explanation:
        "Changing the direction of the light changes where the toy blocks it.",
    },
  },
  {
    id: "magnets",
    title: "The mystery magnet",
    world: "Tinker Town",
    emoji: "🧲",
    color: "purple",
    question: "Why won’t my magnet pick up a leaf?",
    intro:
      "Pip’s magnet picks up a steel paper clip, but not a leaf or a wooden block. What makes the difference?",
    facts: [
      "Magnets attract some materials, including iron and many kinds of steel.",
      "Magnets do not attract every metal. A wooden block, a leaf, and a plastic spoon are not attracted.",
      "A magnet can pull a suitable object without touching it, if it is close enough.",
    ],
    steps: ["Magnet nearby", "Iron or steel object", "Magnetic pull"],
    starter: "The paper clip moves because…",
    hint: "Tell Pip what the object is made of. Does a magnet attract every material?",
    misconception: "Magnets stick to everything metal.",
    correction:
      "Magnets attract some metals, including iron. Many common metals, such as aluminum, are not attracted in the same way.",
    check: {
      question:
        "Which object is most likely to be pulled by a classroom magnet?",
      choices: ["A wooden pencil", "An iron nail", "A plastic cup"],
      answer: 1,
      explanation: "Iron is attracted to magnets. Wood and plastic are not.",
    },
  },
  {
    id: "fractions",
    title: "The picnic problem",
    world: "Picnic Peak",
    emoji: "🍉",
    color: "pink",
    question: "Are two pieces always two halves?",
    intro:
      "Pip cut a sandwich into one tiny piece and one big piece. “A half for each of us!” Is that fair?",
    facts: [
      "A fraction describes equal parts of a whole.",
      "To make halves, split one whole into two equal parts.",
      "Two pieces that are different sizes are not both halves of the same whole.",
    ],
    steps: ["One whole", "Two equal parts", "One half each"],
    starter: "Each piece is a half only if…",
    hint: "Explain why the size of each piece matters, not just the number of pieces.",
    misconception: "Any two pieces of a whole are halves.",
    correction: "Halves must be two equal parts of the same whole.",
    check: {
      question: "Which way makes two halves of the same sandwich?",
      choices: [
        "One tiny piece and one large piece",
        "Three equal pieces",
        "Two equal-sized pieces",
      ],
      answer: 2,
      explanation: "A half is one of two equal parts of a whole.",
    },
  },
];
export const getMission = (id: string) => missions.find((m) => m.id === id);
export type Feedback = {
  mode: "ai" | "practice";
  notice: string;
  nextStep: string;
  question: string;
  concepts: string[];
  needsRevision: boolean;
};
export type Progress = {
  missionId: string;
  stars: number;
  completedAt: number;
}[];
