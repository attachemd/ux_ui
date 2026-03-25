import { Component } from '@angular/core';
import { ThemeService, ThemePalette } from '../services/theme.service';
import { FtButtonComponent } from '../shared/components/buttons/button/button.component';
import { FtSelectComponent, SelectOption } from '../shared/components/select/select/select.component';

@Component({
  selector: 'ft-theme-switcher',
  standalone: true,
  imports: [FtButtonComponent, FtSelectComponent],
  styles: `:host {display: flex; gap: 8px; align-items: center;}`,
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
    
    <ft-select
      [options]="paletteOptions"
      [isLabel]="false"
      [value]="themeService.palette()"
      variant="ghost"
      radius="full-radius"
      [isPrefixIconClass]="true"
      prefixIconClass="palette"
      size="sm-size"
      (valueChange)="onPaletteChange($event)"
      aria-label="Select theme palette">
    </ft-select>

    <ft-button 
      variant="ghost" 
      [isLabel]="false" 
      [isPrefixIconClass]="true" 
      prefixIconClass="density_medium"
      radius="full-radius" 
      (click)="themeService.cycleDensity()"
      aria-label="Cycle density">
    </ft-button>
  `
})
export class ThemeSwitcherComponent {
  paletteOptions: SelectOption[] = [
    { label: 'Default', value: 'default' },
    { label: 'Nord', value: 'nord' },
    { label: 'Dracula', value: 'dracula' },
    { label: 'Minimalist', value: 'minimalist' }
  ];

  constructor(public themeService: ThemeService) {}

  onPaletteChange(palette: ThemePalette): void {
    this.themeService.palette.set(palette);
  }
}

