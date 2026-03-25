import { Component, HostBinding, ViewEncapsulation, ChangeDetectorRef, input } from '@angular/core';


@Component({
  selector: 'ft-tab',
  template: `<ng-content></ng-content>`,
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.Emulated,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class FtTabComponent {
  readonly label = input<string>('');
  readonly value = input<any>(null);
  readonly icon = input<string>();
  readonly disabled = input<boolean>(false);

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
