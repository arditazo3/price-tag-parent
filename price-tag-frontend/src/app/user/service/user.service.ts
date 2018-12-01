import {AppConfig} from '../../shared/common/api/app-config';
import {ApiRequestService} from '../../shared/common/service/api-request.service';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

    public showMobileMenu = new EventEmitter<boolean>();

    constructor(
        private apiRequest: ApiRequestService,
        private appConfig: AppConfig
    ) {
    }
}
