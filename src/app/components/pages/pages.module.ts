import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SharedModule } from '../shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, ExpensesComponent],
  imports: [CommonModule, SharedModule, NgApexchartsModule, FormsModule],
  exports: [DashboardComponent, ExpensesComponent],
})
export class PagesModule {}
