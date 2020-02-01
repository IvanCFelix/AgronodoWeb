import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Uris } from "./Uris";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class AgricolaAgronodo {
  private token: String;


  constructor(private http: Http) {
    this.token = (localStorage.getItem('token') ? (<any>JSON.parse(localStorage.getItem('USER')).token) : null);

  }

  register(agroindustria) {
    return this.http.post(`${Uris.API_AGRICOLA_POST}`, agroindustria,this.jwt()).pipe(
      map(resp => {
        console.log(resp);
        return resp;
      })
    );
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