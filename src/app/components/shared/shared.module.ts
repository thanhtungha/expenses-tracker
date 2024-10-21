import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomBoxComponent } from './custom-box/custom-box.component';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FormsModule } from '@angular/forms';
import { CustomSortBtnComponent } from './custom-sort-btn/custom-sort-btn.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    CustomBoxComponent,
    CustomFilterComponent,
    CustomTableComponent,
    CustomSortBtnComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    CustomBoxComponent,
    CustomFilterComponent,
    CustomTableComponent,
    CustomSortBtnComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
