import { Component, ChangeDetectionStrategy, signal, ViewChild } from '@angular/core';
import { FtButtonComponent } from '../../Buttons/button/ft.button.component';
import { FTBadgeComponent } from '../badge/ft-badge.component';
import { FTSearchComponent } from '../search/ft-search.component';
import { ThemeSwitcherComponent } from '../../../app/components/theme-switcher.component';

@Component({
  selector: 'ft-header',
  standalone: true,
  templateUrl: './ft-header.component.html',
  styleUrl: './ft-header.component.css',
  imports: [FtButtonComponent, FTBadgeComponent, FTSearchComponent, ThemeSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FTHeaderComponent {
  onSearch(query: string) {
    console.log('Search query:', query);
  }
}
