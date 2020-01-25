import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Uris } from "./Uris";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AgroindustriaAgronodo {
  private headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });

  public token = localStorage.getItem("token")

  constructor(private http: HttpClient) {

  }

  register(agroindustria) {
    return this.http.post(`${Uris.API_AGROINDUSTRIA_AGRONODO}`, agroindustria, ).pipe(
      map(resp => {
        console.log(resp);
        return resp;
      })
    );
  } 
}
