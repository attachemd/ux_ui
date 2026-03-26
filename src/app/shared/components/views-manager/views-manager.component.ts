import { Component, input, output, model } from '@angular/core';
import { FtSelectComponent, SelectOption } from '../select/select/select.component';
import { FtIconButtonComponent } from '../buttons/icon-button/icon-button.component';
import { FtButtonComponent } from '../buttons/button/button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ft-views-manager',
  standalone: true,
  imports: [FtSelectComponent, FtIconButtonComponent, FtButtonComponent, ReactiveFormsModule],
  template: `
    <div class="table-view-container">
      <ft-icon-button
        iconClass="settings"
        variant="ghost"
        size="sm-size"
        popovertarget="viewSettingsMenu"
        popovertargetaction="toggle">
      </ft-icon-button>
      
      <div id="viewSettingsMenu" popover class="popover-menu">
        <ul>
          <li>
            <ft-button label="Configurer la vue" prefixIconClass="settings" variant="ghost" size="sm-size"
              [isPrefixIconClass]="true" (click)="configure.emit()"></ft-button>
          </li>
          <li>
            <ft-button label="Modifier les colonnes" prefixIconClass="table_chart" variant="ghost" size="sm-size"
              [isPrefixIconClass]="true" (click)="manageColumns.emit()"></ft-button>
          </li>
          <li>
            <ft-button label="Enregistrer" prefixIconClass="save" variant="ghost" size="sm-size"
              [isPrefixIconClass]="true" (click)="save.emit()"></ft-button>
          </li>
          <li>
            <ft-button label="réinitialiser la vue" prefixIconClass="arrow_back" variant="ghost" size="sm-size"
              [isPrefixIconClass]="true" (click)="reset.emit()"></ft-button>
          </li>
        </ul>
      </div>

      <ft-select
        [formControl]="viewControl()"
        [options]="views()"
        variant="flat"
        [labelPlacement]="'label-outside-left'"
        [isLabel]="false"
        size="md-size"
        placeholder="Choisir une vue"
        (valueChange)="onViewChange($event)">
      </ft-select>

      <ft-icon-button
        iconClass="filter_list"
        variant="ghost"
        size="md-size"
        (click)="toggleFilter.emit()">
      </ft-icon-button>
    </div>
  `,
  styles: [`
    .table-view-container {
      display: flex;
      gap: var(--ft-unit-100);
      align-items: center;
    }
    .popover-menu {
      padding: var(--ft-unit-100);
      background: var(--ft-color-surface);
      border: 1px solid var(--ft-color-border);
      border-radius: var(--ft-radius-md);
      box-shadow: var(--ft-shadow-lg);
    }
    .popover-menu ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .popover-menu li {
      margin-bottom: var(--ft-unit-50);
    }
    .popover-menu li:last-child {
      margin-bottom: 0;
    }
  `]
})
export class FtViewsManagerComponent {
  views = input<SelectOption[]>([]);
  viewControl = input<FormControl>(new FormControl());

  viewChange = output<string>();
  configure = output<void>();
  manageColumns = output<void>();
  save = output<void>();
  reset = output<void>();
  toggleFilter = output<void>();

  onViewChange(value: any) {
    this.viewChange.emit(value);
  }
}
