import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomBoxComponent } from './custom-box/custom-box.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomBoxComponent],
  imports: [CommonModule, FormsModule],
  exports: [CustomBoxComponent],
})
export class SharedModule {}
