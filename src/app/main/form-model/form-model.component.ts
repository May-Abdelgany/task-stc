import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { product } from '../models/product.model';
import { GlobalService } from '../services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pattern } from 'src/app/patterns/pattern';
import { Routing } from 'src/app/Routes/app-routes';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addProduct } from '../components/products/state/product.action';
@Component({
  selector: 'app-form-model',
  templateUrl: './form-model.component.html',
  styleUrls: ['./form-model.component.scss']
})
export class FormModelComponent {
  sharedData!: any
  form!: FormGroup
  allCategories: any[] = [];
  product!: product
  type!: string
  constructor(private store: Store, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { id: number, type: string }, private _GlobalService: GlobalService, private router: Router) {
    this.generateForm()
    this.sharedData = data
    this.type = data.type
    if (this.sharedData.id) {
      this.getProduct()
    }

  }

  ngOnInit() {
    this._GlobalService.getData('products/categories').subscribe((res) => {
      this.allCategories = res
    })
  }

  getProduct() {
    this._GlobalService.getData(`products/${this.sharedData.id}`).subscribe((res) => {
      this.product = res
      this.form.patchValue(this.product)
    })
  }

  generateForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(pattern.textEnWithSpace)]],
      description: ['', [Validators.required, Validators.pattern(pattern.descriptionEn)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    })
  }
  get controls(): any {
    return this.form.controls;
  }
  submit() {
    if (this.form.invalid) return
    if (this.sharedData.id) {
      //update product
      this._GlobalService.putData(`products/${this.sharedData.id}`, this.form.value).subscribe((res) => {
        if (res) {
          this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}/${Routing.main.children.products}/${this.controls['category'].value}`])
        }
      })
    } else {
      //add product
      // this._GlobalService.addData('products', this.form.value).subscribe((res) => {
      //   if (res) {
      //     //let allProducts = []
      //     // if (this.controls['category'].value == 'electronics') {
      //     //   allProducts = JSON.parse(localStorage.getItem('electronics') || '')
      //     //   res.id = allProducts[allProducts.length - 1].id++
      //     //   allProducts.push(res)
      //     //   localStorage.setItem('electronics', JSON.stringify(allProducts))
      //     // } else if (this.controls['category'].value == 'jewelery') {
      //     //   allProducts = JSON.parse(localStorage.getItem('jewelery') || '')
      //     //   res.id = allProducts[allProducts.length - 1].id++
      //     //   allProducts.push(res)
      //     //   localStorage.setItem('jewelery', JSON.stringify(allProducts))
      //     // } else if (this.controls['category'].value.includes('women')) {
      //     //   allProducts = JSON.parse(localStorage.getItem('women') || '')
      //     //   res.id = allProducts[allProducts.length - 1].id++
      //     //   allProducts.push(res)
      //     //   localStorage.setItem('women', JSON.stringify(allProducts))
      //     // } else {
      //     //   allProducts = JSON.parse(localStorage.getItem('men') || '')
      //     //   res.id = allProducts[allProducts.length - 1].id++
      //     //   allProducts.push(res)
      //     //   localStorage.setItem('men', JSON.stringify(allProducts))
      //     // }
      //     // this._GlobalService.products.next(allProducts)
      //   }
      // })


      this.store.dispatch(addProduct({ product: this.form.value }));
    }

  }
}

