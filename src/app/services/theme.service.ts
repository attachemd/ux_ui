import { Injectable, RendererFactory2, Renderer2, Inject, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemePalette = 'default' | 'nord' | 'dracula';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  
  // State signals
  mode = signal<ThemeMode>(this.getInitialMode());
  palette = signal<ThemePalette>(this.getInitialPalette());

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
      
      const root = this.document.documentElement;
      
      // Update data attributes
      this.renderer.setAttribute(root, 'data-mode', mode);
      this.renderer.setAttribute(root, 'data-theme', palette);

      // Persistence
      localStorage.setItem('theme-mode', this.mode());
      localStorage.setItem('theme-palette', palette);
      
      // Legacy support (optional, remove if not needed)
      if (mode === 'dark') {
        this.renderer.addClass(this.document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'dark-theme');
      }
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
    const palettes: ThemePalette[] = ['default', 'nord', 'dracula'];
    const currentIndex = palettes.indexOf(this.palette());
    const nextIndex = (currentIndex + 1) % palettes.length;
    this.palette.set(palettes[nextIndex]);
  }

  private getInitialMode(): ThemeMode {
    const saved = localStorage.getItem('theme-mode') as ThemeMode;
    return saved || 'light';
  }

  private getInitialPalette(): ThemePalette {
    const saved = localStorage.getItem('theme-palette') as ThemePalette;
    return saved || 'default';
  }
}

