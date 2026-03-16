import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FtDynamicDialogService } from '../../../stories/Components/dialog/ft-dynamic-dialog.service';
import { FtToastService } from '../../../stories/Components/toast/ft-toast.service';
import { Subject } from 'rxjs';
import { FTInputComponent } from '../../../stories/inputs/input/ft.input.component';
import { FtButtonComponent } from '../../../stories/Buttons/button/ft.button.component';
import { FTSelectComponent, SelectOption } from '../../../stories/select/select/ft.select.component';

// Define interfaces for dropdown options if needed for stricter typing
interface Option {
  name: string;
  value: any; // Or a more specific type
}

interface AllergenOption {
  name: string;
  type: string; // Associate allergen with type
}


@Component({
  selector: 'app-allergy-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FTInputComponent,
    FtButtonComponent,
    FTSelectComponent,
  ],
  templateUrl: './allergy-dialog.component.html',
  styleUrl: './allergy-dialog.component.css'
})
export class AllergyDialogComponent implements OnInit, OnDestroy {

  allergyForm: FormGroup;

  // Options for dropdowns and autocomplete
  allergyTypes: SelectOption[] = [
    { label: 'Médicament', value: 'Médicament' },
    { label: 'Aliment', value: 'Aliment' },
    { label: 'Environnement', value: 'Environnement' },
    { label: 'Autre', value: 'Autre' },
  ];

  // Store all possible allergens with their types
  originalAllergens: AllergenOption[] = [
    { name: 'Pollen', type: 'Environnement' },
    { name: 'Acariens', type: 'Environnement' },
    { name: 'Poils de chat', type: 'Environnement' },
    { name: 'Amoxicilline', type: 'Médicament' },
    { name: 'Aspirine', type: 'Médicament' },
    { name: 'Pénicilline', type: 'Médicament' },
    { name: 'Arachides', type: 'Aliment' },
    { name: 'Lait', type: 'Aliment' },
    { name: 'Œufs', type: 'Aliment' },
    { name: 'Piqûre d\'abeille', type: 'Autre' },
    { name: 'Latex', type: 'Autre' },
    // Add more allergens as needed
  ];

  allergenSuggestions: AllergenOption[] = []; // Suggestions filtered for the autocomplete

  reactions: SelectOption[] = [
    { label: 'Éruption cutanée', value: 'Éruption cutanée' },
    { label: 'Démangeaisons', value: 'Démangeaisons' },
    { label: 'Œdème', value: 'Œdème' },
    { label: 'Difficulté à respirer', value: 'Difficulté à respirer' },
    { label: 'Anaphylaxie', value: 'Anaphylaxie' },
    { label: 'Nausées', value: 'Nausées' },
  ];

  severities: SelectOption[] = [
    { label: 'Faible', value: 'Faible' },
    { label: 'Modéré', value: 'Modéré' },
    { label: 'Sévère', value: 'Sévère' },
  ];


