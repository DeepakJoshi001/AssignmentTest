import { Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
