import { Component, Input, ChangeDetectionStrategy, input } from '@angular/core';


@Component({
  selector: 'ft-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtBadgeComponent {
  @Input() value: string | number | undefined;
  @Input() showDot = false;
  readonly severity = input<'primary' | 'danger' | 'success'>('primary');
  readonly size = input<'sm-size' | 'md-size'>('md-size');
  readonly position = input<'top-right'>('top-right');
}
