import { Component, signal, ChangeDetectionStrategy, inject, input, model } from '@angular/core';

interface NavItem {
    id: string;
    icon: string;
    label: string;
}

@Component({
    selector: 'ft-side-nav',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.css'
})
export class FtSideNavComponent {
    activeId = model<string>('patients');
    isExpanded = model<boolean>(false);

    navItems = input<NavItem[]>([
        { id: 'patients', label: 'Patients', icon: 'group' },
        { id: 'checkups', label: 'Visites', icon: 'stethoscope' },
        { id: 'schedule', label: 'Agendas', icon: 'event_note' },
        { id: 'treatment', label: 'Hospitalisation', icon: 'syringe' }
    ]);

    setActive(id: string) {
        this.activeId.set(id);
    }

    toggleSidebar() {
        this.isExpanded.set(!this.isExpanded());
    }
}

