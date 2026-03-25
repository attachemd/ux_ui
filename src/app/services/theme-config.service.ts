import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

export interface ComponentConfig {
  variant?: string;
  size?: string;
  radius?: string;
  [key: string]: any;
}

export interface ThemeConfig {
  components: {
    [key: string]: ComponentConfig;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeConfigService {
  private http = inject(HttpClient);
  
  // Internal state signal
  readonly config = signal<ThemeConfig>({ 
    components: {
      'ft-table': { variant: 'default' },
      'ft-search': { variant: 'faded' },
      'ft-button': { variant: 'flat' },
      'ft-accordion-item': { variant: 'faded' }
    }
  });

  loadConfig(palette: string): void {
    this.http.get<ThemeConfig>(`/themes/${palette}.json`).pipe(
      catchError(() => this.http.get<ThemeConfig>(`/themes/default.json`))
    ).subscribe(newConfig => {
      this.config.set(newConfig);
    });
  }

  getConfig(): ThemeConfig {
    return this.config();
  }

  getComponentConfig(component: string): ComponentConfig {
    return this.config().components[component] || {};
  }
}
