import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutComponent } from './layout.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header correctly', () => {
    const headerElement = fixture.debugElement.query(By.css('header'));
    expect(headerElement.nativeElement.textContent).toContain(
      'Expenses Tracker'
    );
  });

  it('should navigate to dashboard on clicking Dashboard link', async () => {
    spyOn(router, 'navigate');
    const dashboardLink = fixture.debugElement.query(
      By.css('a[routerLink="/dashboard"]')
    );
    dashboardLink.nativeElement.click();

    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  it('should navigate to expenses on clicking Expenses link', async () => {
    spyOn(router, 'navigate');
    const expensesLink = fixture.debugElement.query(
      By.css('a[routerLink="/expenses"]')
    );
    expensesLink.nativeElement.click();

    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/expenses']);
    });
  });
});
