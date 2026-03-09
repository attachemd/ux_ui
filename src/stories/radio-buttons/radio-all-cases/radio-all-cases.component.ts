// input-showcase.component.ts
import {Component, HostBinding, Input} from '@angular/core';

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
  @HostBinding('class') class = 'showcase';

  isLabel = false;
  label= 'Option A';
  isDescription = false;
  description= 'Description';
  size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';



}

