import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import {debounceTime, distinctUntilChanged, filter, map, startWith, Subject, takeUntil} from 'rxjs'; // Import takeUntil
import { MessageService, ConfirmationService } from 'primeng/api'; // Import ConfirmationService
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber'; // For Age
import { InputMaskModule } from 'primeng/inputmask'; // For phone, national ID if masked
import { FloatLabelModule } from 'primeng/floatlabel'; // For float labels
import { PanelModule } from 'primeng/panel'; // To group sections
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // For cancel confirmation
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'; // If adding relation is a dialog
import { TagModule } from 'primeng/tag'; // For displaying relations/mentions
import { TableModule } from 'primeng/table';
import {TextareaModule} from 'primeng/textarea';
import {BlobToUrlPipe} from '../../../pipes/blob-to-url.pipe';
import {DialogModule} from 'primeng/dialog';
import {SelectModule} from 'primeng/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {ChipsModule} from 'primeng/chips';
import {MatChipsModule} from '@angular/material/chips';
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

// --- Interfaces for Data Types ---
interface Option {
  name: string;
  value: any;
}

interface Patient {
  id?: string; // Optional for new patient
  mentions?: string[];
  photo?: File | string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string | null;
  age?: number | null;
  gender?: Option | null;
  nationality?: Option | null;
  placeOfBirth?: string | null;
  maritalStatus?: Option | null;
  spokenLanguages?: Option[];
  occupation?: string | null;
  employer?: string | null;
  nationalId?: string | null;
  passportNumber?: string | null;
  socialSecurityNumber?: string | null;
  insuranceProvider?: string | null;
  insuranceNumber?: string | null;
  email?: string | null;
  primaryPhoneNumber?: string | null;
  secondaryPhoneNumber?: string | null;
  address?: string | null;
  relations?: PatientRelation[];
  // Add 'Autres' fields here
  otherField1?: string | null;
  otherField2?: Option | null;
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
  selector: 'app-patient-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
    MultiSelectModule,
    TextareaModule,
    FileUploadModule,
    CheckboxModule,
    InputNumberModule,
    InputMaskModule,
    FloatLabelModule,
    PanelModule,
    ConfirmDialogModule,
    TagModule,
    TableModule,
    BlobToUrlPipe,
    DialogModule,
    SelectModule,
    MatExpansionModule,
    MatIconModule,
    ChipsModule,
    MatChipsModule
  ],
  providers: [MessageService, ConfirmationService, DialogService], // Provide services
  templateUrl: './patient-add.component.html',
  styleUrl: './patient-add.component.css'
})
export class PatientAddComponent implements OnInit, OnDestroy {
  patientForm!: FormGroup; // Use definite assignment assertion
  isSaving: boolean = false; // To disable save button during async ops

  // --- Reference Data (Simulated) ---
  mentionsOptions: Option[] = [
    { name: 'Anonyme', value: 'ANONYMOUS' },
    { name: 'Confidentiel', value: 'CONFIDENTIAL' },
    { name: 'VIP', value: 'VIP' },
  ];

  // genders: Option[] = [
  //   { name: 'Homme', value: 'MALE' },
  //   { name: 'Femme', value: 'FEMALE' },
  //   { name: 'Non-binaire', value: 'NON_BINARY' },
  //   { name: 'Autre', value: 'OTHER' },
  // ];

  // maritalStatuses: Option[] = [
  //   { name: 'Célibataire', value: 'SINGLE' },
  //   { name: 'Marié(e)', value: 'MARRIED' },
  //   { name: 'Divorcé(e)', value: 'DIVORCED' },
  //   { name: 'Veuf(ve)', value: 'WIDOWED' },
  // ];

