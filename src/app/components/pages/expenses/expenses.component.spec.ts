import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesComponent } from './expenses.component';
import { ExpensesService } from '../../../services/expenses/expenses.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Expense } from '../../../models/expense';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;
  let expensesService: jasmine.SpyObj<ExpensesService>;

  beforeEach(async () => {
    const expensesServiceSpy = jasmine.createSpyObj('ExpensesService', [
      'getAllExpenses',
      'getExpenseById',
      'updateExpenseById',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ExpensesComponent],
      providers: [{ provide: ExpensesService, useValue: expensesServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    expensesService = TestBed.inject(
      ExpensesService
    ) as jasmine.SpyObj<ExpensesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load expenses on initialization', () => {
    const content: Expense[] = [
      {
        id: '1',
        amount: 100,
        category: 'Travel',
        date: new Date('2023-01-01'),
        description: 'Trip',
        employeeId: 'E1',
        employeeName: 'John Doe',
        status: 'PENDING',
      },
    ];
    const mockExpenses = {
      content: content,
      totalPages: 1,
    };

    expensesService.getAllExpenses.and.returnValue(of(mockExpenses));

    component.ngOnInit();

    expect(expensesService.getAllExpenses).toHaveBeenCalledWith(0, '');
    expect(component.tableData).toEqual(mockExpenses.content);
    expect(component.totalPages).toEqual(mockExpenses.totalPages);
  });

  it('should change filter and load expenses', () => {
    const mockExpenses = {
      content: [
        {
          id: '1',
          amount: 100,
          category: 'Travel',
          date: '2023-01-01',
          description: 'Trip',
          employeeId: 'E1',
          employeeName: 'John Doe',
          status: 'PENDING',
        },
      ],
      totalPages: 1,
    };

    expensesService.getAllExpenses.and.returnValue(of(mockExpenses));

    component.selectedFilter = 'PENDING';
    component.onFilterChange();

    expect(expensesService.getAllExpenses).toHaveBeenCalledWith(0, 'PENDING');
  });

  it('should sort by Category', () => {
    component.tableData = [
      {
        id: '1',
        category: 'B',
        employeeName: 'Alice',
        amount: 200,
        date: new Date('2023-01-01'),
        description: 'Lunch',
        employeeId: 'E2',
        status: 'PENDING',
      },
      {
        id: '2',
        category: 'A',
        employeeName: 'Bob',
        amount: 100,
        date: new Date('2023-01-01'),
        description: 'Dinner',
        employeeId: 'E1',
        status: 'APPROVED',
      },
    ];

    component.onSort('Category');

    expect(component.tableData[0].category).toBe('A');
  });

  it('should open dialog and fetch expense detail', () => {
    const mockExpense: Expense = {
      id: '1',
      amount: 100,
      category: 'Travel',
      date: new Date('2023-01-01'),
      description: 'Trip',
      employeeId: 'E1',
      employeeName: 'John Doe',
      status: 'PENDING',
    };
    expensesService.getExpenseById.and.returnValue(of(mockExpense));

    component.onOpenDialog(mockExpense);

    expect(component.isDialogOpen).toBeTrue();
    expect(expensesService.getExpenseById).toHaveBeenCalledWith('1');
  });
});