  private dialogService = inject(FtDynamicDialogService);
  private toastService = inject(FtToastService);
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
  ) {
    // Initialize the form
    this.allergyForm = this.fb.group({
      allergyType: [null],
      allergen: [null, Validators.required],
      reactions: [null],
      severity: [null],
      diagnosticDate: [new Date().toISOString().split('T')[0]],
      note: [''],
    });
  }

  ngOnInit(): void {
    // You can access data passed from the parent component here if needed
    // const parentData = this.config.data;
    // console.log('Data received in allergy dialog:', parentData);

    // Initial population of allergen suggestions (all of them initially)
    this.allergenSuggestions = [...this.originalAllergens];
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Form Control Getters ---
  get allergyTypeControl(): AbstractControl | null {
    return this.allergyForm.get('allergyType');
  }

  get allergenControl(): AbstractControl | null {
    return this.allergyForm.get('allergen');
  }

  get reactionsControl(): AbstractControl | null {
    return this.allergyForm.get('reactions');
  }

  get severityControl(): AbstractControl | null {
    return this.allergyForm.get('severity');
  }

  get diagnosticDateControl(): AbstractControl | null {
    return this.allergyForm.get('diagnosticDate');
  }

  get noteControl(): AbstractControl | null {
    return this.allergyForm.get('note');
  }

  // --- Autocomplete Logic ---
  searchAllergens(event: any) {
    const query: string = event.query;
    const selectedType = this.allergyTypeControl?.value?.value; // Get the actual string value

    let filteredAllergens: AllergenOption[] = [];

    if (selectedType) {
      // Filter by type AND query if type is selected
      filteredAllergens = this.originalAllergens.filter(
        (allergen) =>
          allergen.type === selectedType &&
          allergen.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      // Filter only by query if no type is selected
      filteredAllergens = this.originalAllergens.filter((allergen) =>
        allergen.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    this.allergenSuggestions = filteredAllergens;
  }

  // onAllergenSelect(event: AllergenOption) {
  onAllergenSelect(event: any) {
    // When an allergen is selected from suggestions, auto-fill the allergy type
    const selectedAllergen: AllergenOption = event;
    const correspondingType = this.allergyTypes.find(type => type.value === selectedAllergen.type);

    if (correspondingType && this.allergyTypeControl) {
      this.allergyTypeControl.setValue(correspondingType);
    }
    // The allergen control is already set by the autocomplete's (onSelect) binding
    // this.allergenControl?.setValue(selectedAllergen); // This is handled by the formControlName
  }

  // --- Handle Allergy Type Change ---
  onAllergyTypeChange() {
    // When allergy type changes, clear the allergen field and reset suggestions
    this.allergenControl?.reset(null);
    this.allergenSuggestions = [...this.originalAllergens]; // Reset suggestions to all
    // The searchAllergens method will then filter based on the new type when the user types
  }


  // --- Helper to show validation errors ---
  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  // --- Reset Field Logic ---
  clearField(controlName: string) {
    const control = this.allergyForm.get(controlName);
    if (control) {
      // For date, setting to null clears it. For others, reset or set to empty.
      if (controlName === 'diagnosticDate' || controlName === 'allergyType' || controlName === 'severity' || controlName === 'allergen') {
        control.reset(null);
      } else if (controlName === 'reactions') {
        control.reset([]); // Reset multi-select to empty array
      }
      else {
        control.reset('');
      }

      // If clearing allergy type, reset allergen suggestions
      if (controlName === 'allergyType') {
        this.allergenSuggestions = [...this.originalAllergens];
      }
    }
  }

  // --- Save Logic ---
  saveAllergy() {
    this.allergyForm.markAllAsTouched(); // Mark all fields as touched to show validation errors

    if (this.allergyForm.valid) {
      const formValue = this.allergyForm.value;
      console.log('Form is valid. Saving allergy:', formValue);

      // --- Data Transformation and Formatting ---
      // Format the diagnostic date
      let formattedDate: string | null = null;
      if (formValue.diagnosticDate instanceof Date) {
        // Ensure it's a valid Date object before formatting
        if (!isNaN(formValue.diagnosticDate.getTime())) {
          const date = formValue.diagnosticDate;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`; // Use your desired format (e.g., DD/MM/YYYY)
        }
      } else if (typeof formValue.diagnosticDate === 'string' && formValue.diagnosticDate) {
        // Attempt to parse YYYY or MMYYYY if entered as string
        const dateString = formValue.diagnosticDate.trim();
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
      const allergyData = {
        title: formValue.allergen?.name || formValue.allergen, // Use allergen name or just the value if it's a string
        status: formValue.severity?.name || null, // Use severity name
        class: formValue.severity?.value ? `chip-${formValue.severity.value.toLowerCase()}` : null, // Example class based on severity
        date: formattedDate, // Formatted date
        note: formValue.note || null,
        type: formValue.allergyType?.value || null, // Store the type
        reactions: formValue.reactions ? formValue.reactions.map((r: Option) => r.name) : [], // Store reaction names
        // You might add an ID here if your backend generates one
      };

      // Simulate saving (replace with your actual API call)
      console.log('Saving allergy data:', allergyData);
      // Example API call: this.apiService.saveAllergy(allergyData).subscribe(...)

      // On successful save:
      this.toastService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Allergie enregistrée avec succès.',
        life: 3000
      });

      // Close the dialog and pass the saved data back to the parent
      this.closeDialog(allergyData);

    } else {
      console.log('Form is invalid. Cannot save allergy.');
      this.toastService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire.',
        life: 3000
      });
    }
  }

  // Helper function to potentially scroll to the first invalid form control
  // Requires access to DOM elements, might need Renderer2 or element references
  /*
  scrollToFirstInvalidControl() {
      const invalidElements = document.querySelectorAll('.ng-invalid[formcontrolname]');
      if (invalidElements.length > 0) {
          (invalidElements[0] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
  }
  */


  // --- Cancel Logic ---
  closeDialog(data?: any) {
    this.dialogService.close(data);
  }

}

