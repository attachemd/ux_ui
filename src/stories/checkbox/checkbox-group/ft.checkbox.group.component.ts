import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FtCheckboxComponent } from '../ft.checkbox.component';

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
    templateUrl: './ft.checkbox.group.component.html',
    standalone: true,
    imports: [
        NgClass,
        FormsModule,
        NgIf,
        FtCheckboxComponent,
        NgForOf
    ],
    styleUrls: ['./ft.checkbox.group.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class FtCheckboxGroupComponent {
    @Input() isLabel = false;
    @Input() label?: string;
    @Input() isDescription = false;
    @Input() description?: string;
    @Input() errorMessage?: string;
    @Input() disabled = false;
    @Input() invalid?: boolean;
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
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
