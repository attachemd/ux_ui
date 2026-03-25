import { Component, input, output, model } from '@angular/core';
import { FtInputComponent } from '../inputs/input/input.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ft-search',
  standalone: true,
  imports: [FtInputComponent, FormsModule],
  template: `
    <ft-input
      [variant]="variant()"
      size="sm-size"
      radius="sm-radius"
      [placeholder]="placeholder()"
      prefixIconClass="search"
      [isPrefixIconClass]="true"
      [ngModel]="value()"
      (ngModelChange)="onValueChange($event)"
      [isClearable]="true"
      class="search-input-field">
    </ft-input>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .search-input-field {
      width: 100%;
    }
  `]
})
export class FtSearchComponent {
  placeholder = input('Rechercher...');
  variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('flat');
  value = model('');
  search = output<string>();

  onValueChange(newValue: string) {
    this.value.set(newValue);
    this.search.emit(newValue);
  }
}
