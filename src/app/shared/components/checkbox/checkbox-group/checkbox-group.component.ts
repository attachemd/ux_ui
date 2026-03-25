import { Component, Input, ViewEncapsulation, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FtCheckboxComponent } from '../checkbox.component';

export interface CheckboxOption {
    isLabel: boolean;
    label: string;
    isDescription: boolean;
    description: string;
    size?: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size';
    state?: 'hover' | 'press' | 'focus' | 'rest';
    invalid?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
}

@Component({
    selector: 'ft-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    standalone: true,
    imports: [
    NgClass,
    FormsModule,
    FtCheckboxComponent
],
    styleUrls: ['./checkbox-group.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class FtCheckboxGroupComponent {
    @Input() isLabel = false;
    @Input() label?: string;
    readonly isDescription = input(false);
    @Input() description?: string;
    @Input() errorMessage?: string;
    @Input() disabled = false;
    @Input() invalid?: boolean;
    readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
    @Input() flexDirection: 'flex-row' | 'flex-col' = 'flex-col';
    @Input() options: CheckboxOption[] = [
        {
            isLabel: true,
            label: 'Option 1',
            isDescription: false,
            description: ''
        }
    ];
}

