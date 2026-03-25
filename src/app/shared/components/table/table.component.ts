import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  TemplateRef,
  input,
  output,
  ViewEncapsulation,
  signal,
  contentChildren,
  contentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from './table-column.interface';
import { FtTableCellDirective } from './table-cell.directive';
import { FtTableExpansionDirective } from './table-expansion.directive';
import { FtCheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'ft-table',
  standalone: true,
  imports: [CommonModule, FtCheckboxComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FtTableComponent implements AfterContentInit {
  // Inputs
  readonly data = input<any[]>([]);
  readonly columns = input<TableColumn[]>([]);
  readonly sortKey = input<string>('');
  readonly sortDirection = input<'asc' | 'desc'>('asc');
  readonly selection = input<Set<string>>(new Set());
  readonly expandable = input<boolean>(false);
  readonly variant = input<'default' | 'minimalist'>('default');

  // Outputs
  readonly sort = output<{ key: string, direction: 'asc' | 'desc' }>();
  readonly selectionChange = output<Set<string>>();
  readonly rowClick = output<any>();
  readonly rowExpand = output<{ rowId: string, expanded: boolean }>();

  // Queries
  readonly cellTemplates = contentChildren(FtTableCellDirective);
  readonly expansionDirective = contentChild(FtTableExpansionDirective);

  // Signals & State
  expandedRows = signal<Set<string>>(new Set());

  // Internal Properties
  columnTemplates: { [key: string]: TemplateRef<any> } = {};
  expansionTemplate?: TemplateRef<any>;

  // Lifecycle Hooks
  ngAfterContentInit() {
    this.cellTemplates().forEach(directive => {
      this.columnTemplates[directive.columnKey()] = directive.templateRef;
    });
    const expansionDirective = this.expansionDirective();
    if (expansionDirective) {
      this.expansionTemplate = expansionDirective.templateRef;
    }
  }

  // Public Methods
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
    if (this.expandable()) {
      this.toggleRowExpansion(row.id, event);
    }
    this.rowClick.emit(row);
  }

  toggleRowExpansion(rowId: string, event?: Event) {
    if (event) event.stopPropagation();
    const current = this.expandedRows();
    const next = new Set(current);
    if (next.has(rowId)) {
      next.delete(rowId);
    } else {
      next.add(rowId);
    }
    this.expandedRows.set(next);
    this.rowExpand.emit({ rowId, expanded: next.has(rowId) });
  }

  isExpanded(rowId: string): boolean {
    return this.expandedRows().has(rowId);
  }

  toggleSelectAll() {
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
