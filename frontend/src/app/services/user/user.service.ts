import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private http : HttpClient) { }

  login(data : any){
    return this.http.post(this.url +
      '/user/login', data ,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json' )
      }
    );
  }


  addNewUser(data:any){
    return this.http.post(this.url +
      '/user/addNewUser', data ,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json' )
      }
    );
  }

  getAllUsers(){
    return this.http.get(this.url + '/user/getAllUsers');
  }

  updateUser(data:any){
    return this.http.post(this.url +
      '/user/updateUser', data ,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json' )
      }
    );
  }

  updateUserStatus(data:any){
    return this.http.post(this.url +
      '/user/updateUserStatus', data ,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json' )
      }
    );
  }

}
