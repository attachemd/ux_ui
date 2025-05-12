import { Component } from '@angular/core';
import {medicalHistoryEntities, notes} from '../../fake-data/medical-history.fake';

@Component({
  selector: 'app-medical-history',
  imports: [],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.css'
})
export class MedicalHistoryComponent {

  protected readonly comments = notes;
  protected readonly medicalHistoryEntities = medicalHistoryEntities;
}
