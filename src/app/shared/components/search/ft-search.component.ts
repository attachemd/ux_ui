import { Component, input, output, model } from '@angular/core';
import { FTInputComponent } from '../../../../stories/inputs/input/ft.input.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FTInputComponent, FormsModule],
  template: `
    <ft-input
      variant="flat"
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
export class FTSearchComponent {
  placeholder = input('Rechercher...');
  value = model('');
  search = output<string>();

  onValueChange(newValue: string) {
    this.value.set(newValue);
    this.search.emit(newValue);
  }
}
