import {
  AfterViewInit,
  Component,
  ElementRef, inject,
  OnDestroy,
  Renderer2, signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FtSideNavComponent } from './shared/components/side-nav/side-nav.component';
import { FtHeaderComponent } from './shared/components/header/header.component';
import { FtToastComponent } from './shared/components/toast/toast.component';
import { FtConfirmDialogComponent } from './shared/components/dialog/confirm-dialog.component';
import { FtDynamicDialogComponent } from './shared/components/dialog/dynamic-dialog.component';
import { FtButtonComponent } from './shared/components/buttons/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    FtSideNavComponent,
    FtHeaderComponent,
    FtToastComponent,
    FtConfirmDialogComponent,
    FtDynamicDialogComponent,
  ],
  providers: [],
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
    this._mobileQuery = window.matchMedia('(max-width: 40rem)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  fold() {
    this.expanded.update(v => !v);
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

