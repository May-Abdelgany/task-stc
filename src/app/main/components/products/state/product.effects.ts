import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadProducts, loadProductsSuccess, loadProductsFailure, addProduct, addProductFailure, addProductSuccess } from './product.action';
import { GlobalService } from 'src/app/main/services/global.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ProductEffects {

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            switchMap((action) =>
                this.GlobalService.getData(`products/category/${action.name}`).pipe(
                    map(products => loadProductsSuccess({ products })),
                    catchError(error => of(loadProductsFailure({ error: error.message })))
                )
            )
        )
    );
    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addProduct),
            mergeMap((action) =>
                this.GlobalService.addData('products', action.product).pipe(
                    map((product) => addProductSuccess({ product })),
                    catchError(error => of(addProductFailure({ error: error.message })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private GlobalService: GlobalService,
        private route: ActivatedRoute
    ) {
        //  this.name = window.location.href.split('/').pop();

    }
}
