import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FtToggleComponent } from '../toggle/ft.toggle.component';

@Component({
    selector: 'app-toggle-showcase',
    templateUrl: './toggle-all-cases.component.html',
    styleUrls: ['./toggle-all-cases.component.css'],
    standalone: true,
    imports: [CommonModule, FtToggleComponent]
})
export class ToggleAllCasesComponent {
    @HostBinding('class') class = 'showcase';

    isLabel = false;
    label = 'Feature Toggle';
    isDescription = false;
    description = 'Enable or disable this feature';
    size: 'xs-size' | 'sm-size' | 'md-size' | 'lg-size' = 'md-size';
}
