import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ft-toggle',
    standalone: true,
    templateUrl: './ft.toggle.component.html',
    imports: [
        NgClass,
        FormsModule,
        NgIf
    ],
    styleUrls: ['./ft.toggle.component.css'],
    encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtToggleComponent {

    @Input() isLabel = false;
    @Input() label?: string;
    @Input() isDescription = false;
    @Input() description?: string;
    @Input() value = false;
    @Input() disabled = false;
    @Input() invalid = false;
    @Input() size: 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() labelPosition: 'left' | 'right' | 'top' = 'right';
    @Input() variant: 'default' | 'icon' | 'label' = 'default';
    @Input() state: 'hover' | 'press' | 'focus' | 'rest' | 'disabled' = 'rest';

    @Output() valueChange = new EventEmitter<boolean>();

    // Labels for 'label' variant
    @Input() onLabel = 'ON';
    @Input() offLabel = 'OFF';

    // Icons for 'icon' variant (Material Symbols name)
    @Input() onIcon = 'check';
    @Input() offIcon = 'close';

    toggle() {
        if (!this.disabled && this.state !== 'disabled') {
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
    }

}

