import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ViewEncapsulation,
    ElementRef,
    HostListener,
} from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';

export interface SelectOption {
    label: string;
    value: any;
}

@Component({
    selector: 'ft-select',
    templateUrl: './ft.select.component.html',
    styleUrls: ['./ft.select.component.css'],
    standalone: true,
    imports: [CommonModule, NgClass, NgStyle],
    encapsulation: ViewEncapsulation.Emulated,
})
export class FTSelectComponent implements OnInit {
    @Input() options: SelectOption[] = [];
    @Input() multiple = false;

    // Standard pattern inputs
    @Input() isLabel = true;
    @Input() label?: string;
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'success'
        | 'warning'
        | 'danger' = 'primary';
    @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
    @Input() radius:
        | 'none-radius'
        | 'xs-radius'
        | 'sm-radius'
        | 'md-radius'
        | 'lg-radius'
        | 'full-radius' = 'md-radius';
    @Input() state:
        | 'rest'
        | 'hover'
        | 'press'
        | 'focus'
        | 'readonly'
        | 'disabled'
        | 'invalid' = 'rest';
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() required = false;
    @Input() invalid = false;
    @Input() placeholder?: string;
    @Input() isDescription = false;
    @Input() description?: string;
    @Input() errorMessage?: string;
    @Input() labelPlacement: 'label-inside' | 'label-outside' | 'label-outside-left' =
        'label-inside';

    // Decorators
    @Input() startContent?: string;
    @Input() endContent?: string;
    @Input() isPrefixIconClass = false;
    @Input() prefixIconClass = '';

    // By default, select has a dropdown arrow
    @Input() isSuffix1IconClass = false;
    @Input() suffix1IconClass = 'close_small';
    @Input() isSuffix2IconClass = true; // Set to true by default for dropdown arrow
    @Input() suffix2IconClass = 'keyboard_arrow_down';

    @Input() isClearable = false;

    // Value bindings
    @Input() value: any | any[] = null;
    @Output() valueChange = new EventEmitter<any | any[]>();

    isOpen = false;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        if (this.multiple && !Array.isArray(this.value)) {
            this.value = this.value ? [this.value] : [];
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    }

    toggleDropdown() {
        if (this.disabled || this.state === 'disabled' || this.readonly || this.state === 'readonly') {
            return;
        }
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.state = 'focus';
        } else {
            this.state = 'rest';
        }
    }

    closeDropdown() {
        this.isOpen = false;
        if (this.state === 'focus') {
            this.state = 'rest';
        }
    }

    selectOption(option: SelectOption, event: Event) {
        event.stopPropagation(); // prevent toggle from closing if we handle it

        if (this.multiple) {
            const currentValues = Array.isArray(this.value) ? [...this.value] : [];
            const index = currentValues.indexOf(option.value);

            if (index === -1) {
                currentValues.push(option.value);
            } else {
                currentValues.splice(index, 1);
            }

            this.value = currentValues;
            this.valueChange.emit(this.value);
        } else {
            this.value = option.value;
            this.valueChange.emit(this.value);
            this.closeDropdown();
        }
    }

    removeMultipleOption(optionValue: any, event: Event) {
        event.stopPropagation();
        if (this.multiple && Array.isArray(this.value)) {
            this.value = this.value.filter(val => val !== optionValue);
            this.valueChange.emit(this.value);
        }
    }

    clear(event: Event) {
        event.stopPropagation();
        this.value = this.multiple ? [] : null;
        this.valueChange.emit(this.value);
    }

    isSelected(optionValue: any): boolean {
        if (this.multiple && Array.isArray(this.value)) {
            return this.value.includes(optionValue);
        }
        return this.value === optionValue;
    }

    get displayValue(): string {
        if (this.multiple && Array.isArray(this.value)) {
            const labels = this.value
                .map((val) => this.options.find((opt) => opt.value === val)?.label)
                .filter((label) => label); // Filter out undefined
            return labels.join(', ');
        }
        const selectedObj = this.options.find((opt) => opt.value === this.value);
        return selectedObj ? selectedObj.label : '';
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
