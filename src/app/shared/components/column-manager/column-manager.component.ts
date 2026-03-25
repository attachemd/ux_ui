import { Component, input, output } from '@angular/core';
import { FtIconButtonComponent } from '../buttons/icon-button/icon-button.component';
import { FtButtonComponent } from '../buttons/button/button.component';
import { FtCheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'ft-column-manager',
  standalone: true,
  imports: [FtIconButtonComponent, FtButtonComponent, FtCheckboxComponent],
  template: `
    <div class="column-manager-container">
      <ft-icon-button
        iconClass="more_vert"
        variant="ghost"
        size="sm-size"
        popovertarget="columnMenu"
        popovertargetaction="toggle">
      </ft-icon-button>
      
      <div id="columnMenu" popover class="popover-menu">
        <div class="menu-header">Colonnes</div>
        <div class="menu-content">
          @for (col of allColumns(); track col.key) {
            <div class="column-item">
              <ft-checkbox
                [value]="isVisible(col.key)"
                (valueChange)="toggleColumn.emit(col.key)">
              </ft-checkbox>
              <span>{{ col.label }}</span>
            </div>
          }
        </div>
        <div class="menu-footer">
          <ft-button label="Exporter" prefixIconClass="output" variant="ghost" size="sm-size"
            [isPrefixIconClass]="true" [state]="'disabled'"></ft-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popover-menu {
      min-width: 200px;
      padding: var(--ft-unit-200);
      background: var(--ft-color-surface);
      border: 1px solid var(--ft-color-border);
      border-radius: var(--ft-radius-md);
      box-shadow: var(--ft-shadow-lg);
    }
    .menu-header {
      font-weight: 700;
      margin-bottom: var(--ft-unit-100);
      padding-bottom: var(--ft-unit-100);
      border-bottom: 1px solid var(--ft-color-border-100);
    }
    .column-item {
      display: flex;
      gap: var(--ft-unit-100);
      align-items: center;
      padding: var(--ft-unit-50) 0;
    }
    .menu-footer {
      margin-top: var(--ft-unit-100);
      padding-top: var(--ft-unit-100);
      border-top: 1px solid var(--ft-color-border-100);
    }
  `]
})
export class FtColumnManagerComponent {
  allColumns = input<{ key: string, label: string }[]>([]);
  visibleColumns = input<string[]>([]);
  toggleColumn = output<string>();

  isVisible(key: string): boolean {
    return this.visibleColumns().includes(key);
  }

  toggle(popoverId: string) {
    const popover = document.getElementById(popoverId);
    if (popover) {
      (popover as any).togglePopover();
    }
  }
}
