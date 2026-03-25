import { Component, ChangeDetectionStrategy, model, effect, input, viewChild, output } from '@angular/core';

import { FtInputComponent } from '../inputs/input/input.component';

@Component({
  selector: 'ft-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [FtInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtSearchComponent {
  readonly searchInput = viewChild.required<FtInputComponent>('searchInput');

  readonly placeholder = input<string>('Search...');
  readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
  readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('faded');
  readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('full-radius');
  readonly isClearable = input<boolean>(true);
  readonly width = input<string>('250px');
  readonly autoCollapse = input<boolean>(true);
  readonly color = input<'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('primary');
  readonly disabled = input<boolean>(false);

  readonly queryChange = output<string>();

  isOpen = model(false);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        // Delay to allow expansion animation to start/finish
        setTimeout(() => {
          this.searchInput()?.focus();
        }, 150);
      }
    });
  }

  toggleSearch() {
    if (this.disabled()) return;
    this.isOpen.update((val) => !val);
  }

  onSearchBlur(event: FocusEvent) {
    if (!this.autoCollapse()) return;

    const searchWrapper = event.currentTarget as HTMLElement;

    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;

      if (!searchWrapper.contains(activeElement)) {
        if (!this.searchInput()?.value) {
          this.isOpen.set(false);
        }
      }
    }, 100);
  }

  onValueChange(value: string) {
    this.queryChange.emit(value);
  }
}
