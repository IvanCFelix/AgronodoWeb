import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { HttpParams, HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Uris } from "./Uris";
@Injectable({
  providedIn: "root",
})
export class Incidences {
  private token: String;
  constructor(public http: Http) {
    this.token = localStorage.getItem("token")
      ? <any>JSON.parse(localStorage.getItem("USER")).token
      : null;
  }

  register(item) {
    return this.http
      .post(`${Uris.API_INCIDENCES}`, item, this.jwt())
      .map((response: Response) => response.json());
  }
  list() {
    return this.http
      .get(`${Uris.API_INCIDENCES}list`, this.jwt())
      .map((response: Response) => response.json());
  }
  listBydate(value) {
    return this.http
      .get(`${Uris.API_INCIDENCES_BYDATE}${value}`, this.jwt())
      .map((response: Response) => response.json());
  }
  listBybyrisk(value) {
    return this.http
      .get(`${Uris.API_INCIDENCES_BYRISK}${value}`, this.jwt())
      .map((response: Response) => response.json());
  }
  listIncidenceSearch(value) {
    return this.http
      .get(`${Uris.API_INCIDENCES_SEARCH}${value}`, this.jwt())
      .map((response: Response) => response.json());
  }
  getIncidenceId(item) {
    return this.http
      .get(`${Uris.API_INCIDENCES}${item}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  delete(item) {
    return this.http
      .delete(`${Uris.API_INCIDENCES}${item}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  edit(item, user) {
    return this.http
      .patch(`${Uris.API_INCIDENCES}${user.user.username}/`, item, this.jwt())
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
      headers.append("Authorization", `token ${user.token}`);
      return new RequestOptions({ headers: headers });
    }
  }
}
