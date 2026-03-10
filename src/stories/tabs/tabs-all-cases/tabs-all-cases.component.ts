import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FTabsComponent, TabOption } from '../tabs/ft.tabs.component';
import { FTabComponent } from '../tabs/ft.tab.component';

@Component({
    selector: 'app-tabs-all-cases',
    templateUrl: './tabs-all-cases.component.html',
    styleUrls: ['./tabs-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FTabsComponent, FTabComponent]
})
export class TabsAllCasesComponent {
    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
    @Input() variant: 'flat' | 'faded' | 'outlined' | 'ghost' | 'underlined' = 'flat';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'md-radius';
    @Input() withIcon: boolean = true;

    states: Array<'rest' | 'hover' | 'press' | 'focus' | 'active' | 'disabled'> = [
        'rest',
        'hover',
        'press',
        'focus',
        'active',
        'disabled'
    ];

    medicalTabs: TabOption[] = [
        { label: 'Consultation', value: 'consultation', icon: 'stethoscope' },
        { label: 'Prescription', value: 'prescription', icon: 'prescriptions' },
        { label: 'Cerficat', value: 'cerficat', icon: 'receipt_long' },
        { label: 'Orientations', value: 'orientations', icon: 'share' },
        { label: 'Examens', value: 'examens', icon: 'clinical_notes' },
    ];

    activeTabValues: { [key: string]: string } = {
        'rest': 'consultation',
        'hover': 'consultation',
        'press': 'consultation',
        'focus': 'consultation',
        'active': 'consultation',
        'disabled': 'consultation'
    };

    activeTabContentPanels = 'consultation';

    get tabsToDisplay(): TabOption[] {
        if (this.withIcon) {
            return this.medicalTabs;
        }
        return this.medicalTabs.map(tab => {
            const { icon, ...rest } = tab;
            return rest;
        });
    }
}
