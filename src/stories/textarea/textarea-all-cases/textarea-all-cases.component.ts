import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FTTextareaComponent } from '../textarea/ft.textarea.component';

@Component({
  selector: 'app-textarea-all-cases',
  templateUrl: './textarea-all-cases.component.html',
  styleUrls: ['./textarea-all-cases.component.css'],
  standalone: true,
  imports: [CommonModule, FTTextareaComponent]
})
export class TextareaAllCasesComponent {
  @HostBinding('class') class = 'showcase';

  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
  @Input() label = 'Description';
  @Input() placeholder = 'Type something...';
  @Input() showContent = false;

  labelPlacements: Array<'top' | 'left' | 'inside'> = ['inside', 'top', 'left'];
  states: Array<'rest' | 'hover' | 'focus' | 'readonly' | 'disabled' | 'invalid' | 'with-description'> = [
    'rest', 'hover', 'focus', 'readonly', 'disabled', 'invalid', 'with-description'
  ];
}

