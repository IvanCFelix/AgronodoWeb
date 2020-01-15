import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Uris } from './Uris'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private http: HttpClient) { }

 
  login( admin ){
    const authData = {
      ...admin,
      returnSecureToken: true
    }
    return this.http.post(`${Uris.API_LOGIN_EJEMPLO}`,authData)
    .pipe(
      map( resp => {       
      return resp;
    })
    );
  }
}