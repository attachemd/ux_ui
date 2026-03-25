import { Component, Input, ViewEncapsulation, forwardRef, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ft-textarea',
  templateUrl: './textarea.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
],
  styleUrls: ['./textarea.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FtTextareaComponent),
      multi: true
    }
  ]
})
export class FtTextareaComponent implements ControlValueAccessor {
  readonly isLabel = input(true);
  readonly label = input<string>();
  readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
  readonly color = input<'default' | 'primary' | 'secondary'>('default');
  readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('flat');
  readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');
  @Input() state: 'rest' | 'hover' | 'focus' | 'readonly' | 'disabled' | 'invalid' = 'rest';
  
  @Input() disabled = false;
  readonly readonly = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly placeholder = input<string>();
  readonly isDescription = input(false);
  @Input() description?: string;
  @Input() errorMessage?: string;
  readonly labelPlacement = input<'top' | 'left' | 'inside'>('inside');
  readonly rows = input(4);

  readonly isClearable = input(true);
  
  @Input() value = '';
  readonly valueChange = output<string>();

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.state = isDisabled ? 'disabled' : 'rest';
  }

  clear() {
    this.value = '';
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
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

  get isNormalOrHoveredState(): boolean {
    return this.state === 'rest' || this.state === 'hover';
  }
}

