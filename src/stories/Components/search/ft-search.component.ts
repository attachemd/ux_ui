import { Component, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, model, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FTInputComponent } from '../../inputs/input/ft.input.component';

@Component({
  selector: 'ft-search',
  standalone: true,
  templateUrl: './ft-search.component.html',
  styleUrl: './ft-search.component.css',
  imports: [CommonModule, FTInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FTSearchComponent {
  @ViewChild('searchInput') searchInput!: FTInputComponent;

  @Input() placeholder: string = 'Search...';
  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'faded';
  @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'full-radius';
  @Input() isClearable: boolean = true;
  @Input() width: string = '250px';
  @Input() autoCollapse: boolean = true;
  @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() disabled: boolean = false;

  @Output() queryChange = new EventEmitter<string>();

  isOpen = model(false);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        // Delay to allow expansion animation to start/finish
        setTimeout(() => {
          this.searchInput?.focus();
        }, 150);
      }
    });
  }

  toggleSearch() {
    if (this.disabled) return;
    this.isOpen.update((val) => !val);
  }

  onSearchBlur(event: FocusEvent) {
    if (!this.autoCollapse) return;

    const searchWrapper = event.currentTarget as HTMLElement;

    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;

      if (!searchWrapper.contains(activeElement)) {
        if (!this.searchInput?.value) {
          this.isOpen.set(false);
        }
      }
    }, 100);
  }

  onValueChange(value: string) {
    this.queryChange.emit(value);
  }
}
