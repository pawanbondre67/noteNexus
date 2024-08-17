import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = environment.apiUrl;

  constructor(private http : HttpClient) { }

  addNewArticle(data : any){
    return this.http.post(this.url +
      '/article/addNewArticle', data ,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json' )
      }
    );
  }

  updateArticle(data : any){
    return this.http.post(this.url +
      '/article/updateArticle', data ,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json' )
      }
    );
  }

  getAllArticle(){
    return this.http.get(this.url + '/article/getAllArticle');
  }

  getAllPublishedArticle(){
    return this.http.get(this.url + '/article/getAllPublishedArticle');
  }

  deleteArticle(id : any){
    return this.http.get(this.url + '/article/deleteArticle/' + id);
  }

}
