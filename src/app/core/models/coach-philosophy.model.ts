// coach-philosophy.model.ts
export interface CoachPhilosophy {
    macroEmphasis: {
      protein: number;
      carbs: number;
      fats: number;
    };
  
    energyFlexibility: number;
    foodQualityBias: number;
    carbTolerance: number;
  
    fatProfile: {
      unsaturated: number;
      saturated: number;
    };
  
    satietyPriority: number;
    mealTimingBias: number;
  
    ingredientBias: Record<string, number>;
  
    coachingStyle: {
      corrective: number;
      reinforcing: number;
    };
  
    interventionThreshold: number;
  }
  