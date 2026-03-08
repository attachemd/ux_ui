import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtToggleIconButtonComponent } from '../toggle-icon-button/ft.toggle-icon-button.component';

@Component({
    selector: 'app-toggle-icon-button-showcase',
    templateUrl: './toggle.icon.button.all.cases.component.html',
    styleUrls: ['./toggle.icon.button.all.cases.component.css'],
    standalone: true,
    imports: [CommonModule, FtToggleIconButtonComponent]
})
export class ToggleIconButtonAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" = "primary";
    unselectedColor?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger";
    selectedColor?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger";
    radius: "none-radius" | "xs-radius" | "sm-radius" | "md-radius" | "lg-radius" | "full-radius" = "md-radius";

    unselectedVariant: 'flat' | 'outlined' | 'faded' | 'ghost' = 'ghost';
    selectedVariant: 'flat' | 'outlined' | 'faded' | 'ghost' = 'flat';

    states: Array<'rest' | 'hover' | 'press' | 'focus' | 'disabled'> = [
        'rest',
        'hover',
        'press',
        'focus',
        'disabled',
    ];

}
