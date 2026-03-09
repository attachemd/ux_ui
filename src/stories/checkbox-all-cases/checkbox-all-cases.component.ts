import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtCheckboxComponent } from '../checkbox/ft.checkbox.component';

@Component({
    selector: 'app-checkbox-showcase',
    templateUrl: './checkbox-all-cases.component.html',
    styleUrls: ['./checkbox-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FtCheckboxComponent]
})
export class CheckboxAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    @Input() isLabel = true;
    @Input() label = 'Checkbox';
    @Input() isDescription = false;
    @Input() description = 'Description';
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';

    states: Array<'rest' | 'hover' | 'press' | 'focus' | 'disabled' | 'invalid'> = [
        'rest',
        'hover',
        'press',
        'focus',
        'disabled',
        'invalid'
    ];
}

