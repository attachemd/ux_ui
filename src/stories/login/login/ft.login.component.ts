import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FTInputComponent} from '../../inputs/input/ft.input.component';
import {FtButtonComponent} from '../../Buttons/button/ft.button.component';

@Component({
  selector: 'ft-login',
  templateUrl: './ft.login.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    FTInputComponent,
    FtButtonComponent
  ],
  styleUrls: ['./ft.login.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtLoginComponent {

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
