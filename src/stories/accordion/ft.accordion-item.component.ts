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
    @Input() expanded: boolean | undefined = false;
    @Input() disabled: boolean = false;

    @Output() expandedChange = new EventEmitter<boolean>();

    toggle() {
        if (this.disabled) return;
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }
}
