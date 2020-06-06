
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
import { Observable } from '../../../node_modules/rxjs';
@Injectable({
  providedIn: "root",
})
export class AgricolaAgronodo {
  private token: String;
  constructor(public http: Http) {
    this.token = localStorage.getItem("token");
  }

  register(agricola) {
    return this.http
      .post(`${Uris.API_AGRICOLA}`, agricola, this.jwt())
      .map((response: Response) => response.json());
  }

  listadmin() {
    return this.http
      .get(`${Uris.API_AGRICOLA}`, this.jwt())
      .map((response: Response) => response.json());
  }
  getadmin(user) {
    return this.http
      .get(`${Uris.API_AGRICOLA}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  delete(user) {
    return this.http
      .delete(`${Uris.API_AGRICOLA}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  reset(password) {
    return this.http
      .post(`${Uris.PASSWORD_CHANGE}`, password, this.jwt())
      .map((response: Response) => response.json());
  }
  edit(agricola, user) {
    return this.http
      .patch(`${Uris.API_AGRICOLA}${user.user.username}/`, agricola, this.jwt())
      .map((response: Response) => response.json());
  }
  logout() {
    return this.http
      .post(`${Uris.API_LOGOUT}`, this.token, this.jwt())
      .map((response: Response) => response.json());
  }
  getRefresh() {
    return this.http
      .get(`${Uris.API_USER_GET}`, this.jwt())
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
      headers.append("Authorization", `token ${this.token}`);

      return new RequestOptions({ headers: headers });
    }
  }
}

  



