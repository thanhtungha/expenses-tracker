import { NgModule } from '@angular/core';
import { ExpensesService } from './expenses/expenses.service';
import { LoadingService } from './loading/loading.service';
import { HttpService } from './network/http.service';

@NgModule({
  providers: [ExpensesService, LoadingService, HttpService],
})
export class ServicesModule {}
