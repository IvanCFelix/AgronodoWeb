import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Uris } from "./Uris";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userToken: String;
  constructor(private http: HttpClient) {

  }

  login(admin) {
    return this.http.post(`${Uris.API_ADMIN_AGRONODO}`, admin).pipe(
      map(resp => {
        console.log(resp);
      
        return resp;
      })
    );
  }

 
}
