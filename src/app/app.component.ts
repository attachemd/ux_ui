import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';
import { ThemeSwitcherComponent } from "./components/theme-switcher.component";
import { MedicalHistoryEntity, Note } from './types/medical-history.type';
import { medicalHistoryEntities, notes } from './fake-data/medical-history.fake';
import {ButtonModule} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, ThemeSwitcherComponent, ButtonModule, FloatLabel, FormsModule, InputTextModule, DialogModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'uxui';

  @ViewChild('mainContent') parent!: ElementRef<HTMLElement>;
  @ViewChild('tabBodyContent') child!: ElementRef<HTMLElement>;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  private touchStartY = 0;
  private previousTouchY = 0;
  private listeners: (() => void)[] = [];

  isModalOpen: boolean = false; // Property to control modal visibility
  medicalHistoryEntities: MedicalHistoryEntity[] = medicalHistoryEntities

  comments: Note[] = notes;
  value2: any;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
  }

  private setupEventListeners(): void {
    // Wheel event for desktop
    const wheelListener = this.renderer.listen(
      this.child?.nativeElement,
      'wheel',
      (e: WheelEvent) => this.handleWheel(e)
    );
    this.listeners.push(wheelListener);

    // Touch events for mobile
    const touchStartListener = this.renderer.listen(
      this.child.nativeElement,
      'touchstart',
      (e: TouchEvent) => this.handleTouchStart(e)
    );
    this.listeners.push(touchStartListener);

    const touchMoveListener = this.renderer.listen(
      this.child.nativeElement,
      'touchmove',
      (e: TouchEvent) => this.handleTouchMove(e)
    );
    this.listeners.push(touchMoveListener);
  }

  private removeEventListeners(): void {
    this.listeners.forEach(removeListener => removeListener());
  }

  private handleWheel(e: WheelEvent): void {
    const delta = e.deltaY;
    const direction = delta > 0 ? 'down' : 'up';
    if (this.shouldScrollParent(direction)) {
      e.preventDefault();
      this.parent.nativeElement.scrollTop += delta;
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
      this.parent.nativeElement.scrollTop += delta;
    }
  }

  private shouldScrollParent(direction: 'up' | 'down'): boolean {
    const parent = this.parent.nativeElement;
    const isAtTop = parent.scrollTop <= 0;
    const isAtBottom = parent.scrollTop + parent.clientHeight >= parent.scrollHeight;

    if (direction === 'down') {
      return !isAtBottom; // Scroll parent if not at bottom
    } else {
      return !isAtTop; // Scroll parent if not at top
    }
  }

  /**
   * Finds a comment by its ID.
   * @param id The ID of the comment to find.
   * @returns The comment object if found, otherwise undefined.
   */
  getCommentById(id: number): Note | undefined {
    return this.comments.find(comment => comment.id === id);
  }

  openModal() {
    this.isModalOpen = true;
    // Optional: Add a class to the body to prevent scrolling
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.isModalOpen = false;
    // Optional: Remove the class from the body
    document.body.classList.remove('modal-open');
  }
}
