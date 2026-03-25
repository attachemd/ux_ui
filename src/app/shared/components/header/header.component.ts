import { Component, ChangeDetectionStrategy, signal, ViewChild } from '@angular/core';
import { FtButtonComponent } from '../buttons/button/button.component';
import { FtBadgeComponent } from '../badge/badge.component';
import { FtSearchComponent } from '../ft-search/search.component';
import { ThemeSwitcherComponent } from '../../../components/theme-switcher.component';

@Component({
  selector: 'ft-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [FtButtonComponent, FtBadgeComponent, FtSearchComponent, ThemeSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtHeaderComponent {
  onSearch(query: string) {
    console.log('Search query:', query);
  }
}
