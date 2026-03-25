import {Component, HostBinding, OnDestroy, OnInit, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {debounceTime, distinctUntilChanged, filter, map, startWith, Subject, takeUntil} from 'rxjs'; // Import takeUntil
import { FtToastService } from '../../../shared/components/toast/toast.service';
import { FtConfirmDialogService } from '../../../shared/components/dialog/confirm-dialog.service';
import { FtInputComponent } from '../../../shared/components/inputs/input/input.component';
import { FtSelectComponent } from '../../../shared/components/select/select/select.component';
import { FtButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { FtIconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { FtRadioGroupComponent } from '../../../shared/components/radio-buttons/radio-group/radio-group.component';
import { ButtonGroupOption, FtButtonGroupComponent } from '../../../shared/components/buttons/button-group/button-group.component';
import { FtTextareaComponent } from '../../../shared/components/textarea/textarea/textarea.component';
// --- Custom Validators ---
// Basic pattern validator (allows letters, numbers, space, and specified special chars)
const allowedCharsPattern = /^[a-zA-Z0-9\s\-&`_´]*$/;
const namePattern = /^[a-zA-Z\-&`_´]+$/; // For Nom/Prénom strictly (no spaces inside)

function noLeadingTrailingSpacesValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value as string;
  if (value && (value.startsWith(' ') || value.endsWith(' '))) {
    return { 'leadingTrailingSpaces': true };
  }
  return null;
}

function alphanumericUppercaseNoSpecialValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value as string;
  if (value && !/^[A-Z0-9]*$/.test(value)) {
    return { 'invalidPassport': true };
  }
  return null;
}

function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value as string;
  // Basic email regex, can be made more robust
  if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return { 'invalidEmail': true };
  }
  return null;
}

function phoneValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value as string;
  // Basic phone regex, can be made more robust and locale-specific
  if (value && !/^[0-9\s\-\+\(\)]+$/.test(value)) {
    return { 'invalidPhone': true };
  }
  return null;
}

import {Patient} from '../../../types/patient.type';

interface Option {
  label: string;
  value: any;
}

interface PatientRelation {
  type: Option | null; // e.g., { name: 'Parent', value: 'PARENT' }
  relatedPatient: Patient | null; // The related patient object
}

// Custom Validators
export function leadingTrailingSpacesValidator(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value === 'string' && (control.value.startsWith(' ') || control.value.endsWith(' '))) {
    return { leadingTrailingSpaces: true };
  }
  return null;
}

export function allowedCharactersValidator(allowedChars: string): Validators {
  return (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value === 'string' && control.value.length > 0) {
      const pattern = new RegExp(`^[a-zA-Z${allowedChars}]*$`);
      if (!pattern.test(control.value)) {
        return { pattern: { requiredPattern: `^[a-zA-Z${allowedChars}]*$` } };
      }
    }
    return null;
  };
}

export function addressSpecialCharactersValidator(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value === 'string' && control.value.length > 0) {
    // Checks for sequences of identical special characters like //, ###, --- etc.
    const specialCharPattern = /([^\w\s])\1+/;
    if (specialCharPattern.test(control.value)) {
      return { addressSpecialCharacters: true };
    }
  }
  return null;
}


@Component({
  selector: 'ft-patient-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FtInputComponent,
    FtSelectComponent,
    FtButtonComponent,
    FtIconButtonComponent,
    FtRadioGroupComponent,
    FtButtonGroupComponent,
    FtTextareaComponent
],
  providers: [FtToastService, FtConfirmDialogService], 
  templateUrl: './patient-add.component.html',
  styleUrl: './patient-add.component.css'
})
export class PatientAddComponent implements OnInit, OnDestroy {
  patientForm!: FormGroup;
  isSaving: boolean = false;

  // --- Photo Upload ---
  maxFileSize: number = 5 * 1024 * 1024; // 5MB
  uploadedPhoto: File | null = null;

  // --- Relations Management ---
  patientRelations: PatientRelation[] = [];
  displayAddRelationDialog: boolean = false;
  newRelationForm!: FormGroup;

  // --- Reference Data (Simulated) ---
  statusOptions: ButtonGroupOption[] = [
    { label: 'Anonyme', value: 'Anonyme', isLabel: true },
    { label: 'Confidentiel', value: 'Confidentiel', isLabel: true },
    { label: 'VIP', value: 'VIP', isLabel: true }
  ];

  titles: Option[] = [
    { label: 'M', value: 'M' },
    { label: 'Mme', value: 'MME' },
    { label: 'Mlle', value: 'MLLE' },
    { label: 'Enf', value: 'ENF' },
    { label: 'Autre', value: 'AUTRE' }
  ];

