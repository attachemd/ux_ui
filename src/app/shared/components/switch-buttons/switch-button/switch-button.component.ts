import { Component, Input, ViewEncapsulation, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';

export interface SwitchButtonOption {
    id: string | number;
    label?: string;
    icon?: string;
    isIconOnly?: boolean;
    disabled?: boolean;
}

@Component({
    selector: 'ft-switch-button',
    templateUrl: './switch-button.component.html',
    styleUrls: ['./switch-button.component.css'],
    standalone: true,
    imports: [NgClass, CommonModule],
    encapsulation: ViewEncapsulation.Emulated
})
export class FtSwitchButtonComponent {
    readonly options = input<SwitchButtonOption[]>([
    { id: 1, label: 'Tableau' },
    { id: 2, label: 'Graphes' }
]);
    @Input() selectedId?: string | number;
    readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
    readonly color = input<'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('neutral');
    readonly variant = input<'text-only' | 'icon-text' | 'icon-only'>('text-only');
    readonly state = input<'rest' | 'disabled'>('rest');
    readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('full-radius');

    readonly selectionChange = output<string | number>();

    selectOption(option: SwitchButtonOption) {
        if (option.disabled || this.state() === 'disabled') return;
        this.selectedId = option.id;
        this.selectionChange.emit(option.id);
    }

    isSelected(id: string | number): boolean {
        return this.selectedId === id;
    }
}

