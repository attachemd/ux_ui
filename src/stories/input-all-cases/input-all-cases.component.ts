// input-showcase.component.ts
import {Component, Input} from '@angular/core';

import { CommonModule } from '@angular/common';
import {FTInputComponent} from '../input/ft.input.component';

@Component({
  selector: 'app-input-showcase',
  templateUrl: './input-all-cases.component.html',
  styleUrls: ['./input-all-cases.component.css'],
  standalone: true,
  imports: [CommonModule, FTInputComponent]
})
export class InputAllCasesComponent {

  isPrefixIconClass: boolean = true;
  radius: 'none-radius'|'sm-radius'|'md-radius'|'lg-radius'|'full-radius' = 'md-radius';
  size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';



}
