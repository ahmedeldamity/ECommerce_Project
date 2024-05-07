import { shopParams } from './../shared/interfaces/shopParams';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ShopService } from '../shop/shop.service';
import { Brand } from '../shared/interfaces/brand';
import { Product } from '../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private _ShopService:ShopService, private _ToastrService:ToastrService,
    private _BasketService:BasketService){}
  brands?:Brand[];
  productsData: Product[] = [];
  shopParams = new shopParams();
  searchValue:string = '';

  ngOnInit(): void {
    this.shopParams.pageSize = 20;
    this.loadProducts();
    this.loadBrands();
  }

  loadProducts(){
    this._ShopService.getProducts(this.shopParams).subscribe({
      next:(response) => {
        this.productsData = response.data;
      },
      error:() => {
        this._ToastrService.error('has error occured.', 'Error');
      }
    });
  }

  addItemToBasekt(product: Product){
    product && this._BasketService.addItemToBasket(product);
  }


  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    items: 1,
    nav: false
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  loadBrands(){
    this._ShopService.getBrands().subscribe({
      next: (response) => {
        this.brands = response;
      }
    });
  }

}