  sexeOptions: any[] = [
    { label: 'Homme', value: 'MALE', isLabel: true, isDescription: false, description: '' },
    { label: 'Femme', value: 'FEMALE', isLabel: true, isDescription: false, description: '' },
    { label: 'Autre', value: 'OTHER', isLabel: true, isDescription: false, description: '' }
  ];

  emergencyContactTypes: Option[] = [
    { label: 'Tuteur', value: 'TUTEUR' },
    { label: 'Père', value: 'PERE' },
    { label: 'Mère', value: 'MERE' },
    { label: 'Conjoint', value: 'CONJOINT' },
    { label: 'Autre', value: 'AUTRE' }
  ];

  maritalStatuses: Option[] = [
    { label: 'Célibataire', value: 'SINGLE' },
    { label: 'Marié(e)', value: 'MARRIED' },
  ];

  mentionsOptions: Option[] = [
    { label: 'Anonyme', value: 'ANONYMOUS' },
    { label: 'Confidentiel', value: 'CONFIDENTIAL' },
    { label: 'VIP', value: 'VIP' },
  ];

  nationalities: Option[] = [
    { label: 'Marocaine', value: 'MA' },
    { label: 'Française', value: 'FR' },
    { label: 'Espagnole', value: 'ES' },
    { label: 'Allemande', value: 'DE' }
  ];
  
  ethnicities: Option[] = [
    { label: 'Caucasien', value: 'CAUCASIAN' },
    { label: 'Arabe', value: 'ARAB' },
    { label: 'Africain', value: 'AFRICAN' },
    { label: 'Autre', value: 'OTHER' }
  ];

  professions: Option[] = [
    { label: 'Ingénieur', value: 'ENGINEER' },
    { label: 'Médecin', value: 'DOCTOR' },
    { label: 'Enseignant', value: 'TEACHER' },
    { label: 'Autre', value: 'OTHER' }
  ];

  countries: string[] = ['Maroc', 'France', 'Spain', 'Germany'];
  cities: string[] = ['Casablanca', 'Rabat', 'Marrakech', 'Paris', 'Lyon', 'Marseille', 'Madrid', 'Barcelona', 'Berlin', 'Munich'];
  languages: string[] = ['Français', 'Anglais', 'Espagnol', 'Arabe'];

  spokenLanguagesOptions: Option[] = [
    { label: 'Français', value: 'fr' },
    { label: 'Anglais', value: 'en' },
    { label: 'Espagnol', value: 'es' },
    { label: 'Arabe', value: 'ar' },
    { label: 'Berbère', value: 'ber' },
  ];

  relationTypes: Option[] = [
    { label: 'Parent', value: 'PARENT' },
    { label: 'Enfant', value: 'CHILD' },
    { label: 'Conjoint(e)', value: 'SPOUSE' },
    { label: 'Frère/Sœur', value: 'SIBLING' },
    { label: 'Ami(e)', value: 'FRIEND' },
    { label: 'Autre', value: 'OTHER' },
  ];

  existingPatients: Patient[] = [
    { id: 'pat_001', firstName: 'Alice', lastName: 'Dupont', dateOfBirth: new Date(1990, 5, 15), status: 'ANONYME', title: 'MRS' },
    { id: 'pat_002', firstName: 'Bob', lastName: 'Martin', dateOfBirth: new Date(1988, 9, 20), status: 'ANONYME', title: 'MR' },
    { id: 'pat_003', firstName: 'Charlie', lastName: 'Bernard', dateOfBirth: new Date(2010, 2, 10), status: 'ANONYME', title: 'MR' },
  ];

  filteredCities: string[] = [];
  filteredNationalities: string[] = [];
  filteredLanguages: string[] = [];
  filteredSpokenLanguages: Option[] = [];
  filteredExistingPatients: Patient[] = [];

  private destroy$ = new Subject<void>();
  private toastService = inject(FtToastService);
  private confirmDialogService = inject(FtConfirmDialogService);

  constructor(private fb: FormBuilder) { }

