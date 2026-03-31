import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FtTableHeaderComponent } from '../../../shared/components/table/table-header/table-header.component';
import { FtTableComponent } from '../../../shared/components/table/table.component';
import { FtTableCellDirective } from '../../../shared/components/table/table-cell.directive';
import { FtPaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { FtButtonComponent } from '../../../shared/components/buttons/button/button.component';
import { SelectOption } from '../../../shared/components/select/select/select.component';
import { DICOMStudy, DICOMSeries } from '../../../models/study.interface';
import { TableColumn } from '../../../shared/components/table/table-column.interface';

@Component({
  selector: 'app-study-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FtTableHeaderComponent,
    FtTableComponent,
    FtTableCellDirective,
    FtPaginationComponent,
    FtButtonComponent
  ],
  templateUrl: './study-list.component.html',
  styleUrl: './study-list.component.css'
})
export class StudyListComponent {
  // Mock Data
  studies = signal<DICOMStudy[]>(this._generateMockData());

  // Filter Options
  modalityOptions: SelectOption[] = [
    { value: 'all', label: 'Toutes' },
    { value: 'CT', label: 'CT' },
    { value: 'MR', label: 'MR' },
    { value: 'DX', label: 'X-Ray' },
    { value: 'US', label: 'Ultrasound' }
  ];

