import { TestBed } from '@angular/core/testing';
import { ExpensesService } from './expenses.service';
import { HttpService } from '../network/http.service';
import { of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get', 'put']);

    TestBed.configureTestingModule({
      providers: [ExpensesService, { provide: HttpService, useValue: spy }],
    });

    service = TestBed.inject(ExpensesService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get expense by id', () => {
    const id = '1';
    const expectedResponse = { id: '1', amount: 100, category: 'Travel' };

    httpServiceSpy.get.and.returnValue(of(expectedResponse));

    service.getExpenseById(id).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(httpServiceSpy.get).toHaveBeenCalledWith(
        `${service.base_url}/${id}`
      );
    });

    expect(httpServiceSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should update expense by id', () => {
    const id = '1';
    const isApproved = true;
    const params = new HttpParams().set('status', 'APPROVED');

    httpServiceSpy.put.and.returnValue(of({ success: true }));

    service.updateExpenseById(id, isApproved).subscribe((response) => {
      expect(response).toEqual({ success: true });
      expect(httpServiceSpy.put).toHaveBeenCalledWith(
        `${service.base_url}/${id}`,
        null,
        params
      );
    });

    expect(httpServiceSpy.put).toHaveBeenCalledTimes(1);
  });

  it('should get summary', () => {
    const expectedResponse = { total: 10, approved: 5 };

    httpServiceSpy.get.and.returnValue(of(expectedResponse));

    service.getSummary().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(httpServiceSpy.get).toHaveBeenCalledWith(
        `${service.base_url}/summary`
      );
    });

    expect(httpServiceSpy.get).toHaveBeenCalledTimes(1);
  });
});
