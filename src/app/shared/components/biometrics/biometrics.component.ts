import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

import { FtAccordionComponent } from '../accordion/accordion.component';
import { FtAccordionItemComponent } from '../accordion/accordion-item.component';

interface AccordionItem {
    label: string;
    value: string | number;
    subValue?: string;
    trendIcon?: string;
    trendColor?: 'success' | 'danger' | 'neutral';
    expanded?: boolean;
}

@Component({
    selector: 'biometrics',
    standalone: true,
    imports: [FtAccordionComponent, FtAccordionItemComponent],
    templateUrl: './biometrics.component.html',
    styleUrl: './biometrics.component.css'
})
export class BiometricsComponent {
    themeService = inject(ThemeService);
    compConfig = computed(() => this.themeService.config().components);

    getVariant(component: string): any {
        return this.compConfig()[component]?.variant;
    }
    biometrics: AccordionItem[] = [
        { label: 'FC (bpm)', value: 64, subValue: '22/05/2025 - 18:20', trendIcon: 'arrow_downward', trendColor: 'neutral' },
        { label: 'Poids (KG)', value: 70, subValue: '15/09/2023 - 07:55', trendIcon: 'arrow_upward', trendColor: 'neutral' },
        { label: 'Taille (CM)', value: 170, subValue: '15/09/2023 - 07:55', trendIcon: 'arrow_downward', trendColor: 'neutral' }
    ];

    cardiovascular: AccordionItem[] = [
        { label: 'T.A SYS (mmHg)', value: 118, subValue: '12/03/2025 - 14:45', trendIcon: 'expand_more', expanded: true },
        { label: 'T.A DIA (mmHg)', value: '--', subValue: '_ _ - _ _' },
        { label: 'T.A DIA (mmHg)', value: 72, subValue: '07/11/2023 - 09:15', trendIcon: 'arrow_upward', trendColor: 'neutral' }
    ];

    others: AccordionItem[] = [
        { label: 'T° (C°)', value: 37, subValue: '19/08/2024 - 16:30', trendIcon: 'arrow_upward', trendColor: 'neutral' },
        { label: 'SPO2 (%)', value: 94, subValue: '30/01/2026 - 11:00', trendIcon: 'arrow_downward', trendColor: 'danger' }
    ];
}
