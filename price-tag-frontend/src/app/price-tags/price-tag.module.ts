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
import {CommercialCategoryActivityComponent} from './price-tag/commercial-category-activity/commercial-category-activity.component';
import {CommCategoryService} from './service/comm-category.service';
import {CommercialCategoryPromotionalActivityComponent} from "./price-tag/commercial-category-promotional-activity/commercial-category-promotional-activity.component";
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {TextMaskModule} from "angular2-text-mask";
import {NgxLoadingModule} from "ngx-loading";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    NgbModule,
    RouterModule.forChild(PriceTagRoutes),
    PerfectScrollbarModule,
    NgxDatatableModule,
    TranslateModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    TextMaskModule,
    NgxLoadingModule
  ],
  declarations: [
    PriceTagComponent,
    CommercialCategoryActivityComponent,
    CommercialCategoryPromotionalActivityComponent,
  ],
  providers: [
    CommCategoryService
  ]
})
export class PriceTagModule {
}
