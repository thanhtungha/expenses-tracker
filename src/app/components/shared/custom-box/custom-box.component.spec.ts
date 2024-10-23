import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBoxComponent } from './custom-box.component';

import { By } from '@angular/platform-browser';

describe('CustomBoxComponent', () => {
  let component: CustomBoxComponent;
  let fixture: ComponentFixture<CustomBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomBoxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind title input correctly', () => {
    const titleValue = 'Test Title';
    component.title = titleValue;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain(titleValue);
  });

  it('should bind value input correctly', () => {
    const valueText = 'Test Value';
    component.value = valueText;
    fixture.detectChanges();
    const valueElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(valueElement.textContent).toContain(valueText);
  });

  it('should have the correct styling', () => {
    const element = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(element.classList).toContain('w-64');
    expect(element.classList).toContain('bg-blue-100');
    expect(element.classList).toContain('rounded-lg');
  });
});
