import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'ft-theme-switcher',
  styles: `:host {display: flex;}`,
  template: `
    <button (click)="themeService.toggleTheme()"><i class="icon-theme"></i></button>
  `
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}
}
