import { Injectable, RendererFactory2, Renderer2, Inject, signal, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeConfigService } from './theme-config.service';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemePalette = 'default' | 'nord' | 'dracula' | 'minimalist';
export type ThemeDensity = 'compact' | 'comfortable' | 'loose';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeLink: HTMLLinkElement | null = null;
  private themeConfigService = inject(ThemeConfigService);
  
  // State signals
  mode = signal<ThemeMode>(this.getInitialMode());
  palette = signal<ThemePalette>(this.getInitialPalette());
  density = signal<ThemeDensity>(this.getInitialDensity());

  readonly config = computed(() => this.themeConfigService.getConfig());

  // Resolved mode accounting for system preference
  resolvedMode = computed(() => {
    const currentMode = this.mode();
    if (currentMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return currentMode;
  });

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Effect for DOM synchronization and persistence
    effect(() => {
      const mode = this.resolvedMode();
      const palette = this.palette();
      const density = this.density();
      
      const root = this.document.documentElement;
      
      // Update data attributes
      this.renderer.setAttribute(root, 'data-mode', mode);
      this.renderer.setAttribute(root, 'data-theme', palette);
      this.renderer.setAttribute(root, 'data-density', density);
 
      // Persistence
      localStorage.setItem('theme-mode', this.mode());
      localStorage.setItem('theme-palette', palette);
      localStorage.setItem('theme-density', density);
      
      // Legacy support (optional, remove if not needed)
      if (mode === 'dark') {
        this.renderer.addClass(this.document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'dark-theme');
      }

      this.updateThemeLink(palette);
      this.themeConfigService.loadConfig(palette);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.mode() === 'system') {
        // Trigger re-computation by "refreshing" the signal
        this.mode.set('system');
      }
    });
  }

  toggleMode(): void {
    const nextMode: ThemeMode = this.mode() === 'light' ? 'dark' : 'light';
    this.mode.set(nextMode);
  }

  cyclePalette(): void {
    const palettes: ThemePalette[] = ['default', 'nord', 'dracula', 'minimalist'];
    const currentIndex = palettes.indexOf(this.palette());
    const nextIndex = (currentIndex + 1) % palettes.length;
    this.palette.set(palettes[nextIndex]);
  }

  cycleDensity(): void {
    const densities: ThemeDensity[] = ['compact', 'comfortable', 'loose'];
    const currentIndex = densities.indexOf(this.density());
    const nextIndex = (currentIndex + 1) % densities.length;
    this.density.set(densities[nextIndex]);
  }

  private getInitialMode(): ThemeMode {
    const saved = localStorage.getItem('theme-mode') as ThemeMode;
    return saved || 'light';
  }

  private getInitialPalette(): ThemePalette {
    const saved = localStorage.getItem('theme-palette') as ThemePalette;
    return saved || 'default';
  }

  private getInitialDensity(): ThemeDensity {
    const saved = localStorage.getItem('theme-density') as ThemeDensity;
    return saved || 'comfortable';
  }

  private updateThemeLink(palette: string): void {
    if (!this.themeLink) {
      this.themeLink = this.document.getElementById('ft-theme-link') as HTMLLinkElement;
      if (!this.themeLink) {
        this.themeLink = this.renderer.createElement('link', 'http://www.w3.org/1999/xhtml');
        this.renderer.setAttribute(this.themeLink, 'rel', 'stylesheet');
        this.renderer.setAttribute(this.themeLink, 'id', 'ft-theme-link');
        this.renderer.appendChild(this.document.head, this.themeLink);
      }
    }
    this.renderer.setAttribute(this.themeLink, 'href', `/themes/${palette}.css`);
  }
}

