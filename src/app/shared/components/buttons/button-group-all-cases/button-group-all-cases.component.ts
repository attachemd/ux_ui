import { Component, HostBinding, Input } from '@angular/core';

import { FtButtonGroupComponent, ButtonGroupOption } from '../button-group/button-group.component';

@Component({
    selector: 'app-button-group-showcase',
    templateUrl: './button-group-all-cases.component.html',
    styleUrls: ['./button-group-all-cases.component.css'],
    standalone: true,
    imports: [FtButtonGroupComponent]
})
export class ButtonGroupAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
    color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" = "primary";
    radius: "none-radius" | "xs-radius" | "sm-radius" | "md-radius" | "lg-radius" | "full-radius" = "md-radius";
    flexDirection: 'flex-row' | 'flex-col' = 'flex-row';

    variants: Array<'flat' | 'outlined' | 'faded' | 'ghost'> = [
        'flat',
        'outlined',
        'faded',
        'ghost',
    ];

    states: Array<'rest' | 'hover' | 'press' | 'focus' | 'disabled'> = [
        'rest',
        'hover',
        'press',
        'focus',
        'disabled',
    ];

    buttons: ButtonGroupOption[] = [
        { isLabel: true, label: 'One', value: 1 },
        { isLabel: true, label: 'Two', value: 2 },
        { isLabel: true, label: 'Three', value: 3 }
    ];
}

