import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FtButtonComponent } from '../button/ft.button.component';

export interface ButtonGroupOption {
    isLabel?: boolean;
    label?: string;
    isPrefixIconClass?: boolean;
    prefixIconClass?: string;
    isSuffixIconClass?: boolean;
    suffixIconClass?: string;
    state?: 'rest' | 'hover' | 'press' | 'focus' | 'disabled';
}

@Component({
    selector: 'ft-button-group',
    templateUrl: './ft.button-group.component.html',
    styleUrls: ['./ft.button-group.component.css'],
    imports: [
        NgClass,
        NgForOf,
        FtButtonComponent
    ],
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated
})
export class FtButtonGroupComponent {
    // Global settings for all buttons in the group
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
    @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
    @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'disabled' = 'rest';
    @Input() flexDirection: 'flex-row' | 'flex-col' = 'flex-row';

    // Individual button configurations
    @Input() buttons: ButtonGroupOption[] = [
        { isLabel: true, label: 'Option 1' },
        { isLabel: true, label: 'Option 2' },
        { isLabel: true, label: 'Option 3' }
    ];

    getButtonState(btn: ButtonGroupOption, index: number): 'rest' | 'hover' | 'press' | 'focus' | 'disabled' {
        if (btn.state) return btn.state;
        if (this.state === 'disabled' || this.state === 'rest') return this.state;

        // For interactive states, apply only to the second button (or the first if only one exists)
        const targetIndex = this.buttons.length > 1 ? 1 : 0;
        return index === targetIndex ? this.state : 'rest';
    }
}
