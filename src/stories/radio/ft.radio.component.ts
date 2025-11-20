import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ft-radio',
  templateUrl: './ft.radio.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./ft.radio.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtRadioComponent {

  @Input() isLabel = false;
  @Input() label?: string;
  @Input() isDescription = false;
  @Input() description?: string;
  @Input() select = false;
  @Input() inactive = false;
  @Input() invalid = false;
  @Input() size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';
  @Input() state: 'hover'|'press'|'focus'|'rest'= 'rest';

}
