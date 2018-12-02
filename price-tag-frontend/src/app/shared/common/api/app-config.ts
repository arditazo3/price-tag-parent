import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AppConfig {

    // Provide all the Application Configs here
    public version = '1.0.0';
    public locale = 'en-US';

    // API Related configs

    public apiPort = environment.apiPort;
    public apiProtocol: string = environment.apiProtocol;
    public apiHostName: string = environment.apiHostName;
    public apiBasePath = 'admin-rest';
    public baseApiPath: string;

    public list = '/list';
    public delete = '/delete';
    public createupdate = '/create-update';

    // User
    public userPath = 'user';
    public userList = this.userPath + this.list;
    public userListExceptRole = this.userPath + '/user-except';
    public userLanguangeOnChange = this.userPath + '/user-language-change';

    // Commercial Category
    public reportPath = 'report'
    public getBrands = this.reportPath + '/brands';
    public getTemplates = this.reportPath + '/templates';
    public elaborateReport = this.reportPath + '/elaborate';

    constructor() {
        console.log('AppConfig - constructor');

        if (!this.apiProtocol) {
            this.apiProtocol = window.location.protocol;
        }
        if (!this.apiHostName) {
            this.apiHostName = window.location.hostname;
        }

        this.baseApiPath = this.apiProtocol + '//' + this.apiHostName;

        if (this.apiPort) {
            this.baseApiPath += ':' + this.apiPort;
        }

        this.baseApiPath += '/' + this.apiBasePath + '/';

        if (this.locale === undefined) {
            this.locale = navigator.language;
        }
    }
}
