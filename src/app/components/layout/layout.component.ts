import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(private readonly router: Router) {}
  navigateTo(page: string): void {
    console.log(page);
    this.router.navigate([page]);
  }
}
