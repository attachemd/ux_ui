import { Component, ContentChildren, QueryList, AfterContentInit, OnChanges, SimpleChanges, input } from '@angular/core';

import { FtAccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'ft-accordion',
  standalone: true,
  imports: [],
  template: `
    <div class="ft-accordion" [class.multiple]="multiple()">
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
export class FtAccordionComponent implements AfterContentInit, OnChanges {
  readonly multiple = input(false);
  readonly color = input<'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('neutral');
  readonly state = input<'rest' | 'hover' | 'press' | 'focus' | 'disabled' | 'readonly' | 'invalid'>('rest');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly radius = input<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'pill'>('md');
  readonly variant = input<'flat' | 'ghost' | 'faded' | 'outlined' | 'soft-outlined'>('flat');

  readonly borderColor = input<'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {})>();
  readonly expandedBorderColor = input<'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | (string & {})>();

  @ContentChildren(FtAccordionItemComponent) items!: QueryList<FtAccordionItemComponent>;

  ngOnChanges(changes: SimpleChanges) {
    const forceUpdate = changes['borderColor']?.currentValue === undefined || changes['expandedBorderColor']?.currentValue === undefined;
    if (this.items && (changes['color'] || changes['state'] || changes['size'] || changes['radius'] || changes['variant'] || changes['borderColor'] || changes['expandedBorderColor'])) {
      this.updateItemsProperties(forceUpdate);
    }
  }

  ngAfterContentInit() {
    this.updateItemsProperties();
    this.items.changes.subscribe(() => this.updateItemsProperties());

    this.items.forEach(item => {
      item.expandedChange.subscribe((expanded) => {
        if (expanded && !this.multiple()) {
          this.closeOthers(item);
        }
      });
    });
  }

  private updateItemsProperties(force: boolean = false) {
    this.items.forEach(item => {
      if (!item.colorSetManually) {
        item.color = this.color();
        item.colorSetManually = false;
      }
      if (!item.stateSetManually) {
        item.state = this.state();
        item.stateSetManually = false;
      }
      if (!item.sizeSetManually) {
        item.size = this.size();
        item.sizeSetManually = false;
      }
      if (!item.radiusSetManually) {
        item.radius = this.radius();
        item.radiusSetManually = false;
      }
      if (!item.variantSetManually) {
        item.variant = this.variant();
        item.variantSetManually = false;
      }
      if (!item.borderColorSetManually || force) {
        item.borderColor = this.borderColor();
        item.borderColorSetManually = false;
      }
      if (!item.expandedBorderColorSetManually || force) {
        item.expandedBorderColor = this.expandedBorderColor();
        item.expandedBorderColorSetManually = false;
      }
    });
  }



  private closeOthers(openedItem: FtAccordionItemComponent) {
    this.items.forEach(item => {
      if (item !== openedItem) {
        item.expanded = false;
      }
    });
  }
}
