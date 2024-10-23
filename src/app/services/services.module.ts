import { NgModule } from '@angular/core';
import { ExpensesService } from './expenses/expenses.service';
import { HttpService } from './network/http.service';

@NgModule({
  providers: [ExpensesService, HttpService],
})
export class ServicesModule {}
