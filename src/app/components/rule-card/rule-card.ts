import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Rule } from '../../core/models/rule';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rule-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rule-card.html',
  styleUrl: './rule-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleCard implements OnChanges {

  // ===== Inputs =====
  @Input({ required: true }) rule!: Rule;
  @Input() editable = false;

  // ===== Outputs =====
  @Output() remove = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string | null>();
  @Output() save = new EventEmitter<Rule>();

  // ===== Local edit form =====
  form = new FormGroup({
    name: new FormControl(''),
    conditionKey: new FormControl(''),
    conditionValue: new FormControl(''),
    actionKey: new FormControl(''),
    actionValue: new FormControl('true')
  });

  // ===== React to edit mode =====
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editable'] && this.editable) {
      this.form.patchValue({
        name: this.rule.name,
        conditionKey: this.rule.conditionKey,
        conditionValue: this.rule.conditionValue,
        actionKey: this.rule.actionKey,
        actionValue: String(this.rule.actionValue)
      });
    }
  }

  onSave() {
  const updated: Rule = {
    ...this.rule,
    ...this.form.value as Partial<Rule>
  } as Rule;

  this.save.emit(updated);
}
}
