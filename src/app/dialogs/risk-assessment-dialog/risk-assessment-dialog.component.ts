// src/app/dialogs/risk-assessment-dialog/risk-assessment-dialog.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { CommonModule, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import {Textarea} from 'primeng/textarea';
import {DatePicker} from 'primeng/datepicker';


// Define interfaces for options
interface Option {
  name: string;
  value: any; // Or a more specific type
}

interface RiskFactorOption {
  name: string;
  category: string; // Associate risk factor with category
}


@Component({
  selector: 'app-risk-assessment-dialog', // Renamed selector
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    SelectModule,
    InputGroupModule,
    NgIf,
    Textarea,
    DatePicker,
  ],
  providers: [MessageService],
  templateUrl: './risk-assessment-dialog.component.html', // Updated template path
  styleUrl: './risk-assessment-dialog.component.css' // Updated style path
})
export class RiskAssessmentDialogComponent implements OnInit, OnDestroy { // Renamed class

  riskFactorForm: FormGroup;

  // Options
  riskCategories: Option[] = [
    { name: 'Génétique', value: 'Génétique' },
    { name: 'Famille', value: 'Famille' },
    { name: 'Lifestyle', value: 'Lifestyle' },
    { name: 'Environnement', value: 'Environnement' },
    { name: 'Médical', value: 'Médical' },
    { name: 'Autre', value: 'Autre' },
  ];

  riskLevels: Option[] = [
    { name: 'Critique', value: 'Critique' },
    { name: 'Haute', value: 'Haute' },
    { name: 'Moyenne', value: 'Moyenne' },
    { name: 'Faible', value: 'Faible' },
  ];


  // Store all possible risk factors with their categories
  originalRiskFactors: RiskFactorOption[] = [
    { name: 'Antécédents familiaux de cancer', category: 'Famille' },
    { name: 'Obésité', category: 'Lifestyle' },
    { name: 'Tabagisme', category: 'Lifestyle' },
    { name: 'Exposition à l\'amiante', category: 'Environnement' },
    { name: 'Hypertension artérielle', category: 'Médical' },
    { name: 'Diabète de type 2', category: 'Médical' },
    { name: 'Mutation BRCA1/BRCA2', category: 'Génétique' },
    // Add more as needed
  ];

  riskFactorSuggestions: RiskFactorOption[] = [];


  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    this.riskFactorForm = this.fb.group({
      riskCategory: [null],
      riskFactorName: [null, Validators.required],
      evaluationDate: [new Date()],
      riskLevel: [null],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.riskFactorSuggestions = [...this.originalRiskFactors];

    this.riskCategoryControl?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(category => {
      this.riskFactorNameControl?.reset(null);
      this.riskFactorSuggestions = [...this.originalRiskFactors];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get riskCategoryControl(): AbstractControl | null { return this.riskFactorForm.get('riskCategory'); }
  get riskFactorNameControl(): AbstractControl | null { return this.riskFactorForm.get('riskFactorName'); }
  get evaluationDateControl(): AbstractControl | null { return this.riskFactorForm.get('evaluationDate'); }
  get riskLevelControl(): AbstractControl | null { return this.riskFactorForm.get('riskLevel'); }
  get noteControl(): AbstractControl | null { return this.riskFactorForm.get('note'); }


  searchRiskFactors(event: any) {
    const query: string = event.query;
    const selectedCategory = this.riskCategoryControl?.value?.value;

    let filteredFactors: RiskFactorOption[] = [];

    if (selectedCategory) {
      filteredFactors = this.originalRiskFactors.filter(
        (factor) =>
          factor.category === selectedCategory &&
          factor.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filteredFactors = this.originalRiskFactors.filter((factor) =>
        factor.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    this.riskFactorSuggestions = filteredFactors;
  }

  onRiskFactorSelect(event: any) {
    const selectedFactor: RiskFactorOption = event;
    const correspondingCategory = this.riskCategories.find(category => category.value === selectedFactor.category);

    if (correspondingCategory && this.riskCategoryControl) {
      this.riskCategoryControl.setValue(correspondingCategory);
    }
  }

  onRiskCategoryChange() {
    this.riskFactorNameControl?.reset(null);
    this.riskFactorSuggestions = [...this.originalRiskFactors];
  }

  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  saveRiskFactor() {
    this.riskFactorForm.markAllAsTouched();

    if (this.riskFactorForm.valid) {
      const formValue = this.riskFactorForm.value;
      console.log('Form is valid. Saving risk factor:', formValue);

      let formattedDate: string | null = null;
      if (formValue.evaluationDate instanceof Date) {
        if (!isNaN(formValue.evaluationDate.getTime())) {
          const date = formValue.evaluationDate;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`;
        }
      } else if (typeof formValue.evaluationDate === 'string' && formValue.evaluationDate) {
        const dateString = formValue.evaluationDate.trim();
        let parsedDate: Date | null = null;

        if (/^\d{4}$/.test(dateString)) {
          parsedDate = new Date(parseInt(dateString), 0, 1);
        } else if (/^\d{6}$/.test(dateString)) {
          const month = parseInt(dateString.substring(0, 2)) - 1;
          const year = parseInt(dateString.substring(2, 6));
          if (month >= 0 && month < 12) {
            parsedDate = new Date(year, month, 1);
          }
        }

        if (parsedDate && !isNaN(parsedDate.getTime())) {
          const date = parsedDate;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formattedDate = `${day}/${month}/${year}`;
        } else {
          console.warn('Could not parse date string:', dateString);
          formattedDate = null;
        }
      }

      const riskFactorData = {
        title: formValue.riskFactorName?.name || formValue.riskFactorName || 'Facteur de risque non spécifié',
        status: formValue.riskLevel?.name || null,
        class: formValue.riskLevel?.value ? `chip-${formValue.riskLevel.value.toLowerCase()}` : null,
        date: formattedDate,
        note: formValue.note || null,
        riskCategory: formValue.riskCategory?.value || null,
        riskFactor: formValue.riskFactorName?.name || formValue.riskFactorName,
        riskLevel: formValue.riskLevel?.value || null,
      };

      console.log('Saving risk factor data:', riskFactorData);

      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Facteur de risque enregistré avec succès.',
        life: 3000
      });

      this.ref.close(riskFactorData);

    } else {
      console.log('Form is invalid. Cannot save risk factor.');
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire.',
        life: 3000
      });
    }
  }

  closeDialog(data: any = null) {
    this.ref.close(data);
  }

  clearField(controlName: string) {
    const control = this.riskFactorForm.get(controlName);
    if (control) {
      if (controlName === 'evaluationDate' || controlName === 'riskCategory' || controlName === 'riskLevel' || controlName === 'riskFactorName') {
        control.reset(null);
      } else {
        control.reset('');
      }
      if (controlName === 'riskCategory') {
        this.riskFactorSuggestions = [...this.originalRiskFactors];
      }
    }
  }

}

