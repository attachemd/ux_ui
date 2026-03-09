import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ft-toggle-icon-button',
    templateUrl: './ft.toggle-icon-button.component.html',
    imports: [
        FormsModule
    ],
    styleUrls: ['./ft.toggle-icon-button.component.css'],
    encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtToggleIconButtonComponent {

    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'primary';
    @Input() unselectedColor?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
    @Input() selectedColor?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';

    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
    @Input() state: 'rest' | 'hover' | 'press' | 'focus' | 'disabled' = 'rest';

    // Icon configuration
    @Input() iconClass = 'favorite_border';
    @Input() selectedIconClass?: string;

    // Toggle behavior
    @Input() selected: boolean = false;
    @Output() selectedChange = new EventEmitter<boolean>();

    // Variants mapping
    @Input() unselectedVariant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'ghost';
    @Input() selectedVariant: 'flat' | 'faded' | 'outlined' | 'ghost' = 'flat';

    get radiusClasses(): string {
        const classes = {
            'none-radius': 'rounded-none',
            'xs-radius': 'rounded-sm',
            'sm-radius': 'rounded-md',
            'md-radius': 'rounded-lg',
            'lg-radius': 'rounded-xl',
            'full-radius': 'rounded-full'
        };
        return classes[this.radius] || 'rounded-md';
    }

    get currentVariant(): string {
        return this.selected ? this.selectedVariant : this.unselectedVariant;
    }

    get currentColor(): string {
        if (this.selected) {
            return this.selectedColor || this.color;
        } else {
            return this.unselectedColor || this.color;
        }
    }

    get currentIcon(): string {
        return (this.selected && this.selectedIconClass) ? this.selectedIconClass : this.iconClass;
    }

    toggle() {
        if (this.state !== 'disabled') {
            this.selected = !this.selected;
            this.selectedChange.emit(this.selected);
        }
    }

}

