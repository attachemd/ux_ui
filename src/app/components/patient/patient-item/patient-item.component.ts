import {Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-patient-item',
  imports: [
    RouterOutlet
  ],
  templateUrl: './patient-item.component.html',
  styleUrl: './patient-item.component.css'
})
export class PatientItemComponent implements OnDestroy {
  @ViewChild(RouterOutlet) routerOutlet!: RouterOutlet;
  // @ViewChild('mainContent') parent!: ElementRef<HTMLElement>;
  // @ViewChild('tabBodyContent') child!: ElementRef<HTMLElement>;
child!: HTMLElement;
parent!: HTMLElement;

  private touchStartY = 0;
  private previousTouchY = 0;
  private listeners: (() => void)[] = [];


  constructor(
              private renderer: Renderer2, public parentElementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  onActivate(componentInstance: any): void {
    this.handleActivatedComponent(componentInstance);
  }

  handleActivatedComponent(componentInstance: any): void {
    // Now you have the instance of the activated component
    console.log('Activated Component Instance:', componentInstance);

    // To get the ElementRef, the routed component must expose it.
    // Assuming the routed component has a public 'elementRef' property:
    if (componentInstance && (componentInstance as any).elementRef instanceof ElementRef) {
      const elementRef: ElementRef = (componentInstance as any).elementRef;
      console.log('ElementRef of the activated component:', elementRef.nativeElement);
      // this.parent = elementRef.nativeElement;
      this.parent = this.parentElementRef.nativeElement;
      this.child = elementRef.nativeElement.querySelector('#tabBodyContent');

      this.setupEventListeners();
    } else {
      console.warn('Activated component does not expose a public "elementRef" property.');
    }
  }

  private setupEventListeners(): void {
    // Wheel event for desktop
    const wheelListener = this.renderer.listen(
      this.child,
      'wheel',
      (e: WheelEvent) => this.handleWheel(e)
    );
    this.listeners.push(wheelListener);

    // Touch events for mobile
    const touchStartListener = this.renderer.listen(
      this.child,
      'touchstart',
      (e: TouchEvent) => this.handleTouchStart(e)
    );
    this.listeners.push(touchStartListener);

    const touchMoveListener = this.renderer.listen(
      this.child,
      'touchmove',
      (e: TouchEvent) => this.handleTouchMove(e)
    );
    this.listeners.push(touchMoveListener);
  }

  private removeEventListeners(): void {
    this.listeners.forEach((removeListener) => removeListener());
  }

  private handleWheel(e: WheelEvent): void {
    const delta = e.deltaY;
    const direction = delta > 0 ? 'down' : 'up';
    if (this.shouldScrollParent(direction)) {
      e.preventDefault();
      this.parent.scrollTop += delta;
    }
  }

  private handleTouchStart(e: TouchEvent): void {
    this.touchStartY = e.touches[0].clientY;
    this.previousTouchY = this.touchStartY;
  }

  private handleTouchMove(e: TouchEvent): void {
    const currentY = e.touches[0].clientY;
    const delta = this.previousTouchY - currentY;
    this.previousTouchY = currentY;
    const direction = delta > 0 ? 'down' : 'up';

    if (this.shouldScrollParent(direction)) {
      e.preventDefault();
      this.parent.scrollTop += delta;
    }
  }

  private shouldScrollParent(direction: 'up' | 'down'): boolean {
    const parent = this.parent;
    const isAtTop = parent.scrollTop <= 0;
    const isAtBottom =
      parent.scrollTop + parent.clientHeight >= parent.scrollHeight;

    if (direction === 'down') {
      return !isAtBottom; // Scroll parent if not at bottom
    } else {
      return !isAtTop; // Scroll parent if not at top
    }
  }


}

