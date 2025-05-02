import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
// import Aura from '@primeng/themes/aura';
import {FTThemePreset} from './ft-theme.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      // theme: {
      //   preset: Aura,
      //   options: {
      //     darkModeSelector: '.dark-theme'
      //   }
      // },
      theme: {
        preset: FTThemePreset,
        options: {
          darkModeSelector: '.dark-theme',
          cssLayer: {
            name: 'primeng',
            order: 'properties, theme, base, components, app-variables, icon-font, app-styles, primeng, primeng2, prime-ng-variables, utilities'
          }
        }
      }
    }),
  ],
};
