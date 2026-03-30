import { Component } from '@angular/core';
import { ThemeService, ThemePalette, ThemeDensity } from '../services/theme.service';
import { FtButtonComponent } from '../shared/components/buttons/button/button.component';
import { FtSelectComponent, SelectOption } from '../shared/components/select/select/select.component';
import { FtToggleComponent } from '../shared/components/toggles/toggle/toggle.component';

@Component({
  selector: 'ft-theme-switcher',
  standalone: true,
  imports: [FtButtonComponent, FtSelectComponent, FtToggleComponent],
  styles: [`
    :host {
      display: inline-block;
      position: relative;
    }
    
    .settings-popover {
      margin: var(--ft-unit-0);
      inset: var(--ft-unit-1800) var(--ft-unit-600) auto auto;
      min-width: var(--ft-unit-7200);
      padding: var(--ft-unit-600);
      background: color-mix(in srgb, var(--ft-color-surface-level-100) 80%, transparent);
      backdrop-filter: blur(var(--ft-unit-500));
      -webkit-backdrop-filter: blur(var(--ft-unit-500));
      border: var(--ft-unit-25) solid var(--ft-color-border-100);
      border-radius: var(--ft-radius-600);
      box-shadow: var(--shadow-lg);
      overflow: visible;
      color: var(--ft-color-on-surface-level-100);
      z-index: var(--ft-z-index-dropdown);
    }

    /* Style the popover specifically for browser positioning */
    .settings-popover:popover-open {
      display: flex;
      flex-direction: column;
      gap: var(--ft-unit-600);
    }

    .settings-group {
      display: flex;
      flex-direction: column;
      gap: var(--ft-unit-300);
    }

    .group-header {
      font-size: var(--ft-text-xs);
      font-weight: var(--font-weight-bold);
      color: var(--ft-color-on-surface-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .mode-toggle-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ft-unit-200) 0;
    }

    .mode-label {
      font-size: var(--ft-text-sm);
      font-weight: var(--font-weight-medium);
    }

    .divider {
      width: 100%;
      height: var(--ft-unit-25);
      background: var(--ft-color-border-100);
    }
  `],
  template: `
    <ft-button 
      variant="ghost" 
      [isLabel]="false" 
      [isPrefixIconClass]="true" 
      prefixIconClass="palette"
      radius="full-radius" 
      popovertarget="themeSettings"
      popovertargetaction="toggle"
      aria-label="Settings">
    </ft-button>
    
    <div id="themeSettings" popover class="settings-popover">
      <!-- Theme Selection -->
      <div class="settings-group">
        <span class="group-header">Personnalisation</span>
        
        <ft-select
          label="Thème Palette"
          [options]="paletteOptions"
          [value]="themeService.palette()"
          variant="outlined"
          radius="md-radius"
          size="sm-size"
          (valueChange)="onPaletteChange($event)"
          aria-label="Select theme palette">
        </ft-select>

        <ft-select
          label="Densité Interface"
          [options]="densityOptions"
          [value]="themeService.density()"
          variant="outlined"
          radius="md-radius"
          size="sm-size"
          (valueChange)="onDensityChange($event)"
          aria-label="Select layout density">
        </ft-select>
      </div>

      <div class="divider"></div>

      <!-- Mode Selection -->
      <div class="settings-group">
        <span class="group-header">Affichage</span>
        
        <div class="mode-toggle-item">
          <span class="mode-label">Mode Sombre</span>
          <ft-toggle 
            [value]="themeService.resolvedMode() === 'dark'"
            (valueChange)="themeService.toggleMode()"
            size="sm-size">
          </ft-toggle>
        </div>
      </div>
    </div>
  `
})
export class ThemeSwitcherComponent {
  paletteOptions: SelectOption[] = [
    { label: 'Standard', value: 'default' },
    { label: 'Nord Oceanic', value: 'nord' },
    { label: 'Dracula Dark', value: 'dracula' },
    { label: 'Minimaliste', value: 'minimalist' }
  ];

  densityOptions: SelectOption[] = [
    { label: 'Compacte', value: 'compact' },
    { label: 'Standard', value: 'comfortable' },
    { label: 'Espacée', value: 'loose' }
  ];

  constructor(public themeService: ThemeService) { }

  onPaletteChange(palette: ThemePalette): void {
    this.themeService.palette.set(palette);
  }

  onDensityChange(density: ThemeDensity): void {
    this.themeService.density.set(density);
  }
}
