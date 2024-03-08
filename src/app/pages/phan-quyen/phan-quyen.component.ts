import { Component ,OnInit,TemplateRef} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PhieuDuyetService } from '../../@core/mock/phieu-duyet.service';
import { HttpParams } from '@angular/common/http';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ng-phan-quyen',
  templateUrl: './phan-quyen.component.html',
  styleUrls: ['./phan-quyen.component.scss']
})
export class PhanQuyenComponent implements OnInit  {
    ngOnInit(): void {
        
    }
}