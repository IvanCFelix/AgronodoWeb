import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Uris } from "./Uris";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class AgroindustriaAgronodo {
  headers = new HttpHeaders()

  public token = localStorage.getItem("token")

  constructor(private http: HttpClient) {

  }

  register(agroindustria) {
    return this.http.post(`${Uris.API_AGROINDUSTRIA_AGRONODO}`, agroindustria,{headers: new HttpHeaders(this.token)} ).pipe(
      map(resp => {
        console.log(resp);
        return resp;
      })
    );
  } 
}