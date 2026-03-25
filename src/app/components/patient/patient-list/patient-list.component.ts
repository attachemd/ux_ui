import { AfterViewInit, Component, ElementRef, signal, computed, viewChild } from '@angular/core';
import { OverflowDetectDirective } from '../../../directives/overflow-detect.directive';
import { StatusPillsComponent } from './status-pills/status-pills.component';
import { FtButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { FtIconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { SelectOption } from '../../../shared/components/select/select/select.component';
import { FtPaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../../../types/patient.type';

// Reusable Sub-components
import { FtSearchComponent } from '../../../shared/components/search/search.component';
import { FtFilterComponent } from '../../../shared/components/filter/filter.component';
import { FtViewsManagerComponent } from '../../../shared/components/views-manager/views-manager.component';
import { FtColumnManagerComponent } from '../../../shared/components/column-manager/column-manager.component';
import { FtTableComponent } from '../../../shared/components/table/table.component';
import { FtTableCellDirective } from '../../../shared/components/table/table-cell.directive';
import { FtTableExpansionDirective } from '../../../shared/components/table/table-expansion.directive';
import { TableColumn } from '../../../shared/components/table/table-column.interface';

interface View {
  name: string;
  id: string;
}

/** Constants used to fill up our data base. */
const STATUSES: string[] = ['ANONYME', 'CONFIDENTIEL', 'VIP'];
const TITLES: string[] = ['M', 'Mme', 'Mlle', 'Enf', 'Autre'];
const SEXES: string[] = ['MALE', 'FEMALE', 'OTHER'];
const COUNTRIES: string[] = ['Maroc'];
const CITIES: { [key: string]: string[] } = {
  'Maroc': ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Safi', 'El Jadida', 'Nador', 'Settat']
};
const STREET_NAMES: string[] = [
  'Boulevard Zerktouni', 'Avenue Mohammed V', 'Rue Tarik Ibn Ziad', 'Boulevard d\'Anfa',
  'Rue de la Liberté', 'Avenue des FAR', 'Boulevard Hassan II', 'Rue Moussa Ibn Noussair'
];
const LANGUAGES: string[] = ['Français', 'Anglais', 'Espagnol', 'Arabe', 'Berbère'];
const MARITAL_STATUSES: string[] = ['SINGLE', 'MARRIED'];
const ETHNICITIES: string[] = ['CAUCASIAN', 'ARAB', 'AFRICAN', 'OTHER'];
const PROFESSIONS: string[] = ['ENGINEER', 'DOCTOR', 'TEACHER', 'OTHER'];

const FIRST_NAMES: string[] = ['Anas', 'Hamza', 'Yassine', 'Amine', 'Omar', 'Youssef', 'Mehdi', 'Meriem', 'Salma', 'Fatine', 'Zineb', 'Khadija', 'Leila', 'Kenza', 'Ghita', 'Sofia', 'Adam', 'Rayane', 'Ines', 'Nour', 'Sara'];
const LAST_NAMES: string[] = ['El Amrani', 'Bennani', 'Tazi', 'Mansouri', 'Alaoui', 'El Idrissi', 'Belkhayat', 'Chraibi', 'Guessous', 'Filali', 'Zahraoui', 'El Fassi', 'Berrada', 'Slaoui', 'Benjelloun', 'Mezouar', 'Haddad', 'El Mansouri'];
const EMPLOYERS: string[] = ['OCP Group', 'Maroc Telecom', 'Attijariwafa Bank', 'BCP', 'Royal Air Maroc', 'BMCE Bank', 'CDG', 'LabelVie', 'Cosumar', 'Auto Hall'];
const INSURANCES: string[] = ['Saham Assurance', 'Wafa Assurance', 'RMA Watanya', 'AXA Assurance Maroc', 'Mutuelle Agricole Marocaine', 'AtlantaSanad'];

@Component({
  selector: 'ft-patient-list',
  standalone: true,
  imports: [
    OverflowDetectDirective, StatusPillsComponent,
    FtButtonComponent, FtIconButtonComponent,
    FtPaginationComponent, FormsModule, ReactiveFormsModule,
    FtSearchComponent, FtFilterComponent, FtViewsManagerComponent, FtColumnManagerComponent,
    FtTableComponent, FtTableCellDirective, FtTableExpansionDirective
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
  protected readonly Math = Math;

  allTableColumns: TableColumn[] = [
    { key: 'select', label: '', type: 'checkbox', width: '36px', sticky: 'left', sortable: false },
    { key: 'id', label: 'ID', width: '100px', sticky: 'left', minWidth: '100px', maxWidth: '100px' },
    { key: 'status', label: 'Statut', type: 'custom', width: '160px', minWidth: '160px', maxWidth: '160px' },
    { key: 'title', label: 'Titre', width: '100px' },
    { key: 'firstName', label: 'Prénom', width: '200px' },
    { key: 'lastName', label: 'Nom', width: '200px' },
    { key: 'dateOfBirth', label: 'Date de naissance', type: 'date', width: '160px' },
    { key: 'age', label: 'Âge', width: '70px' },
    { key: 'sexe', label: 'Sexe', width: '80px' },
    { key: 'email', label: 'E-mail', width: '240px' },
    { key: 'primaryPhoneNumber', label: 'Tél. Principal', width: '150px' },
    { key: 'secondaryPhoneNumber', label: 'Tél. Secondaire', width: '150px' },
    { key: 'country', label: 'Pays', width: '150px' },
    { key: 'city', label: 'Ville', width: '150px' },
    { key: 'postalCode', label: 'CP', width: '100px' },
    { key: 'address', label: 'Adresse', type: 'custom', width: '300px' },
    { key: 'maritalStatus', label: 'État civil', width: '150px' },
    { key: 'nationality', label: 'Nationalité', width: '150px' },
    { key: 'ethnicity', label: 'Ethnie', width: '150px' },
    { key: 'occupation', label: 'Profession', width: '180px' },
    { key: 'spokenLanguages', label: 'Langues', type: 'custom', width: '200px' },
    { key: 'emergencyContactPhone', label: 'Tél. Urgence', width: '150px' },
    { key: 'nationalId', label: 'CIN', width: '150px' },
    { key: 'passportNumber', label: 'Passeport', width: '150px' },
    { key: 'placeOfBirth', label: 'Lieu de Naiss.', width: '180px' },
    { key: 'employer', label: 'Employeur', width: '150px' },
    { key: 'socialSecurityNumber', label: 'NSS', width: '150px' },
    { key: 'insuranceProvider', label: 'Assurance', width: '180px' },
    { key: 'insuranceNumber', label: 'N° Assurance', width: '150px' },
    { key: 'otherField1', label: 'Autre 1', width: '150px' },
    { key: 'otherField2', label: 'Autre 2', width: '150px' },
    { key: 'actions', label: 'Actions', type: 'actions', width: '100px', sticky: 'right', sortable: false }
  ];

  visibleColumnKeys = signal<string[]>([
    'select', 'id', 'status', 'title', 'firstName', 'lastName', 'dateOfBirth', 'age', 'sexe',
    'email', 'primaryPhoneNumber', 'secondaryPhoneNumber', 'country', 'city', 'postalCode',
    'address', 'maritalStatus', 'nationality', 'ethnicity', 'occupation', 'spokenLanguages',
    'emergencyContactPhone', 'nationalId', 'passportNumber', 'placeOfBirth', 'employer',
    'socialSecurityNumber', 'insuranceProvider', 'insuranceNumber', 'otherField1', 'otherField2', 'actions'
  ]);

  columns = computed(() => {
    return this.allTableColumns.filter(col => this.visibleColumnKeys().includes(col.key));
  });

  users = signal<Patient[]>([]);
  filter = signal<string>('');
  sortKey = signal<keyof Patient>('id');
  sortDirection = signal<'asc' | 'desc'>('asc');

  selection = signal<Set<string>>(new Set());

  views: SelectOption[] = [
    { label: 'Vue standard', value: 'standard' },
    { label: 'Vue compacte', value: 'compact' },
    { label: 'Vue détaillée', value: 'detailed' }
  ];
  selectedView = new FormControl('standard');

  currentPage = signal(0);
  pageSize = signal(10);

  pageSizeOptions: SelectOption[] = [
    { label: '5 par page', value: 5 },
    { label: '10 par page', value: 10 },
    { label: '25 par page', value: 25 },
    { label: '50 par page', value: 50 },
  ];

  overflowMap = signal<Map<string, boolean>>(new Map());

  constructor() {
    const initialUsers = Array.from({ length: 100 }, (_, k) => createNewPatient(k + 1));
    this.users.set(initialUsers);
  }

  // --- Computed Data ---

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

  // --- Event Handlers ---

  onSearchChange(value: string) {
    this.filter.set(value);
    this.currentPage.set(0);
  }

  onSortChange(event: { key: string, direction: 'asc' | 'desc' }) {
    this.sortKey.set(event.key as keyof Patient);
    this.sortDirection.set(event.direction);
  }

  onSelectionChange(newSelection: Set<string>) {
    this.selection.set(newSelection);
  }

  onViewChange(viewId: string) {
    console.log('View changed to:', viewId);
  }

  toggleColumn(key: string) {
    const current = this.visibleColumnKeys();
    if (current.includes(key)) {
      this.visibleColumnKeys.set(current.filter(k => k !== key));
    } else {
      this.visibleColumnKeys.set([...current, key]);
    }
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
  }

  // --- Overflow & Custom Cell Logic ---

  onOverflowChange(rowId: string, column: string, overflows: boolean): void {
    const key = `${rowId}:${column}`;
    const current = this.overflowMap();
    if (current.get(key) !== overflows) {
      const next = new Map(current);
      next.set(key, overflows);
      this.overflowMap.set(next);
    }
  }

  isOverflowing(rowId: string, column: string): boolean {
    return this.overflowMap().get(`${rowId}:${column}`) ?? false;
  }

  getStatuses(status: any): string[] {
    if (!status) return [];
    if (Array.isArray(status)) return status;
    if (typeof status === 'string' && status.includes(',')) return status.split(',').map(s => s.trim());
    return [status];
  }

  // --- Dialog logic ---

  activeExpandType: 'status' | 'address' | 'languages' | null = null;
  activeExpandRow: Patient | null = null;

  readonly expandDialog = viewChild.required<ElementRef<HTMLDialogElement>>('expandDialog');

  openDialog(row: Patient, col: 'status' | 'address' | 'languages', event: MouseEvent) {
    if (event) event.stopPropagation();
    this.activeExpandRow = row;
    this.activeExpandType = col;

    const expandDialog = this.expandDialog();
    if (expandDialog) {
      const dialog = expandDialog.nativeElement;
      const target = event.currentTarget as HTMLElement;

      if (target) {
        const rect = target.getBoundingClientRect();
        const dialogHeight = 200; // Estimated height if not measured yet

        let topPos = rect.bottom + 8;
        if (topPos + dialogHeight > window.innerHeight) {
          topPos = rect.top - dialogHeight - 8;
        }
        dialog.style.top = `${topPos}px`;

        let leftPos = rect.left;
        if (leftPos + 320 > window.innerWidth) {
          leftPos = window.innerWidth - 340;
        }
        dialog.style.left = `${leftPos}px`;
      }

      dialog.showModal();
    }
  }

  closeDialog() {
    const expandDialog = this.expandDialog();
    if (expandDialog) {
      expandDialog.nativeElement.close();
    }
    this.activeExpandRow = null;
    this.activeExpandType = null;
  }

  onDialogClick(event: MouseEvent) {
    const expandDialog = this.expandDialog();
    if (!expandDialog) return;
    const dialog = expandDialog.nativeElement;
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
      && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this.closeDialog();
    }
  }
}

/** Builds and returns a new Patient. */
function createNewPatient(id: number): Patient {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const shuffledStatuses = [...STATUSES].sort(() => 0.5 - Math.random());
  const status = shuffledStatuses.slice(0, Math.random() > 0.85 ? 2 : 1) as any;
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
    address: `${Math.floor(Math.random() * 100)}, ${STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)]}`,
    maritalStatus: MARITAL_STATUSES[Math.floor(Math.random() * MARITAL_STATUSES.length)],
    nationality: 'Marocaine',
    ethnicity: ETHNICITIES[Math.floor(Math.random() * ETHNICITIES.length)],
    occupation: PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)],
    spokenLanguages: [LANGUAGES[3], LANGUAGES[0], LANGUAGES[Math.floor(1 + Math.random() * (LANGUAGES.length - 2))]],
    emergencyContactPhone: `+212 6${Math.floor(10000000 + Math.random() * 90000000)}`,
    nationalId: `ID${Math.floor(100000 + Math.random() * 900000)}`,
    passportNumber: `PS${Math.floor(100000 + Math.random() * 900000)}`,
    secondaryPhoneNumber: `+212 5${Math.floor(10000000 + Math.random() * 90000000)}`,
    placeOfBirth: city,
    employer: EMPLOYERS[Math.floor(Math.random() * EMPLOYERS.length)],
    socialSecurityNumber: `SSN-${Math.floor(1000000 + Math.random() * 9000000)}`,
    insuranceProvider: INSURANCES[Math.floor(Math.random() * INSURANCES.length)],
    insuranceNumber: `INS-${Math.floor(1000000 + Math.random() * 9000000)}`,
    otherField1: 'Note additionnelle',
    otherField2: null
  };
}

