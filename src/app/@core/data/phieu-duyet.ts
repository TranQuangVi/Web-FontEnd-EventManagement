import { HttpClient ,HttpParams} from "@angular/common/http";

export abstract class PhieuDuyetData {
    constructor(public readonly httpClient: HttpClient) { }
    abstract getAll(params);
    //abstract getById(): any;
}