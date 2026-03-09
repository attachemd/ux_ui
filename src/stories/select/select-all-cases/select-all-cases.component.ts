import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FTSelectComponent } from '../select/ft.select.component';

@Component({
    selector: 'app-select-all-cases',
    templateUrl: './select-all-cases.component.html',
    styleUrls: ['./select-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FTSelectComponent]
})
export class SelectAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    @Input() isPrefixIconClass = true;
    @Input() prefixIconClass = 'mail';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
    @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';
    @Input() isDescription = false;
    @Input() multiple = false;
    @Input() placeholder = 'Select an option';
    @Input() startContent?: string;
    @Input() endContent?: string;

    @Input() isSuffix1IconClass = false;
    @Input() suffix1IconClass = 'close_small';
    @Input() isSuffix2IconClass = true;
    @Input() suffix2IconClass = 'keyboard_arrow_down';

    states: Array<'rest' | 'hover' | 'press' | 'focus' | 'readonly' | 'disabled' | 'invalid' | 'with-description'> = [
        'rest',
        'hover',
        'press',
        'focus',
        'readonly',
        'disabled',
        'invalid',
        'with-description',
    ];

    labelPlacements: Array<'label-inside' | 'label-outside' | 'label-outside-left'> = [
        'label-inside',
        'label-outside',
        'label-outside-left',
    ];

    defaultOptions = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
    ];

    mockValueSingle = '';
    mockValueMultiple: string[] = ['opt1', 'opt2'];
}
