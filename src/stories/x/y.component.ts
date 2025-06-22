import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-button',
  standalone: true, // If using standalone components
  imports: [CommonModule], // Import CommonModule if standalone
  template: `
    <button
      [ngClass]="type"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
    >
      <ng-content select="[icon-left]"></ng-content>
      {{ label }}
      <ng-content select="[icon-right]"></ng-content>
    </button>
  `,
  styles: [`
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px; /* Space between text and icon */
    }

    button.primary {
      background-color: #007bff;
      color: white;
    }

    button.secondary {
      background-color: #6c757d;
      color: white;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Styles for the icon itself - adjust based on your icon library */
    ::ng-deep .icon {
      /* Example for a generic icon class */
      font-size: 1.2em;
      line-height: 1; /* Helps with vertical alignment */
      display: inline-block;
    }
  `]
})
export class YButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();
}
