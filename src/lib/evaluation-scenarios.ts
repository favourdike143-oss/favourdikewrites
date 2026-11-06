export type EvaluationDimension =
  | "Relevance"
  | "Accuracy"
  | "Helpfulness"
  | "Contextual understanding"
  | "Personalization";

export type EvaluationResponse = {
  id: "A" | "B";
  label: string;
  text: string;
  ratings: Record<EvaluationDimension, number>;
  findings: string[];
};

export type EvaluationScenario = {
  id: string;
  category: string;
  title: string;
  context: string;
  prompt: string;
  responses: [EvaluationResponse, EvaluationResponse];
  recommendation: "A" | "B";
  improved: string;
};

export const evaluationDimensions: EvaluationDimension[] = [
  "Relevance",
  "Accuracy",
  "Helpfulness",
  "Contextual understanding",
  "Personalization",
];

export const evaluationScenarios: EvaluationScenario[] = [
  {
    id: "intent",
    category: "01 / Instruction following",
    title: "The right answer starts with the actual ask.",
    context: "Fictional user preference: usually chooses plant-based meals.",
    prompt: "I have cooked rice, chickpeas, and spinach. Suggest one quick lunch I can make in about 15 minutes.",
    responses: [
      {
        id: "A",
        label: "Response A",
        text: "Try a chicken and mushroom risotto. First, pick up chicken, mushrooms, arborio rice, stock, and parmesan. Allow around 45 minutes for the rice to cook slowly.",
        ratings: { Relevance: 2, Accuracy: 3, Helpfulness: 1, "Contextual understanding": 1, Personalization: 1 },
        findings: ["Ignores the three ingredients already on hand", "Conflicts with the stated plant-based preference", "Misses the 15-minute time limit"],
      },
      {
        id: "B",
        label: "Response B",
        text: "Warm the cooked rice with a splash of water. Stir in the chickpeas and spinach until the spinach wilts, then season with salt, pepper, and lemon or any dressing you have. It should take about 10 minutes.",
        ratings: { Relevance: 5, Accuracy: 5, Helpfulness: 5, "Contextual understanding": 5, Personalization: 4 },
        findings: ["Uses all three available ingredients", "Respects the time limit and dietary preference", "Keeps optional seasonings clearly optional"],
      },
    ],
    recommendation: "B",
    improved: "Warm the cooked rice with a splash of water. Stir in the chickpeas and spinach until hot and wilted, then season to taste. Ready in about 10 minutes, using what you already have.",
  },
  {
    id: "assumptions",
    category: "02 / Context relevance",
    title: "Relevant context helps. Unrelated context distracts.",
    context: "Fictional conversation: the user mentioned enjoying gardening earlier.",
    prompt: "Suggest one quiet indoor activity I can do for 30 minutes while I wait for a call to start.",
    responses: [
      {
        id: "A",
        label: "Response A",
        text: "Since you enjoy gardening, repot your plants and reorganize your balcony. It is a nice way to spend the afternoon outside.",
        ratings: { Relevance: 2, Accuracy: 4, Helpfulness: 2, "Contextual understanding": 2, Personalization: 2 },
        findings: ["Overweights earlier gardening context", "Contradicts the request for an indoor activity", "Does not suggest a 30-minute bounded option"],
      },
      {
        id: "B",
        label: "Response B",
        text: "Try a short reading session: choose a chapter or set a 25-minute timer, then take a few minutes to get ready for your call. It is quiet, indoors, and easy to stop on time.",
        ratings: { Relevance: 5, Accuracy: 5, Helpfulness: 5, "Contextual understanding": 5, Personalization: 3 },
        findings: ["Follows the indoor and time-limit constraints", "Does not force unrelated profile information into the answer", "Offers a practical transition before the call"],
      },
    ],
    recommendation: "B",
    improved: "Try reading for 25 minutes, then take a few minutes to prepare for your call. It is quiet, indoors, and easy to pause when it is time.",
  },
  {
    id: "accuracy",
    category: "03 / Accuracy & uncertainty",
    title: "A confident answer still needs to be consistent.",
    context: "Fictional request: a day plan with a firm 20-minute travel limit.",
    prompt: "Plan a simple 60-minute afternoon: 20 minutes of travel, 25 minutes at a museum, and time to get home. Keep the total under an hour.",
    responses: [
      {
        id: "A",
        label: "Response A",
        text: "Travel to the museum for 20 minutes, spend 25 minutes there, then allow 20 minutes to get home. Total: 55 minutes, so you will have five minutes to spare.",
        ratings: { Relevance: 5, Accuracy: 1, Helpfulness: 2, "Contextual understanding": 3, Personalization: 3 },
        findings: ["The stated durations add up to 65 minutes, not 55", "The answer invents five minutes of spare time", "Does not resolve the conflict with the under-60-minute limit"],
      },
      {
        id: "B",
        label: "Response B",
        text: "Those three blocks total 65 minutes (20 + 25 + 20), so they cannot all fit under an hour. To meet the limit, you could shorten the museum visit to 20 minutes; the total would then be 60 minutes.",
        ratings: { Relevance: 5, Accuracy: 5, Helpfulness: 5, "Contextual understanding": 5, Personalization: 3 },
        findings: ["Checks the arithmetic explicitly", "Flags the incompatible constraints instead of hiding them", "Offers a clear adjustment, while noting it reaches—not falls below—60 minutes"],
      },
    ],
    recommendation: "B",
    improved: "The requested blocks total 65 minutes, so they cannot fit under an hour as written. Shortening the museum visit to 20 minutes makes the total exactly 60 minutes; to stay under 60, one block must be shorter still.",
  },
];

export function getAverageRating(ratings: Record<EvaluationDimension, number>) {
  return Number((Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / evaluationDimensions.length).toFixed(1));
}