import {Component, ElementRef, HostBinding, ViewChild} from '@angular/core';
import {MedicalHistoryEntity, Note} from '../../../../types/medical-history.type';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {medicalHistoryEntities, notes} from '../../../../fake-data/medical-history.fake';

@Component({
  selector: 'app-medical-history',
  imports: [],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.css'
})
export class MedicalHistoryComponent {
  @HostBinding('class') class = 'ft-panel lg:h-auto lg:!overflow-auto tab-body-container';
  @ViewChild('tabBodyContent') child!: ElementRef<HTMLElement>;
  medicalHistoryEntities: MedicalHistoryEntity[] = medicalHistoryEntities;
  comments: Note[] = notes;

  ref: DynamicDialogRef | undefined;

  constructor(public elementRef: ElementRef,
    public dialogService: DialogService,
              public messageService: MessageService,) {
  }

  showDialog(entity: MedicalHistoryEntity) {
    // Use the dialogComponent property from the entity to open the correct component
    if (!entity.dialogComponent) {
      console.error(`No dialog component defined for entity: ${entity.title}`);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Could not open dialog for ${entity.title}` });
      return;
    }
    this.ref = this.dialogService.open(entity.dialogComponent , {
      header: `Ajouter - ${entity.title}`,
      focusOnShow: entity.focusOnShow ?? true,
      modal: true,
      dismissableMask: true,
      transitionOptions: 'ease',
    });

    this.ref.onClose.subscribe((data: any) => {
      let summary_and_detail;
      if (data) {
        const buttonType = data?.buttonType;
        summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
      } else {
        summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
      }
      this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
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