  // --- Getters for Form Controls ---
  get statusControl() { return this.patientForm.get('status'); }
  get titleControl() { return this.patientForm.get('title'); }
  get firstNameControl() { return this.patientForm.get('firstName'); }
  get lastNameControl() { return this.patientForm.get('lastName'); }
  get dateOfBirthControl() { return this.patientForm.get('dateOfBirth'); }
  get ageControl() { return this.patientForm.get('age'); }
  get sexeControl() { return this.patientForm.get('sexe'); }
  get nationalIdControl() { return this.patientForm.get('nationalId'); }
  get passportNumberControl() { return this.patientForm.get('passportNumber'); }
  get emailControl() { return this.patientForm.get('email'); }
  get primaryPhoneNumberControl() { return this.patientForm.get('primaryPhoneNumber'); }
  get secondaryPhoneNumberControl() { return this.patientForm.get('secondaryPhoneNumber'); }
  get countryControl() { return this.patientForm.get('country'); }
  get cityControl() { return this.patientForm.get('city'); }
  get postalCodeControl() { return this.patientForm.get('postalCode'); }
  get addressControl() { return this.patientForm.get('address'); }
  get emergencyContactTypeControl() { return this.patientForm.get('emergencyContactType'); }
  get emergencyContactNameControl() { return this.patientForm.get('emergencyContactName'); }
  get emergencyContactPhoneControl() { return this.patientForm.get('emergencyContactPhone'); }
  get nationalityControl() { return this.patientForm.get('nationality'); }
  get spokenLanguagesControl() { return this.patientForm.get('spokenLanguages'); }
  get photoControl() { return this.patientForm.get('photo'); }
  get maritalStatusControl() { return this.patientForm.get('maritalStatus'); }
  get ethnicityControl() { return this.patientForm.get('ethnicity'); }
  get occupationControl() { return this.patientForm.get('occupation'); }
  get placeOfBirthControl() { return this.patientForm.get('placeOfBirth'); }
  get employerControl() { return this.patientForm.get('employer'); }
  get socialSecurityNumberControl() { return this.patientForm.get('socialSecurityNumber'); }
  get insuranceProviderControl() { return this.patientForm.get('insuranceProvider'); }
  get insuranceNumberControl() { return this.patientForm.get('insuranceNumber'); }
  get otherField1Control() { return this.patientForm.get('otherField1'); }
  get otherField2Control() { return this.patientForm.get('otherField2'); }

