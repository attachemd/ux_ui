import { Injectable, signal } from '@angular/core';

export interface ConfirmDialogOptions {
  header?: string;
  message?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  accept?: () => void;
  reject?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class FtConfirmDialogService {
  private config = signal<ConfirmDialogOptions | null>(null);

  getConfig() {
    return this.config.asReadonly();
  }

  confirm(options: ConfirmDialogOptions) {
    this.config.set(options);
  }

  accept() {
    const config = this.config();
    if (config?.accept) config.accept();
    this.config.set(null);
  }

  reject() {
    const config = this.config();
    if (config?.reject) config.reject();
    this.config.set(null);
  }

  close() {
    this.config.set(null);
  }
}
