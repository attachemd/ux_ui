import {Component, HostBinding} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FtIconButtonComponent} from '../icon-button/ft.icon.button.component';


@Component({
  selector: 'app-icon-button-showcase',
  templateUrl: './icon.button.all.cases.component.html',
  styleUrls: ['./icon.button.all.cases.component.css'],
  standalone: true,
  imports: [CommonModule, FtIconButtonComponent]
})
export class IconButtonAllCasesComponent {
  @HostBinding('class') class = 'showcase';

  size: 'xs-size'|'sm-size'|'md-size'|'lg-size' = 'md-size';
  color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" = "primary";
  radius: "none-radius" | "xs-radius" | "sm-radius" | "md-radius" | "lg-radius" | "full-radius" = "md-radius";

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
