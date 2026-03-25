import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  HostListener,
  forwardRef,
  input,
  output
} from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
    label: string;
    value: any;
}

@Component({
    selector: 'ft-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    standalone: true,
    imports: [CommonModule, NgClass, NgStyle],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FtSelectComponent),
            multi: true,
        },
    ],
})
export class FtSelectComponent implements OnInit, ControlValueAccessor {
    // Inputs
    readonly options = input<SelectOption[]>([]);
    readonly multiple = input(false);
    readonly isLabel = input(true);
    readonly label = input<string>();
    readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
    readonly color = input<'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('primary');
    readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('flat');
    readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');
    @Input() state:
        | 'rest'
        | 'hover'
        | 'press'
        | 'focus'
        | 'readonly'
        | 'disabled'
        | 'invalid' = 'rest';
    @Input() disabled = false;
    readonly readonly = input(false);
    readonly required = input(false);
    @Input() invalid = false;
    @Input() placeholder?: string;
    @Input() isDescription = false;
    @Input() description?: string;
    @Input() errorMessage?: string;
    readonly labelPlacement = input<'label-inside' | 'label-outside' | 'label-outside-left'>('label-inside');
    @Input() startContent?: string;
    @Input() endContent?: string;
    readonly isPrefixIconClass = input(false);
    @Input() prefixIconClass = '';
    readonly isSuffix1IconClass = input(false);
    @Input() suffix1IconClass = 'close_small';
    readonly isSuffix2IconClass = input(true);
    @Input() suffix2IconClass = 'keyboard_arrow_down';
    readonly isClearable = input(false);
    @Input() value: any | any[] = null;

    // Outputs
    readonly valueChange = output<any | any[]>();

    // State & Internal Properties
    isOpen = false;
    dropdownPosition: 'top' | 'bottom' = 'bottom';
    onChange: any = () => {};
    onTouched: any = () => {};

    constructor(private elementRef: ElementRef) { }

    // Lifecycle Hooks
    ngOnInit() {
        if (this.multiple() && !Array.isArray(this.value)) {
            this.value = this.value ? [this.value] : [];
        }
    }

    // Host Listeners
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.closeDropdown();
        }
    }

    // ControlValueAccessor methods
    writeValue(value: any): void {
        this.value = value;
        if (this.multiple() && !Array.isArray(this.value)) {
            this.value = this.value ? [this.value] : [];
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // Public Methods
    toggleDropdown() {
        if (this.disabled || this.state === 'disabled' || this.readonly() || this.state === 'readonly') {
            return;
        }
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.updateDropdownPosition();
            this.state = 'focus';
        } else {
            this.state = 'rest';
        }
        this.onTouched();
    }

    closeDropdown() {
        this.isOpen = false;
        if (this.state === 'focus') {
            this.state = 'rest';
        }
        this.onTouched();
    }

    selectOption(option: SelectOption, event: Event) {
        event.stopPropagation();
        if (this.multiple()) {
            const currentValues = Array.isArray(this.value) ? [...this.value] : [];
            const index = currentValues.indexOf(option.value);

            if (index === -1) {
                currentValues.push(option.value);
            } else {
                currentValues.splice(index, 1);
            }

            this.value = currentValues;
            this.valueChange.emit(this.value);
            this.onChange(this.value);
        } else {
            this.value = option.value;
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.closeDropdown();
        }
        this.onTouched();
    }

    removeMultipleOption(optionValue: any, event: Event) {
        event.stopPropagation();
        if (this.multiple() && Array.isArray(this.value)) {
            this.value = this.value.filter(val => val !== optionValue);
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    }

    clear(event: Event) {
        event.stopPropagation();
        this.value = this.multiple() ? [] : null;
        this.valueChange.emit(this.value);
        this.onChange(this.value);
        this.onTouched();
    }

    isSelected(optionValue: any): boolean {
        if (this.multiple() && Array.isArray(this.value)) {
            return this.value.includes(optionValue);
        }
        return this.value === optionValue;
    }

    // Getters
    get displayValue(): string {
        if (this.multiple() && Array.isArray(this.value)) {
            const labels = this.value
                .map((val) => this.options().find((opt) => opt.value === val)?.label)
                .filter((label) => label);
            return labels.join(', ');
        }
        const selectedObj = this.options().find((opt) => opt.value === this.value);
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
        return classes[this.radius()] || 'rounded-md';
    }

    // Private Methods
    private updateDropdownPosition() {
        const trigger = this.elementRef.nativeElement.querySelector('.select-wrapper');
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 250;

        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            this.dropdownPosition = 'top';
        } else {
            this.dropdownPosition = 'bottom';
        }
    }
}
