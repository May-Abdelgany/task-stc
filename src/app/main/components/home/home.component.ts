import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Routing } from 'src/app/Routes/app-routes';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  allCategories: string[] = []
  open: boolean = false
  lang!: string
  constructor(private _GlobalService: GlobalService, private router: Router, public loaderService: LoaderService, private _LangService: LangService) {

  }
  ngOnInit(): void {
    //get language
    this._LangService.lang.subscribe((res) => {
      this.lang = res
    })
    this.getCategories()
  }

  //get all categories
  getCategories() {
    this._GlobalService.getData('products/categories').subscribe((res) => {
      this.allCategories = res

    
      this.productPage(0)
    })
  }

    //go to page of products of first category
  productPage(index: number) {
    this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}/${Routing.main.children.products}/${this.allCategories[index]}`])
  }

  //sidebar open and close
  sidebar() {
    if (this.open) {
      this.open = false
    }
    else {
      this.open = true
    }
  }
   //change language of site
  changeLang(type: string) {
    localStorage.setItem('lang', 'en');
    this._LangService.changeLanguage(type)
  }

  //logout function
  logout() {
    localStorage.removeItem('data')
    this.router.navigate([`${Routing.auth.module}/${Routing.auth.children.login}`])
  }
}