  // Simulate a larger list for autocomplete
  // nationalities: Option[] = [
  //   { name: 'Afghane', value: 'AF' }, { name: 'Albanaise', value: 'AL' },
  //   { name: 'Algérienne', value: 'DZ' }, { name: 'Allemande', value: 'DE' },
  //   { name: 'Andorrane', value: 'AD' }, { name: 'Angolaise', value: 'AO' },
  //   { name: 'Argentine', value: 'AR' }, { name: 'Arménienne', value: 'AM' },
  //   { name: 'Australienne', value: 'AU' }, { name: 'Autrichienne', value: 'AT' },
  //   { name: 'Azérie', value: 'AZ' }, { name: 'Bahaméenne', value: 'BS' },
  //   // ... add many more nationalities
  //   { name: 'Française', value: 'FR' }, { name: 'Marocaine', value: 'MA' },
  //   { name: 'Espagnole', value: 'ES' },
  // ];
  // filteredNationalities: Option[] = [];

  // Simulate a larger list for autocomplete/multi-select
  spokenLanguagesOptions: Option[] = [
    { name: 'Français', value: 'fr' },
    { name: 'Anglais', value: 'en' },
    { name: 'Espagnol', value: 'es' },
    { name: 'Arabe', value: 'ar' },
    { name: 'Berbère', value: 'ber' },
    // ... add more languages
  ];
  filteredSpokenLanguages: Option[] = [];

  relationTypes: Option[] = [
    { name: 'Parent', value: 'PARENT' },
    { name: 'Enfant', value: 'CHILD' },
    { name: 'Conjoint(e)', value: 'SPOUSE' },
    { name: 'Frère/Sœur', value: 'SIBLING' },
    { name: 'Ami(e)', value: 'FRIEND' },
    { name: 'Autre', value: 'OTHER' },
  ];

  // Simulated list of existing patients for relation search
  existingPatients: Patient[] = [
    { id: 'pat_001', firstName: 'Alice', lastName: 'Dupont', dateOfBirth: new Date(1990, 5, 15) },
    { id: 'pat_002', firstName: 'Bob', lastName: 'Martin', dateOfBirth: new Date(1988, 9, 20) },
    { id: 'pat_003', firstName: 'Charlie', lastName: 'Bernard', dateOfBirth: new Date(2010, 2, 10) },
    // ... more simulated patients
  ];
  filteredExistingPatients: Patient[] = [];


  // --- Photo Upload ---
  maxFileSize: number = 5 * 1024 * 1024; // 5MB in bytes
  uploadedPhoto: File | null = null;


  // --- Relations Management ---
  patientRelations: PatientRelation[] = [];
  displayAddRelationDialog: boolean = false; // To show/hide the add relation form/dialog
  newRelationForm!: FormGroup; // Form for adding a single relation



  // Reference Data (Simulated)
  titles: string[] = ['Mr.', 'Mme', 'Mlle'];
  genders: string[] = ['Homme', 'Femme'];
  maritalStatuses: string[] = ['Célibataire', 'Marié(e)'];
  countries: string[] = ['Maroc', 'France', 'Spain', 'Germany']; // Example countries
  cities: string[] = ['Rabat', 'Casablanca', 'Marrakech', 'Paris', 'Lyon', 'Marseille', 'Madrid', 'Barcelona', 'Berlin', 'Munich']; // Example cities
  nationalities: string[] = ['Marocaine', 'Française', 'Espagnole', 'Allemande']; // Example nationalities
  ethnicities: string[] = ['Caucasien', 'Africain', 'Asiatique']; // Example ethnicities
  occupations: string[] = ['Ingénieur', 'Médecin', 'Enseignant', 'Étudiant']; // Example occupations
  languages: string[] = ['Français', 'Anglais', 'Espagnol', 'Arabe']; // Example languages for autocomplete

  filteredCities: string[] = [];
  filteredNationalities: string[] = [];
  filteredLanguages: string[] = [];



