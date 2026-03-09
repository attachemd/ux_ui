import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtCheckboxGroupComponent } from './ft.checkbox.group.component';
import { By } from '@angular/platform-browser';
import { FtCheckboxComponent } from '../ft.checkbox.component';

describe('FtCheckboxGroupComponent', () => {
    let component: FtCheckboxGroupComponent;
    let fixture: ComponentFixture<FtCheckboxGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FtCheckboxGroupComponent, FtCheckboxComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FtCheckboxGroupComponent);
        component = fixture.componentInstance;
        component.options = [
            { isLabel: true, label: 'Option 1', isDescription: false, description: '' },
            { isLabel: true, label: 'Option 2', isDescription: false, description: '' }
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the group label', () => {
        component.isLabel = true;
        component.label = 'Group Label';
        fixture.detectChanges();
        const labelEl = fixture.debugElement.query(By.css('.group-field-label'));
        expect(labelEl.nativeElement.textContent.trim()).toBe('Group Label');
    });

    it('should render the correct number of checkboxes', () => {
        const checkboxes = fixture.debugElement.queryAll(By.directive(FtCheckboxComponent));
        expect(checkboxes.length).toBe(2);
    });

    it('should apply flex-row class based on flexDirection input', () => {
        component.flexDirection = 'flex-row';
        fixture.detectChanges();
        const content = fixture.debugElement.query(By.css('.group-field-content'));
        expect(content.classes['flex-row']).toBeTrue();
    });

    it('should show error message when invalid is true', () => {
        component.invalid = true;
        component.errorMessage = 'Error';
        fixture.detectChanges();
        const errorEl = fixture.debugElement.query(By.css('.error-text'));
        expect(errorEl.nativeElement.textContent.trim()).toBe('Error');
    });

    it('should apply disabled class to container when disabled is true', () => {
        component.disabled = true;
        fixture.detectChanges();
        const container = fixture.debugElement.query(By.css('.group-field-container'));
        expect(container.classes['disabled']).toBeTrue();
    });
});

