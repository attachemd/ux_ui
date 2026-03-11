import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ft-accordion-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ft.accordion-item.component.html',
    styleUrl: './ft.accordion-item.component.css'
})
export class FTAccordionItemComponent {
    @Input() label: string = '';
    @Input() value: string | number | undefined = '';
    @Input() subValue: string | undefined = '';
    @Input() icon: string | undefined = '';
    @Input() trendIcon: string | undefined = '';
    @Input() trendColor: 'success' | 'danger' | 'neutral' | undefined = 'neutral';
    @Input() actionIcon: string | undefined = '';
    @Input() expanded: boolean | undefined = false;
    @Input() disabled: boolean = false;
    private _color: 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | undefined;
    private _state: 'rest' | 'hover' | 'press' | 'focus' | 'disabled' | 'readonly' | 'invalid' = 'rest';
    private _size: 'sm' | 'md' | 'lg' | undefined;
    private _radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | undefined;
    private _variant: 'flat' | 'ghost' | 'faded' | 'outlined' | 'soft-outlined' | undefined;
    private _borderColor: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {}) | undefined;
    private _expandedBorderColor: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {}) | undefined;

    @Input() set color(value: 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | undefined) {
        this._color = value;
        this.colorSetManually = value !== undefined;
    }
    get color(): 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | undefined {
        return this._color;
    }

    @Input() set state(value: 'rest' | 'hover' | 'press' | 'focus' | 'disabled' | 'readonly' | 'invalid') {
        this._state = value;
        this.stateSetManually = value !== 'rest';
    }
    get state(): 'rest' | 'hover' | 'press' | 'focus' | 'disabled' | 'readonly' | 'invalid' {
        return this._state;
    }

    @Input() set size(value: 'sm' | 'md' | 'lg' | undefined) {
        this._size = value;
        this.sizeSetManually = value !== undefined;
    }
    get size(): 'sm' | 'md' | 'lg' | undefined {
        return this._size;
    }

    @Input() set radius(value: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | undefined) {
        this._radius = value;
        this.radiusSetManually = value !== undefined;
    }
    get radius(): 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | undefined {
        return this._radius;
    }

    @Input() set variant(value: 'flat' | 'ghost' | 'faded' | 'outlined' | 'soft-outlined' | undefined) {
        this._variant = value;
        this.variantSetManually = value !== undefined;
    }
    get variant(): 'flat' | 'ghost' | 'faded' | 'outlined' | 'soft-outlined' | undefined {
        return this._variant;
    }

    @Input() set borderColor(value: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {}) | undefined) {
        this._borderColor = value;
        if (value !== undefined && value !== null && value !== '') {
            this.borderColorSetManually = true;
        } else {
            this.borderColorSetManually = false;
        }
    }
    get borderColor(): 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {}) | undefined {
        return this._borderColor;
    }

    @Input() set expandedBorderColor(value: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {}) | undefined) {
        this._expandedBorderColor = value;
        if (value !== undefined && value !== null && value !== '') {
            this.expandedBorderColorSetManually = true;
        } else {
            this.expandedBorderColorSetManually = false;
        }
    }
    get expandedBorderColor(): 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {}) | undefined {
        return this._expandedBorderColor;
    }

    colorSetManually = false;
    stateSetManually = false;
    sizeSetManually = false;
    radiusSetManually = false;
    variantSetManually = false;
    borderColorSetManually = false;
    expandedBorderColorSetManually = false;

    isSemanticColor(color: string | undefined): boolean {
        if (!color) return false;
        const semanticColors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'neutral'];
        return semanticColors.includes(color);
    }

    get borderClass(): string {
        const classes: string[] = [];
        if (this.color) classes.push(this.color);
        if (this.state) classes.push(this.state);
        if (this.size) classes.push('sz-' + this.size);
        if (this.radius) classes.push('rd-' + this.radius);
        if (this.variant) classes.push('variant-' + this.variant);
        
        if (this.borderColor && this.isSemanticColor(this.borderColor)) {
            classes.push('border-' + this.borderColor);
        }
        
        if (this.expanded && this.expandedBorderColor && this.isSemanticColor(this.expandedBorderColor)) {
            classes.push('expanded-border-' + this.expandedBorderColor);
        }
        
        return classes.join(' ');
    }


    @Output() expandedChange = new EventEmitter<boolean>();
    @Output() actionClick = new EventEmitter<Event>();

    toggle() {
        if (this.disabled) return;
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }

    onActionClick(event: Event) {
        event.stopPropagation();
        this.actionClick.emit(event);
    }
}
