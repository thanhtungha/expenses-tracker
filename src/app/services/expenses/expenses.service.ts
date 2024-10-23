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

  getAllExpenses(page: number, status?: string): Observable<any> {
    console.log('Get All Expenses: page: ' + page + ', status: ' + status);
    let params = new HttpParams().set('page', page);
    if (status) {
      console.log(status);
      params = params.set('status', status);
    }
    console.log(params);
    return this.httpService.get(this.base_url, params);
  }

  getExpenseById(id: string): Observable<any> {
    console.log('Get Expense by Id:' + id);
    return this.httpService.get(this.base_url + '/' + id);
  }

  updateExpenseById(id: string, isApproved: boolean): Observable<any> {
    console.log('Update expense: ' + id + ', approve: ' + isApproved);
    const params = new HttpParams().set(
      'status',
      isApproved ? 'APPROVED' : 'REJECTED'
    );
    console.log(params);
    return this.httpService.put(this.base_url + '/' + id, null, params);
  }

  getSummary(): Observable<any> {
    console.log('Get Summary');
    return this.httpService.get(this.base_url + '/summary');
  }
}
