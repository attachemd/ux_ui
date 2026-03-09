import { Component, ViewEncapsulation } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FTInputComponent } from '../../inputs/input/ft.input.component';
import { FtButtonComponent } from '../../Buttons/button/ft.button.component';
import { FtCheckboxComponent } from '../../checkbox/ft.checkbox.component';

@Component({
  selector: 'ft-login',
  templateUrl: './ft.login.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    FTInputComponent,
    FtButtonComponent,
    FtCheckboxComponent
  ],
  styleUrls: ['./ft.login.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtLoginComponent {

  loginData = {
    username: '',
    password: '',
    rememberMe: false
  };

  get isFormValid(): boolean {
    return this.loginData.username.length > 0 && this.loginData.password.length >= 6;
  }

  get buttonState(): 'rest' | 'disabled' {
    return this.isFormValid ? 'rest' : 'disabled';
  }

  onLogin() {
    if (this.isFormValid) {
      console.log('Logging in with:', this.loginData);
      // Implement login logic here
    }
  }

  onForgotPassword() {
    console.log('Redirecting to forgot password...');
  }
}

