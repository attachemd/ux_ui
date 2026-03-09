// src/app/dialogs/treatment-dialog/treatment-dialog.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext'; // Use p-inputtext
import { InputGroupModule } from 'primeng/inputgroup';
import { CommonModule, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import {Textarea} from 'primeng/textarea';
import {DatePicker} from 'primeng/datepicker'; // Import SelectButtonModule

// Define interfaces for options
interface Option {
  name: string;
  value: any; // Or a more specific type
}

interface TreatmentOption {
  name: string;
  type: string; // 'Substance active' or 'Nom du médicament'
}

// --- Custom Date Range Validator ---
const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDateControl = control.get('startDate');
  const endDateControl = control.get('endDate');

  if (!startDateControl || !endDateControl) {
    return null; // Should not happen with this form structure, but good practice
  }

  const startDate = startDateControl.value;
  const endDate = endDateControl.value;

  // Only validate if both dates are filled and are valid Date objects
  if (startDate instanceof Date && !isNaN(startDate.getTime()) &&
    endDate instanceof Date && !isNaN(endDate.getTime())) {

    if (startDate.getTime() >= endDate.getTime()) {
      // Set error on the group and potentially individual controls for feedback
      // Note: Setting error on group is enough for form validity, individual controls
      // might need separate logic or you rely on the group error message display.
      // For this example, we'll just return the error for the group.
      return { dateRangeInvalid: true };
    }
  }

  return null; // Dates are valid or not both filled
};

// Optional: Custom validator to prevent future dates (if needed)
const futureDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const date = control.value;
  if (date instanceof Date && !isNaN(date.getTime())) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare just the date part
    if (date.getTime() > today.getTime()) {
      return { futureDate: true };
    }
  }
  return null;
};


@Component({
  selector: 'app-treatment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    SelectModule,
    InputTextModule, // Added InputTextModule
    InputGroupModule,
    SelectButtonModule, // Added SelectButtonModule
    NgIf,
    Textarea,
    DatePicker,
  ],
  providers: [MessageService],
  templateUrl: './treatment-dialog.component.html',
  styleUrl: './treatment-dialog.component.css'
})
export class TreatmentDialogComponent implements OnInit, OnDestroy {

  treatmentForm: FormGroup;

  // Options
  entryTypes: Option[] = [
    { name: 'Substance active', value: 'Substance active' },
    { name: 'Nom du médicament', value: 'Nom du médicament' },
  ];

  statuses: Option[] = [
    { name: 'En cours', value: 'En cours' },
    { name: 'Arrêté', value: 'Arrêté' },
    { name: 'Terminé', value: 'Terminé' },
    { name: 'Non pris', value: 'Non pris' },
  ];

  // Store all potential treatments (substances and drug names)
  originalTreatments: TreatmentOption[] = [
    { name: 'Amoxicilline', type: 'Substance active' },
    { name: 'Ibuprofène', type: 'Substance active' },
    { name: 'Paracétamol', type: 'Substance active' },
    { name: 'Doliprane', type: 'Nom du médicament' }, // Example Drug Name
    { name: 'Spedifen', type: 'Nom du médicament' }, // Example Drug Name
    // Add more as needed
  ];

  treatmentSuggestions: TreatmentOption[] = []; // Suggestions for autocomplete

