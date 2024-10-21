import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, PagesModule, AppRoutingModule, SharedModule],
  exports: [LayoutComponent, SharedModule, PagesModule],
})
export class ComponentsModule {}
