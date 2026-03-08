import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgClass, NgIf, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ft-chips',
  templateUrl: './ft.chips.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    NgFor,
    NgStyle
  ],
  styleUrls: ['./ft.chips.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FTChipsComponent {
  @Input() isLabel = true;
  @Input() label?: string;
  @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
  @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
  @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
  @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'readonly' | 'disabled' | 'invalid' = 'rest';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() placeholder?: string;
  @Input() isDescription = false;
  @Input() description?: string;
  @Input() errorMessage?: string;
  @Input() labelPlacement: 'label-inside' | 'label-outside' | 'label-outside-left' = 'label-inside';
  @Input() isClearable = true;

  @Input() items: string[] = [];
  @Output() itemsChange = new EventEmitter<string[]>();

  @Input() suggestions: string[] = [];

  inputValue = '';
  filteredSuggestions: string[] = [];
  showSuggestions = false;

  onInputChange(value: string) {
    if (value && this.suggestions.length > 0) {
      this.filteredSuggestions = this.suggestions.filter(s =>
        s.toLowerCase().includes(value.toLowerCase()) && !this.items.includes(s)
      );
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
  }

  addItem(item: string) {
    const trimmedItem = item.trim();
    if (trimmedItem && !this.items.includes(trimmedItem)) {
      this.items = [...this.items, trimmedItem];
      this.itemsChange.emit(this.items);
    }
    this.inputValue = '';
    this.showSuggestions = false;
  }

  addItemFromInput() {
    if (this.inputValue) {
      this.addItem(this.inputValue);
    }
  }

  selectSuggestion(suggestion: string) {
    this.addItem(suggestion);
  }

  removeItem(index: number) {
    this.items = this.items.filter((_, i) => i !== index);
    this.itemsChange.emit(this.items);
  }

  handleBackspace(event: Event) {
    if (!this.inputValue && this.items.length > 0) {
      this.removeItem(this.items.length - 1);
    }
  }

  clearAll() {
    this.items = [];
    this.itemsChange.emit(this.items);
  }

  get radiusClasses(): string {
    const classes = {
      'none-radius': 'rounded-none',
      'xs-radius': 'rounded-sm',
      'sm-radius': 'rounded-md',
      'md-radius': 'rounded-lg',
      'lg-radius': 'rounded-xl',
      'full-radius': 'rounded-full'
    };
    return classes[this.radius] || 'rounded-md';
  }
}
