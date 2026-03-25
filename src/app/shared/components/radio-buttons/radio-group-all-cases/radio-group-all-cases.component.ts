import { Component, HostBinding } from '@angular/core';
import { FtRadioGroupComponent } from '../radio-group/radio-group.component';

@Component({
    selector: 'app-radio-group-all-cases',
    templateUrl: './radio-group-all-cases.component.html',
    styleUrls: ['./radio-group-all-cases.component.css'],
    standalone: true,
    imports: [FtRadioGroupComponent]
})
export class RadioGroupAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    defaultOptions = [
        { isLabel: true, label: 'Option 1', isDescription: true, description: 'Description 1', value: 'opt1' },
        { isLabel: true, label: 'Option 2', isDescription: false, description: '', value: 'opt2' },
        { isLabel: true, label: 'Option 3', isDescription: true, description: 'Description 3', value: 'opt3' }
    ];

    sizes: Array<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'> = ['xs-size', 'sm-size', 'md-size', 'lg-size'];
    orientations: Array<'flex-row' | 'flex-col'> = ['flex-col', 'flex-row'];
}
