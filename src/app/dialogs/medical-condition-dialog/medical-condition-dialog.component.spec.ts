import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalConditionDialogComponent } from './medical-condition-dialog.component';

describe('MedicalConditionComponent', () => {
  let component: MedicalConditionDialogComponent;
  let fixture: ComponentFixture<MedicalConditionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalConditionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalConditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
