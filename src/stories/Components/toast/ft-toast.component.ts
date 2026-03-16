import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtToastService } from './ft-toast.service';

@Component({
  selector: 'ft-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ft-toast.component.html',
  styleUrl: './ft-toast.component.css'
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
