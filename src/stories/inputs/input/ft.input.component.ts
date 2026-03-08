import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ft-input',
  templateUrl: './ft.input.component.html',
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    NgStyle
  ],
  styleUrls: ['./ft.input.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FTInputComponent implements OnInit {
  // @Input() isLabel = false;
  @Input() isLabel = true;
  @Input() label?: string;
  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
  @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
  @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'readonly' | 'disabled' | 'invalid' | 'content' = 'rest';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() inputType: 'text' | 'password' = 'text';
  @Input() placeholder?: string;
  @Input() isDescription = false;
  @Input() description?: string;
  @Input() errorMessage?: string;
  @Input() content?: string;
  @Input() labelPlacement: 'label-inside' | 'label-outside' | 'label-outside-left' = 'label-inside';

  @Input() startContent?: string;  // e.g. '$', 'https://'
  @Input() endContent?: string;    // e.g. '.org', 'kg', '@gmail.com'

  @Input() isPrefixIconClass = false;
  @Input() prefixIconClass = ''; // For icon libraries that use classes

  @Input() isSuffix1IconClass = false;
  @Input() suffix1IconClass = 'close_small';

  @Input() isSuffix2IconClass = false;
  @Input() suffix2IconClass = 'keyboard_arrow_down';

  @Input() isClearable = false;
  @Input() showContent = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  ngOnInit() {
    if (this.content && this.showContent) {
      this.value = this.content;
    }
  }

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }

  clear() {
    this.value = '';
    this.valueChange.emit(this.value);
  }

  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  get currentInputType(): string {
    if (this.inputType === 'password') {
      return this.passwordVisible ? 'text' : 'password';
    }
    return this.inputType;
  }

  get radiusClasses(): string {
    const classes = {
      'none-radius': 'rounded-none',
      'xs-radius': 'rounded-sm',
      'sm-radius': 'rounded-md',
      'md-radius': 'rounded-lg',
      'lg-radius': 'rounded-xl',
      'full-radius': 'rounded-full'
    };
    return classes[this.radius] || 'rounded-md';
  }

}
