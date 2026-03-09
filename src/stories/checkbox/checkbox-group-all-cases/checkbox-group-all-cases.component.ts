import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtCheckboxGroupComponent, CheckboxOption } from '../checkbox-group/ft.checkbox.group.component';

@Component({
    selector: 'app-checkbox-group-all-cases',
    templateUrl: './checkbox-group-all-cases.component.html',
    styleUrls: ['./checkbox-group-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FtCheckboxGroupComponent]
})
export class CheckboxGroupAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    defaultOptions: CheckboxOption[] = [
        { isLabel: true, label: 'Option 1', isDescription: true, description: 'Description 1', checked: true },
        { isLabel: true, label: 'Option 2', isDescription: false, description: '', checked: false },
        { isLabel: true, label: 'Option 3', isDescription: true, description: 'Description 3', indeterminate: true }
    ];

    sizes: Array<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'> = ['xs-size', 'sm-size', 'md-size', 'lg-size'];
    orientations: Array<'flex-row' | 'flex-col'> = ['flex-col', 'flex-row'];
}
