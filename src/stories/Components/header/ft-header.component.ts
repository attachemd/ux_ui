import { Component, ChangeDetectionStrategy, signal, ViewChild } from '@angular/core';
import { FtButtonComponent } from '../../Buttons/button/ft.button.component';
import { FTBadgeComponent } from '../badge/ft-badge.component';
import { FTSearchComponent } from '../search/ft-search.component';

@Component({
  selector: 'ft-header',
  standalone: true,
  templateUrl: './ft-header.component.html',
  styleUrl: './ft-header.component.css',
  imports: [FtButtonComponent, FTBadgeComponent, FTSearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FTHeaderComponent {
  onSearch(query: string) {
    console.log('Search query:', query);
  }
}
