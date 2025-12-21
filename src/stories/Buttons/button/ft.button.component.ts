import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ft-button',
  templateUrl: './ft.button.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./ft.button.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtButtonComponent {
  // @Input() isLabel = false;
  @Input() isLabel = true;
  @Input() label?: string;
  @Input() size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';
  @Input() color: 'primary'|'secondary'|'tertiary'|'success'|'warning'|'danger' = 'primary';
  @Input() variant: 'flat'|'faded'|'outlined'|'ghost' = 'flat';
  @Input() radius: 'none-radius'|'xs-radius'|'sm-radius'|'md-radius'|'lg-radius'|'full-radius' = 'md-radius';
  @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'disabled'= 'rest';
  @Input() disabled = false;

  @Input() isPrefixIconClass = false;
  @Input() prefixIconClass = 'person'; // For icon libraries that use classes

  @Input() isSuffixIconClass = true;
  @Input() suffixIconClass = 'face';

  get radiusClasses(): string {
    const classes = {
      'none-radius': 'rounded-none',
      'xs-radius': 'rounded-sm',
      'sm-radius': 'rounded-md',
      'md-radius': 'rounded-lg',
      'lg-radius': 'rounded-xl',
      'full-radius': 'rounded-full'
    };
    return classes[this.radius] || 'rounded-md';
  }


}
