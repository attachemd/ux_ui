// input-showcase.component.ts
import {Component, HostBinding, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

import {FtButtonCopyComponent} from '../button-copy/ft.button.copy.component';


@Component({
  selector: 'app-button-showcase',
  templateUrl: './button-all-cases.component.html',
  styleUrls: ['./button-all-cases.component.css'],
  standalone: true,
  imports: [CommonModule, FtButtonCopyComponent]
})
export class ButtonAllCasesComponent {
  @HostBinding('class') class = 'showcase';

  isLabel = false;
  label= 'Username';
  size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';
  color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" = "primary";
  radius: "none-radius" | "sm-radius" | "md-radius" | "lg-radius" | "full-radius" = "md-radius";
  isPrefixIconClass: boolean = true;
  isSuffixIconClass: boolean = true;

  variants: Array<'flat' | 'outlined' | 'faded' | 'ghost'> = [
    'flat',
    'outlined',
    'faded',
    'ghost',
  ];

  states: Array<'rest' | 'hover' | 'press' | 'focus' | 'disabled'> = [
     'rest',
    'hover',
    'press',
    'focus',
    'disabled',
  ];



}
