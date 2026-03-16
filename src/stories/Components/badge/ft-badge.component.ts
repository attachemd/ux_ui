import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ft-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ft-badge.component.html',
  styleUrl: './ft-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FTBadgeComponent {
  @Input() value: string | number | undefined;
  @Input() showDot = false;
  @Input() severity: 'primary' | 'danger' | 'success' = 'primary';
  @Input() size: 'sm-size' | 'md-size' = 'md-size';
  @Input() position: 'top-right' = 'top-right';
}
