import { Component, inject } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { FtDynamicDialogService } from './ft-dynamic-dialog.service';
import { FtIconButtonComponent } from '../../Buttons/icon-button/ft.icon.button.component';

@Component({
  selector: 'ft-dynamic-dialog',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet, FtIconButtonComponent],
  template: `
    <div *ngIf="state() as dialog" class="dialog-backdrop" (click)="close()">
      <div class="dialog-container" [style.width]="dialog.config.width || '600px'" (click)="$event.stopPropagation()">
        <div class="dialog-header">
          <span class="header-text">{{ dialog.config.header }}</span>
          <ft-icon-button iconClass="close" variant="ghost" size="sm-size" (click)="close()"></ft-icon-button>
        </div>
        <div class="dialog-content">
          <ng-container *ngComponentOutlet="dialog.component; inputs: { dialogData: dialog.config.data }"></ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(4px);
    }
    .dialog-container {
      background: var(--ft-color-background-primary);
      border-radius: var(--radius-2xl);
      box-shadow: var(--box-shadow-dialog);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .dialog-header {
      padding: var(--ft-unit-400) var(--ft-unit-600);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--ft-color-dark-alpha-primary);
    }
    .header-text {
      font-size: var(--text-lg);
      font-weight: 500;
      color: var(--ft-color-text-primary);
    }
    .dialog-content {
      padding: var(--ft-unit-600);
      overflow-y: auto;
    }
  `]
})
export class FtDynamicDialogComponent {
  private dialogService = inject(FtDynamicDialogService);
  state = this.dialogService.state;

  close() {
    this.dialogService.close();
  }
}
