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
  computed,
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
  styleUrls: ['./table.component.css']
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
  readonly density = input<'compact' | 'comfortable' | 'loose'>('comfortable');

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

  // Sticky Offsets Calculation
  stickyOffsets = computed(() => {
    const cols = this.columns();
    const leftOffsets: { [key: string]: string } = {};
    const rightOffsets: { [key: string]: string } = {};

    let cumulativeLeft = '0px';
    for (const col of cols) {
      if (col.sticky === 'left') {
        leftOffsets[col.key] = cumulativeLeft;
        const colWidth = col.width || '0px';
        // In border-box, offset is just the sum of previous total widths
        cumulativeLeft = `calc(${cumulativeLeft} + ${colWidth})`;
      }
    }

    let cumulativeRight = '0px';
    for (let i = cols.length - 1; i >= 0; i--) {
      const col = cols[i];
      if (col.sticky === 'right') {
        rightOffsets[col.key] = cumulativeRight;
        const colWidth = col.width || '0px';
        cumulativeRight = `calc(${cumulativeRight} + ${colWidth})`;
      }
    }

    return { leftOffsets, rightOffsets };
  });

  checkboxSize = computed(() => {
    switch (this.density()) {
      case 'compact': return 'xs-size';
      default: return 'sm-size';
    }
  });

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