  ngOnInit(): void {
    this.initPatientForm();
    this.initNewRelationForm();
    this.setupValueChangeListeners();
    this.setupAutocompleteFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initPatientForm(): void {
    const namePattern = /^[A-Z0-9\s'_\-,&]*$/;
    const idPattern = /^[A-Z0-9]*$/;

    this.patientForm = this.fb.group({
      mentions: [[]],
      photo: [null],
      status: ['VIP'],
      title: ['M'],
      firstName: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(32),
        Validators.pattern(namePattern)
      ]],
      lastName: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(32),
        Validators.pattern(namePattern)
      ]],
      dateOfBirth: [null, [Validators.required, (control: AbstractControl) => {
        if (control.value && new Date(control.value) > new Date()) {
          return { futureDate: true };
        }
        return null;
      }]],
      age: [null],
      sexe: ['MALE', Validators.required],
      nationalId: ['', [
        Validators.minLength(5), 
        Validators.maxLength(12),
        Validators.pattern(idPattern)
      ]],
      passportNumber: ['', [
        Validators.minLength(5), 
        Validators.maxLength(12),
        Validators.pattern(idPattern)
      ]],
      email: ['', [emailValidator]],
      primaryPhoneNumber: ['', [phoneValidator]],
      secondaryPhoneNumber: ['', [phoneValidator]],
      country: [''],
      city: [''],
      postalCode: [''],
      address: [''],
      maritalStatus: [null],
      nationality: [null],
      ethnicity: [null],
      occupation: [null],
      spokenLanguages: [['Arab', 'Français']],
      emergencyContactType: [null],
      emergencyContactName: [''],
      emergencyContactPhone: [''],
      placeOfBirth: [''],
      employer: [''],
      socialSecurityNumber: [''],
      insuranceProvider: [''],
      insuranceNumber: [''],
      otherField1: [''],
      otherField2: [null],
    });
  }

  initNewRelationForm(): void {
    this.newRelationForm = this.fb.group({
      type: [null, Validators.required],
      relatedPatient: [null, Validators.required],
    });
  }

  setupValueChangeListeners(): void {
    // DOB -> Age calculation
    this.dateOfBirthControl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(dob => {
      if (dob instanceof Date) {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        this.ageControl?.setValue(age, { emitEvent: false });
      }
    });

    // Age -> DOB calculation (01/01/YYYY)
    this.ageControl?.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(age => {
      if (typeof age === 'number' && age > 0) {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - age;
        const date = new Date(birthYear, 0, 1); // 01/01/YYYY
        this.dateOfBirthControl?.setValue(date, { emitEvent: false });
      }
    });

    // Title -> Sexe sync
    this.patientForm.get('title')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(title => {
      if (title === 'MME' || title === 'MLLE') {
        this.sexeControl?.setValue('FEMALE', { emitEvent: false });
      }
    });

    // Country changes -> Filter Cities
    this.countryControl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(country => {
      this.cityControl?.setValue(null);
      if (country) {
        this.filteredCities = this.cities.filter(city =>
          (country === 'Maroc' && ['Rabat', 'Casablanca', 'Marrakech'].includes(city)) ||
          (country === 'France' && ['Paris', 'Lyon', 'Marseille'].includes(city)) ||
          (country === 'Spain' && ['Madrid', 'Barcelona'].includes(city)) ||
          (country === 'Germany' && ['Berlin', 'Munich'].includes(city))
        );
        if (country === 'Maroc') {
          this.nationalityControl?.setValue('Marocaine');
        }
      }
    });
  }

  setupAutocompleteFilters(): void {
    // Spoken languages filter
    this.spokenLanguagesControl?.valueChanges.pipe(
      takeUntil(this.destroy$),
      startWith(this.spokenLanguagesControl?.value || []),
      debounceTime(200),
      map(selected => {
        const selectedStrings = Array.isArray(selected) ? selected : [];
        return this.languages.filter(lang => !selectedStrings.includes(lang));
      })
    ).subscribe(filtered => {
      this.filteredLanguages = filtered;
    });
  }

  get formattedAge(): string {
    const dob = this.dateOfBirthControl?.value;
    if (dob instanceof Date) {
      const today = new Date();
      let months = (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth());
      if (today.getDate() < dob.getDate()) months--;
      
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (years > 0) {
        return `${years} et ${remainingMonths} mois`;
      } else {
        return `${remainingMonths} mois`;
      }
    }
    const age = this.ageControl?.value;
    return age ? `${age} ans` : '';
  }

  // --- Handlers ---
  clearField(controlName: string) {
    this.patientForm.get(controlName)?.reset('');
  }

  onPhotoSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      if (file.size <= this.maxFileSize) {
        this.uploadedPhoto = file;
        this.photoControl?.setValue(file);
      } else {
        this.toastService.add({ severity: 'error', summary: 'Erreur', detail: 'Fichier trop volumineux' });
      }
    }
  }

  onPhotoRemove(): void {
    this.uploadedPhoto = null;
    this.photoControl?.setValue(null);
  }

  openAddRelationDialog(): void {
    this.initNewRelationForm();
    this.displayAddRelationDialog = true;
  }

  addRelation(): void {
    if (this.newRelationForm.valid) {
      this.patientRelations.push(this.newRelationForm.value);
      this.displayAddRelationDialog = false;
    }
  }

  removeRelation(index: number): void {
    this.patientRelations.splice(index, 1);
  }

  savePatient(): void {
    if (this.patientForm.valid) {
      this.isSaving = true;
      console.log('Saving Patient:', this.patientForm.value);
      setTimeout(() => {
        this.isSaving = false;
        this.toastService.add({ severity: 'success', summary: 'Succès', detail: 'Patient enregistré' });
      }, 2000);
    } else {
      this.patientForm.markAllAsTouched();
    }
  }

  cancel(): void {
    if (this.patientForm.dirty) {
      this.confirmDialogService.confirm({
        message: 'Vous avez des modifications en cours, voulez-vous vraiment quitter ? Oui quitter, Non continue',
        accept: () => console.log('Cancelled')
      });
    } else {
      console.log('Cancelled');
    }
  }

  onValueUppercase(controlName: string, event: string): void {
    const uppercaseValue = event.toUpperCase();
    this.patientForm.get(controlName)?.setValue(uppercaseValue, { emitEvent: false });
  }

  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/default-avatar.png';
  }

  getRelationControl(controlName: string): AbstractControl | null {
    return this.newRelationForm.get(controlName);
  }

  getRelationTypeName(relation: PatientRelation): string {
    return relation.type?.label || 'Inconnu';
  }

  getRelatedPatientName(relation: PatientRelation): string {
    if (relation.relatedPatient) {
      if (relation.relatedPatient.dateOfBirth instanceof Date && !isNaN(relation.relatedPatient.dateOfBirth.getTime())) {
        const date = relation.relatedPatient.dateOfBirth;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${relation.relatedPatient.lastName} ${relation.relatedPatient.firstName} (${day}/${month}/${year})`;
      }
      return `${relation.relatedPatient.lastName} ${relation.relatedPatient.firstName}`;
    }
    return 'Patient inconnu';
  }

  shouldShowRelationError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
}