  treatmentNameLabel: string = 'Substance active'; // Dynamic label for the autocomplete

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    // Initialize the form with controls and the date range validator at the group level
    this.treatmentForm = this.fb.group({
      entryType: ['Substance active'], // Default to 'Substance active'
      treatmentName: [null, Validators.required], // Required autocomplete field
      startDate: [null, futureDateValidator], // Start date, optional future date validator
      endDate: [null, futureDateValidator], // End date, optional future date validator
      status: [null], // Status
      dosage: [''], // Posologie
      indication: [''], // Indication
      prescriber: [''], // Prescripteur
      note: [''], // Note
    }, { validators: dateRangeValidator }); // Apply the custom validator to the form group
  }

  ngOnInit(): void {
    // Set default status to 'En cours'
    const defaultStatus = this.statuses.find(s => s.value === 'En cours');
    if (defaultStatus) {
      this.statusControl?.setValue(defaultStatus);
    }

    // Subscribe to entryType changes to update the label and suggestions filtering
    this.entryTypeControl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(type => {
      this.treatmentNameLabel = type; // Update the label
      this.treatmentNameControl?.reset(null); // Clear the autocomplete when type changes
      this.treatmentSuggestions = []; // Clear current suggestions
      // searchTreatments will filter based on the new type when user types
    });

    // Initial population of allergen suggestions (all of them initially, or filtered by default type)
    const defaultEntryType = this.entryTypeControl?.value;
    this.treatmentSuggestions = this.originalTreatments.filter(t => t.type === defaultEntryType);

    // Re-run date validation whenever start or end date changes
    this.startDateControl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.treatmentForm.get('endDate')?.updateValueAndValidity({ onlySelf: false, emitEvent: false }); // Re-validate endDate
      this.treatmentForm.updateValueAndValidity({ onlySelf: false, emitEvent: false }); // Re-validate the group
    });

    this.endDateControl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.treatmentForm.get('startDate')?.updateValueAndValidity({ onlySelf: false, emitEvent: false }); // Re-validate startDate
      this.treatmentForm.updateValueAndValidity({ onlySelf: false, emitEvent: false }); // Re-validate the group
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Form Control Getters ---
  get entryTypeControl(): AbstractControl | null { return this.treatmentForm.get('entryType'); }
  get treatmentNameControl(): AbstractControl | null { return this.treatmentForm.get('treatmentName'); }
  get startDateControl(): AbstractControl | null { return this.treatmentForm.get('startDate'); }
  get endDateControl(): AbstractControl | null { return this.treatmentForm.get('endDate'); }
  get statusControl(): AbstractControl | null { return this.treatmentForm.get('status'); }
  get dosageControl(): AbstractControl | null { return this.treatmentForm.get('dosage'); }
  get indicationControl(): AbstractControl | null { return this.treatmentForm.get('indication'); }
  get prescriberControl(): AbstractControl | null { return this.treatmentForm.get('prescriber'); }
  get noteControl(): AbstractControl | null { return this.treatmentForm.get('note'); }


  // --- Autocomplete Logic ---
  searchTreatments(event: any) {
    const query: string = event.query;
    const selectedType = this.entryTypeControl?.value; // 'Substance active' or 'Nom du médicament'

    if (selectedType) {
      this.treatmentSuggestions = this.originalTreatments.filter(
        (treatment) =>
          treatment.type === selectedType &&
          treatment.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      // If somehow no type is selected, show all suggestions matching the query
      this.treatmentSuggestions = this.originalTreatments.filter((treatment) =>
        treatment.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  // --- Helper to show validation errors ---
  shouldShowError(control: AbstractControl | FormGroup | null): boolean {
    if (!control) return false;
    // Check if it's a form group and has errors, OR if it's a control with invalid state and touched/dirty
    return !!(control.invalid && (control.dirty || control.touched));
  }


  // --- Reset Field Logic ---
  clearField(controlName: string) {
    const control = this.treatmentForm.get(controlName);
    if (control) {
      // Reset based on expected value type (Date, object from dropdown, string)
      if (controlName === 'startDate' || controlName === 'endDate') {
        control.reset(null); // Reset date to null
      } else if (controlName === 'status' || controlName === 'treatmentName') {
        control.reset(null); // Reset dropdown/autocomplete object to null
      }
      else {
        control.reset(''); // Reset text fields
      }
      // Note: entryType is a selectButton, typically doesn't need a clear button
    }
  }

  // --- Save Logic ---
  saveTreatment() {
    this.treatmentForm.markAllAsTouched(); // Mark all fields as touched

    console.log('Form validity:', this.treatmentForm.valid);
    console.log('Form errors:', this.treatmentForm.errors);
    console.log('Control errors:', this.treatmentForm.controls);


    if (this.treatmentForm.valid) {
      const formValue = this.treatmentForm.value;
      console.log('Form is valid. Saving treatment:', formValue);

      // --- Data Transformation and Formatting ---
      // Format dates to string (assuming DD/MM/YYYY format from p-calendar)
      const formatToDDMMYYYY = (date: Date | null): string | null => {
        if (date instanceof Date && !isNaN(date.getTime())) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
        return null;
      };

      const formattedStartDate = formatToDDMMYYYY(formValue.startDate);
      const formattedEndDate = formatToDDMMYYYY(formValue.endDate);


      // Prepare the data structure to return to the parent
      const treatmentData = {
        // Decide how you want to represent this as a MedicalHistoryBlock or a new type
        // A simple approach is to use the name as the title and store other details
        title: formValue.treatmentName?.name || formValue.treatmentName || 'Traitement non spécifié',
        // You might not use status/class from the generic MedicalHistoryBlock for treatments,
        // or map the treatment status to it.
        status: formValue.status?.name || null, // Use the treatment status
        class: null, // Maybe map status to a class? E.g., 'chip-info' for En cours
        date: formattedStartDate, // Can use start date here, or a date range string
        note: formValue.note || null,

        // Store treatment-specific fields
        entryType: formValue.entryType,
        treatmentName: formValue.treatmentName?.name || formValue.treatmentName, // Store just the name string
        startDate: formattedStartDate, // Store formatted dates
        endDate: formattedEndDate,
        treatmentStatus: formValue.status?.name || null, // Store the treatment status explicitly
        dosage: formValue.dosage || null,
        indication: formValue.indication || null,
        prescriber: formValue.prescriber || null,
      };

      // Simulate saving (replace with your actual API call)
      console.log('Saving treatment data:', treatmentData);
      // Example API call: this.apiService.saveTreatment(treatmentData).subscribe(...)


      // On successful save:
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Traitement enregistré avec succès.',
        life: 3000
      });

      // Close the dialog and pass the saved data back
      this.ref.close(treatmentData);

    } else {
      console.log('Form is invalid. Cannot save treatment.');
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire.',
        life: 3000
      });
      // Optional: Scroll to the first invalid field if needed
      // this.scrollToFirstInvalidControl();
    }
  }

  // --- Cancel Logic ---
  closeDialog(data: any = null) {
    this.ref.close(data); // Pass null or specific data on cancel
  }

}