  statusOptions: SelectOption[] = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'en attente', label: 'En attente' },
    { value: 'en cours', label: 'En cours' },
    { value: 'à validé', label: 'À validé' },
    { value: 'à signer', label: 'À signer' },
    { value: 'validé', label: 'Validé' },
    { value: 'signé', label: 'Signé' }
  ];

  dateOptions: SelectOption[] = [
    { value: 'all', label: 'Toute la période' },
    { value: 'today', label: 'Aujourd\'hui' },
    { value: 'yesterday', label: 'Hier' },
    { value: 'week', label: '7 derniers jours' }
  ];

  selectedStatuses = signal<string[]>(['all']);
  selectedModalities = signal<string[]>(['all']);
  selectedDates = signal<string[]>(['all']);
  selectedStudyIds = signal<Set<string>>(new Set());

  // Table Columns
  columns = signal<TableColumn[]>([
    { key: 'select', type: 'checkbox', label: '', sticky: 'left', width: '36px' },
    { key: 'patientId', label: 'ID Patient', sortable: true, width: '100px' },
    { key: 'status', label: 'Statut', sortable: true, width: '100px' },
    { key: 'patientName', label: 'Nom du patient', sortable: true, width: '180px' },
    { key: 'gender', label: 'Sexe', sortable: true, width: '60px' },
    { key: 'birthDate', label: 'Date de naissance', sortable: true, width: '230px' },
    { key: 'accessionNumber', label: 'Numéro d\'accès', sortable: true, width: '120px' },
    { key: 'studyDescription', label: 'Description', sortable: true, width: '220px' },
    { key: 'seriesCount', label: 'Séries', sortable: true, width: '80px' },
    { key: 'studyDateTime', label: 'Date et heure', sortable: true, width: '150px' },
    { key: 'referringPhysician', label: 'Médecin référent', sortable: true, width: '150px' },
    { key: 'facility', label: 'Centre', sortable: true, width: '250px' },
    { key: 'actions', label: 'Actions', sortable: false, sticky: 'right', width: '200px' }
  ]);

  // UI State
  filter = signal('');
  currentPage = signal(0);
  pageSize = signal(25);
  sortKey = signal<string>('studyDate');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Computed Data
  filteredStudies = computed(() => {
    const search = this.filter().toLowerCase();
    const statuses = this.selectedStatuses();
    const modalities = this.selectedModalities();
    const dates = this.selectedDates();

    let data = this.studies();

    // 1. Search Filter
    if (search) {
      data = data.filter(s =>
        s.patientName.toLowerCase().includes(search) ||
        s.patientId.toLowerCase().includes(search) ||
        s.studyDescription.toLowerCase().includes(search)
      );
    }

    // 2. Status Filter
    if (!statuses.includes('all')) {
      data = data.filter(s => s.status && statuses.includes(s.status));
    }

    // 3. Modality Filter
    if (!modalities.includes('all')) {
      data = data.filter(s => modalities.includes(s.modality));
    }

    // 4. Date Filter (Basic mockup logic based on studyDate string)
    if (!dates.includes('all')) {
      const todayStr = new Date().toISOString().split('T')[0];
      // Note: In a real app, we'd do proper date comparison
      if (dates.includes('today')) {
        data = data.filter(s => s.studyDate === todayStr);
      }
    }

    return data.sort((a: any, b: any) => {
      const field = this.sortKey();
      const dir = this.sortDirection() === 'asc' ? 1 : -1;
      return a[field] > b[field] ? dir : -dir;
    });
  });

  paginatedStudies = computed(() => {
    const start = this.currentPage() * this.pageSize();
    return this.filteredStudies().slice(start, start + this.pageSize());
  });

  // Handlers
  onSearch(query: string) {
    this.filter.set(query);
    this.currentPage.set(0);
  }

  onSort(event: { key: string, direction: 'asc' | 'desc' }) {
    this.sortKey.set(event.key);
    this.sortDirection.set(event.direction);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
  }

  onSelectionChange(selection: Set<string>) {
    this.selectedStudyIds.set(selection);
  }

  // Mock Series Data for Expansion
  getSeries(studyId: string): DICOMSeries[] {
    return [
      { id: 's1', seriesNumber: 1, modality: 'CT', description: 'Scout', instancesCount: 1 },
      { id: 's2', seriesNumber: 2, modality: 'CT', description: 'Lung 1mm', instancesCount: 160 },
      { id: 's3', seriesNumber: 3, modality: 'CT', description: 'Soft Tissue 3mm', instancesCount: 159 }
    ];
  }

  private _generateMockData(): DICOMStudy[] {
    const lastNames = ['ALAMI', 'BENNANI', 'CHRAIBI', 'EL IDRISSI', 'MANSOURI', 'ZOUHRI', 'Tazi', 'Fassi', 'Berrada', 'Guezouri', 'Belkhayat', 'Serghini'];
    const firstNamesM = ['Ahmed', 'Youssef', 'Mehdi', 'Omar', 'Hamza', 'Karim', 'Amine', 'Hassan', 'Mohamed', 'Driss'];
    const firstNamesF = ['Fatima', 'Khadija', 'Leila', 'Salma', 'Meriem', 'Zineb', 'Imane', 'Ghita', 'Yasmine', 'Sanaa'];
    const descriptions = ['CT POUMON', 'ECHO-MAMMOGRAPHIE', 'MR CERVEAU', 'XR THORAX', 'US ABDOMINAL', 'CT ABDOMEN/PELVIS', 'MR COLONNE LUMBAIRE'];
    const facilities = ['Centre Hospitalier Ibn Sina', 'Clinique Internationale', 'Hôpital Militaire', 'Centre de Radiologie Rabat', 'Imagerie Médicale Casa'];
    const physicians = ['Dr. Benjelloun', 'Dr. Amrani', 'Dr. Saidi', 'Dr. Alaoui', 'Dr. Bakri'];
    const statuses = ['en attente', 'en cours', 'à validé', 'à signer', 'validé', 'signé'];

    return Array.from({ length: 100 }, (_, i) => {
      const isMale = Math.random() > 0.5;
      const firstName = isMale ? firstNamesM[Math.floor(Math.random() * firstNamesM.length)] : firstNamesF[Math.floor(Math.random() * firstNamesF.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const modality = ['CT', 'MR', 'DX', 'US'][Math.floor(Math.random() * 4)];

      return {
        id: (i + 1).toString(),
        patientName: `${lastName}^${firstName.toUpperCase()}`,
        patientId: `P${10000 + i}`,
        birthDate: `${1950 + Math.floor(Math.random() * 60)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        gender: isMale ? 'M' : 'F',
        accessionNumber: `ACC${20000 + i}`,
        studyDate: `2026-03-${String(26 - Math.floor(i / 10)).padStart(2, '0')}`,
        studyTime: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        studyDescription: descriptions[Math.floor(Math.random() * descriptions.length)],
        referringPhysician: physicians[Math.floor(Math.random() * physicians.length)],
        facility: facilities[Math.floor(Math.random() * facilities.length)],
        modality: modality,
        seriesCount: 1 + Math.floor(Math.random() * 10),
        instancesCount: 1 + Math.floor(Math.random() * 1200),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    });
  }
}
