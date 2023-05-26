import { AfterViewInit, Component, SimpleChanges, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/main/services/loader.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { product } from 'src/app/main/models/product.model';
import { GlobalService } from 'src/app/main/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { FormModelComponent } from 'src/app/main/form-model/form-model.component';
@Component({
  selector: 'app-all-products-admin',
  templateUrl: './all-products-admin.component.html',
  styleUrls: ['./all-products-admin.component.scss']
})
export class AllProductsAdminComponent implements AfterViewInit {
  loading: boolean = true
  allProducts: product[] = []
  Products: product[] = []
  total!: number
  page = 1
  displayedColumns: string[] = ['image', 'title', 'price', 'actions'];
  dataSource!: MatTableDataSource<product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public loaderService: LoaderService, private _GlobalService: GlobalService, public dialog: MatDialog) {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    //all products and make paginate over all products
    this._GlobalService.products.subscribe((res) => {
      if (res) {
        this.allProducts = this._GlobalService.products.getValue()
  

        this.total = (this.allProducts.length) / 5
        this.paginate(this.allProducts, 5, 1);
      }
    })
  }
  //paginate function 
  paginate(data: product[], itemsPerPage: number, currentPage: number) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.Products = data.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource(this.Products);
    return this.dataSource
  }

  //search function for products
  applyFilter(event: any) {
    let filter = event.value
    this.dataSource.filter = filter.trim().toLowerCase();
    this.total = this.dataSource.filteredData.length / 5
  }
  //update function to open modal of product
  update(id: number) {
    this.openDialog(id, 'update')
  }

  //delete product
  Delete(id: number) {
    this._GlobalService.deleteData(`products/${id}`, {}).subscribe((res) => {
    })
  }
  //add product
  add() {
    this.openDialog(0, 'add')
  }

  //next page of products
  next() {
    if (this.page < this.total) {
      this.page++
      this.paginate(this.allProducts, 5, this.page)
    }

  }

  //prev page of products
  prev() {
    if (this.page > 1) {
      this.page--
      this.paginate(this.allProducts, 5, this.page)
    }
  }
  //open modal
  openDialog(id: number, type: string) {
    const dialogRef = this.dialog.open(FormModelComponent, {
      data: { id, type }, width: '80%',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}




