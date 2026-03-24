import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

/**
 * StatusPillsComponent
 *
 * Renders a list of status pill badges and handles responsive truncation:
 * - Measures real pill widths via a hidden measurement row
 * - Calculates precisely how many pills fit in the available cell width
 * - Shows a "+N more" badge for hidden pills
 *
 * Uses ViewEncapsulation.None so that the shared .status-pill styles
 * from patient-list.component.css are inherited into this component.
 */
@Component({
  selector: 'app-status-pills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="spc-wrapper" #wrapper>
      <!-- MEASURE ROW: always renders all pills, invisible and zero-height,
           used only to get accurate per-pill widths via getBoundingClientRect. -->
      <div class="spc-measure-row" aria-hidden="true">
        @for (pill of pills(); track pill) {
          <span class="status-pill" [class]="pill.toLowerCase()" #measureRef>{{ pill }}</span>
        }
      </div>

      <!-- DISPLAY ROW: only shows pills that fit + badge -->
      <div class="spc-display-row">
        @for (pill of pills(); track pill; let i = $index) {
          @if (i < visibleCount()) {
            <span
              class="status-pill"
              [class]="pill.toLowerCase()"
              [class.status-pill--truncated]="forceTruncate() && i === 0">
              @if (forceTruncate() && i === 0) {
                <!-- Inner block span needed for text-overflow: ellipsis to work
                     inside display:inline-flex (ellipsis requires a block text container) -->
                <span class="pill-text">{{ pill }}</span>
              } @else {
                {{ pill }}
              }
            </span>
          }
        }
        @if (hiddenCount() > 0) {
          <span class="status-pill more-pill" (click)="moreClick.emit($event)">
            +{{ hiddenCount() }}
          </span>
        }
      </div>
    </div>
  `,
  styles: [`
    /* Wrapper: flex row, clips overflow at cell boundary */
    .spc-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
    }

    /* Hidden measurement row — same styles as display row so measurements are accurate */
    .spc-measure-row {
      position: absolute;
      visibility: hidden;
      pointer-events: none;
      display: flex;
      gap: var(--ft-unit-100, 4px);
      align-items: center;
      height: 0;
      overflow: hidden;
      white-space: nowrap;
    }

    /* Visible display row */
    .spc-display-row {
      display: flex;
      gap: var(--ft-unit-100, 4px);
      align-items: center;
      overflow: hidden;
      min-width: 0;
      flex: 1;
    }

    /* ── Status Pill base ─────────────────────────────────────────────── */
    .status-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--ft-unit-50, 2px) var(--ft-unit-300, 12px);
      border-radius: var(--ft-radius-400, 8px);
      font-size: var(--ft-text-2xs, 10px);
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.02em;
      text-transform: capitalize;
      flex-shrink: 0;
      cursor: default;
    }

    /* ── Variant themes ───────────────────────────────────────────────── */
    .status-pill.anonyme {
      background-color: color-mix(in srgb, var(--ft-color-secondary) 15%, transparent);
      color: color-mix(in srgb, var(--ft-color-secondary) 60%, var(--ft-color-mix-z, #000000));
    }

    .status-pill.confidentiel {
      background-color: color-mix(in srgb, var(--ft-color-warning) 15%, transparent);
      color: color-mix(in srgb, var(--ft-color-warning) 50%, var(--ft-color-mix-z, #000000));
    }

    .status-pill.vip {
      background-color: color-mix(in srgb, var(--ft-color-danger) 15%, transparent);
      color: color-mix(in srgb, var(--ft-color-danger) 60%, var(--ft-color-mix-z, #000000));
    }

    /* ── More badge ───────────────────────────────────────────────────── */
    .status-pill.more-pill {
      cursor: pointer;
      background-color: color-mix(in srgb, var(--ft-color-secondary) 10%, transparent);
      color: var(--ft-color-secondary-800);
      border: 1px solid var(--ft-color-border-100);
      padding-left: var(--ft-unit-100, 4px);
      padding-right: var(--ft-unit-100, 4px);
      flex-shrink: 0;
    }

    .status-pill.more-pill:hover {
      background-color: color-mix(in srgb, var(--ft-color-secondary) 20%, transparent);
    }

    /* ── Force-truncated single pill (cell too narrow for natural pill width) ── */
    .status-pill--truncated {
      flex-shrink: 1;
      min-width: 0;
      /* max-width leaves room for the badge + gap */
      max-width: calc(100% - 50px);
    }

    /* text-overflow:ellipsis does NOT work on display:inline-flex directly.
       It requires a block-level text container inside the pill. */
    .status-pill--truncated .pill-text {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
  `],
})
export class StatusPillsComponent implements AfterViewInit, OnChanges, OnDestroy {
  /** The list of status strings to render as pills. */
  readonly pills = input.required<string[]>();

  /** Emitted when the "+N more" badge is clicked. */
  readonly moreClick = output<MouseEvent>();

  protected visibleCount = signal<number>(Infinity as number);
  protected forceTruncate = signal<boolean>(false);
  protected hiddenCount = computed(() =>
    Math.max(0, this.pills().length - (isFinite(this.visibleCount()) ? this.visibleCount() : this.pills().length))
  );

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLElement>;
  @ViewChildren('measureRef') measureRefs!: QueryList<ElementRef<HTMLElement>>;

  /** Gap between pills in px — matches --ft-unit-100 */
  private readonly GAP_PX = 4;
  /** Estimated width of the "+N" badge — wide enough for "+99" */
  private readonly BADGE_WIDTH_PX = 46;

  private observer: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    this.observer = new ResizeObserver(() => this.measure());
    this.observer.observe(this.wrapper.nativeElement);
    // Initial measurement
    this.measure();
  }

  ngOnChanges(): void {
    // When pills input changes, reset to full count and re-measure
    this.visibleCount.set(Infinity as number);
    if (this.wrapper) {
      Promise.resolve().then(() => this.measure());
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private measure(): void {
    if (!this.wrapper || !this.measureRefs) return;

    const containerWidth = this.wrapper.nativeElement.getBoundingClientRect().width;
    if (containerWidth === 0) return;

    const pillElements = this.measureRefs.toArray();
    if (pillElements.length === 0) return;

    // Use the always-rendered measure row to get real pill widths
    const pillWidths = pillElements.map(
      (ref) => ref.nativeElement.getBoundingClientRect().width
    );

    const totalWidth = pillWidths.reduce(
      (sum, w, i) => sum + w + (i > 0 ? this.GAP_PX : 0),
      0
    );

    if (totalWidth <= containerWidth) {
      // All pills fit — show all
      this.visibleCount.set(this.pills().length);
      return;
    }

    // Need to truncate — calculate how many pills fit while reserving badge space
    let visibleCount = 0;
    // Start accumulated with badge + one gap (badge comes after the visible pills)
    let accumulated = this.BADGE_WIDTH_PX + this.GAP_PX;

    for (let i = 0; i < pillWidths.length; i++) {
      const pillWithGap = pillWidths[i] + (i > 0 ? this.GAP_PX : 0);
      if (accumulated + pillWithGap > containerWidth) break;
      accumulated += pillWithGap;
      visibleCount = i + 1;
    }

    // Edge case: no pill fits at its natural width.
    // Force-show 1 pill and let CSS truncate it with ellipsis.
    if (visibleCount === 0 && this.pills().length > 0) {
      visibleCount = 1;
      this.forceTruncate.set(true);
    } else {
      this.forceTruncate.set(false);
    }

    this.visibleCount.set(visibleCount);
  }
}
