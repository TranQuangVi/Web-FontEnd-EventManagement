import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { TieuChiData } from '../data/tieu-chi';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class TieuChiService extends TieuChiData {
  private apiUrl = 'http://localhost:8080'
  jwt: string;
  header: HttpHeaders
  constructor(httpClient: HttpClient, private authService: NbAuthService) {
    super(httpClient);
    this.authService.getToken().subscribe((accessToken: NbAuthJWTToken | any) => {
      this.jwt = accessToken.getValue()
    })
    this.header = new HttpHeaders(
      {
        'Authorization': `Bearer ${this.jwt}`,
      }
    )
  }

  getById() {

  }
  putTieuChi(maTieuChi:string, params: HttpParams) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.put(`${this.apiUrl}/tieuchi/${maTieuChi}`, params, { headers: this.header }).toPromise();
      //  console.log(result)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  postTieuChi(params: HttpParams) {

    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.post(`${this.apiUrl}/tieuchi`, params, { headers: this.header }).toPromise();
      //  console.log(result)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

  }
  deleteTieuChi(maTieuChi: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.delete(`${this.apiUrl}/tieuchi/${maTieuChi}`, { headers: this.header }).toPromise();
     //   console.log(result)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  getData(params: HttpParams) {

    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.httpClient.get(`${this.apiUrl}/tieuchi`, { headers: this.header, params: params }).toPromise();
     //   console.log(result)
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

  }

}
