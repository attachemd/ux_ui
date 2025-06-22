// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-z-button',
  template: `
    <button
      [class]="buttonClass"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
    >
      <span *ngIf="iconPosition === 'left'" class="icon-left">
        <i [class]="iconClass">{{ iconText }}</i>
      </span>
      {{ label }}
      <span *ngIf="iconPosition === 'right'" class="icon-right">
        <i [class]="iconClass">{{ iconText }}</i>
      </span>
    </button>
  `,
  imports: [
    NgIf
  ],
  styleUrls: ['./z.button.component.css']
})
export class ZButtonComponent {
  @Input() label = 'Button';
  @Input() buttonClass = 'btn-primary';
  @Input() disabled = false;
  @Input() iconName = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconText = ''; // For text-based icons like Material icons
  @Input() iconClass = ''; // For icon libraries that use classes

  @Output() onClick = new EventEmitter<Event>();
}
