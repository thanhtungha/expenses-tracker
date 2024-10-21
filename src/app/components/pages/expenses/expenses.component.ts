import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../../services/expenses/expenses.service';
import { Subject, takeUntil } from 'rxjs';

interface Expense {}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent implements OnInit {
  $unSubscribe = new Subject();
  tableColumns: string[] = ['Tab Op 1', 'Option 2', 'Option 3'];
  categoryOptions: string[] = ['Tab Op 1', 'Option 2', 'Option 3'];
  sortOptions: string[] = ['Category', 'Date', 'Status', 'Employee', 'Amount'];
  currentPage: number = 0;

  constructor(private readonly expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.expensesService
      .getAllExpenses(this.currentPage)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe({
        next: (res: any) => {},
        error: (e: any) => {
          console.error(e);
        },
      });
  }

  onTableFilterChange(message: string) {
    console.log('onTableFilterChange:', message);
  }

  onCategoryFilterChange(message: string) {
    console.log('onCategoryFilterChange:', message);
  }

  onSortOptionChange(message: string) {
    console.log('onSortOptionChange:', message);
  }
}
