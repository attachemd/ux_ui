import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ft-input',
  templateUrl: './ft.input.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    NgStyle
  ],
  styleUrls: ['./ft.input.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FTInputComponent {
  // @Input() isLabel = false;
  @Input() isLabel = true;
  @Input() label?: string;
  @Input() size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';
  @Input() color: 'default'|'primary'|'secondary' = 'default';
  @Input() variant: 'flat'|'faded'|'outlined'|'ghost' = 'flat';
  @Input() radius: 'none-radius'|'xs-radius'|'sm-radius'|'md-radius'|'lg-radius'|'full-radius' = 'md-radius';
  @Input() state: 'rest'|'hover'|'focus'|'readonly'|'disabled'|'invalid'|'content'= 'rest';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() placeholder?: string;
  @Input() isDescription = false;
  @Input() description?: string;
  @Input() errorMessage?: string;
  @Input() content?: string;
  @Input() labelPlacement: 'label-inside' | 'label-outside' | 'label-outside-left' = 'label-inside';

  @Input() isPrefixIconClass = false;
  @Input() prefixIconClass = ''; // For icon libraries that use classes

  @Input() isSuffix1IconClass = true;
  @Input() suffix1IconClass = 'close_small';

  @Input() isSuffix2IconClass = true;
  @Input() suffix2IconClass = 'keyboard_arrow_down';

  @Input() isClearable = false;
  value = '';
  clear() { this.value = ''; }

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

  get hasPlaceholderToShow(): boolean {
    // Basic conditions that prevent showing placeholder
    if (!this.placeholder || this.state === 'readonly' || this.state === 'content') {
      return false;
    }

    // Special case: don't show placeholder for label-inside fields in normal states
    const isLabelInsideInNormalState = this.labelPlacement === 'label-inside' &&
      this.isNormalOrHoveredState &&
      this.state !== 'invalid';

    return !isLabelInsideInNormalState;
  }

  get isNormalOrHoveredState(): boolean {
    return this.state === 'rest' || this.state === 'hover';
  }
}
