import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
 export class TokenInterceptor  implements HttpInterceptor {
   constructor(private router : Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders : { Authorization : `Bearer ${token}` }
      });
    }

    // Add a return statement here
    return next.handle(req).pipe(
      // Add a catchError operator here
      catchError((err) => {
        if(err instanceof HttpErrorResponse){
          console.log(err);
          if(err.status === 401 || err.status === 403){
            if(this.router.url === '/login'){
             //do nothing
            }
            else {

              localStorage.removeItem('token');
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
      })
    );

  }
 }


