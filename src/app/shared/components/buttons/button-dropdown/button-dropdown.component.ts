import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ElementRef,
    HostListener,
    ChangeDetectorRef,
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
    templateUrl: './button-dropdown.component.html',
    styleUrls: ['./button-dropdown.component.css'],
    standalone: true,
    imports: [CommonModule, NgClass, FormsModule],
    encapsulation: ViewEncapsulation.Emulated,
})
export class FtButtonDropdownComponent {
    @Input() label?: string;
    
    @Input() isSplit = false;
    @Input() isIconOnly = false;
    
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
    private optionsVal: DropdownOption[] = [];

    @Input() 
    set options(val: DropdownOption[]) {
        this.optionsVal = val || [];
        this.cdr.markForCheck();
    }
    get options(): DropdownOption[] {
        return this.optionsVal;
    }

    constructor(
        private elementRef: ElementRef,
        private cdr: ChangeDetectorRef
    ) { }

    @HostListener('document:click', ['$event'])
    handleOutsideClick(event: MouseEvent) {
        if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    }

    toggleDropdown() {
        if (this.disabled || this.state === 'disabled') {
            return;
        }
        this.isOpen = !this.isOpen;
        this.cdr.markForCheck();
    }

    closeDropdown() {
        this.isOpen = false;
        this.cdr.markForCheck();
    }

    selectOption(option: DropdownOption, event: Event) {
        event.stopPropagation();
        if (option.disabled || this.disabled) {
            return;
        }
        this.optionSelected.emit(option);
        this.closeDropdown();
    }

    handleMainButtonClick(event: Event) {
        event.stopPropagation();
        if (this.isSplit) {
            this.mainButtonClicked.emit();
        } else {
            this.toggleDropdown();
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
