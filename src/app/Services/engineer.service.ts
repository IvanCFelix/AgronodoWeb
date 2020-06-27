import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
@Injectable({
  providedIn: "root",
})
export class Engineer {
  private token: String;
  constructor(public http: Http) {
    this.token = this.leerToken();
  }

  register(admin) {
    return this.http
      .post(`${Uris.API_ENGINEER}`, admin, this.jwt())
      .map((response: Response) => response.json());
  }
  listadmin() {
    return this.http
      .get(`${Uris.API_ENGINEER}`, this.jwt())
      .map((response: Response) => response.json());
  }
  getadmin(user) {
    return this.http
      .get(`${Uris.API_ENGINEER}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  delete(user) {
    return this.http
      .delete(`${Uris.API_ENGINEER}${user}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  edit(admin, user) {
    return this.http
      .patch(`${Uris.API_ENGINEER}${user.user.username}/`, admin, this.jwt())
      .map((response: Response) => response.json());
  }
  listSubfield() {
    return this.http
      .get(`${Uris.API_CICLE}`, this.jwt())
      .map((response: Response) => response.json());
  }
  listField() {
    return this.http
      .get(`${Uris.API_LOTS}`, this.jwt())
      .map((response: Response) => response.json());
  }
  getSubloteID(id) {
    return this.http
      .get(`${Uris.API_SUB_LOTS}${id}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  getLoteID(id) {
    return this.http
      .get(`${Uris.API_LOTS}${id}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  registerTask(task, subfield) {
    return this.http
      .post(`${Uris.API_TASK_POST}${subfield}/`, task, this.jwt())
      .map((response: Response) => response.json());
  }
  getTask(id) {
    return this.http
      .get(`${Uris.API_TASK}${id}/`, this.jwt())
      .map((response: Response) => response.json());
  }

  editTask(task) {
    return this.http
      .patch(`${Uris.API_TASK}${task.id}/`, task, this.jwt())
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

  

