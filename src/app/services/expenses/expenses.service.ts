import { Injectable } from '@angular/core';
import { HttpService } from '../network/http.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private readonly httpService: HttpService) {}
  base_url = 'api/expenses';

  getAllExpenses(page: number): Observable<any> {
    console.log('Get All Expenses');
    const params = new HttpParams().set('page', page.toString());
    return this.httpService.get(this.base_url);
  }

  getExpenseById(id: string): Observable<any> {
    console.log('Get Expense by Id:' + id);
    return this.httpService.get(this.base_url + '/' + id);
  }

  updateExpenseById(id: string, isApproved: boolean): Observable<any> {
    console.log('Get All Expenses');
    // const body = { status: isApproved ? 'APPROVED' : 'REJECTED' };
    return this.httpService.put(this.base_url + '/' + id);
  }
}
