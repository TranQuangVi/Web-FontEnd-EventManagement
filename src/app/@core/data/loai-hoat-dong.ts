import { Observable } from 'rxjs';
import { HttpClient ,HttpParams} from "@angular/common/http";


//let params = new HttpParams();

export abstract class LoaiHoatDongData {
    constructor(public readonly httpClient: HttpClient) { }
    abstract getAll(params);
    //abstract getById(): any;
}

//