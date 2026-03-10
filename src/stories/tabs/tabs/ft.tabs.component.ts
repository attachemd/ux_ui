import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgClass, NgStyle } from '@angular/common';

export interface TabOption {
    label: string;
    value: any;
    icon?: string;
    disabled?: boolean;
}

@Component({
    selector: 'ft-tabs',
    templateUrl: './ft.tabs.component.html',
    styleUrls: ['./ft.tabs.component.css'],
    standalone: true,
    imports: [CommonModule, NgClass, NgStyle],
    encapsulation: ViewEncapsulation.Emulated,
})
export class FTabsComponent {
    @Input() tabs: TabOption[] = [];
    @Input() activeTabValue: any = null;
    @Output() activeTabValueChange = new EventEmitter<any>();

    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
    @Input() variant: 'solid' | 'bordered' | 'light' | 'underlined' = 'solid';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
    @Input() disabled: boolean = false;
    @Input() fullWidth: boolean = false;

    selectTab(tab: TabOption) {
        if (!this.disabled && !tab.disabled && this.activeTabValue !== tab.value) {
            this.activeTabValue = tab.value;
            this.activeTabValueChange.emit(this.activeTabValue);
        }
    }

    get radiusClasses(): string {
        const classes: Record<string, string> = {
            'none-radius': 'rounded-none',
            'xs-radius': 'rounded-sm',
            'sm-radius': 'rounded-md',
            'md-radius': 'rounded-lg',
            'lg-radius': 'rounded-xl',
            'full-radius': 'rounded-full',
        };
        return classes[this.radius] || 'rounded-md';
    }
}
