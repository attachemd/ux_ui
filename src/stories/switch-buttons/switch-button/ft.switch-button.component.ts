import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
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
    templateUrl: './ft.switch-button.component.html',
    styleUrls: ['./ft.switch-button.component.css'],
    standalone: true,
    imports: [NgClass, NgForOf, NgIf, CommonModule],
    encapsulation: ViewEncapsulation.Emulated
})
export class FtSwitchButtonComponent {
    @Input() options: SwitchButtonOption[] = [
        { id: 1, label: 'Tableau' },
        { id: 2, label: 'Graphes' }
    ];
    @Input() selectedId?: string | number;
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'neutral';
    @Input() variant: 'text-only' | 'icon-text' | 'icon-only' = 'text-only';
    @Input() state: 'rest' | 'disabled' = 'rest';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'full-radius';

    @Output() selectionChange = new EventEmitter<string | number>();

    selectOption(option: SwitchButtonOption) {
        if (option.disabled || this.state === 'disabled') return;
        this.selectedId = option.id;
        this.selectionChange.emit(option.id);
    }

    isSelected(id: string | number): boolean {
        return this.selectedId === id;
    }
}
