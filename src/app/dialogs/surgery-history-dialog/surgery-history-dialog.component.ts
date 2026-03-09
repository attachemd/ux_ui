// src/app/dialogs/surgery-history-dialog/surgery-history-dialog.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { CommonModule, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import {DatePicker} from 'primeng/datepicker';


// Define interface for surgery name options
interface SurgeryNameOption {
  name: string;
  // Add other properties like code, common notes, etc. if needed
}

// // --- Custom Validator: No Special Characters ---
// const noSpecialCharactersValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const value = control.value;
//   if (!value) {
//     return null; // Don't validate empty values, leave it to required validator
//   }
//   // Regex allows letters (a-z, A-Z), numbers (0-9), spaces, hyphens, and apostrophes
//   // Adjust regex based on exact definition of "special characters" if needed
//   const specialCharRegex = /[^a-zA-Z0-9\s\-\']/;
//   if (specialCharRegex.test(value)) {
//     return { specialCharacters: true };
//   }
//   return null;
// };

// --- Custom Validator: No Special Characters ---
const noSpecialCharactersValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) {
    // If there's no value, don't perform validation (handled by required validator if needed)
    return null;
  }

  // Regular expression that allows only letters, numbers, and spaces
  const validPattern = /^[a-zA-Z0-9 ]*$/;

  if (!validPattern.test(control.value)) {
    // Return validation error if special characters are found
    return { noSpecialCharacters: true };
  }

  // Return null if validation passes
  return null;
};

@Component({
  selector: 'app-surgery-history-dialog', // Renamed selector
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    InputGroupModule,
    NgIf,
    TextareaModule,
    DatePicker,
  ],
  providers: [MessageService],
  templateUrl: './surgery-history-dialog.component.html', // Updated template path
  styleUrl: './surgery-history-dialog.component.css' // Updated style path
})
export class SurgeryHistoryDialogComponent implements OnInit, OnDestroy { // Renamed class

  surgicalHistoryForm: FormGroup; // Kept form group name for consistency, can rename if preferred

  // Store all possible surgery names
  originalSurgeryNames: SurgeryNameOption[] = [
    { name: 'Appendicectomie' },
    { name: 'Cholécystectomie' },
    { name: 'Hernie inguinale' },
    { name: 'Césarienne' },
    { name: 'Amygdalectomie' },
    // Add more surgery names as needed
  ];

  surgeryNameSuggestions: SurgeryNameOption[] = [];


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    this.surgicalHistoryForm = this.fb.group({
      surgeryName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          noSpecialCharactersValidator
        ]
      ],
      surgeryDate: [new Date()],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.surgeryNameSuggestions = [...this.originalSurgeryNames];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get surgeryNameControl(): AbstractControl | null { return this.surgicalHistoryForm.get('surgeryName'); }
  get surgeryDateControl(): AbstractControl | null { return this.surgicalHistoryForm.get('surgeryDate'); }
  get noteControl(): AbstractControl | null { return this.surgicalHistoryForm.get('note'); }


  searchSurgeryNames(event: any) {
    const query: string = event.query;

    this.surgeryNameSuggestions = this.originalSurgeryNames.filter(
      (name) => name.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  saveSurgicalHistory() { // Kept method name for consistency, can rename
    this.surgicalHistoryForm.markAllAsTouched();

    console.log('Form validity:', this.surgicalHistoryForm.valid);
    console.log('Form errors:', this.surgicalHistoryForm.errors);
    console.log('Control errors:', this.surgicalHistoryForm.controls);


    if (this.surgicalHistoryForm.valid) {
      const formValue = this.surgicalHistoryForm.value;
      console.log('Form is valid. Saving surgical history:', formValue);

      let formattedDate: string | null = null;
      if (formValue.surgeryDate instanceof Date) {
        if (!isNaN(formValue.surgeryDate.getTime())) {
          const date = formValue.surgeryDate;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`;
        }
      } else if (typeof formValue.surgeryDate === 'string' && formValue.surgeryDate) {
        const dateString = formValue.surgeryDate.trim();
        let parsedDate: Date | null = null;

        if (/^\d{4}$/.test(dateString)) {
          parsedDate = new Date(parseInt(dateString), 0, 1);
        } else if (/^\d{6}$/.test(dateString)) {
          const month = parseInt(dateString.substring(0, 2)) - 1;
          const year = parseInt(dateString.substring(2, 6));
          if (month >= 0 && month < 12) {
            parsedDate = new Date(year, month, 1);
          }
        }

        if (parsedDate && !isNaN(parsedDate.getTime())) {
          const date = parsedDate;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`;
        } else {
          console.warn('Could not parse date string:', dateString);
          formattedDate = null;
        }
      }

      const surgicalHistoryData = { // Kept data object name for consistency
        title: formValue.surgeryName?.name || formValue.surgeryName || 'Chirurgie non spécifiée',
        status: 'Réalisée',
        class: 'chip-info',
        date: formattedDate,
        note: formValue.note || null,
        surgeryName: formValue.surgeryName?.name || formValue.surgeryName,
        surgeryDate: formattedDate,
      };

      console.log('Saving surgical history data:', surgicalHistoryData);

      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Historique chirurgical enregistré avec succès.',
        life: 3000
      });

      this.ref.close(surgicalHistoryData);

    } else {
      console.log('Form is invalid. Cannot save surgical history.');
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire.',
        life: 3000
      });
    }
  }

  closeDialog(data: any = null) {
    this.ref.close(data);
  }

  clearField(controlName: string) {
    const control = this.surgicalHistoryForm.get(controlName);
    if (control) {
      if (controlName === 'surgeryDate' || controlName === 'surgeryName') {
        control.reset(null);
      } else {
        control.reset('');
      }
      if (controlName === 'surgeryName') {
        this.surgeryNameSuggestions = [...this.originalSurgeryNames];
      }
    }
  }

}

