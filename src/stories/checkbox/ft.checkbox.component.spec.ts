import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtCheckboxComponent } from './ft.checkbox.component';
import { By } from '@angular/platform-browser';

describe('FtCheckboxComponent', () => {
    let component: FtCheckboxComponent;
    let fixture: ComponentFixture<FtCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FtCheckboxComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FtCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show label when isLabel is true', () => {
        component.isLabel = true;
        component.label = 'Test Label';
        fixture.detectChanges();
        const labelEl = fixture.debugElement.query(By.css('.label'));
        expect(labelEl.nativeElement.textContent.trim()).toBe('Test Label');
    });

    it('should not show label when isLabel is false', () => {
        component.isLabel = false;
        fixture.detectChanges();
        const labelEl = fixture.debugElement.query(By.css('.label'));
        expect(labelEl).toBeNull();
    });

    it('should show description when isDescription is true', () => {
        component.isDescription = true;
        component.description = 'Test Description';
        fixture.detectChanges();
        const descEl = fixture.debugElement.query(By.css('.description'));
        expect(descEl.nativeElement.textContent.trim()).toBe('Test Description');
    });

    it('should apply checked class when value is true', () => {
        component.value = true;
        fixture.detectChanges();
        const container = fixture.debugElement.query(By.css('.ft-checkbox-field-container'));
        expect(container.classes['checked']).toBeTrue();
    });

    it('should apply indeterminate class when indeterminate is true', () => {
        component.indeterminate = true;
        fixture.detectChanges();
        const container = fixture.debugElement.query(By.css('.ft-checkbox-field-container'));
        expect(container.classes['indeterminate']).toBeTrue();
    });

    it('should apply invalid class when invalid is true', () => {
        component.invalid = true;
        fixture.detectChanges();
        const container = fixture.debugElement.query(By.css('.ft-checkbox-field-container'));
        expect(container.classes['invalid']).toBeTrue();
    });

    it('should apply inactive class when disabled is true', () => {
        component.disabled = true;
        fixture.detectChanges();
        const container = fixture.debugElement.query(By.css('.ft-checkbox-field-container'));
        expect(container.classes['inactive']).toBeTrue();
    });

    it('should apply size class based on size input', () => {
        component.size = 'lg-size';
        fixture.detectChanges();
        const container = fixture.debugElement.query(By.css('.ft-checkbox-field-container'));
        expect(container.classes['lg-size']).toBeTrue();
    });
});

