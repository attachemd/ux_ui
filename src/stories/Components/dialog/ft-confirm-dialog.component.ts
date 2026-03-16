import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtConfirmDialogService } from './ft-confirm-dialog.service';
import { FtButtonComponent } from '../../Buttons/button/ft.button.component';

@Component({
  selector: 'ft-confirm-dialog',
  standalone: true,
  imports: [CommonModule, FtButtonComponent],
  templateUrl: './ft-confirm-dialog.component.html',
  styleUrl: './ft-confirm-dialog.component.css'
})
export class FtConfirmDialogComponent {
  dialogService = inject(FtConfirmDialogService);
  config = this.dialogService.getConfig();

  accept() {
    this.dialogService.accept();
  }

  reject() {
    this.dialogService.reject();
  }
}
