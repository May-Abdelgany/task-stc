import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRoutes } from './Routes/main-routes';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: MainRoutes.home,
    pathMatch: 'full',
  },
  {
    path: MainRoutes.home,
    component: HomeComponent,
    children: [
      {
        path: `${MainRoutes.products}/:name`,
        component: ProductsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
