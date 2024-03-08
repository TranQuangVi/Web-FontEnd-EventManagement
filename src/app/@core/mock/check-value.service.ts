import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { respones } from '../data/check-value'
@Injectable()
export class CheckService {


    checkDateTime(date): respones {
        var res = new respones()
        if (moment(date, 'YYYY-MM-DD HH:mm:ss', true).isValid() || moment(date, 'YYYY-M-DD HH:mm:ss', true).isValid() ||
            moment(date, 'YYYY-MM-D HH:mm:ss', true).isValid() || moment(date, 'YYYY-M-D HH:mm:ss', true).isValid()) {

            res.error = null
            res.status = true
        }
        else{
            res.error = `Định dạng ngày phải là YYYY-MM-DD HH:mm:ss.`
            res.status = false
        }
            return res
    }
}