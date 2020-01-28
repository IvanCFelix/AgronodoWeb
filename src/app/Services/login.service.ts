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
    this.leerToken();
  }

  login(admin) {
    const authData = {
      ...admin,
      returnSecureToken: true
    };
    return this.http.post(`${Uris.API_LOGIN}`, authData).pipe(
      map(resp => {
        console.log(resp);
        this.guardarToken(resp['token'])
        localStorage.setItem("USER", JSON.stringify(resp));

        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;

    localStorage.setItem("token", idToken);
  }

  leerToken() {
    localStorage.getItem("token")
      ? (this.userToken = localStorage.getItem("token"))
      : (this.userToken = null);
    return this.userToken;
  }

  estaAutenticado() {
    return this.userToken;
  }
}
