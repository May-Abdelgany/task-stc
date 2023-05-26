import { createAction, props } from '@ngrx/store';
import { product } from 'src/app/main/models/product.model';

export const loadProducts = createAction('[Product] Load Products', props<{name: string }>());
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: product[] }>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: string }>());
export const addProduct = createAction('[Product] Add Product', props<{ product: product }>());
export const addProductSuccess = createAction('[Product] Add Product Success', props<{ product: product }>());
export const addProductFailure = createAction('[Product] Add Product Failure', props<{ error: any }>());