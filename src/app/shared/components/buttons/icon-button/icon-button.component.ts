import { Component, ViewEncapsulation, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ft-icon-button',
  templateUrl: './icon-button.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./icon-button.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtIconButtonComponent {
  // @Input() isLabel = false;
  readonly isLabel = input(true);
  readonly label = input<string>();
  readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
  readonly color = input<'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('primary');
  readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('flat');
  readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');
  readonly state = input<'rest' | 'hover' | 'press' | 'focus' | 'disabled'>('rest');
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly iconClass = input('face');

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

