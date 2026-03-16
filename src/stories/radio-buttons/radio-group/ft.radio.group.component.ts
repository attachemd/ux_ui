import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FtRadioComponent } from '../radio/ft.radio.component';

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
  templateUrl: './ft.radio.group.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    FtRadioComponent,
    NgForOf
  ],
  styleUrls: ['./ft.radio.group.component.css'],
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

  @Input() isLabel = false;
  @Input() label?: string;
  @Input() isDescription = false;
  @Input() description?: string;
  @Input() errorMessage?: string;
  @Input() inactive = false;
  @Input() invalid?: boolean;
  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() state: 'hover' | 'press' | 'focus' | 'rest' = 'rest';
  @Input() flexDirection: 'flex-row' | 'flex-col' = 'flex-row';

  @Input() name: string = `ft-radio-group-${Math.random().toString(36).substr(2, 9)}`;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  @Input() options: RadioOption[] = [{
    isLabel: true,
    label: 'Option A',
    isDescription: true,
    description: 'description for Option A',
    value: 'A'
  }];

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

