import {Component, Input, ViewEncapsulation, input} from '@angular/core';
import { NgClass } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ft-button',
  templateUrl: './button.component.html',
  imports: [
    NgClass,
    FormsModule
],
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtButtonComponent {
  // @Input() isLabel = false;
  @Input() isLabel = true;
  readonly label = input<string>();
  readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
  readonly color = input<'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('primary');
  readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('flat');
  readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');
  readonly state = input<'rest' | 'hover' | 'press' | 'focus' | 'disabled'>('rest');

  readonly isPrefixIconClass = input(false);
  @Input() prefixIconClass = 'person'; // For icon libraries that use classes

  readonly isSuffixIconClass = input(false);
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
    return classes[this.radius()] || 'rounded-md';
  }


}

