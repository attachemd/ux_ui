import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  TemplateRef,
  input,
  output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from './table-column.interface';
import { FTTableCellDirective } from './ft-table-cell.directive';
import { FtCheckboxComponent } from '../../../../stories/checkbox/ft.checkbox.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FtCheckboxComponent],
  templateUrl: './ft-table.component.html',
  styleUrls: ['./ft-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FTTableComponent implements AfterContentInit {
  data = input<any[]>([]);
  columns = input<TableColumn[]>([]);
  sortKey = input<string>('');
  sortDirection = input<'asc' | 'desc'>('asc');
  selection = input<Set<string>>(new Set());

  sort = output<{ key: string, direction: 'asc' | 'desc' }>();
  selectionChange = output<Set<string>>();
  rowClick = output<any>();

  @ContentChildren(FTTableCellDirective) cellTemplates!: QueryList<FTTableCellDirective>;

  columnTemplates: { [key: string]: TemplateRef<any> } = {};

  ngAfterContentInit() {
    this.cellTemplates.forEach(directive => {
      this.columnTemplates[directive.columnKey] = directive.templateRef;
    });
  }

  onSort(key: string) {
    const direction = this.sortKey() === key && this.sortDirection() === 'asc' ? 'desc' : 'asc';
    this.sort.emit({ key, direction });
  }

  isSorted(key: string): boolean {
    return this.sortKey() === key;
  }

  getSortIcon(key: string): string {
    if (this.sortKey() !== key) return 'unfold_more';
    return this.sortDirection() === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  toggleRow(row: any, event: MouseEvent) {
    // Selection logic usually handled by parent if we want it to be "independent"
    // but we can provide a helper emit.
    this.rowClick.emit(row);
  }

  toggleSelectAll() {
    // Triggered from header checkbox
    const allIds = this.data().map(item => item.id).filter(id => !!id);
    const newSelection = new Set<string>(this.isAllSelected() ? [] : allIds);
    this.selectionChange.emit(newSelection);
  }

  isAllSelected(): boolean {
    return this.data().length > 0 && this.selection().size === this.data().length;
  }

  isSelected(row: any): boolean {
    return this.selection().has(row.id);
  }

  onCheckboxChange(row: any, value: boolean) {
    const newSelection = new Set(this.selection());
    if (value) {
      newSelection.add(row.id);
    } else {
      newSelection.delete(row.id);
    }
    this.selectionChange.emit(newSelection);
  }
}
