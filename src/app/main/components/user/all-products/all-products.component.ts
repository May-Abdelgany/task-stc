import { Component, Input } from '@angular/core';
import { GlobalService } from 'src/app/main/services/global.service';
import { LoaderService } from 'src/app/main/services/loader.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {
  allProducts: any[] = []


  constructor(public loaderService: LoaderService, private _GlobalService: GlobalService) {

  }
  ngOnInit() {
    //show all products of one category
    this._GlobalService.products.subscribe((res) => {
      if (res) {
        localStorage.setItem('allProducts', JSON.stringify(res))
        this.allProducts = this._GlobalService.products.getValue()
      }
    })

  }
}
