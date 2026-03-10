import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ft-tab',
  template: `<ng-content></ng-content>`,
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class FTabComponent {
  @Input() label: string = '';
  @Input() value: any = null;
  @Input() icon?: string;
  @Input() disabled: boolean = false;

  @HostBinding('style.display') get display() {
    return this.active ? 'block' : 'none';
  }

  private _active: boolean = false;
  get active(): boolean { return this._active; }
  set active(val: boolean) {
    if (this._active !== val) {
      this._active = val;
      this.cdr.markForCheck();
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }
}
