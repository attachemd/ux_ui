import { Component, HostBinding, Input } from '@angular/core';

import { FtChipsComponent } from '../chips/chips.component';

@Component({
  selector: 'app-chips-all-cases',
  templateUrl: './chips-all-cases.component.html',
  styleUrls: ['./chips-all-cases.component.css'],
  standalone: true,
  imports: [FtChipsComponent]
})
export class ChipsAllCasesComponent {
  @HostBinding('class') class = 'showcase';

  @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'outlined';
  @Input() isDescription = false;
  @Input() isClearable = true;

  states: Array<'rest' | 'hover' | 'press' | 'focus' | 'readonly' | 'disabled' | 'invalid' | 'with-description'> = [
    'rest',
    'hover',
    'press',
    'focus',
    'readonly',
    'disabled',
    'invalid',
    'with-description',
  ];

  labelPlacements: Array<'label-inside' | 'label-outside' | 'label-outside-left'> = [
    'label-inside',
    'label-outside',
    'label-outside-left',
  ];

  items = ['toutes les 8h', 'Après chaque repas', 'À jeun', 'Avant le coucher'];
}

