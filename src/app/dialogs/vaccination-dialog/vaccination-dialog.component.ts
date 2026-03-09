// src/app/dialogs/vaccination-dialog/vaccination-dialog.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { CommonModule, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import {Textarea} from 'primeng/textarea';
import {DatePicker} from 'primeng/datepicker';

// Define interface for vaccine options if needed for stricter typing
interface VaccineOption {
  name: string;
  // Add other vaccine properties like code, manufacturer if needed
}


@Component({
  selector: 'app-vaccination-dialog',
  standalone: true, // Mark as standalone if not used in a traditional module
  imports: [
    CommonModule, // Required for NgIf
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    InputGroupModule,
    NgIf,
    Textarea,
    DatePicker,
  ],
  providers: [MessageService], // Provide MessageService if not provided globally
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


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, // To potentially receive data
    private messageService: MessageService // For toast messages
  ) {
    // Initialize the form
    this.vaccinationForm = this.fb.group({
      vaccineName: [null, Validators.required], // Vaccine name (required)
      administrationDate: [null], // Administration Date (can be null initially)
      notes: [''], // Notes
    });
  }

  ngOnInit(): void {
    // You can access data passed from the parent component here if needed
    // const parentData = this.config.data;
    // console.log('Data received in vaccination dialog:', parentData);

    // Initial population of vaccine suggestions (all of them initially)
    this.vaccineSuggestions = [...this.originalVaccines];

    // Optionally set administration date default to today if required by story, though prompt says null initially
    // this.administrationDateControl?.setValue(new Date());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Form Control Getters ---
  get vaccineNameControl(): AbstractControl | null { return this.vaccinationForm.get('vaccineName'); }
  get administrationDateControl(): AbstractControl | null { return this.vaccinationForm.get('administrationDate'); }
  get notesControl(): AbstractControl | null { return this.vaccinationForm.get('notes'); }


  // --- Autocomplete Logic ---
  searchVaccines(event: any) {
    const query: string = event.query;

    this.vaccineSuggestions = this.originalVaccines.filter(
      (vaccine) => vaccine.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // --- Helper to show validation errors ---
  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
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
    this.vaccinationForm.markAllAsTouched(); // Mark all fields as touched

    if (this.vaccinationForm.valid) {
      const formValue = this.vaccinationForm.value;
      console.log('Form is valid. Saving vaccination:', formValue);

      // --- Data Transformation and Formatting ---
      // Format the administration date
      let formattedDate: string | null = null;
      if (formValue.administrationDate instanceof Date) {
        // Ensure it's a valid Date object before formatting
        if (!isNaN(formValue.administrationDate.getTime())) {
          const date = formValue.administrationDate;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          // Use your desired format (e.g., DD/MM/YYYY or DD/MM/YYYY)
          formattedDate = `${day}/${month}/${year}`;
        }
      } else if (typeof formValue.administrationDate === 'string' && formValue.administrationDate) {
        // Attempt to parse YYYY or MMYYYY if entered as string
        const dateString = formValue.administrationDate.trim();
        let parsedDate: Date | null = null;

        if (/^\d{4}$/.test(dateString)) { // YYYY format
          parsedDate = new Date(parseInt(dateString), 0, 1); // Jan 1st of the year
        } else if (/^\d{6}$/.test(dateString)) { // MMYYYY format
          const month = parseInt(dateString.substring(0, 2)) - 1; // 0-indexed month
          const year = parseInt(dateString.substring(2, 6));
          // Validate month
          if (month >= 0 && month < 12) {
            parsedDate = new Date(year, month, 1); // 1st day of the month
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
          // Handle parsing error, maybe set date to null or show an error
          formattedDate = null;
        }
      }


      // Prepare the data structure to return to the parent
      const vaccinationData = {
        // Map to MedicalHistoryBlock or a custom type
        title: formValue.vaccineName?.name || formValue.vaccineName || 'Vaccination non spécifiée', // Use vaccine name or just the value
        status: 'Administré', // Example status for vaccination
        class: 'chip-success', // Example class
        date: formattedDate, // Administration date
        note: formValue.notes || null,

        // Store vaccination-specific fields if MedicalHistoryBlock is extended or a new type is used
        vaccineName: formValue.vaccineName?.name || formValue.vaccineName, // Store name string
        administrationDate: formattedDate, // Store formatted date explicitly
        // You might add manufacturer, lot number, etc. here
      };

      // Simulate saving (replace with your actual API call)
      console.log('Saving vaccination data:', vaccinationData);
      // Example API call: this.apiService.saveVaccination(vaccinationData).subscribe(...)


      // On successful save:
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Vaccination enregistrée avec succès.',
        life: 3000
      });

      // Close the dialog and pass the saved data back
      this.ref.close(vaccinationData);

    } else {
      console.log('Form is invalid. Cannot save vaccination.');
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

