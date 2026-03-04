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


  inputState: {username: 'rest'|'disabled'|'hover'|'focus'|'readonly'|'invalid'|'content',
  password: 'rest'|'disabled'|'hover'|'focus'|'readonly'|'invalid'|'content'} = {
    username: 'rest',
    password: 'rest'
  }
  content = {
    username: '',
    password: ''
  }
  buttonState: 'rest' | 'hover' | 'press' | 'focus' | 'disabled' = 'disabled'


}
