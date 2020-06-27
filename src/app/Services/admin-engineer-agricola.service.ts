import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
@Injectable({
  providedIn: "root",
})
export class AdminEngineerAgricola {
  private token: String;
  constructor(public http: Http) {
    this.token = this.leerToken();
  }

  register(admin) {
    return this.http
      .post(`${Uris.API_ADMIN_ENGINEER_AGRICOLA}`, admin, this.jwt())
      .map((response: Response) => response.json());
  }
  listadmin() {
    return this.http
      .get(`${Uris.API_ADMIN_ENGINEER_AGRICOLA}`, this.jwt())
      .map((response: Response) => response.json());
  }
  getadmin(user) {
    return this.http
      .get(`${Uris.API_ADMIN_ENGINEER_AGRICOLA}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  delete(user) {
    return this.http
      .delete(`${Uris.API_ADMIN_ENGINEER_AGRICOLA}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  edit(admin, user) {
    return this.http
      .patch(
        `${Uris.API_ADMIN_ENGINEER_AGRICOLA}${user.user.username}/`,
        admin,
        this.jwt()
      )
      .map((response: Response) => response.json());
  }

  errorHandler(error: any): void {
    console.log("SUPER ERROR", error);
    if (localStorage.getItem("token") && error.status == 401) {
      localStorage.removeItem("token");
    }
  }

  private jwt() {
    if (this.token) {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept-Language", "es");
      headers.append("Authorization", `token ${this.leerToken()}`);
      return new RequestOptions({ headers: headers });
    }
  }
  leerToken() {
    return localStorage.getItem("token");
  }
}

  

