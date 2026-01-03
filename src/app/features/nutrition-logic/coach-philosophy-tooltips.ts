// coach-philosophy-tooltips.ts
export interface PhilosophyTooltips {
  protein: string;
  carbs: string;
  fats: string;
  energyFlexibility: string;
  foodQualityBias: string;
  carbTolerance: string;
  satietyPriority: string;
  mealTimingBias: string;
  corrective: string;
  reinforcing: string;
  interventionThreshold: string;
  vegetables: string;
  fruits: string;
  legumes: string;
  grains: string;
  dairy: string;
  fish: string;
  redMeat: string;
  nuts: string;
  oils: string;
  [key: string]: string; // Index signature to allow string indexing
}

export const PHILOSOPHY_TOOLTIPS: PhilosophyTooltips = {
  protein: 'How strongly this coach prioritizes protein when making suggestions.',
  carbs: 'How much the coach values carbohydrate intake relative to other macros.',
  fats: 'How much fat is encouraged in meals and add-ons.',

  energyFlexibility:
    'Controls how strict the coach is with portions and alternatives.',

  foodQualityBias:
    'Higher values favor whole, minimally processed foods over packaged items.',

  carbTolerance:
    'Lower values reduce grain and sugar suggestions.',

  satietyPriority:
    'Higher values prioritize foods that help you feel full longer.',

  mealTimingBias:
    'How much the coach considers meal timing and snacking patterns.',

  corrective:
    'Focus on fixing gaps and issues in the meal.',
  reinforcing:
    'Focus on strengthening what is already working well.',

  interventionThreshold:
    'How often the coach speaks up versus staying quiet.',

  vegetables:
    'Preference for vegetables as suggested additions.',
  fruits:
    'Preference for fruit-based suggestions.',
  legumes:
    'How much the coach encourages beans and lentils.',
  grains:
    'Preference for grains like rice, oats, and bread.',
  dairy:
    'Preference for dairy products.',
  fish:
    'Preference for fish and seafood.',
  redMeat:
    'Preference for red meat.',
  nuts:
    'Preference for nuts and seeds.',
  oils:
    'Preference for oils such as olive oil.'
};
  