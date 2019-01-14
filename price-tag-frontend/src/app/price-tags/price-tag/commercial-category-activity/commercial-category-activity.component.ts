import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommercialActivity} from '../../../shared/common/api/model/commercial-activity';
import {SettingsData} from '../../../shared/common/api/model/settings-data';
import {AppGlobals} from '../../../shared/common/api/app-globals';

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

  @ViewChild('amount1El') amount1El: ElementRef;
  @ViewChild('amount2El') amount2El: ElementRef;
  @ViewChild('amount3El') amount3El: ElementRef;

  collapse = true;

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

  copyFirstColumnValuesToThird() {

    if (this.commercialActivity.commercialCategoryCol1) {
      this.commercialActivity.commercialCategoryCol3 = this.commercialActivity.commercialCategoryCol1;
    } else {
      this.commercialActivity.commercialCategoryCol3 = '';
    }

    if (this.commercialActivity.currencyCol1) {
      this.commercialActivity.currencyCol3 = this.commercialActivity.currencyCol1;
    } else {
      this.commercialActivity.currencyCol3 = '';
    }

    if (this.commercialActivity.amountCol1) {
      this.commercialActivity.amountCol3 = this.commercialActivity.amountCol1;
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

  collapseExpandBtn(acc) {

    if (!acc.isExpanded('toggle-' + this.commercialActivity.idOrder)) {
      acc.collapse('toggle-' + this.commercialActivity.idOrder);
      this.collapse = false;
    } else {
      acc.expand('toggle-' + this.commercialActivity.idOrder);
      this.collapse = true;
    }
  }

  checkAmountCol1() {

    const amount1Value = this.amount1El.nativeElement.value;
    // set coursor at the end
    if (amount1Value && amount1Value.slice(-1) === ',') {
      this.amount1El.nativeElement.setSelectionRange(amount1Value.length, amount1Value.length, 'none');
    }
  }

  checkAmountCol2() {

    const amount2Value = this.amount2El.nativeElement.value;
    // set coursor at the end
    if (amount2Value && amount2Value.slice(-1) === ',') {
      this.amount2El.nativeElement.setSelectionRange(amount2Value.length, amount2Value.length, 'none');
    }
  }

  checkAmountCol3() {

    const amount3Value = this.amount3El.nativeElement.value;
    // set coursor at the end
    if (amount3Value && amount3Value.slice(-1) === ',') {
      this.amount3El.nativeElement.setSelectionRange(amount3Value.length, amount3Value.length, 'none');
    }
  }
}
