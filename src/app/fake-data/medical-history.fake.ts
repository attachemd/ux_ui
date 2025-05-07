import {MedicalHistoryEntity, Note} from "../types/medical-history.type";
import {AllergyDialogComponent} from '../dialogs/allergy-dialog/allergy-dialog.component';
import {RiskAssessmentDialogComponent} from '../dialogs/risk-assessment-dialog/risk-assessment-dialog.component';
import {MedicalConditionDialogComponent} from '../dialogs/medical-condition-dialog/medical-condition-dialog.component';
import {TreatmentDialogComponent} from '../dialogs/treatment-dialog/treatment-dialog.component';
import {VaccinationDialogComponent} from '../dialogs/vaccination-dialog/vaccination-dialog.component';
import {SurgeryHistoryDialogComponent} from '../dialogs/surgery-history-dialog/surgery-history-dialog.component';

export let medicalHistoryEntities: MedicalHistoryEntity[] = [
  {
    title: 'Allergies', blocks:
      [
        {title: 'Penicillin', status: 'Severe', class: 'chip-color-level3', note: 'Anaphylaxis'},
        {title: 'Dust Mites', status: 'Mild', class: 'chip-color-level2'},
      ], dialogComponent: AllergyDialogComponent, focusOnShow: false
  },
  {
    title: 'Facteurs de risque', blocks:
      [
        {title: 'Cardiovascular Risk', status: 'Severe', class: 'chip-color-level3'},
        {title: 'Diabetes Risk', status: 'Medium', class: 'chip-color-level2', note: 'parent relation'},
        {title: 'Fall Risk (Elderly)', status: 'Low', class: 'chip-color-level1'},
      ], dialogComponent: RiskAssessmentDialogComponent
  },
  {
    title: 'Antécédents médicaux', blocks:
      [
        {title: 'Hypertension', status: 'Active', class: 'chip-color-normal'},
        {title: 'class 2 Diabetes', status: 'Active', class: 'chip-color-normal'},
      ], dialogComponent: MedicalConditionDialogComponent
  },
  {
    title: 'Traitements', blocks:
      [
        {title: 'Amoxicilline 500mg', status: 'Ongoing', class: 'chip-color-ongoing'},
        {title: 'Floxin 20mg', status: 'Done', class: 'chip-color-done'},
      ], dialogComponent: TreatmentDialogComponent
  },
  {
    title: 'Vaccinations', blocks:
      [
        {title: 'ImmunoBarrier Plus', date: '15/03/2012'},
        {title: 'HealthShield Proactive', date: '29/05/2024', note: 'Next dose due in 2 months'},
        {title: 'VitaProtect Advanced', date: '07/08/2005'},
        {title: 'SafeGuard Elite', date: '22/11/2018'},
        {title: 'ProtectGuard Max', date: '14/06/2010'},
        {title: 'CureShield Ultra', date: '19/04/2023'},
        {title: 'DefendGuard Supreme', date: '03/07/2015', note: 'complication'},
        {title: 'ShieldGuard', date: '11/02/2008'},
        {title: 'VitaDefender', date: '30/09/2013'},
        {title: 'ImmunoDefend Pro', date: '05/12/2020'},
        {title: 'DefendPlus', date: '27/04/2025'},
        {title: 'SafeProtect Advanced', date: '18/05/2002'}
      ], dialogComponent: VaccinationDialogComponent
  },
  {
    title: 'Antécédents chirurgicaux', blocks: [
      {
        title: 'Appendectomy',
        date: '27/11/2004'
      },
      {
        title: 'Knee Replacement',
        date: '13/05/2021'
      }
    ], dialogComponent: SurgeryHistoryDialogComponent
  }
]

export let notes: Note[] = [
  {
    id: 1,
    author: 'Sanna Samar',
    text: 'Je tiens à laisser une note concernant le service que j\'ai reçu ici. J\'ai rencontré un problème avec la coordination des rendez-vous, où les horaires n\'étaient pas toujours respectés. J\'apprécierais une meilleure gestion de l\'emploi du temps pour une expérience plus fluide à l\'avenir.',
    date: 'il y a 23 minutes'
  },
  {
    id: 2,
    author: 'Sanna Samar',
    text: 'J\'ai eu des difficultés à joindre le service client par téléphone. Veuillez améliorer la réactivité.',
    date: 'il y a 10 minutes'
  },
  {
    id: 3,
    quoteId: 2,
    author: 'Dr.Hicham El Youbi',
    text: 'Nous vous remercions de nous avoir informés de ce problème. Nous allons immédiatement examiner nos processus pour améliorer la réactivité de notre service client par téléphone. Votre retour est précieux pour nous.',
    date: 'il y a 18 secondes'
  },
];
