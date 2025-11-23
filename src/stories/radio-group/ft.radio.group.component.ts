import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FtRadioComponent} from '../radio/ft.radio.component';

interface RadioOption {
  isLabel: boolean;
  label: string;
  isDescription: boolean;
  description: string;
  size?: 'xs-size'|'sm-size'|'md-size'|'lg-size'; // optional if you want to control size per option
  state?: 'hover'|'press'|'focus'|'rest'; // optional
  invalid?: boolean; // optional
  select?: boolean; // optional
  inactive?: boolean; // optional
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
  @Input() select = false;
  @Input() inactive = false;
  @Input() invalid?: boolean;
  @Input() size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';
  @Input() state: 'hover'|'press'|'focus'|'rest'= 'rest';
  @Input() flexDirection: 'flex-row'|'flex-col' = 'flex-row';
  @Input() options: RadioOption[] = [{
    isLabel: true,
    label: 'Option A',
    isDescription: true,
    description: 'description for Option A'
  }];

}
