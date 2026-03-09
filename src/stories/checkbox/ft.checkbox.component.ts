import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, HostListener } from '@angular/core';
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
    @Input() value = false;
    @Input() indeterminate = false;
    @Input() disabled = false;
    @Input() invalid = false;
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() state: 'hover' | 'press' | 'focus' | 'rest' | 'disabled' = 'rest';

    @Output() valueChange = new EventEmitter<boolean>();

    @HostBinding('attr.tabindex') get tabIndex() {
        return this.disabled || this.state === 'disabled' ? '-1' : '0';
    }

    public toggle() {
        if (!this.disabled && this.state !== 'disabled') {
            this.value = !this.value;
            this.indeterminate = false; // Toggling always clears indeterminate state
            this.valueChange.emit(this.value);
        }
    }

    @HostListener('keydown.space', ['$event'])
    onSpaceDown(event: any) {
        event.preventDefault();
        this.toggle();
    }

}

