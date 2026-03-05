import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ft-checkbox',
    templateUrl: './ft.checkbox.component.html',
    standalone: true,
    imports: [
        NgClass,
        FormsModule,
        NgIf
    ],
    styleUrls: ['./ft.checkbox.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class FtCheckboxComponent {

    @Input() isLabel = false;
    @Input() label?: string;
    @Input() isDescription = false;
    @Input() description?: string;
    @Input() checked = false;
    @Input() indeterminate = false;
    @Input() inactive = false;
    @Input() invalid = false;
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() state: 'hover' | 'press' | 'focus' | 'rest' = 'rest';

}
