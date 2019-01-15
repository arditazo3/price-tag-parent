import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommercialActivity} from '../../../shared/common/api/model/commercial-activity';
import {ItemValue} from '../../../shared/common/api/model/item-value';
import {SettingsData} from '../../../shared/common/api/model/settings-data';
import {AppConfig} from '../../../shared/common/api/app-config';
import {AppGlobals} from '../../../shared/common/api/app-globals';
import {NgbPanelChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-commercial-category-promotional-activity',
  templateUrl: './commercial-category-promotional-activity.component.html',
  styleUrls: ['./commercial-category-promotional-activity.component.css']
})
export class CommercialCategoryPromotionalActivityComponent implements OnInit {

  @Input() index: number;
  @Input() settingsData: SettingsData;
  @Input() commercialActivity: CommercialActivity;
  @Output() removeRowEvent = new EventEmitter<number>();
  currencyMask = AppGlobals.currencyMaskWithDecimal;
  currencyMaskWithoutDecimal = AppGlobals.currencyMaskWithoutDecimal;

  @ViewChild('initialPrice1El') initialPrice1El: ElementRef;
  @ViewChild('initialPrice2El') initialPrice2El: ElementRef;
  @ViewChild('initialPrice3El') initialPrice3El: ElementRef;

  collapse = true;

  constructor() {
  }

  ngOnInit() {
    console.log('CommercialCategoryPromotionalActivityComponent - ngOnInit');
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

    if (this.commercialActivity.initialPrice1) {
      this.commercialActivity.initialPrice2 = this.commercialActivity.initialPrice1;
    } else {
      this.commercialActivity.initialPrice2 = +'';
    }

    if (this.commercialActivity.discount1) {
      this.commercialActivity.discount2 = this.commercialActivity.discount1;
    } else {
      this.commercialActivity.discount2 = +'';
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

    if (this.commercialActivity.initialPrice1) {
      this.commercialActivity.initialPrice3 = this.commercialActivity.initialPrice1;
    } else {
      this.commercialActivity.initialPrice3 = +'';
    }

    if (this.commercialActivity.discount1) {
      this.commercialActivity.discount3 = this.commercialActivity.discount1;
    } else {
      this.commercialActivity.discount3 = +'';
    }

    if (this.commercialActivity.amountCol1) {
      this.commercialActivity.amountCol3 = this.commercialActivity.amountCol1;
    } else {
      this.commercialActivity.amountCol3 = +'';
    }
  }

  cleanFieldsBtn(acc) {
    console.log('CommercialCategoryPromotionalActivityComponent - cleanFieldsBtn');

    this.cleanObjectCommAct(this.commercialActivity);

    if (acc.isExpanded('toggle-' + this.commercialActivity.idOrder)) {
      acc.collapse('toggle-' + this.commercialActivity.idOrder);
    } else {
      acc.expand('toggle-' + this.commercialActivity.idOrder);
    }
  }

  cleanObjectCommAct(commercialActivity) {

    commercialActivity.commercialCategoryCol1 = '';
    commercialActivity.commercialCategoryCol2 = '';
    commercialActivity.commercialCategoryCol3 = '';

    commercialActivity.currencyCol1 = '';
    commercialActivity.currencyCol2 = '';
    commercialActivity.currencyCol3 = '';

    commercialActivity.initialPrice1 = +'';
    commercialActivity.initialPrice2 = +'';
    commercialActivity.initialPrice3 = +'';

    commercialActivity.discount1 = +'';
    commercialActivity.discount2 = +'';
    commercialActivity.discount3 = +'';

    commercialActivity.amountCol1 = +'';
    commercialActivity.amountCol2 = +'';
    commercialActivity.amountCol3 = +'';
  }

  removeOfficeBtn() {
    console.log('CommercialCategoryPromotionalActivityComponent - removeOfficeBtn');

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

  beforeChange($event: NgbPanelChangeEvent) {

    if ($event.nextState) {
      this.collapse = false;
    } else {
      this.collapse = true;
    }
  }

  roundFinalPrice1() {

    const initalPrice1Value = this.initialPrice1El.nativeElement.value;
    // set coursor at the end
    if (initalPrice1Value && initalPrice1Value.slice(-1) === ',') {
      this.initialPrice1El.nativeElement.setSelectionRange(initalPrice1Value.length, initalPrice1Value.length, 'none');
    }

    const initialPrice = AppGlobals.replaceCommaWithDot(this.commercialActivity.initialPrice1);
    const discount = this.commercialActivity.discount1;

    if (initialPrice && discount) {
      if (discount >= 100) {
        this.commercialActivity.amountCol1 = 0;
      } else {
        const finalPrice = (initialPrice * discount) / 100;
        this.commercialActivity.amountCol1 = Math.round((initialPrice - finalPrice) * 100) / 100;
      }
    }
    if (!initialPrice) {
      this.commercialActivity.amountCol1 = +'';
    }
    if (!discount) {
      this.commercialActivity.discount1 = 0;
      this.commercialActivity.amountCol1 = initialPrice;
    }
  }

  roundFinalPrice2() {

    const initalPrice2Value = this.initialPrice2El.nativeElement.value;
    // set coursor at the end
    if (initalPrice2Value && initalPrice2Value.slice(-1) === ',') {
      this.initialPrice2El.nativeElement.setSelectionRange(initalPrice2Value.length, initalPrice2Value.length, 'none');
    }

    const initialPrice = AppGlobals.replaceCommaWithDot(this.commercialActivity.initialPrice2);
    const discount = this.commercialActivity.discount2;

    if (initialPrice && discount) {
      if (discount >= 100) {
        this.commercialActivity.amountCol2 = 0;
      } else {
        const finalPrice = (initialPrice * discount) / 100;
        this.commercialActivity.amountCol2 = Math.round((initialPrice - finalPrice) * 100) / 100;
      }
    }
    if (!initialPrice) {
      this.commercialActivity.amountCol2 = +'';
    }
    if (!discount) {
      this.commercialActivity.discount2 = 0;
      this.commercialActivity.amountCol2 = initialPrice;
    }
  }

  roundFinalPrice3() {

    const initalPrice3Value = this.initialPrice3El.nativeElement.value;
    // set coursor at the end
    if (initalPrice3Value && initalPrice3Value.slice(-1) === ',') {
      this.initialPrice3El.nativeElement.setSelectionRange(initalPrice3Value.length, initalPrice3Value.length, 'none');
    }

    const initialPrice = AppGlobals.replaceCommaWithDot(this.commercialActivity.initialPrice3);
    const discount = this.commercialActivity.discount3;

    if (initialPrice && discount) {
      if (discount >= 100) {
        this.commercialActivity.amountCol3 = 0;
      } else {
        const finalPrice = (initialPrice * discount) / 100;
        this.commercialActivity.amountCol3 = Math.round((initialPrice - finalPrice) * 100) / 100;
      }
    }
    if (!initialPrice) {
      this.commercialActivity.amountCol3 = +'';
    }
    if (!discount) {
      this.commercialActivity.discount3 = 0;
      this.commercialActivity.amountCol3 = initialPrice;
    }
  }
}
