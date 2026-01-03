import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PHILOSOPHY_TOOLTIPS } from './coach-philosophy-tooltips';
import { InfoTooltipComponent } from '../../components/tool-tip/info-tooltip.component';

@Component({
  selector: 'trit-coach-philosophy',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InfoTooltipComponent],
  templateUrl: './nutrition-logic.html',
  styleUrl: './nutrition-logic.scss'
})
export class CoachPhilosophyComponent {
  @Output() philosophyChange = new EventEmitter<any>();

  tooltips = PHILOSOPHY_TOOLTIPS;

  ingredientCategories = [
    'vegetables',
    'fruits',
    'legumes',
    'grains',
    'dairy',
    'fish',
    'redMeat',
    'nuts',
    'oils'
  ];

  preview = {
    insight: '',
    suggestions: [] as string[]
  };

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      protein: 45,
      carbs: 30,
      fats: 25,

      energyFlexibility: 70,
      foodQualityBias: 80,
      carbTolerance: 50,

      unsaturatedFat: 70,
      saturatedFat: 30,

      satietyPriority: 80,
      mealTimingBias: 60,

      interventionThreshold: 50,
      corrective: 40,
      reinforcing: 60,

      ingredientBias: this.fb.group(
        Object.fromEntries(
          this.ingredientCategories.map(cat => [cat, 70])
        )
      )
    });

    this.form.valueChanges.subscribe(() => {
      const philosophy = this.toCoachPhilosophy();
      this.philosophyChange.emit(philosophy);
      this.updatePreview(philosophy);
    });

    // initial render
    const initial = this.toCoachPhilosophy();
    this.philosophyChange.emit(initial);
    this.updatePreview(initial);
  }

  /* ----------------------------------------
     Coach JSON builder
  ----------------------------------------- */
  private toCoachPhilosophy() {
    const v = this.form.value;

    return {
      macroEmphasis: {
        protein: v.protein / 100,
        carbs: v.carbs / 100,
        fats: v.fats / 100
      },

      energyFlexibility: v.energyFlexibility / 100,
      foodQualityBias: v.foodQualityBias / 100,
      carbTolerance: v.carbTolerance / 100,

      fatProfile: {
        unsaturated: v.unsaturatedFat / 100,
        saturated: v.saturatedFat / 100
      },

      satietyPriority: v.satietyPriority / 100,
      mealTimingBias: v.mealTimingBias / 100,

      ingredientBias: Object.fromEntries(
        Object.entries(v.ingredientBias || {}).map(
          ([key, val]) => [key, (val as number) / 100]
        )
      ),

      coachingStyle: {
        corrective: v.corrective / 100,
        reinforcing: v.reinforcing / 100
      },

      interventionThreshold: v.interventionThreshold / 100
    };
  }

  /* ----------------------------------------
     Live Preview Logic (MVP)
  ----------------------------------------- */
  private updatePreview(philosophy: any) {
    const {
      macroEmphasis,
      satietyPriority,
      carbTolerance,
      coachingStyle,
      ingredientBias
    } = philosophy;

    // Coach insight
    if (macroEmphasis.protein > 0.5) {
      this.preview.insight =
        coachingStyle.corrective > coachingStyle.reinforcing
          ? 'This meal is light on protein. Adding a protein source would improve balance.'
          : 'Nice base — adding some protein could help with satiety.';
    } else if (satietyPriority > 0.7) {
      this.preview.insight =
        'This meal is light and fresh. Adding fiber-rich foods could help you stay full longer.';
    } else {
      this.preview.insight =
        'This meal fits well with this coach’s overall philosophy.';
    }

    // Suggested ingredients
    const ranked = Object.entries(ingredientBias as Record<string, number>)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([key]) => key);

    const filtered = ranked.filter(key =>
      carbTolerance < 0.4 ? !['grains', 'fruits'].includes(key) : true
    );
    

    this.preview.suggestions = filtered
      .slice(0, 2)
      .map(this.humanizeIngredient);
  }

  private humanizeIngredient(key: string): string {
    const map: Record<string, string> = {
      vegetables: 'Roasted vegetables',
      fruits: 'Fresh fruit',
      legumes: 'Lentils or chickpeas',
      grains: 'Whole grains',
      dairy: 'Greek yogurt',
      fish: 'Grilled fish',
      redMeat: 'Lean meat',
      nuts: 'Nuts or seeds',
      oils: 'Olive oil'
    };

    return map[key] ?? key;
  }
}
