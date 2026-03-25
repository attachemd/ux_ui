import { Component, Input, ViewEncapsulation, forwardRef, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FtButtonComponent } from '../button/button.component';

export interface ButtonGroupOption {
    isLabel?: boolean;
    label?: string;
    isPrefixIconClass?: boolean;
    prefixIconClass?: string;
    isSuffixIconClass?: boolean;
    suffixIconClass?: string;
    state?: 'rest' | 'hover' | 'press' | 'focus' | 'disabled';
    value?: any;
}

@Component({
    selector: 'ft-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.css'],
    imports: [
    NgClass,
    FtButtonComponent
],
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FtButtonGroupComponent),
            multi: true
        }
    ]
})
export class FtButtonGroupComponent implements ControlValueAccessor {
    // Global settings for all buttons in the group
    readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
    readonly color = input<'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('primary');
    readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost'>('flat');
    readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');
    @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'disabled' = 'rest';
    readonly flexDirection = input<'flex-row' | 'flex-col'>('flex-row');

    // Individual button configurations
    readonly buttons = input<ButtonGroupOption[]>([
    { isLabel: true, label: 'Option 1', value: '1' },
    { isLabel: true, label: 'Option 2', value: '2' },
    { isLabel: true, label: 'Option 3', value: '3' }
]);

    @Input() value: any;
    readonly valueChange = output<any>();

    onChange: any = () => { };
    onTouched: any = () => { };

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.state = isDisabled ? 'disabled' : 'rest';
    }

    selectOption(btn: ButtonGroupOption) {
        if (this.state !== 'disabled') {
            this.value = btn.value;
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    }

    getButtonState(btn: ButtonGroupOption, index: number): 'rest' | 'hover' | 'press' | 'focus' | 'disabled' {
        if (this.state === 'disabled') return 'disabled';
        if (btn.state) return btn.state;
        return this.state;
    }

    isOptionSelected(btn: ButtonGroupOption): boolean {
        return this.value === btn.value;
    }
}

