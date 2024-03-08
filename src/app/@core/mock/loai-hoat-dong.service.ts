import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoaiHoatDongData } from '../data/loai-hoat-dong';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class LoaiHoatDongService extends LoaiHoatDongData{
  private apiUrl = 'http://localhost:8080/loai-hoat-dong'

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



getAll(params: HttpParams) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await this.httpClient.get(`${this.apiUrl}`, { headers: this.header, params: params }).toPromise();
      console.log(result)
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
  
}
putLoai(maLoai:string, params: HttpParams) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await this.httpClient.put(`${this.apiUrl}/${maLoai}`, params, { headers: this.header }).toPromise();
    //  console.log(result)
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

postLoai(params: HttpParams) {

  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await this.httpClient.post(`${this.apiUrl}`, params, { headers: this.header }).toPromise();
    //  console.log(result)
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

}
deleteLoai(maLoai: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await this.httpClient.delete(`${this.apiUrl}/${maLoai}`, { headers: this.header }).toPromise();
   //   console.log(result)
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

}
