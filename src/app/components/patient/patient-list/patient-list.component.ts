import {AfterViewInit, Component, ElementRef, ViewChild, signal, computed} from '@angular/core';
import {NgIf, NgFor, DatePipe} from '@angular/common';
import {FTInputComponent} from '../../../../stories/inputs/input/ft.input.component';
import {FtButtonComponent} from '../../../../stories/Buttons/button/ft.button.component';
import {FtIconButtonComponent} from '../../../../stories/Buttons/icon-button/ft.icon.button.component';
import {FtCheckboxComponent} from '../../../../stories/checkbox/ft.checkbox.component';
import {FTSelectComponent, SelectOption} from '../../../../stories/select/select/ft.select.component';
import {FTPaginationComponent} from '../../../../stories/pagination/ft.pagination.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Patient} from '../../../types/patient.type';

interface View {
  name: string;
  id: string;
}

/** Constants used to fill up our data base. */
const STATUSES: string[] = ['ANONYME', 'CONFIDENTIEL', 'VIP'];
const TITLES: string[] = ['M', 'Mme', 'Mlle', 'Enf', 'Autre'];
const SEXES: string[] = ['MALE', 'FEMALE', 'OTHER'];
const COUNTRIES: string[] = ['Maroc', 'France', 'Spain', 'Germany'];
const CITIES: { [key: string]: string[] } = {
  'Maroc': ['Casablanca', 'Rabat', 'Marrakech'],
  'France': ['Paris', 'Lyon', 'Marseille'],
  'Spain': ['Madrid', 'Barcelona'],
  'Germany': ['Berlin', 'Munich']
};
const LANGUAGES: string[] = ['Français', 'Anglais', 'Espagnol', 'Arabe', 'Berbère'];
const MARITAL_STATUSES: string[] = ['SINGLE', 'MARRIED'];
const ETHNICITIES: string[] = ['CAUCASIAN', 'ARAB', 'AFRICAN', 'OTHER'];
const PROFESSIONS: string[] = ['ENGINEER', 'DOCTOR', 'TEACHER', 'OTHER'];

const FIRST_NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
const LAST_NAMES: string[] = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bertrand', 'Roux'];
@Component({
  selector: 'app-patient-list',
  imports: [
    NgIf, NgFor, DatePipe,
    FTInputComponent, FtButtonComponent, FtIconButtonComponent, FtCheckboxComponent,
    FTSelectComponent, FTPaginationComponent, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
  protected readonly Math = Math;
  displayedColumns: string[] = [
    'select', 'id', 'status', 'title', 'firstName', 'lastName', 'dateOfBirth', 'age', 'sexe', 
    'email', 'primaryPhoneNumber', 'secondaryPhoneNumber', 'country', 'city', 'postalCode', 
    'address', 'maritalStatus', 'nationality', 'ethnicity', 'occupation', 'spokenLanguages', 
    'emergencyContactPhone', 'nationalId', 'passportNumber', 'placeOfBirth', 'employer', 
    'socialSecurityNumber', 'insuranceProvider', 'insuranceNumber', 'otherField1', 'otherField2'
  ];
  
  users = signal<Patient[]>([]);
  filter = signal<string>('');
  sortKey = signal<keyof Patient>('id');
  sortDirection = signal<'asc' | 'desc'>('asc');
  
  pageSize = signal<number>(10);
  currentPage = signal<number>(0);
  
  pageSizeOptions: SelectOption[] = [
    { label: '5 par page', value: 5 },
    { label: '10 par page', value: 10 },
    { label: '25 par page', value: 25 },
    { label: '50 par page', value: 50 },
  ];
  
  selection = signal<Set<string>>(new Set());

  filteredUsers = computed(() => {
    const filterValue = this.filter().toLowerCase();
    const sorted = [...this.users()].filter(user => 
      user.firstName.toLowerCase().includes(filterValue) || 
      user.lastName.toLowerCase().includes(filterValue) || 
      (user.id && user.id.toLowerCase().includes(filterValue)) ||
      (user.email && user.email.toLowerCase().includes(filterValue))
    );

    const key = this.sortKey();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;

    return sorted.sort((a, b) => {
      const valA = (a[key] ?? '') as any;
      const valB = (b[key] ?? '') as any;
      return valA < valB ? -dir : valA > valB ? dir : 0;
    });
  });

  paginatedUsers = computed(() => {
    const startIndex = this.currentPage() * this.pageSize();
    return this.filteredUsers().slice(startIndex, startIndex + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredUsers().length / this.pageSize());
  });

  pageOptions = computed<SelectOption[]>(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => ({
      label: `Page ${i + 1}`,
      value: i
    }));
  });

  views: SelectOption[] | undefined;
  selectedView = new FormControl<any>(null);

  constructor() {
    const initialUsers = Array.from({length: 100}, (_, k) => createNewPatient(k + 1));
    this.users.set(initialUsers);
    this.selectedView.setValue('1');
    this.views = [
      { label: 'Vue standard', value: '1' },
      { label: 'Compact', value: '2' },
      { label: 'Date de naissance en premier', value: '3'},
      { label: 'Filtrer par ville', value: '11'},
    ];
  }

  onSearchChange(value: string) {
    this.filter.set(value.trim());
    this.currentPage.set(0); // Reset to first page on search
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
  }

  isAllSelected() {
    return this.selection().size === this.filteredUsers().length && this.filteredUsers().length > 0;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.set(new Set());
    } else {
      this.selection.set(new Set(this.filteredUsers().map(u => u.id!)));
    }
  }

  toggleRow(row: Patient) {
    const newSelection = new Set(this.selection());
    if (row.id) {
      if (newSelection.has(row.id)) {
        newSelection.delete(row.id);
      } else {
        newSelection.add(row.id);
      }
      this.selection.set(newSelection);
    }
  }

  isSelected(row: Patient) {
    return !!row.id && this.selection().has(row.id);
  }

  setSort(key: keyof Patient) {
    if (this.sortKey() === key) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
  }
}

