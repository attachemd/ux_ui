import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryStatusComponent } from './medical-history-status.component';

describe('MedicalHistoryStatusComponent', () => {
  let component: MedicalHistoryStatusComponent;
  let fixture: ComponentFixture<MedicalHistoryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

