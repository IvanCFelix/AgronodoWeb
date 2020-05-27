import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';
@Injectable({
  providedIn: "root"
})
export class TaskService {
  private token: String;
  constructor(public http: Http) { 
    this.token = (localStorage.getItem('token') ? (<any>JSON.parse(localStorage.getItem('USER')).token) : null);
  }
  
  register(tarea) {
    return this.http.post(`${Uris.API_TASK_POST}`, tarea,this.jwt()).map((response: Response) => response.json()) 
  }
  listTask() {
    return this.http
      .get(`${Uris.API_TASK}`, this.jwt())
      .map((response: Response) => response.json()); 
  }
  getTask(tarea) {
    return this.http
      .get(`${Uris.API_TASK}${tarea}/`, this.jwt())
      .map((response: Response) => response.json()); 
  }
  delete(tarea) {
    return this.http
      .delete(`${Uris.API_TASK}${tarea}/`, this.jwt())
      .map((response: Response) => response.json()); 
  }  
  edit(admin,user) {
  return this.http
    .patch(`${Uris.API_TASK}${user.user.username}/`, admin, this.jwt())
    .map((response: Response) => response.json()); 
  }
  

  errorHandler(error: any): void {
    console.log("SUPER ERROR",error)
    if (localStorage.getItem('token') && error.status == 401) {
        localStorage.removeItem('token');
    }
  }
  
  private jwt() {
    if (this.token) {
        let headers = new Headers();
        let user = JSON.parse(localStorage.getItem('USER'));
        headers.append('Content-Type', 'application/json');
        headers.append('Accept-Language', 'es');
        headers.append('Authorization', `token ${user.token}`);
      return new RequestOptions({ headers: headers });
    }
  }
}