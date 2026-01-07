import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coach-availability',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coach-availability.component.html',
  styleUrls: ['./coach-availability.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachAvailabilityComponent {
  form = new FormGroup({
    slots: new FormArray<FormGroup>([]),
  });

  get slots(): FormArray<FormGroup> {
    return this.form.controls.slots;
  }

  addSlot(): void {
    this.slots.push(
      new FormGroup({
        day: new FormControl('Monday', Validators.required),
        start: new FormControl('', Validators.required),
        end: new FormControl('', Validators.required),
      })
    );
  }

  removeSlot(index: number): void {
    this.slots.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Availability:', this.form.getRawValue());
  }
}
