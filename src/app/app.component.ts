import {
  AfterViewInit,
  Component,
  ElementRef, inject,
  OnDestroy,
  Renderer2, signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { ThemeSwitcherComponent } from './components/theme-switcher.component';

import { ButtonModule } from 'primeng/button';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    ThemeSwitcherComponent,
    ButtonModule,
    DynamicDialogModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  title = 'uxui';


  protected readonly isMobile = signal(true);
  protected readonly expanded = signal(false);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  isElementVisible = false;

  constructor(private renderer: Renderer2) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 40rem)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  fold(snav: any) {
    if (this.isMobile()){
      snav.close()
      return;
    }
    this.expanded.update((expanded) => {
      if(expanded){
        this.isElementVisible = false;
      }
      return !expanded;
    });
    // snav.toggle()
  }

  // Handle transition end event
  onDrawerTransitionEnd(event: TransitionEvent) {
    // Ensure the event is for the `width` property
    if (this.isMobile()){
      return;
    }
    const expanded = this.expanded();
    if (event.propertyName === 'width' && expanded) {
      this.isElementVisible = true; // Toggle visibility
    }
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }




}
