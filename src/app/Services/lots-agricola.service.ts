import 'rxjs/add/operator/map'
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

  listLots() {
    return this.http.get(`${Uris.API_LOTS_GET_LIST}`,this.jwt()).map((response: Response) => response.json()) 
  }


  getLot(value) {
    return this.http.get(`${Uris.API_LOTS_GET_LOT}${value}/`,this.jwt()).map((response: Response) => response.json()) 
  }
  delete(value) {
    return this.http.delete(`${Uris.API_LOTS_DELETE}${value}/`,this.jwt()).map((response: Response) => response.json()) 
  }
  edit(value,id) {
    return this.http.put(`${Uris.API_LOTS_EDIT}${id}/`, value,this.jwt()).map((response: Response) => response.json()) 
  }
  deleteSub(value){
    return this.http.delete(`${Uris.API_SUB_LOTS_DELETE}${value}/`,this.jwt()).map((response: Response) => response.json()) 
  }
  SubloteRegister(sublote) {
    return this.http.post(`${Uris.API_SUB_LOTS_REGISTER}`, sublote,this.jwt()).map((response: Response) => response.json()) 
  }
//   getRefresh() {
//     return this.http.get(`${Uris.API_USER_GET}`,this.jwt()).map((response: Response) => response.json()) 
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

  



