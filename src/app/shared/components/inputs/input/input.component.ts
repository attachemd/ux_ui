import { Component, Input, OnInit, ViewEncapsulation, ElementRef, forwardRef, input, viewChild, output } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ft-input',
  templateUrl: './input.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgStyle
],
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FtInputComponent),
      multi: true
    }
  ]
})
export class FtInputComponent implements OnInit, ControlValueAccessor {
  readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('inputRef');

  /** Whether the label should be displayed */
  readonly isLabel = input(false);

  /** The text content of the label */
  readonly label = input<string>();

  /** The size of the input field */
  readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');

  /** The color theme of the input field */
  readonly color = input<'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('primary');

  /** The visual style variant of the input field */
  readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('flat');

  /** The border radius of the input field */
  readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');

  /** The interactive state of the input field */
  @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'readonly' | 'disabled' | 'invalid' | 'content' = 'rest';

  /** Whether the input is disabled */
  @Input() disabled = false;

  /** Whether the input is read-only */
  readonly readonly = input(false);

  /** Whether the input is a required field */
  readonly required = input(false);

  /** Whether the input is in an invalid state */
  @Input() invalid = false;

  /** The type of the native input element */
  readonly inputType = input<'text' | 'password'>('text');

  /** The placeholder text displayed in the input field */
  readonly placeholder = input<string>();

  /** Whether to display a description message below the input */
  @Input() isDescription = false;

  /** The text content of the description message */
  @Input() description?: string;

  /** The error message displayed when the input is invalid */
  @Input() errorMessage?: string;

  /** Predefined content for the input field */
  readonly content = input<string>();

  /** Where the label should be placed relative to the input field */
  readonly labelPlacement = input<'label-inside' | 'label-outside' | 'label-outside-left'>('label-outside-left');

  /** Static content displayed at the start of the input (e.g., currency symbol) */
  @Input() startContent?: string;

  /** Static content displayed at the end of the input (e.g., unit or domain) */
  @Input() endContent?: string;

  /** Whether to use a CSS class for the prefix icon */
  readonly isPrefixIconClass = input(false);

  /** The CSS class or Material Symbol name for the prefix icon */
  @Input() prefixIconClass = '';

  /** Whether to use a CSS class for the first suffix icon */
  readonly isSuffix1IconClass = input(false);

  /** The CSS class or Material Symbol name for the first suffix icon */
  @Input() suffix1IconClass = 'close_small';

  /** Whether to use a CSS class for the second suffix icon */
  readonly isSuffix2IconClass = input(false);

  /** The CSS class or Material Symbol name for the second suffix icon */
  @Input() suffix2IconClass = 'keyboard_arrow_down';

  /** Whether to show a clear button when the input has content */
  readonly isClearable = input(false);

  /** Whether to show predefined content immediately */
  readonly showContent = input(false);

  /** The current value of the input field */
  @Input() value = '';

  /** Emitted whenever the input value changes */
  readonly valueChange = output<string>();

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    const content = this.content();
    if (content && this.showContent()) {
      this.value = content;
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

  clear() {
    this.value = '';
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
    this.focus();
  }

  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  get currentInputType(): string {
    const inputType = this.inputType();
    if (inputType === 'password') {
      return this.passwordVisible ? 'text' : 'password';
    }
    return inputType;
  }

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

  focus() {
    const el = this.inputRef()?.nativeElement;
    if (el && document.activeElement !== el) {
      el.focus();
    }
  }

  handleMousedown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // If not clicking the input itself, prevent focus loss but ensure focus is transferred
    if (target.tagName !== 'INPUT') {
      event.preventDefault();
      this.focus();
    }
  }

}

