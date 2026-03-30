import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ft-icon-button',
  standalone: true,
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
  readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost' | 'icon'>('flat');
  readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');
  readonly state = input<'rest' | 'hover' | 'press' | 'focus' | 'disabled'>('rest');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly popovertarget = input<string>();
  readonly popovertargetaction = input<'toggle' | 'show' | 'hide'>('toggle');

  readonly iconClass = input('face');

  /**
   * Computed Tailwind radius classes based on the radius input signal.
   * Maps design tokens (e.g. 'md-radius') to utility classes.
   */
  readonly radiusClasses = computed(() => {
    const classes: Record<string, string> = {
      'none-radius': 'rounded-none',
      'xs-radius': 'rounded-sm',
      'sm-radius': 'rounded-md',
      'md-radius': 'rounded-lg',
      'lg-radius': 'rounded-xl',
      'full-radius': 'rounded-full'
    };
    return classes[this.radius()] || 'rounded-md';
  });
}

