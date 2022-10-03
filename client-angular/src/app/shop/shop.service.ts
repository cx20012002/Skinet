import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IPagination} from "../shared/models/pagination";
import {Observable} from "rxjs";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/type";
import {IProduct} from "../shared/models/product"
import {ShopParams} from "../shared/models/shopParams";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5200/api/'

  constructor(private http: HttpClient) {
  }

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();
    if (shopParams.brandId !== 0) params = params.append('brandId', shopParams.brandId.toString());
    if (shopParams.typeId !== 0) params = params.append('typeId', shopParams.typeId.toString());
    if (shopParams.search) params = params.append('search', shopParams.search);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString())
    params = params.append('pageSize', shopParams.pageSize.toString())

    return this.http.get<IPagination>(this.baseUrl + 'products', {params});
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseUrl + `products/${id}`);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands')
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/types')
  }
}
