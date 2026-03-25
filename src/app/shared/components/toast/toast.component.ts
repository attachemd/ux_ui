import { Component, inject } from '@angular/core';

import { FtToastService } from './toast.service';

@Component({
  selector: 'ft-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class FtToastComponent {
  toastService = inject(FtToastService);
  toasts = this.toastService.getToasts();

  remove(id: number) {
    this.toastService.remove(id);
  }

  getIcon(severity: string): string {
    switch (severity) {
      case 'success': return 'check_circle';
      case 'info': return 'info';
      case 'warn': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }
}
