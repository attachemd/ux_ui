import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FtDynamicDialogService } from '../../../stories/Components/dialog/ft-dynamic-dialog.service';
import { Subject, takeUntil } from 'rxjs';
import { FTInputComponent } from '../../../stories/inputs/input/ft.input.component';
import { FTSelectComponent, SelectOption } from '../../../stories/select/select/ft.select.component';
import { FtButtonComponent } from '../../../stories/Buttons/button/ft.button.component';
import { FtToggleComponent } from '../../../stories/toggles/toggle/ft.toggle.component';

@Component({
  selector: 'app-medical-condition-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FTInputComponent,
    FTSelectComponent,
    FtButtonComponent,
    FtToggleComponent
  ],
  templateUrl: './medical-condition-dialog.component.html',
  styleUrl: './medical-condition-dialog.component.css'
})
export class MedicalConditionDialogComponent implements OnInit, OnDestroy {
  medicalAntecedentForm: FormGroup; // Declare your FormGroup

  // Properties for dropdown/autocomplete options
  medicalConditionSuggestions: any[] = []; // Suggestions for the autocomplete
  originalMedicalConditions: string[] = [
    'Hypertension',
    'Diabète',
    'Asthme',
    'Allergie',
    'Migraine',
    'Cancer',
    'Maladie cardiaque',
    'Arthrite',
  ];
  statusOptions: any[] = []; // Options for the status select
  relationOptions: any[] = []; // Options for the relation select

  private dialogService = inject(FtDynamicDialogService);
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    // Initialize the form with more descriptive control names
    this.medicalAntecedentForm = this.fb.group({
      medicalConditionName: ['', Validators.required], // 'Valeur' is the medical condition name
      diagnosticDate: [null], // 'Date de diagnostic'
      status: [null], // 'Status'
      isFamilial: [false], // 'Antécédent familial' toggleswitch
      relation: [{value: null, disabled: true}], // 'Relation', disabled initially if not familial
      isDeceased: [{value: false, disabled: true}], // 'Décédé' toggleswitch, disabled initially
      note: [''], // 'Note' textarea
    });
  }

  ngOnInit(): void {
    // --- Populate Options ---
    // Populate status options first to set the default
    this.statusOptions = [
      { label: 'Active', value: 'Active' },
      { label: 'In remission', value: 'In remission' },
      { label: 'Resolved', value: 'Resolved' },
    ];

    this.relationOptions = [
      { label: 'Parent', value: 'Parent' },
      { label: 'Sibling', value: 'Sibling' },
      { label: 'Child', value: 'Child' },
    ];


    // --- Set Initial Values and Validators ---
    this.medicalAntecedentForm.patchValue({
      diagnosticDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });

    // --- Subscribe to Value Changes ---

    // 1. isFamilial toggle changes
    this.medicalAntecedentForm.get('isFamilial')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((isFamilial: boolean) => {
      const relationControl = this.medicalAntecedentForm.get('relation');
      const isDeceasedControl = this.medicalAntecedentForm.get('isDeceased');

      if (isFamilial) {
        relationControl?.enable();
        // Add required validator conditionally
        relationControl?.setValidators(Validators.required);
        isDeceasedControl?.enable();
      } else {
        relationControl?.disable();
        // Remove required validator
        relationControl?.setValidators(null);
        relationControl?.reset(null); // Also reset value when disabling
        isDeceasedControl?.disable();
        isDeceasedControl?.reset(false); // Reset deceased state
      }
      // Update validation status for the relation control
      relationControl?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  // searchMedicalConditions(event: any) {
  //   // Method for autocomplete suggestions, renamed for clarity
  //   let query = event.query;
  //   // In a real application, you would filter 'medicalConditionSuggestions' based on the query
  //   this.medicalConditionSuggestions = [
  //     'Hypertension',
  //     'Diabète',
  //     'Asthme',
  //     'Allergie',
  //     'Migraine',
  //     'Cancer',
  //   ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  // }

  // --- Autocomplete Method ---
  searchMedicalConditions(event: any) {
    const query = event.query;
    // Filter suggestions based on query (case-insensitive)
    this.medicalConditionSuggestions = this.originalMedicalConditions.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }

  clearNoteTextarea() {
    // Method to clear the note textarea using the form control, renamed
    this.medicalAntecedentForm.get('note')?.setValue('');
  }

  saveMedicalAntecedent() {
    // Mark all fields as touched to show validation errors on save attempt
    this.medicalAntecedentForm.markAllAsTouched();

    if (this.medicalAntecedentForm.valid) {
      console.log(
        'Form is valid. Saving data:',
        this.medicalAntecedentForm.value
      );
      // Perform save operation here, using this.medicalAntecedentForm.value
    } else {
      console.log('Form is invalid. Cannot save.');
      // Optionally, highlight fields with errors or show a general message
    }
  }

  // Helper getter to easily access the 'medicalConditionName' form control in the template
  get medicalConditionNameControl() {
    return this.medicalAntecedentForm.get('medicalConditionName');
  }

  // Helper getter for the note control to check its value in the template
  get noteControl() {
    return this.medicalAntecedentForm.get('note');
  }

  get relationControl(): AbstractControl | null {
    return this.medicalAntecedentForm.get('relation');
  }

  get isFamilialControl(): AbstractControl | null {
    return this.medicalAntecedentForm.get('isFamilial');
  }

  // Helper method to check if a control should show validation errors
  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  // search(event: AutoCompleteCompleteEvent) {
  //   this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
  // }

  closeDialog(data?: any) {
    this.dialogService.close(data);
  }

}

