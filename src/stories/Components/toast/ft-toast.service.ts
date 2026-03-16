import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  severity: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FtToastService {
  private toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  getToasts() {
    return this.toasts.asReadonly();
  }

  add(message: Omit<ToastMessage, 'id'>) {
    const id = this.counter++;
    const toast: ToastMessage = { ...message, id };
    this.toasts.update(current => [...current, toast]);

    if (message.life !== 0) {
      setTimeout(() => {
        this.remove(id);
      }, message.life || 3000);
    }
  }

  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
