import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { ThemeSwitcherComponent } from './components/theme-switcher.component';
import {
  MedicalConditionStatus,
  MedicalHistoryEntity,
  Note,
} from './types/medical-history.type';
import {
  medicalHistoryEntities,
  notes,
} from './fake-data/medical-history.fake';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Textarea } from 'primeng/textarea';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    ThemeSwitcherComponent,
    ButtonModule,
    FloatLabel,
    FormsModule,
    InputTextModule,
    DialogModule,
    DatePicker,
    Select,
    ToggleSwitch,
    ReactiveFormsModule,
    Textarea,
    AutoComplete,
    IconField,
    InputIcon,
  ],
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
  medicalHistoryEntities: MedicalHistoryEntity[] = medicalHistoryEntities;
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
  items: any[] = [];

  medicalAntecedentForm: FormGroup; // Declare your FormGroup

  // Properties for dropdown/autocomplete options
  medicalConditionSuggestions: any[] = []; // Suggestions for the autocomplete
  statusOptions: any[] = []; // Options for the status select
  relationOptions: any[] = []; // Options for the relation select

  constructor(private renderer: Renderer2, private fb: FormBuilder) {
    // Initialize the form with more descriptive control names
    this.medicalAntecedentForm = this.fb.group({
      medicalConditionName: ['', Validators.required], // 'Valeur' is the medical condition name
      diagnosticDate: [null], // 'Date de diagnostic'
      status: [null], // 'Status'
      isFamilial: [false], // 'Antécédent familial' toggleswitch
      relation: [{ value: null, disabled: true }], // 'Relation', disabled initially if not familial
      isDeceased: [{ value: false, disabled: true }], // 'Décédé' toggleswitch, disabled initially
      note: [''], // 'Note' textarea
    });
  }

  // ngOnInit() {
  //   // this.formGroup = new FormGroup({
  //   //   checked: new FormControl<boolean>(false)
  //   // });
  //   // this.medicalConditionStatuses = [
  //   //   { name: 'Actif'},
  //   //   { name: 'En rémission'},
  //   //   { name: 'Résolu'},
  //   // ];
  //   // this.relations = [
  //   //   { name: 'Parent'},
  //   //   { name: 'Frère/Sœur'},
  //   //   { name: 'Enfant'},
  //   // ];
  // }

  ngOnInit(): void {
    // You can fetch data for autocomplete, selects, etc. here
    // Example:
    this.medicalConditionSuggestions = [
      'Hypertension',
      'Diabète',
      'Asthme',
      'Allergie',
    ]; // Sample data
    this.statusOptions = [
      { name: 'Actif' },
      { name: 'Inactif' },
      { name: 'Guéri' },
    ]; // Sample data
    this.relationOptions = [
      { name: 'Père' },
      { name: 'Mère' },
      { name: 'Frère' },
      { name: 'Sœur' },
      { name: 'Enfant' },
    ]; // Sample data

    // Subscribe to changes in the 'isFamilial' control to enable/disable related fields
    this.medicalAntecedentForm
      .get('isFamilial')
      ?.valueChanges.subscribe((isFamilial) => {
        const relationControl = this.medicalAntecedentForm.get('relation');
        const isDeceasedControl = this.medicalAntecedentForm.get('isDeceased');

        if (isFamilial) {
          relationControl?.enable();
          isDeceasedControl?.enable();
        } else {
          relationControl?.disable();
          isDeceasedControl?.disable();
          // Optionally reset values when disabled
          relationControl?.reset(null);
          isDeceasedControl?.reset(false);
        }
      });
  }

  searchMedicalConditions(event: any) {
    // Method for autocomplete suggestions, renamed for clarity
    let query = event.query;
    // In a real application, you would filter 'medicalConditionSuggestions' based on the query
    this.medicalConditionSuggestions = [
      'Hypertension',
      'Diabète',
      'Asthme',
      'Allergie',
      'Migraine',
      'Cancer',
    ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }

  clearNoteTextarea() {
    // Method to clear the note textarea using the form control, renamed
    this.medicalAntecedentForm.get('note')?.setValue('');
  }

  saveMedicalAntecedent() {
    // Mark all fields as touched to show validation errors on save attempt
    this.medicalAntecedentForm.markAllAsTouched();

    if (this.medicalAntecedentForm.valid) {
      console.log(
        'Form is valid. Saving data:',
        this.medicalAntecedentForm.value
      );
      // Perform save operation here, using this.medicalAntecedentForm.value
      this.visible = false; // Close dialog on successful save
    } else {
      console.log('Form is invalid. Cannot save.');
      // Optionally, highlight fields with errors or show a general message
    }
  }

  // Helper getter to easily access the 'medicalConditionName' form control in the template
  get medicalConditionNameControl() {
    return this.medicalAntecedentForm.get('medicalConditionName');
  }

  // Helper getter for the note control to check its value in the template
  get noteControl() {
    return this.medicalAntecedentForm.get('note');
  }

  // Helper method to check if a control should show validation errors
  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  search(event: AutoCompleteCompleteEvent) {
    this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
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
    this.listeners.forEach((removeListener) => removeListener());
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
    const isAtBottom =
      parent.scrollTop + parent.clientHeight >= parent.scrollHeight;

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
    return this.comments.find((comment) => comment.id === id);
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

  clearTextarea() {
    this.value5 = null; // Set the model value to null or '' to clear the textarea
  }
}
