// input-showcase.component.ts
import {Component, HostBinding, Input} from '@angular/core';


import {FtRadioComponent} from '../radio/radio.component';

@Component({
  selector: 'app-radio-showcase',
  templateUrl: './radio-all-cases.component.html',
  styleUrls: ['./radio-all-cases.component.css'],
  standalone: true,
  imports: [FtRadioComponent]
})
export class RadioAllCasesComponent {
  @HostBinding('class') class = 'showcase';

  isLabel = false;
  label= 'Option A';
  isDescription = false;
  description= 'Description';
  size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';



}

