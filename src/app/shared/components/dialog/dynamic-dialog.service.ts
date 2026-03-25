import { Injectable, signal, Type } from '@angular/core';

export interface DynamicDialogConfig {
  data?: any;
  header?: string;
  width?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FtDynamicDialogService {
  private dialogState = signal<{ component: Type<any>, config: DynamicDialogConfig, resolve: (result: any) => void } | null>(null);

  get state() {
    return this.dialogState.asReadonly();
  }

  open<T>(component: Type<T>, config: DynamicDialogConfig = {}): Promise<any> {
    return new Promise((resolve) => {
      this.dialogState.set({ component, config, resolve });
    });
  }

  close(result?: any) {
    const currentState = this.dialogState();
    if (currentState) {
      currentState.resolve(result);
      this.dialogState.set(null);
    }
  }
}
