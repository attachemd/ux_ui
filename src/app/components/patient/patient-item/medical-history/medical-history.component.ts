import {Component, ElementRef, HostBinding, viewChild} from '@angular/core';
import {MedicalHistoryEntity, Note} from '../../../../types/medical-history.type';
import {FtDynamicDialogService} from '../../../../shared/components/dialog/dynamic-dialog.service';
import {FtToastService} from '../../../../shared/components/toast/toast.service';
import {medicalHistoryEntities, notes} from '../../../../fake-data/medical-history.fake';

import {FtIconButtonComponent} from '../../../../shared/components/buttons/icon-button/icon-button.component';
import {FtBadgeComponent} from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'ft-medical-history',
  imports: [FtIconButtonComponent, FtBadgeComponent],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.css'
})
export class MedicalHistoryComponent {
  @HostBinding('class') class = 'ft-panel lg:h-auto lg:overflow-auto! tab-body-container';
  readonly child = viewChild.required<ElementRef<HTMLElement>>('tabBodyContent');
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

