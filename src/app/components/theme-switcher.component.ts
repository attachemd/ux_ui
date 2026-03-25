import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { FtButtonComponent } from '../shared/components/buttons/button/button.component';

@Component({
  selector: 'ft-theme-switcher',
  standalone: true,
  imports: [FtButtonComponent],
  styles: `:host {display: flex;}`,
  template: `
    <ft-button 
      variant="ghost" 
      [isLabel]="false" 
      [isPrefixIconClass]="true" 
      [prefixIconClass]="themeService.resolvedMode() === 'dark' ? 'light_mode' : 'dark_mode'"
      radius="full-radius" 
      (click)="themeService.toggleMode()"
      aria-label="Toggle mode">
    </ft-button>
    <ft-button 
      variant="ghost" 
      [isLabel]="false" 
      [isPrefixIconClass]="true" 
      prefixIconClass="palette"
      radius="full-radius" 
      (click)="themeService.cyclePalette()"
      aria-label="Cycle palette">
    </ft-button>
  `
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}
}

