import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsFailure, addProduct, addProductSuccess, addProductFailure } from './product.action';
import { ProductState } from './product.state'
export const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

export const productReducer = createReducer(
    initialState,
    on(loadProducts, state => ({ ...state, loading: true })),
    on(loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false, error: null })),
    on(loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(addProduct, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(addProductSuccess, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
        loading: false,
    })),
    on(addProductFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))

);