/** Builds and returns a new Patient. */
function createNewPatient(id: number): Patient {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)] as any;
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];
  const sexe = SEXES[Math.floor(Math.random() * SEXES.length)];
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  const city = CITIES[country][Math.floor(Math.random() * CITIES[country].length)];
  const birthDate = new Date(1950 + Math.random() * 70, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
  
  return {
    id: `PAT-${id.toString().padStart(4, '0')}`,
    status: status,
    title: title,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: birthDate,
    age: new Date().getFullYear() - birthDate.getFullYear(),
    sexe: sexe,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    primaryPhoneNumber: `+212 6${Math.floor(10000000 + Math.random() * 90000000)}`,
    country: country,
    city: city,
    postalCode: Math.floor(10000 + Math.random() * 90000).toString(),
    address: `${Math.floor(Math.random() * 100)}, Rue des Fleurs`,
    maritalStatus: MARITAL_STATUSES[Math.floor(Math.random() * MARITAL_STATUSES.length)],
    nationality: country === 'Maroc' ? 'Marocaine' : 'Étrangère',
    ethnicity: ETHNICITIES[Math.floor(Math.random() * ETHNICITIES.length)],
    occupation: PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)],
    spokenLanguages: [LANGUAGES[0], LANGUAGES[Math.floor(1 + Math.random() * (LANGUAGES.length - 1))]],
    emergencyContactPhone: `+212 6${Math.floor(10000000 + Math.random() * 90000000)}`,
    nationalId: `ID${Math.floor(100000 + Math.random() * 900000)}`,
    passportNumber: `PS${Math.floor(100000 + Math.random() * 900000)}`,
    secondaryPhoneNumber: `+212 5${Math.floor(10000000 + Math.random() * 90000000)}`,
    placeOfBirth: city,
    employer: 'Entreprise ABC',
    socialSecurityNumber: `SSN-${Math.floor(1000000 + Math.random() * 9000000)}`,
    insuranceProvider: 'Assurance XYZ',
    insuranceNumber: `INS-${Math.floor(1000000 + Math.random() * 9000000)}`,
    otherField1: 'Note additionnelle',
    otherField2: null
  };
}

