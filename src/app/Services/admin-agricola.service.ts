import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
@Injectable({
  providedIn: "root",
})
export class AdminAgricola {
  private token: String;
  constructor(public http: Http) {
    this.token = this.leerToken();
  }

  register(admin) {
    return this.http
      .post(`${Uris.API_ADMIN_AGRICOLA}`, admin, this.jwt())
      .map((response: Response) => response.json());
  }

  listadmin() {
    return this.http
      .get(`${Uris.API_ADMIN_AGRICOLA}`, this.jwt())
      .map((response: Response) => response.json());
  }
  getadmin(user) {
    return this.http
      .get(`${Uris.API_ADMIN_AGRICOLA}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }

  delete(user) {
    return this.http
      .delete(`${Uris.API_ADMIN_AGRICOLA}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }

  edit(admin, user) {
    return this.http
      .patch(
        `${Uris.API_ADMIN_AGRICOLA}${user.user.username}/`,
        admin,
        this.jwt()
      )
      .map((response: Response) => response.json());
  }

  Dashboard(id) {
    return this.http
      .get(`${Uris.DASHBORARD}${id}`, this.jwt())
      .map((response: Response) => response.json());
  }
  DashboardHome() {
    return this.http
      .get(`${Uris.DASHBORARD}`, this.jwt())
      .map((response: Response) => response.json());
  }
  DashboardHomeInitialDate(date) {
    return this.http
      .get(`${Uris.DASHBORARD}?time=${date}`, this.jwt())
      .map((response: Response) => response.json());
  }
  DashboardHomeDATE(id, date) {
    return this.http
      .get(`${Uris.DASHBORARD}${id}/?time=${date}`, this.jwt())
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
      let user = JSON.parse(localStorage.getItem("USER"));
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

  



