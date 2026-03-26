import { Component, input, output, viewChild, signal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { FtViewsManagerComponent } from '../../views-manager/views-manager.component';
import { FtSearchComponent } from '../../search/search.component';
import { FtFilterComponent } from '../../filter/filter.component';
import { FtColumnManagerComponent } from '../../column-manager/column-manager.component';
import { FtButtonComponent } from '../../buttons/button/button.component';
import { FtInputComponent } from '../../inputs/input/input.component';
import { FtSelectComponent, SelectOption } from '../../select/select/select.component';
import { TableColumn } from '../table-column.interface';

@Component({
  selector: 'ft-table-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FtViewsManagerComponent,
    FtSearchComponent,
    FtColumnManagerComponent,
    FtSelectComponent,
    FtButtonComponent
  ],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.css'
})
export class FtTableHeaderComponent {
  private readonly _columnManager = viewChild(FtColumnManagerComponent);
  filterExpanded = model(false);
  showViewsManager = input<boolean>(true);
  showFilterToggle = input<boolean>(false);

  // Generic Filter Models
  filter1Value = model<string[]>(['all']);
  filter2Value = model<string[]>(['all']);
  filter3Value = model<string[]>(['all']);

  // Indeterminate States
  filter1Indeterminate = signal<string[]>([]);
  filter2Indeterminate = signal<string[]>([]);
  filter3Indeterminate = signal<string[]>([]);

  // Advanced Filter Inputs
  filter1Label = input<string>('Filter 1');
  filter1Options = input<SelectOption[]>([]);
  filter2Label = input<string>('Filter 2');
  filter2Options = input<SelectOption[]>([]);
  filter3Label = input<string>('Filter 3');
  filter3Options = input<SelectOption[]>([]);

  // Filter Options (Removed hardcoded patient-specific ones)

  get columnManager() {
    return this._columnManager();
  }

  handleFilterChange(field: 'city' | 'country' | 'gender', newValue: string[]) {
    const options = field === 'city' ? this.filter1Options() : 
                   field === 'country' ? this.filter2Options() : 
                   this.filter3Options();
    
    const filterModel = field === 'city' ? this.filter1Value : 
                        field === 'country' ? this.filter2Value : 
                        this.filter3Value;
    
    const indeterminateSignal = field === 'city' ? this.filter1Indeterminate : 
                               field === 'country' ? this.filter2Indeterminate : 
                               this.filter3Indeterminate;

    const allOptions = options.map((o: SelectOption) => o.value);
    const subOptions = allOptions.filter((v: string) => v !== 'all');
    
    // Previous state
    const prevValue = filterModel();
    const hadAll = prevValue.includes('all');
    const hasAll = newValue.includes('all');

    let finalValue = [...newValue];

    // 1. Handle "Select All" click
    if (!hadAll && hasAll) {
      // "All" was just checked -> force all child nodes to true
      finalValue = [...allOptions];
      indeterminateSignal.set([]);
    } else if (hadAll && !hasAll && prevValue.length === allOptions.length) {
      // "All" was just unchecked while it was true -> force all child nodes to false
      finalValue = [];
      indeterminateSignal.set([]);
    } else {
      // 2. The "Sync" Trigger: check child nodes status
      const selectedSubOptions = newValue.filter(v => v !== 'all');
      
      if (selectedSubOptions.length === subOptions.length) {
        // All selected -> set 'All' to checked
        if (!hasAll) finalValue.push('all');
        indeterminateSignal.set([]);
      } else if (selectedSubOptions.length > 0) {
        // Some selected -> set 'All' to indeterminate
        finalValue = selectedSubOptions; // remove 'all' if it was there
        indeterminateSignal.set(['all']);
      } else {
        // None selected -> set 'All' to unchecked
        finalValue = [];
        indeterminateSignal.set([]);
      }
    }

    filterModel.set(finalValue);
  }

  resetAdvancedFilters() {
    this.filter1Value.set(['all']);
    this.filter2Value.set(['all']);
    this.filter3Value.set(['all']);
    this.filter1Indeterminate.set([]);
    this.filter2Indeterminate.set([]);
    this.filter3Indeterminate.set([]);
  }

  // Views Manager Inputs
  views = input<SelectOption[]>([]);
  viewControl = input<FormControl>(new FormControl());

  // Search Inputs
  searchPlaceholder = input<string>('Rechercher...');
  variant = input<any>('outlined');

  // Filter Inputs
  activeFiltersCount = input<number>(0);

  // Column Manager Inputs
  allColumns = input<TableColumn[]>([]);
  visibleColumns = input<string[]>([]);

  // Outputs
  viewChange = output<string>();
  manageColumns = output<void>();
  search = output<string>();
  resetFilters = output<void>();
  filter = output<void>();
  toggleColumn = output<string>();
}
