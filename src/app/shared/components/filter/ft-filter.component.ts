import { Component, input, output } from '@angular/core';
import { FtButtonComponent } from '../../../../stories/Buttons/button/ft.button.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FtButtonComponent],
  template: `
    <div class="header-actions-group">
      <ft-button label="Réinitialiser" variant="ghost" size="sm-size" (click)="reset.emit()"></ft-button>
      <ft-button
        label="Filtrer"
        prefixIconClass="filter_alt"
        variant="flat"
        color="primary"
        size="sm-size"
        [isPrefixIconClass]="true"
        (click)="filter.emit()">
        @if (activeFiltersCount() > 0) {
          <span class="filter-number">{{ activeFiltersCount() }}</span>
        }
      </ft-button>
    </div>
  `,
  styles: [`
    .header-actions-group {
      display: flex;
      gap: var(--ft-unit-100);
      align-items: center;
    }
    .filter-number {
      background-color: var(--ft-color-on-primary);
      color: var(--ft-color-primary);
      font-size: 10px;
      font-weight: bold;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-left: 4px;
    }
  `]
})
export class FTFilterComponent {
  activeFiltersCount = input(0);
  filter = output<void>();
  reset = output<void>();
}
