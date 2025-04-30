import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';
import { ThemeSwitcherComponent } from "./components/theme-switcher.component";
import {MedicalConditionStatus, MedicalHistoryEntity, Note} from './types/medical-history.type';
import { medicalHistoryEntities, notes } from './fake-data/medical-history.fake';
import {ButtonModule} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, ThemeSwitcherComponent, ButtonModule, FloatLabel, FormsModule, InputTextModule, DialogModule, DatePicker, Select, ToggleSwitch, ReactiveFormsModule, Textarea],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  title = 'uxui';

  @ViewChild('mainContent') parent!: ElementRef<HTMLElement>;
  @ViewChild('tabBodyContent') child!: ElementRef<HTMLElement>;

  visible = false;
  // formGroup: FormGroup | undefined;

  showDialog() {
    this.visible = true;
  }

  private touchStartY = 0;
  private previousTouchY = 0;
  private listeners: (() => void)[] = [];

  isModalOpen: boolean = false; // Property to control modal visibility
  medicalHistoryEntities: MedicalHistoryEntity[] = medicalHistoryEntities
  medicalConditionStatuses: MedicalConditionStatus[] | undefined;
  relations: any;
  comments: Note[] = notes;
  value2: any;
  value3: Date | undefined;
  checked = false;
  checked2 = false;
  medicalConditionStatus: MedicalConditionStatus | undefined;
  relation: any;
  value5: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // this.formGroup = new FormGroup({
    //   checked: new FormControl<boolean>(false)
    // });
    this.medicalConditionStatuses = [
      { name: 'Actif'},
      { name: 'En rémission'},
      { name: 'Résolu'},
    ];
    this.relations = [
      { name: 'Parent'},
      { name: 'Frère/Sœur'},
      { name: 'Enfant'},
    ];
  }

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
