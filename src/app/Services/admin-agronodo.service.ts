import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
import { Observable } from '../../../node_modules/rxjs';
@Injectable({
  providedIn: "root"
})
export class AdminAgronodo {
  private token: String;
  constructor(public http: Http) { 
    this.token = (localStorage.getItem('token') ? (<any>JSON.parse(localStorage.getItem('USER')).token) : null);
  }
  
 register(admin) {
    return this.http.post(`${Uris.API_AGRONODO_POST}`, admin,this.jwt()).map((response: Response) => response.json()) 
  }

  listadmin() {
    return this.http.get(`${Uris.API_AGRONODO_GET}`,this.jwt()).map((response: Response) => response.json()) 
  }
  
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

  



