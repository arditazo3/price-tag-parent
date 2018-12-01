import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {DashboardRoutes} from './dashboard.routing';

import {DashboardHomeComponent} from './dashboard_home/dashboard-home.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import { CommercialCategoryActivityComponent } from './dashboard_home/commercial-category-activity/commercial-category-activity.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgSelectModule,
        NgbModule,
        RouterModule.forChild(DashboardRoutes),
        PerfectScrollbarModule,
        NgxDatatableModule,
        TranslateModule
    ],
    declarations: [
        DashboardHomeComponent,
        CommercialCategoryActivityComponent,
    ]
})
export class DashboardModule {
}
