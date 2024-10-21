import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loading = false;

  loading$ = this.loadingSubject.asObservable();

  loadingOn() {
    if (!this.loading) {
      this.loading = true;
      this.loadingSubject.next(this.loading);
    }
  }

  loadingOff() {
    if (this.loading) {
      this.loading = false;
      this.loadingSubject.next(this.loading);
    }
  }
}
