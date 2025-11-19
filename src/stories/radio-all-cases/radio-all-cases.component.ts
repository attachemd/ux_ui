// input-showcase.component.ts
import {Component, Input} from '@angular/core';

import { CommonModule } from '@angular/common';
import {FtRadioComponent} from '../radio/ft.radio.component';

@Component({
  selector: 'app-radio-showcase',
  templateUrl: './radio-all-cases.component.html',
  styleUrls: ['./radio-all-cases.component.css'],
  standalone: true,
  imports: [CommonModule, FtRadioComponent]
})
export class RadioAllCasesComponent {

  isPrefixIconClass: boolean = true;
  radius: 'none-radius'|'sm-radius'|'md-radius'|'lg-radius'|'full-radius' = 'md-radius';
  size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';
  variant: 'flat'|'faded'|'underlined'|'ghost' = 'flat';



}
