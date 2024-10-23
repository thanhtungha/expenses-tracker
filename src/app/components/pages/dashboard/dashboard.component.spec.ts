import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ExpensesService } from '../../../services/expenses/expenses.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockExpensesService: jasmine.SpyObj<ExpensesService>;

  beforeEach(async () => {
    mockExpensesService = jasmine.createSpyObj('ExpensesService', [
      'getSummary',
    ]);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: ExpensesService, useValue: mockExpensesService }],
      schemas: [NO_ERRORS_SCHEMA], // Ignore child component dependencies like app-custom-box, apx-chart
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the categories and statuses data in the charts', () => {
    const mockSummary = {
      totalExpenses: '100',
      totalAmount: 50000,
      categories: {
        Training: 30,
        Meals: 50,
      },
      statuses: {
        APPROVED: 60,
        PENDING: 40,
      },
    };

    mockExpensesService.getSummary.and.returnValue(of(mockSummary));
    fixture.detectChanges();
    expect(component.entriesVal).toBe('100');
    expect(component.spendingVal).toBe('£ 50000');
    expect(component.categoriesChart.labels).toEqual(['Training', 'Meals']);
    expect(component.categoriesChart.series).toEqual([30, 50]);
    expect(component.statusesChart.labels).toEqual(['APPROVED', 'PENDING']);
    expect(component.statusesChart.series).toEqual([60, 40]);
  });
});
