import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoaiHoatDongData } from '../data/loai-hoat-dong';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class ChucVuService{
  private apiUrl = 'http://localhost:8080/chuc-vu'

  jwt: string;
  header: HttpHeaders
  constructor(private httpClient: HttpClient, private authService: NbAuthService) {
    this.authService.getToken().subscribe((accessToken: NbAuthJWTToken | any) => {
      this.jwt = accessToken.getValue()
    })
    this.header = new HttpHeaders(
      {
        'Authorization': `Bearer ${this.jwt}`,
      }
    )
  }



getChucVu(params: HttpParams) {
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

putChucVu(maChucVu:string, params: HttpParams) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await this.httpClient.put(`${this.apiUrl}/${maChucVu}`, params, { headers: this.header }).toPromise();
    //  console.log(result)
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

postChucVu(params: HttpParams) {

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
deleteChucVu(maChucVu: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await this.httpClient.delete(`${this.apiUrl}/${maChucVu}`, { headers: this.header }).toPromise();
   //   console.log(result)
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

}
