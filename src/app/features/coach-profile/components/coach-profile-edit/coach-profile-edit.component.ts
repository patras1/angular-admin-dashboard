import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CoachContextService } from "../../../../core/services/coach-context.service";
import { take } from "rxjs";
import { CoachProfile } from "../../../../core/models/coach.model";

@Component({
  selector: 'app-coach-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './coach-profile-edit.component.html',
  styleUrls: ['./coach-profile-edit.component.scss'],
})
export class CoachProfileEditComponent implements OnInit {
    
  form = new FormGroup({
        name: new FormControl('',{
          nonNullable: true,
          validators: [Validators.required],
        }),
        bio: new FormControl('',{
          nonNullable: true,
          validators: [Validators.required],
        }),
        specialty: new FormControl('',{
          nonNullable: true,
          validators: [Validators.required],
        }),
    });
    constructor(private readonly coachContext: CoachContextService) {}
    
    ngOnInit(): void {
        this.coachContext.coach$.pipe(take(1)).subscribe((coach) => {
          if(!coach) return;

          this.form.patchValue({
            name: coach.profile.name,
            bio: coach.profile.bio,
            specialty: coach.profile.specialty,
          });

        });
    }
    onSubmit(): void {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
    
      this.coachContext.updateProfile(this.form.value as CoachProfile);
    }
    
}
