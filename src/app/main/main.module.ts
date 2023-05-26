import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductsComponent } from './components/products/products.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AllProductsComponent } from './components/user/all-products/all-products.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AllProductsAdminComponent } from './components/admin/all-products-admin/all-products-admin.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormModelComponent } from './form-model/form-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './components/products/state/product.reducer';
import { ProductEffects } from './components/products/state/product.effects';
@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    LoaderComponent,
    AllProductsComponent,
    AllProductsAdminComponent,
    FormModelComponent
  ],
  imports: [
   
    EffectsModule.forFeature([ProductEffects]),
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
})
export class MainModule { }
