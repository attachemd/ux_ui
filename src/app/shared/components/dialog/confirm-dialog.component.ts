import { Component, inject } from '@angular/core';

import { FtConfirmDialogService } from './confirm-dialog.service';
import { FtButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'ft-confirm-dialog',
  standalone: true,
  imports: [FtButtonComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
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
