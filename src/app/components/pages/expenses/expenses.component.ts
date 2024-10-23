import { Component, inject, OnInit } from '@angular/core';
import { ExpensesService } from '../../../services/expenses/expenses.service';
import { Subject, takeUntil } from 'rxjs';
import { Expense } from '../../../models/expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent implements OnInit {
  $unSubscribe = new Subject();

  //filter
  filterOptions: string[] = ['PENDING', 'APPROVED', 'REJECTED'];
  selectedFilter: string = '';

  //table
  tableColumns: string[] = [
    'Category',
    'Employee',
    'Amount',
    'Date',
    'Description',
    'Status',
  ];
  tableData: Expense[] = [];
  //sorting
  currentSortColumn?: string;
  isAscending: boolean = true;

  //next pages
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  //dialog
  isDialogOpen: boolean = false;
  selectedExpense?: Expense;

  constructor(private readonly expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    console.log(this.selectedFilter);
    this.expensesService
      .getAllExpenses(this.currentPage, this.selectedFilter)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe({
        next: (res: any) => {
          this.tableData = res.content.map((item: any) => ({
            id: item.id,
            amount: item.amount,
            category: item.category,
            date: item.date,
            description: item.description,
            employeeId: item.employeeId,
            employeeName: item.employeeName,
            status: item.status,
          }));

          console.log(this.tableData);

          this.totalPages = res.totalPages;
          console.log(this.totalPages);
          this.reSort();
        },
        error: (e: any) => {
          console.error(e);
        },
      });
  }

  reSort() {
    switch (this.currentSortColumn) {
      case 'Category':
        this.sortCategory();
        break;
      case 'Employee':
        this.sortEmployee();
        break;
      case 'Amount':
        this.sortAmount();
        break;
      case 'Date':
        this.sortDate();
        break;
      case 'Status':
        this.sortStatus();
        break;
    }
  }

  onSort(column: string): void {
    if (this.currentSortColumn === column) {
      // Toggle sorting order if the same column is clicked again
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.reSort();
  }

  sortCategory() {
    this.tableData.sort((a, b) => {
      const valueA = a.category;
      const valueB = b.category;

      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  sortEmployee() {
    this.tableData.sort((a, b) => {
      const valueA = a.employeeName;
      const valueB = b.employeeName;

      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  sortAmount() {
    this.tableData.sort((a, b) => {
      const valueA = a.amount;
      const valueB = b.amount;

      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  sortDate() {
    this.tableData.sort((a, b) => {
      const dateA = new Date(a.date).getTime(); // Convert string to timestamp
      const dateB = new Date(b.date).getTime();

      return this.isAscending ? dateA - dateB : dateB - dateA; // Ascending or descending
    });
  }

  sortStatus() {
    this.tableData.sort((a, b) => {
      const valueA = a.status;
      const valueB = b.status;

      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  // Methods to navigate pages
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.loadPage();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.loadPage();
  }

  onFilterChange() {
    this.loadPage();
  }

  onOpenDialog(expense: Expense) {
    this.isDialogOpen = true;
    this.getExpenseDetail(expense.id);
  }

  onApprove() {
    this.closeDialog();
    this.updateExpenseStatus(true);
  }

  onReject() {
    this.closeDialog();
    this.updateExpenseStatus(false);
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  getExpenseDetail(id: string) {
    this.expensesService
      .getExpenseById(id)
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe({
        next: (res: any) => {
          this.selectedExpense = res;
        },
        error: (e: any) => {
          console.error(e);
        },
      });
  }

  updateExpenseStatus(isApproved: boolean) {
    console.log(this.selectedExpense);
    if (this.selectedExpense) {
      this.expensesService
        .updateExpenseById(this.selectedExpense.id, isApproved)
        .pipe(takeUntil(this.$unSubscribe))
        .subscribe({
          next: (res: any) => {
            console.log('Tung' + res);
            const expenseToUpdate = this.tableData.find(
              (expense) => expense.id === res.id
            );
            if (expenseToUpdate) {
              Object.assign(expenseToUpdate, res);
            }

            this.reSort();
          },
          error: (e: any) => {
            console.error(e);
          },
        });
    }
  }
}
