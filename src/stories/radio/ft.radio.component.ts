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

  @Input() isLabel = true;

}
