import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Uris } from './Uris';

@Injectable({
  providedIn: "root"
})
export class LotsAgricolaService {
  private token: String;
  constructor(public http: Http) {
    this.token = localStorage.getItem('token') 
  }

  register(admin) {
    return this.http
      .post(`${Uris.API_LOTS}`, admin, this.jwt())
      .map((response: Response) => response.json());
  }

  listLots() {
    return this.http
      .get(`${Uris.API_LOTS}`, this.jwt())
      .map((response: Response) => response.json());
  }


  getLot(value) {
    return this.http
      .get(`${Uris.API_LOTS}${value}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  delete(value) {
    return this.http
      .delete(`${Uris.API_LOTS}${value}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  edit(value, id) {
    return this.http
      .put(`${Uris.API_LOTS}${id}/`, value, this.jwt())
      .map((response: Response) => response.json());
  }
  deleteSub(value) {
    return this.http
      .delete(`${Uris.API_SUB_LOTS}${value}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  SubloteRegister(sublote) {
    return this.http
      .post(`${Uris.API_SUB_LOTS}`, sublote, this.jwt())
      .map((response: Response) => response.json());
  }
  EditSublote(value, id) {
    return this.http
      .put(`${Uris.API_SUB_LOTS}${id}/`, value, this.jwt())
      .map((response: Response) => response.json());
  }
  GetSublot() {
    return this.http
      .get(`${Uris.API_SUB_LOTS}`, this.jwt())
      .map((response: Response) => response.json());
  }

  GetSubloteID(id) {
    return this.http
      .get(`${Uris.API_SUB_LOTS}${id}/`, this.jwt())
      .map((response: Response) => response.json());
  }
  CicleRegister(id, value) {
    return this.http
      .post(`${Uris.API_CICLE}${id}/cicles/`, value, this.jwt())
      .map((response: Response) => response.json());
  }
  GetCicleid(id) {
    return this.http
      .get(`${Uris.API_CICLE}${id}/pathingsweeks/`, this.jwt())
      .map((response: Response) => response.json());
  }
  GetReportListid(sub, rep) {
    return this.http
      .get(`${Uris.API_CICLE}${sub}/pathings/${rep}/reports`, this.jwt())
      .map((response: Response) => response.json());
  }
  GetListPathingsID(sub, rep) {
    return this.http
      .get(`${Uris.API_CICLE}${sub}/pathings/${rep}`, this.jwt())
      .map((response: Response) => response.json());
  }
  GetListPathingsList(sub) {
    return this.http
      .get(`${Uris.API_CICLE}${sub}/pathings/`, this.jwt())
      .map((response: Response) => response.json());
  }
  GetReportSolo(sub, rut, rep) {
    return this.http
      .get(
        `${Uris.API_CICLE}${sub}/pathings/${rut}/reports/${rep}/`,
        this.jwt()
      )
      .map((response: Response) => response.json());
  }

  Getcrops() {
    return this.http.get(`${Uris.API_CROPS_LIST_GET}`, this.jwt()).map((response: Response) => response.json())
  }
  registerCrops(admin) {
    return this.http.post(`${Uris.API_CROPS_LIST_GET}`, admin, this.jwt()).map((response: Response) => response.json())
  }




  errorHandler(error: any): void {
    console.log("SUPER ERROR", error)
    if (localStorage.getItem('token') && error.status == 401) {
      localStorage.removeItem('token');
    }
  }

  private jwt() {
    if (this.token) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept-language', 'en-es');
      headers.append("Authorization", `token ${this.token}`);
      
      return new RequestOptions({ headers: headers });
    }

  }
}





