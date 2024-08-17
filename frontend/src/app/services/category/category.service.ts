import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url =  environment.apiUrl;
  constructor( private http : HttpClient) {  }

  addNewCategory(data: any){
    return this.http.post(`${this.url}/category/addNewCategory`, data,
      {
        headers:  new HttpHeaders().set('Content-type', 'application/json')
      }
    );
  }

  updateCategory(data: any){
    return this.http.post(`${this.url}/category/updateCategory`, data,
      {
        headers:  new HttpHeaders().set('Content-type', 'application/json')
      }
    );
  }

  getAllCategories(){

    return this.http.get(`${this.url}/category/getAllCategories`);


  }

}
