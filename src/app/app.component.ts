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
import { FtSideNavComponent } from '../stories/Components/side-nav/ft.side-nav.component';
import { FTHeaderComponent } from '../stories/Components/header/ft-header.component';
import { FtToastComponent } from '../stories/Components/toast/ft-toast.component';
import { FtConfirmDialogComponent } from '../stories/Components/dialog/ft-confirm-dialog.component';
import { FtDynamicDialogComponent } from '../stories/Components/dialog/ft-dynamic-dialog.component';
import { FtButtonComponent } from '../stories/Buttons/button/ft.button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    FtSideNavComponent,
    FTHeaderComponent,
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

