import { Component, Input, ViewEncapsulation, ContentChildren, QueryList, AfterContentInit, OnChanges, SimpleChanges, ViewChildren, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy, input, output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FtTabComponent } from './tab.component';

export interface TabOption {
    label: string;
    value: any;
    icon?: string;
    disabled?: boolean;
}

@Component({
    selector: 'ft-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css'],
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.Emulated,
})
export class FtTabsComponent implements AfterContentInit, OnChanges, AfterViewInit, OnDestroy {
    @ContentChildren(FtTabComponent) projectedTabs!: QueryList<FtTabComponent>;
    @ViewChildren('tabRef') tabRefs!: QueryList<ElementRef<HTMLButtonElement>>;

    cursorStyle: { [klass: string]: any } = { transform: 'translateX(0)', width: '0px' };
    private resizeObserver: ResizeObserver | null = null;

    constructor(private cdr: ChangeDetectorRef) { }

    readonly tabs = input<TabOption[]>([]);
    @Input() activeTabValue: any = null;
    readonly activeTabValueChange = output<any>();

    readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
    readonly color = input<'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'>('primary');
    readonly variant = input<'flat' | 'faded' | 'outlined' | 'ghost' | 'underlined'>('flat');
    readonly radius = input<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'>('md-radius');
    readonly state = input<'rest' | 'hover' | 'press' | 'focus' | 'active' | 'disabled'>('rest');
    readonly stateIndex = input<number>(1);
    readonly disabled = input<boolean>(false);
    readonly fullWidth = input<boolean>(false);

    effectiveTabs: TabOption[] = [];

    private computeEffectiveTabs() {
        if (this.projectedTabs && this.projectedTabs.length > 0) {
            this.effectiveTabs = this.projectedTabs.map(t => ({
                label: t.label(),
                value: t.value() || t.label(),
                icon: t.icon(),
                disabled: t.disabled()
            }));
        } else {
            this.effectiveTabs = this.tabs();
        }
    }

    ngAfterContentInit() {
        this.computeEffectiveTabs();
        this.updateActiveTabs();
        this.projectedTabs.changes.subscribe(() => {
            this.computeEffectiveTabs();
            this.updateActiveTabs();
        });
    }

    ngAfterViewInit() {
        setTimeout(() => this.updateCursor(), 0);
        this.tabRefs.changes.subscribe(() => {
            setTimeout(() => this.updateCursor(), 0);
            this.setupResizeObserver();
        });
        this.setupResizeObserver();
    }

    private setupResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        if (typeof ResizeObserver !== 'undefined' && this.tabRefs && this.tabRefs.length > 0) {
            this.resizeObserver = new ResizeObserver(() => {
                this.updateCursor();
                this.cdr.markForCheck();
            });

            this.tabRefs.forEach(ref => {
                if (ref.nativeElement) {
                    this.resizeObserver?.observe(ref.nativeElement);
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        let needsCompute = false;
        if (changes['tabs']) {
            needsCompute = true;
        }
        if (needsCompute) {
            this.computeEffectiveTabs();
        }
        if (changes['activeTabValue'] || needsCompute) {
            this.updateActiveTabs();
            setTimeout(() => {
                this.updateCursor();
                this.cdr.markForCheck();
            }, 0);
        }
    }

    private updateActiveTabs() {
        if (!this.projectedTabs) return;

        this.projectedTabs.forEach(tab => {
            tab.active = (this.activeTabValue === (tab.value() || tab.label()));
        });
    }

    selectTab(tab: TabOption) {
        if (!this.disabled() && this.state() !== 'disabled' && !tab.disabled && this.activeTabValue !== tab.value) {
            this.activeTabValue = tab.value;
            this.activeTabValueChange.emit(this.activeTabValue);
            this.updateActiveTabs();

            // Force DOM snapshot explicitly so the layout shifts (e.g., bold font width limits) are visible
            this.cdr.detectChanges();
            this.updateCursor();
        }
    }

    private updateCursor() {
        if (!this.tabRefs || this.tabRefs.length === 0) return;

        const activeIndex = this.effectiveTabs.findIndex(t => (t.value || t.label) === this.activeTabValue);

        if (activeIndex === -1) {
            this.cursorStyle = { transform: 'translateX(0)', width: '0px', opacity: 0 };
            return;
        }

        const activeItem = this.tabRefs.toArray()[activeIndex];
        if (activeItem && activeItem.nativeElement) {
            const { offsetLeft, offsetWidth } = activeItem.nativeElement;
            this.cursorStyle = {
                transform: `translateX(${offsetLeft}px)`,
                width: `${offsetWidth}px`,
                opacity: 1
            };
        }
    }
}
