/**
 * Patient List Component
 * 
 * A comprehensive Angular component for displaying and managing patient data in a table format.
 * Features include sorting, filtering, pagination, column visibility toggling, and expandable details.
 * 
 * Key Features:
 * - Dynamic table with 30+ patient data columns
 * - Real-time search and filtering
 * - Multi-column sorting
 * - Pagination with configurable page sizes
 * - Column visibility management
 * - Expandable dialogs for detailed information
 * - Overflow detection for long content
 * - Theme integration
 * - Responsive design
 * 
 * @component
 * @selector ft-patient-list
 * @standalone true
 */
import { AfterViewInit, Component, ElementRef, signal, computed, viewChild, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { OverflowDetectDirective } from '../../../directives/overflow-detect.directive';
import { StatusPillsComponent } from './status-pills/status-pills.component';
import { FtButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { FtIconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { SelectOption } from '../../../shared/components/select/select/select.component';
import { FtPaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../../../types/patient.type';

// Reusable Sub-components
import { FtTableComponent } from '../../../shared/components/table/table.component';
import { FtTableCellDirective } from '../../../shared/components/table/table-cell.directive';
import { FtTableExpansionDirective } from '../../../shared/components/table/table-expansion.directive';
import { FtTableHeaderComponent } from '../../../shared/components/table/table-header/table-header.component';
import { TableColumn } from '../../../shared/components/table/table-column.interface';

/**
 * Interface for view configuration options
 */
interface View {
  name: string;
  id: string;
}

// --- DATA CONSTANTS ---
// These constants provide mock data for demonstration and testing purposes

/** Available patient statuses */
const STATUSES: string[] = ['ANONYME', 'CONFIDENTIEL', 'VIP'];

/** Available patient titles (courtesy titles) */
const TITLES: string[] = ['M', 'Mme', 'Mlle', 'Enf', 'Autre'];

/** Available gender options */
const SEXES: string[] = ['MALE', 'FEMALE', 'OTHER'];

/** Available countries (currently only Morocco) */
const COUNTRIES: string[] = ['Maroc'];

/** Cities mapped by country */
const CITIES: { [key: string]: string[] } = {
  'Maroc': ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Safi', 'El Jadida', 'Nador', 'Settat']
};

/** Common street names for address generation */
const STREET_NAMES: string[] = [
  'Boulevard Zerktouni', 'Avenue Mohammed V', 'Rue Tarik Ibn Ziad', 'Boulevard d\'Anfa',
  'Rue de la Liberté', 'Avenue des FAR', 'Boulevard Hassan II', 'Rue Moussa Ibn Noussair'
];

/** Available spoken languages */
const LANGUAGES: string[] = ['Français', 'Anglais', 'Espagnol', 'Arabe', 'Berbère'];

/** Marital status options */
const MARITAL_STATUSES: string[] = ['SINGLE', 'MARRIED'];

/** Ethnicity options */
const ETHNICITIES: string[] = ['CAUCASIAN', 'ARAB', 'AFRICAN', 'OTHER'];

/** Profession/occupation options */
const PROFESSIONS: string[] = ['ENGINEER', 'DOCTOR', 'TEACHER', 'OTHER'];

/** First names for random patient generation */
const FIRST_NAMES: string[] = ['Anas', 'Hamza', 'Yassine', 'Amine', 'Omar', 'Youssef', 'Mehdi', 'Meriem', 'Salma', 'Fatine', 'Zineb', 'Khadija', 'Leila', 'Kenza', 'Ghita', 'Sofia', 'Adam', 'Rayane', 'Ines', 'Nour', 'Sara'];

/** Last names for random patient generation */
const LAST_NAMES: string[] = ['El Amrani', 'Bennani', 'Tazi', 'Mansouri', 'Alaoui', 'El Idrissi', 'Belkhayat', 'Chraibi', 'Guessous', 'Filali', 'Zahraoui', 'El Fassi', 'Berrada', 'Slaoui', 'Benjelloun', 'Mezouar', 'Haddad', 'El Mansouri'];

/** Employer options */
const EMPLOYERS: string[] = ['OCP Group', 'Maroc Telecom', 'Attijariwafa Bank', 'BCP', 'Royal Air Maroc', 'BMCE Bank', 'CDG', 'LabelVie', 'Cosumar', 'Auto Hall'];

/** Insurance provider options */
const INSURANCES: string[] = ['Saham Assurance', 'Wafa Assurance', 'RMA Watanya', 'AXA Assurance Maroc', 'Mutuelle Agricole Marocaine', 'AtlantaSanad'];

@Component({
  selector: 'ft-patient-list',
  standalone: true,
  imports: [
    OverflowDetectDirective, StatusPillsComponent,
    FtButtonComponent, FtIconButtonComponent,
    FtPaginationComponent, FormsModule, ReactiveFormsModule,
    FtTableHeaderComponent,
    FtTableComponent, FtTableCellDirective, FtTableExpansionDirective
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {
  /** Math object reference for template usage */
  protected readonly Math = Math;

  // --- TABLE CONFIGURATION ---

  /**
   * Complete list of all available table columns with their configuration
   * Each column defines:
   * - key: Unique identifier for the column
   * - label: Display name shown in header
   * - type: Data type or special handling (checkbox, date, custom, actions)
   * - width: Column width with optional min/max constraints
   * - sticky: Whether column sticks to left/right edge when scrolling
   * - sortable: Whether column can be sorted
   */
  allTableColumns: TableColumn[] = [
    { key: 'select', label: '', type: 'checkbox', width: '32px', sticky: 'left', sortable: false },
    { key: 'id', label: 'ID', width: '100px', sticky: 'left', minWidth: '100px', maxWidth: '100px' },
    { key: 'status', label: 'Statut', type: 'custom', width: '160px', minWidth: '160px', maxWidth: '160px' },
    { key: 'title', label: 'Titre', width: '100px' },
    { key: 'firstName', label: 'Prénom', width: '200px' },
    { key: 'lastName', label: 'Nom', width: '200px' },
    { key: 'dateOfBirth', label: 'Date de naissance', type: 'date', width: '180px' },
    { key: 'age', label: 'Âge', width: '90px' },
    { key: 'sexe', label: 'Sexe', width: '100px' },
    { key: 'email', label: 'E-mail', width: '240px' },
    { key: 'primaryPhoneNumber', label: 'Tél. Principal', width: '150px' },
    { key: 'secondaryPhoneNumber', label: 'Tél. Secondaire', width: '160px' },
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

  /**
   * Signal tracking which columns are currently visible
   * Default includes all columns for comprehensive view
   */
  visibleColumnKeys = signal<string[]>([
    'select', 'id', 'status', 'title', 'firstName', 'lastName', 'dateOfBirth', 'age', 'sexe',
    'email', 'primaryPhoneNumber', 'secondaryPhoneNumber', 'country', 'city', 'postalCode',
    'address', 'maritalStatus', 'nationality', 'ethnicity', 'occupation', 'spokenLanguages',
    'emergencyContactPhone', 'nationalId', 'passportNumber', 'placeOfBirth', 'employer',
    'socialSecurityNumber', 'insuranceProvider', 'insuranceNumber', 'otherField1', 'otherField2', 'actions'
  ]);

  /**
   * Computed property that filters allTableColumns to only include visible columns
   * This ensures the table only renders columns the user wants to see
   */
  columns = computed(() => {
    return this.allTableColumns.filter(col => this.visibleColumnKeys().includes(col.key));
  });

  // --- DATA STATE MANAGEMENT ---

  /** Signal containing the complete list of patients */
  users = signal<Patient[]>([]);
  
  /** Signal for the current search/filter text */
  filter = signal<string>('');
  
  /** Signal for the current column being sorted */
  sortKey = signal<keyof Patient>('id');
  
  /** Signal for the current sort direction (ascending/descending) */
  sortDirection = signal<'asc' | 'desc'>('asc');

  /** Signal tracking selected patient IDs (for bulk operations) */
  selection = signal<Set<string>>(new Set());

  // --- VIEW CONFIGURATION ---

  /** Available view modes for the table */
  views: SelectOption[] = [
    { label: 'Vue standard', value: 'standard' },
    { label: 'Vue compacte', value: 'compact' },
    { label: 'Vue détaillée', value: 'detailed' }
  ];
  
  /** Form control for the currently selected view */
  selectedView = new FormControl('standard');

  // --- PAGINATION STATE ---

  /** Current page index (0-based) */
  currentPage = signal(0);
  
  /** Number of items per page */
  pageSize = signal(10);

  /** Available page size options */
  pageSizeOptions: SelectOption[] = [
    { label: '5 par page', value: 5 },
    { label: '10 par page', value: 10 },
    { label: '25 par page', value: 25 },
    { label: '50 par page', value: 50 },
  ];

  // --- ADVANCED FILTER OPTIONS ---

  /** City filter options (dynamically generated from CITIES constant) */
  cityOptions: SelectOption[] = [
    { value: 'all', label: 'Toutes' },
    ...CITIES['Maroc'].map(c => ({ value: c.toLowerCase(), label: c }))
  ];

  /** Country filter options */
  countryOptions: SelectOption[] = [
    { value: 'all', label: 'Tous' },
    { value: 'maroc', label: 'Maroc' },
    { value: 'france', label: 'France' },
    { value: 'belgique', label: 'Belgique' }
  ];

  /** Gender filter options */
  genderOptions: SelectOption[] = [
    { value: 'all', label: 'Tous' },
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' },
    { value: 'other', label: 'Autre' }
  ];

  /** Currently selected cities for filtering */
  selectedCities = signal<string[]>(['all']);
  
  /** Currently selected countries for filtering */
  selectedCountries = signal<string[]>(['all']);
  
  /** Currently selected genders for filtering */
  selectedGenders = signal<string[]>(['all']);

  // --- OVERFLOW DETECTION ---

  /**
   * Signal tracking which table cells have overflowing content
   * Key format: `${rowId}:${columnKey}`
   * Value: boolean indicating if content overflows
   */
  overflowMap = signal<Map<string, boolean>>(new Map());

  // --- THEME INTEGRATION ---

  /** Injected theme service for styling consistency */
  themeService = inject(ThemeService);

  /** Computed property for accessing component theme configuration */
  compConfig = computed(() => this.themeService.config().components);

  /**
   * Helper method to get variant styling for components
   * @param component - Component name to get variant for
   * @returns The variant configuration object
   */
  getVariant(component: string): any {
    return this.compConfig()[component]?.variant;
  }

  // --- CONSTRUCTOR & INITIALIZATION ---

  /**
   * Component constructor - initializes with mock patient data
   * Creates 100 random patients for demonstration purposes
   */
  constructor() {
    const initialUsers = Array.from({ length: 100 }, (_, k) => createNewPatient(k + 1));
    this.users.set(initialUsers);
  }

  // --- COMPUTED DATA PROPERTIES ---

  /**
   * Computed property that filters and sorts patients based on current state
   * Applies search filter and sorting to the complete patient list
   */
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

  /**
   * Computed property that returns the current page of patients
   * Applies pagination to the filtered and sorted list
   */
  paginatedUsers = computed(() => {
    const startIndex = this.currentPage() * this.pageSize();
    return this.filteredUsers().slice(startIndex, startIndex + this.pageSize());
  });

  /**
   * Computed property that calculates total number of pages
   * Based on filtered user count and current page size
   */
  totalPages = computed(() => {
    return Math.ceil(this.filteredUsers().length / this.pageSize());
  });

  // --- EVENT HANDLERS ---

  /**
   * Handles search input changes
   * @param value - New search text
   */
  onSearchChange(value: string) {
    this.filter.set(value);
    this.currentPage.set(0); // Reset to first page when searching
  }

  /**
   * Handles column sorting changes
   * @param event - Sorting event containing column key and direction
   */
  onSortChange(event: { key: string, direction: 'asc' | 'desc' }) {
    this.sortKey.set(event.key as keyof Patient);
    this.sortDirection.set(event.direction);
  }

  /**
   * Handles patient selection changes
   * @param newSelection - New set of selected patient IDs
   */
  onSelectionChange(newSelection: Set<string>) {
    this.selection.set(newSelection);
  }

  /**
   * Handles view mode changes
   * @param viewId - ID of the selected view mode
   */
  onViewChange(viewId: string) {
    console.log('View changed to:', viewId);
  }

  /**
   * Toggles column visibility
   * @param key - Column key to toggle
   */
  toggleColumn(key: string) {
    const current = this.visibleColumnKeys();
    if (current.includes(key)) {
      this.visibleColumnKeys.set(current.filter(k => k !== key));
    } else {
      this.visibleColumnKeys.set([...current, key]);
    }
  }

  /**
   * Handles page navigation
   * @param page - New page index (0-based)
   */
  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  /**
   * Handles page size changes
   * @param size - New number of items per page
   */
  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0); // Reset to first page when changing page size
  }

  // --- OVERFLOW & CUSTOM CELL LOGIC ---

  /**
   * Handles overflow detection changes for table cells
   * @param rowId - ID of the row
   * @param column - Column key
   * @param overflows - Whether content overflows
   */
  onOverflowChange(rowId: string, column: string, overflows: boolean): void {
    const key = `${rowId}:${column}`;
    const current = this.overflowMap();
    if (current.get(key) !== overflows) {
      const next = new Map(current);
      next.set(key, overflows);
      this.overflowMap.set(next);
    }
  }

  /**
   * Checks if a specific cell has overflowing content
   * @param rowId - ID of the row
   * @param column - Column key
   * @returns Boolean indicating if content overflows
   */
  isOverflowing(rowId: string, column: string): boolean {
    return this.overflowMap().get(`${rowId}:${column}`) ?? false;
  }

  /**
   * Normalizes status data to always return an array of strings
   * Handles various status formats (array, comma-separated string, single value)
   * @param status - Raw status data
   * @returns Array of status strings
   */
  getStatuses(status: any): string[] {
    if (!status) return [];
    if (Array.isArray(status)) return status;
    if (typeof status === 'string' && status.includes(',')) return status.split(',').map(s => s.trim());
    return [status];
  }

  // --- DIALOG MANAGEMENT ---

  /** Currently active dialog type (status, address, or languages) */
  activeExpandType: 'status' | 'address' | 'languages' | null = null;
  
  /** Currently active patient row for dialog display */
  activeExpandRow: Patient | null = null;

  /** Reference to the dialog element in the template */
  readonly expandDialog = viewChild.required<ElementRef<HTMLDialogElement>>('expandDialog');

  /**
   * Opens the expandable dialog for detailed information
   * @param row - Patient data for the row
   * @param col - Type of information to display (status, address, languages)
   * @param event - Mouse event for positioning
   */
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

        // Position dialog below the clicked element, or above if it would go off-screen
        let topPos = rect.bottom + 8;
        if (topPos + dialogHeight > window.innerHeight) {
          topPos = rect.top - dialogHeight - 8;
        }
        dialog.style.top = `${topPos}px`;

        // Position dialog aligned with clicked element, adjusting if it would go off-screen
        let leftPos = rect.left;
        if (leftPos + 320 > window.innerWidth) {
          leftPos = window.innerWidth - 340;
        }
        dialog.style.left = `${leftPos}px`;
      }

      dialog.showModal();
    }
  }

  /**
   * Closes the expandable dialog and resets state
   */
  closeDialog() {
    const expandDialog = this.expandDialog();
    if (expandDialog) {
      expandDialog.nativeElement.close();
    }
    this.activeExpandRow = null;
    this.activeExpandType = null;
  }

  /**
   * Handles clicks outside the dialog to close it
   * @param event - Mouse event
   */
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

// --- UTILITY FUNCTIONS ---

/**
 * Creates a new random patient for demonstration purposes
 * @param id - Patient ID number
 * @returns A new Patient object with randomized data
 */
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

