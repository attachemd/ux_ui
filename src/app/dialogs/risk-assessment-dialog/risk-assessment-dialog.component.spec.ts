import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentDialogComponent } from './risk-assessment-dialog.component';

describe('RiskAssessmentDialogComponent', () => {
  let component: RiskAssessmentDialogComponent;
  let fixture: ComponentFixture<RiskAssessmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskAssessmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAssessmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
