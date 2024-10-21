import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  itemsPerPage: number = 10; // Number of items per page
  currentPage: number = 1; // Track current page
  totalItems: number = 100; // Total number of items (for example)

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage); // Calculate total pages
  }

  // Methods to navigate pages
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
