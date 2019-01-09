import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommercialActivity} from '../../../shared/common/api/model/commercial-activity';
import {ItemValue} from '../../../shared/common/api/model/item-value';
import {SettingsData} from "../../../shared/common/api/model/settings-data";
import {AppGlobals} from "../../../shared/common/api/app-globals";

@Component({
  selector: 'app-commercial-category-activity',
  templateUrl: './commercial-category-activity.component.html',
  styleUrls: ['./commercial-category-activity.component.css']
})
export class CommercialCategoryActivityComponent implements OnInit {

  @Input() index: number;
  @Input() settingsData: SettingsData;
  @Input() commercialActivity: CommercialActivity;
  @Output() removeRowEvent = new EventEmitter<number>();
  currencyMask = AppGlobals.currencyMaskWithDecimal;

  constructor() {
  }

  ngOnInit() {
    console.log('CommercialCategoryActivityComponent - ngOnInit');
  }

  copyFirstColumnValuesToSecond() {

    if (this.commercialActivity.commercialCategoryCol1) {
      this.commercialActivity.commercialCategoryCol2 = this.commercialActivity.commercialCategoryCol1;
    } else {
      this.commercialActivity.commercialCategoryCol2 = '';
    }

    if (this.commercialActivity.currencyCol1) {
      this.commercialActivity.currencyCol2 = this.commercialActivity.currencyCol1;
    } else {
      this.commercialActivity.currencyCol2 = '';
    }

    if (this.commercialActivity.amountCol1) {
      this.commercialActivity.amountCol2 = this.commercialActivity.amountCol1;
    } else {
      this.commercialActivity.amountCol2 = +'';
    }
  }

  copySecondColumnValuesToThird() {

    if (this.commercialActivity.commercialCategoryCol2) {
      this.commercialActivity.commercialCategoryCol3 = this.commercialActivity.commercialCategoryCol2;
    } else {
      this.commercialActivity.commercialCategoryCol3 = '';
    }

    if (this.commercialActivity.currencyCol2) {
      this.commercialActivity.currencyCol3 = this.commercialActivity.currencyCol2;
    } else {
      this.commercialActivity.currencyCol3 = '';
    }

    if (this.commercialActivity.amountCol2) {
      this.commercialActivity.amountCol3 = this.commercialActivity.amountCol2;
    } else {
      this.commercialActivity.amountCol3 = +'';
    }
  }

  cleanFieldsBtn(acc) {
    console.log('CommercialCategoryActivityComponent - cleanFieldsBtn');

    this.commercialActivity = new CommercialActivity(this.commercialActivity.idOrder);

    if (acc.isExpanded('toggle-' + this.commercialActivity.idOrder)) {
      acc.collapse('toggle-' + this.commercialActivity.idOrder);
    } else {
      acc.expand('toggle-' + this.commercialActivity.idOrder);
    }
  }

  removeOfficeBtn() {
    console.log('CommercialCategoryActivityComponent - removeOfficeBtn');

    this.removeRowEvent.emit(this.commercialActivity.idOrder);
  }

  collapseBtn(acc) {
    console.log('CommercialCategoryActivityComponent - collapseBtn');

    acc.collapse('toggle-' + this.commercialActivity.idOrder);
  }
}
