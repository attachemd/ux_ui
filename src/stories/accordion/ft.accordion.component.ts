import { Component, ContentChildren, Input, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FTAccordionItemComponent } from './ft.accordion-item.component';

@Component({
    selector: 'ft-accordion',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="ft-accordion" [class.multiple]="multiple">
      <ng-content></ng-content>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .ft-accordion {
      display: flex;
      flex-direction: column;
      gap: var(--ft-unit-200);
    }
  `]
})
export class FTAccordionComponent implements AfterContentInit {
    @Input() multiple = false;

    @ContentChildren(FTAccordionItemComponent) items!: QueryList<FTAccordionItemComponent>;

    ngAfterContentInit() {
        this.items.forEach(item => {
            item.expandedChange.subscribe((expanded) => {
                if (expanded && !this.multiple) {
                    this.closeOthers(item);
                }
            });
        });
    }

    private closeOthers(openedItem: FTAccordionItemComponent) {
        this.items.forEach(item => {
            if (item !== openedItem) {
                item.expanded = false;
            }
        });
    }
}
