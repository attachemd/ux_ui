import {
  Directive,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  output,
  inject,
} from '@angular/core';

/**
 * OverflowDetectDirective
 *
 * Attaches a ResizeObserver to the host element and emits `overflowChange`
 * whenever the element transitions between overflowing and not overflowing
 * horizontally. Use this on the inner content container of a cell to
 * know when to show/hide the '+more' button.
 *
 * Usage:
 *   <div class="cell-text" appOverflowDetect (overflowChange)="overflows = $event">
 */
@Directive({
  selector: '[appOverflowDetect]',
  standalone: true,
})
export class OverflowDetectDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);

  /** Emits true when content overflows, false when it fits. */
  readonly overflowChange = output<boolean>();

  private observer: ResizeObserver | null = null;
  private lastState: boolean | null = null;

  ngAfterViewInit(): void {
    this.measure();
    this.observer = new ResizeObserver(() => this.measure());
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private measure(): void {
    const el = this.el.nativeElement as HTMLElement;
    // scrollWidth > clientWidth means content is wider than the visible area
    const overflows = el.scrollWidth > el.clientWidth;
    if (overflows !== this.lastState) {
      this.lastState = overflows;
      this.overflowChange.emit(overflows);
    }
  }
}
