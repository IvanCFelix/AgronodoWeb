import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
@Injectable({
  providedIn: "root"
})
export class LotsAgricolaService {
  private token: String;
  constructor(public http: Http) { 
    this.token = (localStorage.getItem('token') ? (<any>JSON.parse(localStorage.getItem('USER')).token) : null);
  }
  
 register(admin) {
    return this.http.post(`${Uris.API_LOTS_POST}`, admin,this.jwt()).map((response: Response) => response.json()) 
  }

  listlots() {
    return this.http.get(`${Uris.API_LOTS_GET_LIST}`,this.jwt()).map((response: Response) => response.json()) 
  }
  getLot(user) {
    return this.http.get(`${Uris.API_LOTS_GET_USER}${user}/`,this.jwt()).map((response: Response) => response.json()) 
  }
//   getRefresh() {
//     return this.http.get(`${Uris.API_USER_GET}`,this.jwt()).map((response: Response) => response.json()) 
//   }
//   delete(user) {
//     return this.http.delete(`${Uris.API_ABRONODO_DELETE}${user}/`,this.jwt()).map((response: Response) => response.json()) 
//   }
//   reset(password) {
//     return this.http.post(`${Uris.PASSWORD_CHANGE}`,password,this.jwt()).map((response: Response) => response.json()) 
//   }

  

  errorHandler(error: any): void {
    console.log("SUPER ERROR",error)
    if (localStorage.getItem('token') && error.status == 401) {
        localStorage.removeItem('token');
    }
  }
  
  private jwt() {
    if (this.token) {
        let headers = new Headers();
        let user = JSON.parse(localStorage.getItem('USER'));
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `token ${user.token}`);
      return new RequestOptions({ headers: headers });
    }
  }
}

  



