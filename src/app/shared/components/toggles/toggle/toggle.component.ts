import { Component, Input, ViewEncapsulation, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ft-toggle',
    standalone: true,
    templateUrl: './toggle.component.html',
    imports: [
    NgClass,
    FormsModule
],
    styleUrls: ['./toggle.component.css'],
    encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtToggleComponent {

    @Input() isLabel = false;
    readonly label = input<string>();
    @Input() isDescription = false;
    readonly description = input<string>();
    @Input() value = false;
    readonly disabled = input(false);
    readonly invalid = input(false);
    readonly size = input<'sm-size' | 'md-size' | 'lg-size'>('md-size');
    readonly labelPosition = input<'left' | 'right' | 'top'>('right');
    readonly variant = input<'default' | 'icon' | 'label'>('default');
    readonly state = input<'hover' | 'press' | 'focus' | 'rest' | 'disabled'>('rest');

    readonly valueChange = output<boolean>();

    // Labels for 'label' variant
    readonly onLabel = input('ON');
    readonly offLabel = input('OFF');

    // Icons for 'icon' variant (Material Symbols name)
    readonly onIcon = input('check');
    readonly offIcon = input('close');

    toggle() {
        if (!this.disabled() && this.state() !== 'disabled') {
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
    }

}

