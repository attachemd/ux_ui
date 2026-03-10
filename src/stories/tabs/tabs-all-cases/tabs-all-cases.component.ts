import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FTabsComponent, TabOption } from '../tabs/ft.tabs.component';

@Component({
    selector: 'app-tabs-all-cases',
    templateUrl: './tabs-all-cases.component.html',
    styleUrls: ['./tabs-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FTabsComponent]
})
export class TabsAllCasesComponent {
    variants: Array<'solid' | 'bordered' | 'light' | 'underlined'> = [
        'solid',
        'bordered',
        'light',
        'underlined'
    ];

    colors: Array<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> = [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger'
    ];

    sizes: Array<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'> = [
        'xs-size',
        'sm-size',
        'md-size',
        'lg-size'
    ];

    radiuses: Array<'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius'> = [
        'none-radius',
        'xs-radius',
        'sm-radius',
        'md-radius',
        'lg-radius',
        'full-radius'
    ];

    medicalTabs: TabOption[] = [
        { label: 'Consultation', value: 'consultation', icon: 'stethoscope' },
        { label: 'Prescription', value: 'prescription', icon: 'prescriptions' },
        { label: 'Cerficat', value: 'cerficat', icon: 'receipt_long' },
        { label: 'Orientations', value: 'orientations', icon: 'share' },
        { label: 'Examens', value: 'examens', icon: 'clinical_notes' },
    ];

    activeTab1 = 'consultation';
    activeTab2 = 'prescription';
    activeTab3 = 'cerficat';
}
