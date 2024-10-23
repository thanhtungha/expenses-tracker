import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

describe('HttpService', () => {
  let service: HttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);

    TestBed.configureTestingModule({
      providers: [HttpService, { provide: HttpClient, useValue: spy }],
    });

    service = TestBed.inject(HttpService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get method and return expected data', () => {
    const urlPath = 'api/expenses';
    const expectedResponse = { data: 'some data' };
    const params = new HttpParams().set('param1', 'value1');

    httpClientSpy.get.and.returnValue(of(expectedResponse));

    service.get(urlPath, params).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(httpClientSpy.get).toHaveBeenCalledWith(
        service.urlService + urlPath,
        {
          headers: jasmine.any(HttpHeaders),
          params: params,
        }
      );
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should call post method and return expected response', () => {
    const urlPath = 'api/expenses';
    const expectedResponse = { success: true };

    httpClientSpy.post.and.returnValue(of(expectedResponse));

    service.post(urlPath, null).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        service.urlService + urlPath,
        null,
        {
          headers: jasmine.any(HttpHeaders),
        }
      );
    });

    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should call put method and return expected response', () => {
    const urlPath = 'api/expenses/1';
    const expectedResponse = { success: true };
    const params = new HttpParams().set('param1', 'value1');

    httpClientSpy.put.and.returnValue(of(expectedResponse));

    service.put(urlPath, null, params).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
      expect(httpClientSpy.put).toHaveBeenCalledWith(
        service.urlService + urlPath,
        null,
        {
          headers: jasmine.any(HttpHeaders),
          params: params,
        }
      );
    });

    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
  });
});
