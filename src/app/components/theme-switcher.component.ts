import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'ft-theme-switcher',
  styles: `:host {display: flex;}`,
  template: `
    <button (click)="themeService.toggleTheme()"><span class="material-symbols-rounded">palette</span></button>
  `
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}
}

