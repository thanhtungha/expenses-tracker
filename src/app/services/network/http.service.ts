import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlService = 'http://localhost:8080/';

  constructor(private readonly http: HttpClient) {}

  /**
   * Construct a GET request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  get(urlPath: string): Observable<any> {
    const newUrl = this.urlService + urlPath;
    return this.http.get(newUrl, { headers });
  }

  /**
   * Construct a POST request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  post(urlPath: string, body = null): Observable<any> {
    const newUrl = this.urlService + urlPath;
    console.log(`Send Post: ${newUrl}`);
    return this.http.post(newUrl, body, { headers });
  }

  /**
   * Construct a PUT request which interprets the body as an `ArrayBuffer` and returns it.
   *
   * @return an `Observable` of the body as an `ArrayBuffer`.
   */
  put(urlPath: string, body = null): Observable<any> {
    const newUrl = this.urlService + urlPath;
    return this.http.put(newUrl, body, { headers });
  }

  /**
   * Construct a DELETE request which interprets the body as JSON and returns it.
   *
   * @return an `Observable` of the body as an `Object`.
   */
  delete(urlPath: string, body = null): Observable<any> {
    const newUrl = this.urlService + urlPath;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body,
    };
    return this.http.delete(newUrl, options);
  }
}
