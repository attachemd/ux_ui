import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ElementRef,
    HostListener,
} from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DropdownOption {
    label: string;
    value: any;
    icon?: string;
    disabled?: boolean;
}

@Component({
    selector: 'ft-button-dropdown',
    templateUrl: './ft.button-dropdown.component.html',
    styleUrls: ['./ft.button-dropdown.component.css'],
    standalone: true,
    imports: [CommonModule, NgClass, NgStyle, FormsModule],
    encapsulation: ViewEncapsulation.Emulated,
})
export class FTButtonDropdownComponent {
    @Input() label?: string;
    @Input() options: DropdownOption[] = [];
    @Input() isSplit = false;
    
    // Standard button inputs
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
    @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
    @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'disabled' = 'rest';
    @Input() disabled = false;

    @Input() isPrefixIconClass = false;
    @Input() prefixIconClass = '';

    // Dropdown arrow icon
    @Input() isSuffixIconClass = true;
    @Input() suffixIconClass = 'keyboard_arrow_down';

    @Output() optionSelected = new EventEmitter<DropdownOption>();
    @Output() mainButtonClicked = new EventEmitter<void>();

    isOpen = false;

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    }

    toggleDropdown(event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.disabled || this.state === 'disabled') {
            return;
        }
        this.isOpen = !this.isOpen;
    }

    closeDropdown() {
        this.isOpen = false;
    }

    selectOption(option: DropdownOption, event: Event) {
        event.stopPropagation();
        if (option.disabled || this.disabled) {
            return;
        }
        this.optionSelected.emit(option);
        this.closeDropdown();
    }

    onMainButtonClick(event: Event) {
        if (this.isSplit) {
            event.stopPropagation();
            this.mainButtonClicked.emit();
        } else {
            this.toggleDropdown(event);
        }
    }

    get radiusClasses(): string {
        const classes: Record<string, string> = {
            'none-radius': 'rounded-none',
            'xs-radius': 'rounded-sm',
            'sm-radius': 'rounded-md',
            'md-radius': 'rounded-lg',
            'lg-radius': 'rounded-xl',
            'full-radius': 'rounded-full',
        };
        return classes[this.radius] || 'rounded-md';
    }
}
