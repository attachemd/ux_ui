import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentThemeSubject = new BehaviorSubject<string>('light-theme');
  currentTheme$ = this.currentThemeSubject.asObservable();

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  toggleTheme(): void {
    const newTheme = this.currentThemeSubject.value === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  setTheme(theme: string): void {
    this.renderer.removeClass(this.document.body, this.currentThemeSubject.value);
    this.renderer.addClass(this.document.body, theme);
    localStorage.setItem('theme', theme);
    this.currentThemeSubject.next(theme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check for user's system preference
      const prefersDark = window.matchMedia('(prefers-colors-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark-theme' : 'light-theme';
      this.setTheme(initialTheme);
    }
  }
}
