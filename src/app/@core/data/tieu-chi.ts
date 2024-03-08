import { Observable } from 'rxjs';
import { HttpClient ,HttpParams} from "@angular/common/http";


export abstract class TieuChiData {
    constructor(public readonly httpClient: HttpClient) { }
    abstract getData(params);
    abstract getById(): any;
}

