import {Component, ElementRef, HostBinding, ViewChild} from '@angular/core';
import {MedicalHistoryEntity, Note} from '../../../../types/medical-history.type';
import {FtDynamicDialogService} from '../../../../../stories/Components/dialog/ft-dynamic-dialog.service';
import {FtToastService} from '../../../../../stories/Components/toast/ft-toast.service';
import {medicalHistoryEntities, notes} from '../../../../fake-data/medical-history.fake';

import {FtIconButtonComponent} from '../../../../../stories/Buttons/icon-button/ft.icon.button.component';
import {FTBadgeComponent} from '../../../../../stories/Components/badge/ft-badge.component';

@Component({
  selector: 'app-medical-history',
  imports: [FtIconButtonComponent, FTBadgeComponent],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.css'
})
export class MedicalHistoryComponent {
  @HostBinding('class') class = 'ft-panel lg:h-auto lg:overflow-auto! tab-body-container';
  @ViewChild('tabBodyContent') child!: ElementRef<HTMLElement>;
  medicalHistoryEntities: MedicalHistoryEntity[] = medicalHistoryEntities;
  comments: Note[] = notes;

  constructor(public elementRef: ElementRef,
    public dialogService: FtDynamicDialogService,
              public toastService: FtToastService,) {
  }

  showDialog(entity: MedicalHistoryEntity) {
    if (!entity.dialogComponent) {
      console.error(`No dialog component defined for entity: ${entity.title}`);
      this.toastService.add({ severity: 'error', summary: 'Error', detail: `Could not open dialog for ${entity.title}`, life: 3000 });
      return;
    }
    this.dialogService.open(entity.dialogComponent);
  }


  /**
   * Finds a comment by its ID.
   * @param id The ID of the comment to find.
   * @returns The comment object if found, otherwise undefined.
   */
  getCommentById(id: number): Note | undefined {
    return this.comments.find((comment) => comment.id === id);
  }
}

