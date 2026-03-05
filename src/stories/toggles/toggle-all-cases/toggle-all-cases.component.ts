import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtToggleComponent } from '../toggle/ft.toggle.component';

@Component({
    selector: 'app-toggle-showcase',
    templateUrl: './toggle-all-cases.component.html',
    styleUrls: ['./toggle-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FtToggleComponent]
})
export class ToggleAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    @Input() isLabel = true;
    @Input() label = 'Feature Toggle';
    @Input() isDescription = false;
    @Input() description = 'Enable or disable this feature';
    @Input() size: 'sm-size' | 'md-size' | 'lg-size' = 'sm-size';
    @Input() variant: 'default' | 'icon' | 'label' = 'default';
    @Input() labelPosition: 'left' | 'right' | 'top' = 'right';

    states: Array<'rest' | 'hover' | 'press' | 'focus' | 'disabled' | 'invalid'> = [
        'rest',
        'hover',
        'press',
        'focus',
        'disabled',
        'invalid'
    ];
}
