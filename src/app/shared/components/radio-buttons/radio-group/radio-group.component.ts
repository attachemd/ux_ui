import { Component, Input, ViewEncapsulation, forwardRef, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FtRadioComponent } from '../radio/radio.component';

interface RadioOption {
  isLabel: boolean;
  label: string;
  isDescription: boolean;
  description: string;
  size?: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size';
  state?: 'hover' | 'press' | 'focus' | 'rest';
  invalid?: boolean;
  select?: boolean;
  inactive?: boolean;
  value?: any;
}

@Component({
  selector: 'ft-radio-group',
  templateUrl: './radio-group.component.html',
  imports: [
    NgClass,
    FormsModule,
    FtRadioComponent
],
  styleUrls: ['./radio-group.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FtRadioGroupComponent),
      multi: true
    }
  ]
})
export class FtRadioGroupComponent implements ControlValueAccessor {

  readonly isLabel = input(false);
  readonly label = input<string>();
  readonly isDescription = input(false);
  @Input() description?: string;
  @Input() errorMessage?: string;
  @Input() inactive = false;
  readonly invalid = input(false);
  readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
  readonly state = input<'hover' | 'press' | 'focus' | 'rest'>('rest');
  readonly flexDirection = input<'flex-row' | 'flex-col'>('flex-row');

  readonly name = input<string>(`ft-radio-group-${Math.random().toString(36).substr(2, 9)}`);
  @Input() value: any;
  readonly valueChange = output<any>();

  readonly options = input<RadioOption[]>([{
        isLabel: true,
        label: 'Option A',
        isDescription: true,
        description: 'description for Option A',
        value: 'A'
    }]);

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.inactive = isDisabled;
  }

  onOptionSelected(val: any) {
    if (!this.inactive) {
      this.value = val;
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.onTouched();
    }
  }

}

