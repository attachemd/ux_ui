import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ft-textarea',
  templateUrl: './ft.textarea.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    NgStyle
  ],
  styleUrls: ['./ft.textarea.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FTTextareaComponent {
  @Input() isLabel = true;
  @Input() label?: string;
  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() color: 'default' | 'primary' | 'secondary' = 'default';
  @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
  @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
  @Input() state: 'rest' | 'hover' | 'focus' | 'readonly' | 'disabled' | 'invalid' = 'rest';
  
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() placeholder?: string;
  @Input() isDescription = false;
  @Input() description?: string;
  @Input() errorMessage?: string;
  @Input() labelPlacement: 'top' | 'left' | 'inside' = 'inside';
  @Input() rows = 4;

  @Input() isClearable = true;
  
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  clear() {
    this.value = '';
    this.valueChange.emit(this.value);
  }

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(this.value);
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

  get isNormalOrHoveredState(): boolean {
    return this.state === 'rest' || this.state === 'hover';
  }
}