  private destroy$ = new Subject<void>(); // Subject for managing subscriptions

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // public dialogService: DialogService, // If using DynamicDialogService for relation
    // private patientsService: PatientsService // Inject your API service here
  ) { }

  ngOnInit(): void {
    this.initPatientForm();
    this.initNewRelationForm(); // Initialize the relation form

    this.setupValueChangeListeners();
    this.setupAutocompleteFilters();

    // Subscribe to dateOfBirth and age changes to sync them
    // this.patientForm.get('dateOfBirth')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
    //   if (value instanceof Date && !isNaN(value.getTime())) {
    //     // Only update age if dateOfBirth is a valid Date object
    //     this.updateAgeFromDob(value);
    //   } else if (typeof value === 'string' && value) {
    //     // Handle 'YYYY' or 'MMYYYY' input strings
    //     const parsedDate = this.parseDateString(value);
    //     if (parsedDate) {
    //       this.updateAgeFromDob(parsedDate);
    //     } else {
    //       // Clear age if date string is invalid
    //       this.patientForm.get('age')?.setValue(null, { emitEvent: false });
    //     }
    //   } else {
    //     // Clear age if dateOfBirth is null or invalid
    //     this.patientForm.get('age')?.setValue(null, { emitEvent: false });
    //   }
    // });

    // this.patientForm.get('age')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
    //   // Only update dateOfBirth if age is a valid number
    //   if (typeof value === 'number' && value > 0) {
    //     this.updateDobFromAge(value);
    //   } else {
    //     // Clear dateOfBirth if age is null or invalid
    //     this.patientForm.get('dateOfBirth')?.setValue(null, { emitEvent: false });
    //   }
    // });

    // // Set initial filter for nationalities and languages (all of them)
    // this.filteredNationalities = [...this.nationalities];
    // this.filteredSpokenLanguages = [...this.spokenLanguagesOptions];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initPatientForm(): void {
    this.patientForm = this.fb.group({
      // Entête
      mentions: [[]], // MultiSelect starts with empty array
      photo: [null], // To hold the uploaded file object or path

      // Informations générales
      // firstName: ['', [Validators.required, noLeadingTrailingSpacesValidator, Validators.pattern(namePattern)]],
      // lastName: ['', [Validators.required, noLeadingTrailingSpacesValidator, Validators.pattern(namePattern)]],
      // dateOfBirth: [null, Validators.required], // Can be Date object or string ('YYYY', 'MMYYYY') initially
      // age: [null], // Will be a number (years)
      // gender: [null],
      // nationality: [null], // Option object or string
      // placeOfBirth: [''],
      // maritalStatus: [null], // Option object
      // spokenLanguages: [[]], // Array of Option objects
      // occupation: [''],
      // employer: [''],

      // Informations générales 02
      title: [null],
      firstName: ['', [
        Validators.required,
        leadingTrailingSpacesValidator,
        allowedCharactersValidator('-&`_´')
      ]],
      lastName: ['', [
        Validators.required,
        leadingTrailingSpacesValidator,
        allowedCharactersValidator('-&`_´')
      ]],
      alias: [''],
      gender: [{ value: null, disabled: true }], // Disabled as it's calculated
      dateOfBirth: [null, Validators.required],
      age: [{ value: null, disabled: true }], // Disabled initially, enabled for year input if needed
      address: ['', [
        Validators.minLength(5),
        addressSpecialCharactersValidator,
        Validators.pattern('.*[a-zA-Z].*') // Must contain at least one letter
      ]],
      postalCode: ['', [
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9]*$') // Assuming alphanumeric
      ]],
      country: [null],
      city: [{ value: null, disabled: true }], // Disabled initially, enabled and filtered by country
      nationality: [{ value: null, disabled: true }], // Disabled initially, potentially set by country
      maritalStatus: [{ value: null, disabled: true }], // Disabled as it's calculated
      ethnicity: [null],
      occupation: [null],
      spokenLanguages: [[]], // Array for chip select

      // Données administratives
      nationalId: ['', [noLeadingTrailingSpacesValidator]], // Optional, but validate format if entered
      passportNumber: ['', [alphanumericUppercaseNoSpecialValidator]], // Optional, but validate format
      socialSecurityNumber: [''], // Optional
      insuranceProvider: [''], // Optional
      insuranceNumber: [''], // Optional

      // Contacts et Relations
      email: ['', [emailValidator]], // Optional, but validate format if entered
      primaryPhoneNumber: ['', [phoneValidator]], // Optional, but validate format
      secondaryPhoneNumber: ['', [phoneValidator]], // Optional, but validate format
      // address: [''],
      // relations are managed in a separate array and added to the form value on save

      // Autres (Example fields)
      otherField1: [''],
      otherField2: [null], // Example: another dropdown

    });
  }

  setupValueChangeListeners(): void {
    // Title changes -> Update Gender and Marital Status
    this.patientForm.get('title')?.valueChanges.subscribe(value => {
      let gender = null;
      let maritalStatus = null;
      if (value === 'Mr.') {
        gender = 'Homme';
        maritalStatus = 'Marié(e)'; // Assuming Mr. is typically Marié(e) based on provided info context
      } else if (value === 'Mme') {
        gender = 'Femme';
        maritalStatus = 'Marié(e)'; // Assuming Mme is typically Marié(e)
      } else if (value === 'Mlle') {
        gender = 'Femme';
        maritalStatus = 'Célibataire'; // Assuming Mlle is typically Célibataire
      }
      this.patientForm.get('gender')?.setValue(gender);
      this.patientForm.get('maritalStatus')?.setValue(maritalStatus);
    });

    // Date of Birth changes -> Calculate Age
    this.patientForm.get('dateOfBirth')?.valueChanges.subscribe((value: Date | null) => {
      if (value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        this.patientForm.get('age')?.setValue(age);
        // Disable age input when date of birth is entered
        this.patientForm.get('age')?.disable();
      } else {
        this.patientForm.get('age')?.setValue(null);
        // Enable age input when date of birth is cleared
        this.patientForm.get('age')?.enable();
      }
    });

    // Age changes -> Calculate Date of Birth (as 01/01/YYYY)
    // Debounce and filter to avoid infinite loops with dateOfBirth changes
    this.patientForm.get('age')?.valueChanges.pipe(
      debounceTime(300), // Wait for user to finish typing age
      distinctUntilChanged(),
      filter(age => age !== null && age !== undefined && age !== '') // Only proceed if age has a value
    ).subscribe(age => {
      // Only update date of birth if the age field is currently enabled (meaning date of birth was not entered)
      if (this.patientForm.get('age')?.enabled) {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - age;
        const date = new Date(birthYear, 0, 1); // Month is 0-indexed
        // Set value only if it's a valid date
        if (!isNaN(date.getTime())) {
          this.patientForm.get('dateOfBirth')?.setValue(date);
        } else {
          this.patientForm.get('dateOfBirth')?.setValue(null);
        }
      }
    });


    // Country changes -> Filter Cities and potentially set Nationality
    this.patientForm.get('country')?.valueChanges.subscribe(country => {
      this.patientForm.get('city')?.setValue(null); // Clear city when country changes
      if (country) {
        this.patientForm.get('city')?.enable();
        // Simulate filtering cities based on country
        this.filteredCities = this.cities.filter(city =>
          (country === 'Maroc' && ['Rabat', 'Casablanca', 'Marrakech'].includes(city)) ||
          (country === 'France' && ['Paris', 'Lyon', 'Marseille'].includes(city)) ||
          (country === 'Spain' && ['Madrid', 'Barcelona'].includes(city)) ||
          (country === 'Germany' && ['Berlin', 'Munich'].includes(city))
        );

        // Set nationality to "Marocaine" if country is "Maroc", otherwise enable nationality selection
        if (country === 'Maroc') {
          this.patientForm.get('nationality')?.setValue('Marocaine');
          this.patientForm.get('nationality')?.disable();
        } else {
          this.patientForm.get('nationality')?.setValue(null);
          this.patientForm.get('nationality')?.enable();
          // Simulate filtering nationalities (can be more complex based on actual data)
          this.filteredNationalities = this.nationalities.filter(nat =>
              (country === 'Maroc' && nat === 'Marocaine') || // If country is Morocco, only Moroccan is suggested/set
              (country !== 'Maroc' && nat !== 'Marocaine') // If country is not Morocco, Moroccan is not suggested/set
            // More realistic filtering would involve mapping countries to nationalities
          );
          // For simplicity, let's just use all nationalities when country is not Morocco
          this.filteredNationalities = this.nationalities;
        }

      } else {
        this.patientForm.get('city')?.disable();
        this.filteredCities = [];
        this.patientForm.get('nationality')?.disable();
        this.patientForm.get('nationality')?.setValue(null);
        this.filteredNationalities = [];
      }
    });

    // Initialize filtered cities and nationalities based on initial country value if any
    const initialCountry = this.patientForm.get('country')?.value;
    if (initialCountry) {
      // Manually trigger the country change logic on init if there's an initial value
      this.patientForm.get('country')?.updateValueAndValidity({ emitEvent: true });
    } else {
      // If no initial country, ensure city and nationality are disabled
      this.patientForm.get('city')?.disable();
      this.patientForm.get('nationality')?.disable();
    }
  }

  setupAutocompleteFilters(): void {
    // Filter languages for Chip select autocomplete
    this.patientForm.get('spokenLanguages')?.valueChanges.pipe(
      startWith(this.patientForm.get('spokenLanguages')?.value || []),
      debounceTime(200),
      distinctUntilChanged(),
      map(selectedLanguages => {
        // Filter available languages based on what hasn't been selected yet
        return this.languages.filter(lang => !selectedLanguages.includes(lang));
      })
    ).subscribe(filteredLanguages => {
      this.filteredLanguages = filteredLanguages;
    });
  }

  initNewRelationForm(): void {
    this.newRelationForm = this.fb.group({
      type: [null, Validators.required], // Relation type (Option object)
      relatedPatient: [null, Validators.required], // Related patient (Patient object from search)
    });
  }

  // --- Form Control Getters ---
  // get firstNameControl(): AbstractControl | null { return this.patientForm.get('firstName'); }
  // get lastNameControl(): AbstractControl | null { return this.patientForm.get('lastName'); }
  // get dateOfBirthControl(): AbstractControl | null { return this.patientForm.get('dateOfBirth'); }
  // get ageControl(): AbstractControl | null { return this.patientForm.get('age'); }
  // get nationalityControl(): AbstractControl | null { return this.patientForm.get('nationality'); }
  get emailControl(): AbstractControl | null { return this.patientForm.get('email'); }
  get primaryPhoneNumberControl(): AbstractControl | null { return this.patientForm.get('primaryPhoneNumber'); }
  get secondaryPhoneNumberControl(): AbstractControl | null { return this.patientForm.get('secondaryPhoneNumber'); }
  get nationalIdControl(): AbstractControl | null { return this.patientForm.get('nationalId'); }
  get passportNumberControl(): AbstractControl | null { return this.patientForm.get('passportNumber'); }
  get photoControl(): AbstractControl | null { return this.patientForm.get('photo'); }


  // Helper to get individual control for easier access in template
  get titleControl(): AbstractControl | null { return this.patientForm.get('title'); }
  get firstNameControl(): AbstractControl | null { return this.patientForm.get('firstName'); }
  get lastNameControl(): AbstractControl | null { return this.patientForm.get('lastName'); }
  get aliasControl(): AbstractControl | null { return this.patientForm.get('alias'); }
  get genderControl(): AbstractControl | null { return this.patientForm.get('gender'); }
  get dateOfBirthControl(): AbstractControl | null { return this.patientForm.get('dateOfBirth'); }
  get ageControl(): AbstractControl | null { return this.patientForm.get('age'); }
  get addressControl(): AbstractControl | null { return this.patientForm.get('address'); }
  get postalCodeControl(): AbstractControl | null { return this.patientForm.get('postalCode'); }
  get countryControl(): AbstractControl | null { return this.patientForm.get('country'); }
  get cityControl(): AbstractControl | null { return this.patientForm.get('city'); }
  get nationalityControl(): AbstractControl | null { return this.patientForm.get('nationality'); }
  get maritalStatusControl(): AbstractControl | null { return this.patientForm.get('maritalStatus'); }
  get ethnicityControl(): AbstractControl | null { return this.patientForm.get('ethnicity'); }
  get occupationControl(): AbstractControl | null { return this.patientForm.get('occupation'); }
  get spokenLanguagesControl(): AbstractControl | null { return this.patientForm.get('spokenLanguages'); }


  // --- Date/Age Sync Logic ---
  private updateAgeFromDob(dob: Date): void {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    // Update age control without triggering its valueChanges listener again
    this.ageControl?.setValue(age, { emitEvent: false });
  }

  private updateDobFromAge(age: number): void {
    const today = new Date();
    const year = today.getFullYear() - age;
    // Set Date of Birth to Jan 1st of the calculated year
    const dob = new Date(year, 0, 1);
    // Update dateOfBirth control without triggering its valueChanges listener again
    this.dateOfBirthControl?.setValue(dob, { emitEvent: false });
  }

  // Handle manual date string input like YYYY or MMYYYY
  parseDateString(dateString: string): Date | null {
    const trimmedString = dateString.trim();
    let parsedDate: Date | null = null;

    if (/^\d{4}$/.test(trimmedString)) { // YYYY format
      const year = parseInt(trimmedString, 10);
      // Basic validation for a reasonable year range (e.g., not in the future)
      if (year > 1800 && year <= new Date().getFullYear()) {
        parsedDate = new Date(year, 0, 1); // Jan 1st of the year
      }
    } else if (/^\d{6}$/.test(trimmedString)) { // MMYYYY format
      const month = parseInt(trimmedString.substring(0, 2), 10) - 1; // 0-indexed month
      const year = parseInt(trimmedString.substring(2, 6), 10);
      // Validate month and year
      if (month >= 0 && month < 12 && year > 1800 && year <= new Date().getFullYear()) {
        parsedDate = new Date(year, month, 1); // 1st day of the month
      }
    }
    // Return null if parsing failed or date is invalid
    return parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;
  }


  // --- Autocomplete Filtering ---
  searchNationalities(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredNationalities = this.nationalities.filter(nat =>
      nat.toLowerCase().includes(query)
    );
  }

  searchSpokenLanguages(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredSpokenLanguages = this.spokenLanguagesOptions.filter(lang =>
      lang.name.toLowerCase().includes(query)
    );
  }

  searchExistingPatients(event: any): void {
    const query = event.query.toLowerCase();
    // In a real app, this would be an API call: this.patientsService.searchPatients(query)
    this.filteredExistingPatients = this.existingPatients.filter(patient =>
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(query)
    );
  }

  // --- Photo Upload Logic ---
  onPhotoSelect(event: any): void {
    // event.files contains the selected files
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      if (file.size > this.maxFileSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de fichier',
          detail: `La taille du fichier dépasse la limite de ${this.maxFileSize / (1024 * 1024)} Mo.`,
        });
        // Clear the file upload component's state if possible, or handle this server-side
        // For basic mode, you might need to manually clear the input or rely on server validation
        this.uploadedPhoto = null;
        this.patientForm.get('photo')?.setValue(null);
      } else {
        this.uploadedPhoto = file;
        this.patientForm.get('photo')?.setValue(file); // Store the file object
      }
    } else {
      this.uploadedPhoto = null;
      this.patientForm.get('photo')?.setValue(null);
    }
  }

  onPhotoRemove(): void {
    this.uploadedPhoto = null;
    this.patientForm.get('photo')?.setValue(null);
  }

  // --- Relations Management Logic ---
  openAddRelationDialog(): void {
    this.initNewRelationForm(); // Reset the form for a new relation
    this.displayAddRelationDialog = true;
  }

  addRelation(): void {
    this.newRelationForm.markAllAsTouched();
    if (this.newRelationForm.valid) {
      const newRelation: PatientRelation = this.newRelationForm.value;

      // Check if this relation already exists to avoid duplicates in the list
      const isDuplicate = this.patientRelations.some(rel =>
        rel.type?.value === newRelation.type?.value &&
        rel.relatedPatient?.id === newRelation.relatedPatient?.id
      );

      if (isDuplicate) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Alerte',
          detail: 'Cette relation existe déjà pour ce patient.',
        });
        return; // Don't add the duplicate
      }

      this.patientRelations.push(newRelation);
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Relation ajoutée.',
        life: 2000
      });
      this.displayAddRelationDialog = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir les champs obligatoires de la relation.',
        life: 3000
      });
    }
  }

  removeRelation(index: number): void {
    this.patientRelations.splice(index, 1);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Relation supprimée.',
      life: 2000
    });
  }


  // --- Validation Helper ---
  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/images/default-avatar.png';
    }
  }

  isDateInstance(value: any): boolean {
    return value instanceof Date;
  }



  getRelationControl(controlName: string): AbstractControl | null {
    return this.newRelationForm.get(controlName);
  }
  shouldShowRelationError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }


  // --- Save Logic ---
  savePatient(): void {
    this.patientForm.markAllAsTouched(); // Mark all fields as touched to show validation errors

    if (this.patientForm.valid) {
      this.isSaving = true;
      const formValue: Patient = this.patientForm.value;

      // --- Data Transformation and Formatting ---
      // Format the date of birth
      let formattedDate: string | null = null;
      if (formValue.dateOfBirth instanceof Date) {
        if (!isNaN(formValue.dateOfBirth.getTime())) {
          const date = formValue.dateOfBirth;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`; // DD/MM/YYYY
        }
      } else if (typeof formValue.dateOfBirth === 'string' && formValue.dateOfBirth) {
        // This case should ideally be handled by the date/age sync,
        // but as a fallback, try parsing if it's somehow still a string
        const parsedDate = this.parseDateString(formValue.dateOfBirth);
        if(parsedDate) {
          const date = parsedDate;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`;
        }
      }

      // Prepare the data structure for the backend (adjust as per your API)
      const patientData: Patient = {
        mentions: formValue.mentions || [],
        photo: this.uploadedPhoto, // Send the File object or null
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        dateOfBirth: formattedDate, // Send as formatted string
        // age is derived, not usually sent for creation
        gender: formValue.gender, // Send the Option object or just value
        nationality: formValue.nationality, // Send the Option object or just value
        placeOfBirth: formValue.placeOfBirth,
        maritalStatus: formValue.maritalStatus, // Send the Option object or just value
        spokenLanguages: formValue.spokenLanguages, // Array of Option objects or just values
        occupation: formValue.occupation,
        employer: formValue.employer,
        nationalId: formValue.nationalId || null,
        passportNumber: formValue.passportNumber?.toUpperCase() || null, // Ensure uppercase
        socialSecurityNumber: formValue.socialSecurityNumber || null,
        insuranceProvider: formValue.insuranceProvider || null,
        insuranceNumber: formValue.insuranceNumber || null,
        email: formValue.email || null,
        primaryPhoneNumber: formValue.primaryPhoneNumber || null,
        secondaryPhoneNumber: formValue.secondaryPhoneNumber || null,
        address: formValue.address || null,
        // Prepare relations data for backend (send related patient ID and relation type value)
        relations: this.patientRelations.map(rel => ({
          type: rel.type?.value || null,
          relatedPatientId: rel.relatedPatient?.id || null,
          relatedPatient: rel.relatedPatient
        })),
        // Add 'Autres' fields
        otherField1: formValue.otherField1 || null,
        otherField2: formValue.otherField2?.value || null, // Assuming this is a dropdown
      };

      console.log('Saving patient data:', patientData);

      // --- Simulate API Call ---
      // Replace with your actual API service call:
      // this.patientsService.createPatient(patientData).subscribe({
      //   next: (response) => { ... },
      //   error: (error) => { ... },
      //   complete: () => { this.isSaving = false; }
      // });

      // Simulate a successful save after a delay
      setTimeout(() => {
        this.isSaving = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Votre action a été effectuée avec succès.',
          life: 5000, // Keep message longer
        });

        // Option 1: Stay on the form (e.g., for further edits or adding more data)
        // You might want to reset the form or load the saved patient data
        // this.patientForm.reset();
        // this.patientRelations = [];
        // this.uploadedPhoto = null;
        // this.initPatientForm(); // Re-initialize for a new patient

        // Option 2: Redirect to the patient list
        // Example using Angular Router (assuming you have it injected and configured)
        // this.router.navigate(['/patients']);

        // For this example, we'll log success and indicate where to add navigation/reset
        console.log('Patient saved successfully. Implement navigation or form reset.');

      }, 2000); // Simulate 2-second API delay


      // --- Simulate Duplicate Check Error ---
      // Uncomment this block to test duplicate error scenario
      /*
      setTimeout(() => {
        this.isSaving = false;
         // Simulate a duplicate error response from the backend
          const duplicateError = {
              message: "Une ou plusieurs fiches patient similaires ont été trouvées dans le système. Veuillez vérifier les informations avant de poursuivre l’enregistrement."
          };
          this.messageService.add({
            severity: 'warn', // Use warn for alert
            summary: 'Alerte',
            detail: duplicateError.message,
            life: 10000 // Keep alert message longer
          });
           console.warn('Simulated duplicate error');
      }, 2000); // Simulate 2-second API delay
      */


    } else {
      console.log('Form is invalid. Cannot save patient.');
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire.',
        life: 3000
      });
      // Optional: Scroll to the first invalid field (requires DOM manipulation, e.g., Renderer2)
      // this.scrollToFirstInvalidControl();
    }
  }

  // --- Cancel Logic ---
  cancel(): void {
    if (this.patientForm.dirty || this.patientRelations.length > 0 || this.uploadedPhoto) {
      // Check if any part of the form or related data is dirty
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir annuler cette action ? Toutes les modifications non enregistrées seront perdues.',
        header: 'Confirmation d\'annulation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
          // User confirmed, navigate away or close dialog
          console.log('Action cancelled. Implement navigation away.');
          // Example using Angular Router:
          // this.router.navigate(['/patients']); // Navigate to patient list
        },
        reject: () => {
          // User cancelled the confirmation, do nothing
        }
      });
    } else {
      // No changes, just navigate away or close dialog
      console.log('No changes. Implement navigation away.');
      // Example using Angular Router:
      // this.router.navigate(['/patients']); // Navigate to patient list
    }
  }

  // Helper to get relation type name for display
  getRelationTypeName(relation: PatientRelation): string {
    return relation.type?.name || 'Inconnu';
  }

  // Helper to get related patient name for display
  getRelatedPatientName(relation: PatientRelation): string {
    if (relation.relatedPatient) {
      // Format as "Nom Prénom (DD/MM/YYYY)" if DOB is available
      if (relation.relatedPatient.dateOfBirth instanceof Date && !isNaN(relation.relatedPatient.dateOfBirth.getTime())) {
        const date = relation.relatedPatient.dateOfBirth;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${relation.relatedPatient.lastName} ${relation.relatedPatient.firstName} (${day}/${month}/${year})`;
      }
      // Otherwise, just show Nom Prénom
      return `${relation.relatedPatient.lastName} ${relation.relatedPatient.firstName}`;
    }
    return 'Patient inconnu';
  }

  protected readonly HTMLImageElement = HTMLImageElement;
}
