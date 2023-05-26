import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { CryptoService } from 'src/app/services/crypto.service';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { loadProducts } from './state/product.action';
import { Store } from '@ngrx/store';
import { ProductState } from './state/product.state';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  hidden: boolean = false
  name!: string
  allProducts!: any

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  constructor(private _CryptoService: CryptoService, public _GlobalService: GlobalService, private route: ActivatedRoute, private store: Store<{ products: ProductState }>) {

  }

  //get all products of category
  getProducts() {
    this._GlobalService.getData(`products/category/${this.name}`).subscribe((res) => {
      this.allProducts = res
      // if (this.name == 'electronics') {
      //   if (localStorage.getItem('electronics')) {
      //     this.allProducts = JSON.parse(localStorage.getItem('electronics') || '')
      //   } else {
      //     localStorage.setItem('electronics', JSON.stringify(res))
      //   }
      // } else if (this.name == 'jewelery') {
      //   if (localStorage.getItem('jewelery')) {
      //     this.allProducts = JSON.parse(localStorage.getItem('jewelery') || '')
      //   } else {
      //     localStorage.setItem('jewelery', JSON.stringify(res))
      //   }

      // } else if (this.name.includes('women')) {
      //   if (localStorage.getItem('women')) {
      //     this.allProducts = JSON.parse(localStorage.getItem('women') || '')
      //   } else {
      //     localStorage.setItem('women', JSON.stringify(res))
      //   }
      // } else {
      //   if (localStorage.getItem('men')) {
      //     this.allProducts = JSON.parse(localStorage.getItem('men') || '')
      //   } else {
      //     localStorage.setItem('men', JSON.stringify(res))
      //   }
      // }
      this._GlobalService.products.next(this.allProducts)
    })


  }
  ngOnInit(): void {


    this.route.params.subscribe((res) => {
      if (res) {
        this.name = res['name']
        //   this.getProducts()
        this.allProducts = this.store.select(state => state.products.products);
        this.loading$ = this.store.select(state => state.products.loading);
        this.error$ = this.store.select(state => state.products.error);

        this.store.dispatch(loadProducts({ name: this.name }))
        this.allProducts.subscribe((res: any) => {
          if (res.length) {
            console.log(res);

            this._GlobalService.products.next(res)
          }
        })

      }
    })
    let data = JSON.parse(this._CryptoService.decryptionAES(localStorage.getItem('data') || ''))
    if (data.role == 'admin') {
      this.hidden = true
    }
  }
}
