import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FtDynamicDialogService } from '../../shared/components/dialog/dynamic-dialog.service';
import { Subject, takeUntil } from 'rxjs';
import { FtInputComponent } from '../../shared/components/inputs/input/input.component';
import { FtButtonComponent } from '../../shared/components/buttons/button/button.component';

// Define interface for vaccine options if needed for stricter typing
interface VaccineOption {
  name: string;
  // Add other vaccine properties like code, manufacturer if needed
}


@Component({
  selector: 'ft-vaccination-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FtInputComponent,
    FtButtonComponent,
  ],
  templateUrl: './vaccination-dialog.component.html',
  styleUrl: './vaccination-dialog.component.css'
})
export class VaccinationDialogComponent implements OnInit, OnDestroy {

  vaccinationForm: FormGroup;

  // Store all possible vaccines
  originalVaccines: VaccineOption[] = [
    { name: 'Vaccin antigrippal' },
    { name: 'Vaccin ROR (Rougeole, Oreillons, Rubéole)' },
    { name: 'Vaccin DTP (Diphtérie, Tétanos, Poliomyélite)' },
    { name: 'Vaccin anti-COVID-19 (Pfizer)' },
    { name: 'Vaccin anti-COVID-19 (Moderna)' },
    // Add more vaccines as needed
  ];

  vaccineSuggestions: VaccineOption[] = []; // Suggestions filtered for the autocomplete


  private dialogService = inject(FtDynamicDialogService);
  dialogData = inject(FtDynamicDialogService).state()?.config.data;

  constructor(
    private fb: FormBuilder,
  ) {
    this.vaccinationForm = this.fb.group({
      vaccineName: [null, Validators.required],
      administrationDate: [null],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.vaccineSuggestions = [...this.originalVaccines];
  }

  ngOnDestroy(): void {
  }

  // --- Reset Field Logic ---
  clearField(controlName: string) {
    const control = this.vaccinationForm.get(controlName);
    if (control) {
      // Reset based on expected value type (Date, string/object)
      if (controlName === 'administrationDate' || controlName === 'vaccineName') {
        control.reset(null); // Reset date or object/string from autocomplete to null
      }
      else {
        control.reset(''); // Reset text fields
      }
    }
  }


  // --- Save Logic ---
  saveVaccination() {
    this.vaccinationForm.markAllAsTouched();

    if (this.vaccinationForm.valid) {
      const formValue = this.vaccinationForm.value;
      this.dialogService.close(formValue);
    }
  }

  closeDialog() {
    this.dialogService.close();
  }
}

