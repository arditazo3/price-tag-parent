import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {PriceTagRoutes} from './price-tag.routing';

import {PriceTagComponent} from './price-tag/price-tag.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import { CommercialCategoryActivityComponent } from './price-tag/commercial-category-activity/commercial-category-activity.component';
import {CommCategoryService} from './service/comm-category.service';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgSelectModule,
        NgbModule,
        RouterModule.forChild(PriceTagRoutes),
        PerfectScrollbarModule,
        NgxDatatableModule,
        TranslateModule
    ],
    declarations: [
        PriceTagComponent,
        CommercialCategoryActivityComponent,
    ],
    providers: [
        CommCategoryService
    ]
})
export class PriceTagModule {
}
