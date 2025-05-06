import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { ThemeSwitcherComponent } from './components/theme-switcher.component';
import {
  MedicalConditionStatus,
  MedicalHistoryEntity,
  Note,
} from './types/medical-history.type';
import {
  medicalHistoryEntities,
  notes,
} from './fake-data/medical-history.fake';
import { ButtonModule } from 'primeng/button';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {MedicalConditionDialogComponent} from './dialogs/medical-condition-dialog/medical-condition-dialog.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    ThemeSwitcherComponent,
    ButtonModule,
    DynamicDialogModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'uxui';

  @ViewChild('mainContent') parent!: ElementRef<HTMLElement>;
  @ViewChild('tabBodyContent') child!: ElementRef<HTMLElement>;


  private touchStartY = 0;
  private previousTouchY = 0;
  private listeners: (() => void)[] = [];

  medicalHistoryEntities: MedicalHistoryEntity[] = medicalHistoryEntities;

  comments: Note[] = notes;

  ref: DynamicDialogRef | undefined;

  constructor(private renderer: Renderer2, public dialogService: DialogService, public messageService: MessageService) {}

  showDialog(entity: MedicalHistoryEntity) {
    // Use the dialogComponent property from the entity to open the correct component
    if (!entity.dialogComponent) {
      console.error(`No dialog component defined for entity: ${entity.title}`);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Could not open dialog for ${entity.title}` });
      return;
    }
    this.ref = this.dialogService.open(MedicalConditionDialogComponent , {
      header: 'Ajouter un antécédent médical',
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

  ngAfterViewInit(): void {
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  private setupEventListeners(): void {
    // Wheel event for desktop
    const wheelListener = this.renderer.listen(
      this.child?.nativeElement,
      'wheel',
      (e: WheelEvent) => this.handleWheel(e)
    );
    this.listeners.push(wheelListener);

    // Touch events for mobile
    const touchStartListener = this.renderer.listen(
      this.child.nativeElement,
      'touchstart',
      (e: TouchEvent) => this.handleTouchStart(e)
    );
    this.listeners.push(touchStartListener);

    const touchMoveListener = this.renderer.listen(
      this.child.nativeElement,
      'touchmove',
      (e: TouchEvent) => this.handleTouchMove(e)
    );
    this.listeners.push(touchMoveListener);
  }

  private removeEventListeners(): void {
    this.listeners.forEach((removeListener) => removeListener());
  }

  private handleWheel(e: WheelEvent): void {
    const delta = e.deltaY;
    const direction = delta > 0 ? 'down' : 'up';
    if (this.shouldScrollParent(direction)) {
      e.preventDefault();
      this.parent.nativeElement.scrollTop += delta;
    }
  }

  private handleTouchStart(e: TouchEvent): void {
    this.touchStartY = e.touches[0].clientY;
    this.previousTouchY = this.touchStartY;
  }

  private handleTouchMove(e: TouchEvent): void {
    const currentY = e.touches[0].clientY;
    const delta = this.previousTouchY - currentY;
    this.previousTouchY = currentY;
    const direction = delta > 0 ? 'down' : 'up';

    if (this.shouldScrollParent(direction)) {
      e.preventDefault();
      this.parent.nativeElement.scrollTop += delta;
    }
  }

  private shouldScrollParent(direction: 'up' | 'down'): boolean {
    const parent = this.parent.nativeElement;
    const isAtTop = parent.scrollTop <= 0;
    const isAtBottom =
      parent.scrollTop + parent.clientHeight >= parent.scrollHeight;

    if (direction === 'down') {
      return !isAtBottom; // Scroll parent if not at bottom
    } else {
      return !isAtTop; // Scroll parent if not at top
    }
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
