import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FtRadioComponent } from '../radio/ft.radio.component';

interface RadioOption {
  isLabel: boolean;
  label: string;
  isDescription: boolean;
  description: string;
  size?: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size'; // optional if you want to control size per option
  state?: 'hover' | 'press' | 'focus' | 'rest'; // optional
  invalid?: boolean; // optional
  select?: boolean; // optional (deprecated, use value matching)
  inactive?: boolean; // optional
  value?: any; // The native value for this specific radio
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
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtRadioGroupComponent {

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

  onOptionSelected(val: any) {
    if (!this.inactive) {
      this.value = val;
      this.valueChange.emit(this.value);
    }
  }

}

