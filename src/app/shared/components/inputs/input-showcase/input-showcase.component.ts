// input-showcase.component.ts
import {Component, HostBinding} from '@angular/core';


import { FtInputComponent } from '../input/input.component';
import { FtButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'app-input-showcase',
  templateUrl: './input-showcase.component.html',
  styleUrls: ['./input-showcase.component.css'],
  standalone: true,
  imports: [FtInputComponent, FtButtonComponent]
})
export class InputShowcaseComponent {
  @HostBinding('class') class = 'showcase';
  // Basic Examples
  basicValue = '';
  disabledValue = 'Cannot edit this';
  readonlyValue = 'Read only content';

  // Form Examples
  user = {
    username: '',
    email: '',
    password: '',
    bio: ''
  };

  // State Examples
  searchQuery = '';
  errorField = '';
  successField = '';

  // Icon Examples
  searchTerm = '';
  email = '';
  phone = '';

  // Clearable Examples
  clearableText = 'Try clearing me!';

  // Validation states
  isEmailValid = true;
  emailErrorMessage = '';

  onEmailChange(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailRegex.test(value) || value === '';
    this.emailErrorMessage = this.isEmailValid ? '' : 'Please enter a valid email address';
  }

  onSearch() {
    if (this.searchQuery) {
      alert(`Searching for: ${this.searchQuery}`);
    }
  }

  onSubmit() {
    const formData = {
      username: this.user.username,
      email: this.user.email,
      bio: this.user.bio
    };
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for details.');
  }

  resetForm() {
    this.user = {
      username: '',
      email: '',
      password: '',
      bio: ''
    };
    this.basicValue = '';
    this.searchQuery = '';
    this.errorField = '';
    this.successField = '';
    this.searchTerm = '';
    this.email = '';
    this.phone = '';
    this.clearableText = '';
  }
}

