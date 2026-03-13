import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FTButtonDropdownComponent, DropdownOption } from '../button-dropdown/ft.button-dropdown.component';

@Component({
    selector: 'app-button-dropdown-all-cases',
    templateUrl: './button-dropdown-all-cases.component.html',
    styleUrls: ['./button-dropdown-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FTButtonDropdownComponent]
})
export class ButtonDropdownAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
    @Input() isSplit = false;
    @Input() isIconOnly = false;

    options: DropdownOption[] = [
        { label: 'Option 1', value: 1, icon: 'edit' },
        { label: 'Option 2', value: 2, icon: 'share' },
        { label: 'Option 3', value: 3, icon: 'delete', disabled: true },
    ];

    variants: Array<'flat' | 'outlined' | 'faded' | 'ghost'> = [
        'flat',
        'outlined',
        'faded',
        'ghost',
    ];

    states: Array<'rest' | 'hover' | 'press' | 'focus' | 'disabled'> = [
        'rest',
        'hover',
        'press',
        'focus',
        'disabled',
    ];
}
