// input-showcase.component.ts
import { Component, HostBinding, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FTInputComponent } from '../input/ft.input.component';

@Component({
  selector: 'app-input-showcase',
  templateUrl: './input-all-cases.component.html',
  styleUrls: ['./input-all-cases.component.css'],
  standalone: true,
  imports: [CommonModule, FTInputComponent]
})
export class InputAllCasesComponent {
  @HostBinding('class') class = 'showcase';

  @Input() isPrefixIconClass = true;
  @Input() prefixIconClass = '';
  @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'default';
  @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
  @Input() isDescription = false;
  @Input() showContent = false;
  @Input() startContent?: string;
  @Input() endContent?: string;

  @Input() isSuffix1IconClass = true;
  @Input() suffix1IconClass = 'visibility';
  @Input() isSuffix2IconClass = true;
  @Input() suffix2IconClass = 'search';
  @Input() inputType: 'text' | 'password' = 'text';

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
}
