import { Routes } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { PatientListComponent } from './components/patient/patient-list/patient-list.component';
import { PatientItemComponent } from './components/patient/patient-item/patient-item.component';
import { PatientDetailsComponent } from './components/patient/patient-item/patient-details/patient-details.component';
import { MedicalHistoryComponent } from './components/patient/patient-item/medical-history/medical-history.component';
import { PatientAddComponent } from './components/patient/patient-add/patient-add.component';
import { MedicalHistoryStatusComponent } from './components/medical-history-status/medical-history-status.component';
import { StudyListComponent } from './components/study/study-list/study-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patient' }, // Default route
  { path: 'studies', component: StudyListComponent },
  {
    path: 'patient', component: PatientComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: PatientListComponent },
      { path: 'add', component: PatientAddComponent },
      {
        path: ':id', component: PatientItemComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'details' },
          { path: 'details', component: PatientDetailsComponent },
          { path: 'medical-history', component: MedicalHistoryComponent },
        ],
      },
    ],
  },
  { path: 'medical-history-status', component: MedicalHistoryStatusComponent },
];

