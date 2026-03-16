import { Component, Input, Output, EventEmitter, computed, signal, ViewEncapsulation, input, output } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FTSelectComponent, SelectOption } from '../select/select/ft.select.component';

@Component({
  selector: 'ft-pagination',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, FTSelectComponent],
  templateUrl: './ft.pagination.component.html',
  styleUrls: ['./ft.pagination.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FTPaginationComponent {
  totalItems = input(0);
  pageSize = input(10);
  currentPage = input(0);
  pageSizeOptions = input<SelectOption[]>([
    { label: '5 / page', value: 5 },
    { label: '10 / page', value: 10 },
    { label: '25 / page', value: 25 },
    { label: '50 / page', value: 50 }
  ]);

  pageChange = output<number>();
  pageSizeChange = output<number>();

  jumpToValue: number | null = null;

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage(); // 0-indexed
    const displayCurrent = current + 1;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Window logic: 1 ... 14 15 16 ... 30 (5 numbers)
    // If near start
    if (displayCurrent <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }

    // If near end
    if (displayCurrent >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }

    // Middle
    return [1, '...', displayCurrent - 1, displayCurrent, displayCurrent + 1, '...', total];
  });

  onPageClick(page: number | string) {
    if (typeof page === 'number') {
      this.pageChange.emit(page - 1);
    }
  }

  onPrev() {
    if (this.currentPage() > 0) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  onNext() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onPageSizeChange(event: any) {
    const newSize = event.value ?? event;
    this.pageSizeChange.emit(Number(newSize));
  }

  onJumpSubmit() {
    if (this.jumpToValue === null) return;
    
    const page = Number(this.jumpToValue);
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page - 1);
      this.jumpToValue = null;
    } else {
      // Reset or show error
      this.jumpToValue = null;
    }
  }
}
