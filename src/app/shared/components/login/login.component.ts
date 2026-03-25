import { Component, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FtInputComponent } from '../inputs/input/input.component';
import { FtButtonComponent } from '../buttons/button/button.component';
import { FtCheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'ft-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    FtInputComponent,
    FtButtonComponent,
    FtCheckboxComponent
],
  styleUrls: ['./login.component.css'],
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

