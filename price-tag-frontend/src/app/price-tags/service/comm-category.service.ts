import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfig} from '../../shared/common/api/app-config';
import {ApiRequestService} from '../../shared/common/service/api-request.service';

@Injectable()
export class CommCategoryService {

    constructor(
        private apiRequest: ApiRequestService,
        private appConfig: AppConfig
    ) {}

    getBrands(): Observable<any> {
        console.log('CommCategoryService - getBrands');

        return this.apiRequest.get(this.appConfig.getBrands);
    }

    getTemplates(): Observable<any> {
        console.log('CommCategoryService - getTemplates');

        return this.apiRequest.get(this.appConfig.getTemplates);
    }

    elaborateReport(reportData): Observable<any> {
        console.log('CommCategoryService - elaborateReport');

        return this.apiRequest.getDownloadFile(this.appConfig.elaborateReport, reportData);
    }
}