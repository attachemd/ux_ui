import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ft-input',
  templateUrl: './ft.input.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./ft.input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FTInputComponent {
  // @Input() isLabel = false;
  @Input() label?: string;
  @Input() size: 'sm'|'md'|'lg' = 'md';
  @Input() color: 'default'|'primary'|'secondary' = 'default';
  @Input() variant: 'flat'|'bordered'|'faded'|'underlined' = 'bordered';
  @Input() radius: 'none'|'sm'|'md'|'lg'|'full' = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() placeholder?: string;
  @Input() description?: string;
  @Input() errorMessage?: string;
  @Input() content?: string;

  @Input() prefixIconClass = ''; // For icon libraries that use classes
  @Input() suffix1IconClass = 'icon-close';
  @Input() suffix2IconClass = 'icon-arrow-down';

  @Input() isClearable = false;
  value = '';
  clear() { this.value = ''; }

  get radiusClasses(): string {
    const classes = {
      'none': 'rounded-none',
      'sm': 'rounded-sm',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'full': 'rounded-full'
    };
    return classes[this.radius] || 'rounded-md';
  }
}
