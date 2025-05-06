import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryHistoryDialogComponent } from './surgery-history-dialog.component';

describe('SurgeryHistoryDialogComponent', () => {
  let component: SurgeryHistoryDialogComponent;
  let fixture: ComponentFixture<SurgeryHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurgeryHistoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurgeryHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
