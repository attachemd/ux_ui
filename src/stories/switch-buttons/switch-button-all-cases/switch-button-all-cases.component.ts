import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtSwitchButtonComponent, SwitchButtonOption } from '../switch-button/ft.switch-button.component';

@Component({
    selector: 'app-switch-button-showcase',
    templateUrl: './switch-button-all-cases.component.html',
    styleUrls: ['./switch-button-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FtSwitchButtonComponent]
})
export class SwitchButtonAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    @Input() size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    @Input() color: 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' = 'neutral';
    @Input() radius: 'none-radius' | 'xs-radius' | 'sm-radius' | 'md-radius' | 'lg-radius' | 'full-radius' = 'full-radius';
    
    variants = [
        { name: 'Text Only', options: [{ id: 1, label: 'Tableau' }, { id: 2, label: 'Graphes' }] },
        { name: 'Icon + Text', options: [{ id: 1, label: 'Grid', icon: 'grid_view' }, { id: 2, label: 'List', icon: 'format_list_bulleted' }] },
        { name: 'Icon Only', options: [{ id: 1, icon: 'grid_view', isIconOnly: true }, { id: 2, icon: 'format_list_bulleted', isIconOnly: true }] }
    ];

    states: Array<'rest' | 'disabled'> = ['rest', 'disabled'];
}

