import {Component, AfterViewInit, OnInit} from '@angular/core';
import {CommercialActivity} from '../../shared/common/api/model/commercial-activity';
import {Observable} from 'rxjs';
import {Brand} from '../../shared/common/api/model/brand';
import {CommCategoryService} from '../service/comm-category.service';
import {ReportData} from '../../shared/common/api/model/report-data';
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  isMobile = false;

  indexOrder = 0;
  noOfRowsDefault = 6;
  commercialActivies: CommercialActivity[] = [];

  brandsObservable: Observable<any[]>;
  selectedBrand: Brand;

  headerMsg = '';
  footerMsg = '';

  constructor(private commCategoryService: CommCategoryService,
              private deviceService: DeviceDetectorService) {

    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {

    for (let i = 0; i < this.noOfRowsDefault; i++) {
      this.commercialActivies.push(new CommercialActivity(this.indexOrder));
      this.indexOrder++;
    }

    this.brandsObservable = this.commCategoryService.getBrands();
  }

  elaborateReport() {

    const reportData: ReportData = new ReportData();
    reportData.brand = this.selectedBrand;
    reportData.headerMsg = this.headerMsg;
    reportData.footerMsg = this.footerMsg;
    reportData.commercialActivies = this.commercialActivies;

    this.commCategoryService.elaborateReport(reportData);
  }

  addNewRow() {

    this.commercialActivies.push(new CommercialActivity(this.indexOrder));
    this.indexOrder++;
  }

  removeRowListener(idOrderToRemove) {

    const index = this.commercialActivies.findIndex(commercialActy => commercialActy.idOrder === idOrderToRemove);
    if (index > -1) {
      this.commercialActivies.splice(index, 1);
    }
  }

  cleanFirstColumnValues() {

    if (this.commercialActivies && this.commercialActivies.length > 0) {
      this.commercialActivies.forEach(
        commercialActivity => {

          commercialActivity.commercialCategoryCol1 = '';
          commercialActivity.currencyCol1 = '';
          commercialActivity.amountCol1 = NaN;
        }
      );
    }
  }

  cleanSecondColumnValues() {

    if (this.commercialActivies && this.commercialActivies.length > 0) {
      this.commercialActivies.forEach(
        commercialActivity => {

          commercialActivity.commercialCategoryCol2 = '';
          commercialActivity.currencyCol2 = '';
          commercialActivity.amountCol2 = NaN;
        }
      );
    }
  }

  cleanThirdColumnValues() {

    if (this.commercialActivies && this.commercialActivies.length > 0) {
      this.commercialActivies.forEach(
        commercialActivity => {

          commercialActivity.commercialCategoryCol3 = '';
          commercialActivity.currencyCol3 = '';
          commercialActivity.amountCol3 = NaN;
        }
      );
    }
  }

  copyFirstColumnValuesToSecond() {

    if (this.commercialActivies && this.commercialActivies.length > 0) {
      this.commercialActivies.forEach(
        commercialActivity => {

          if (commercialActivity.commercialCategoryCol1) {
            commercialActivity.commercialCategoryCol2 = commercialActivity.commercialCategoryCol1;
          } else {
            commercialActivity.commercialCategoryCol2 = '';
          }

          if (commercialActivity.currencyCol1) {
            commercialActivity.currencyCol2 = commercialActivity.currencyCol1;
          } else {
            commercialActivity.currencyCol2 = '';
          }

          if (commercialActivity.amountCol1) {
            commercialActivity.amountCol2 = commercialActivity.amountCol1;
          } else {
            commercialActivity.amountCol2 = NaN;
          }
        }
      );
    }
  }

  copySecondColumnValuesToThird() {

    if (this.commercialActivies && this.commercialActivies.length > 0) {
      this.commercialActivies.forEach(
        commercialActivity => {

          if (commercialActivity.commercialCategoryCol2) {
            commercialActivity.commercialCategoryCol3 = commercialActivity.commercialCategoryCol2;
          } else {
            commercialActivity.commercialCategoryCol3 = '';
          }

          if (commercialActivity.currencyCol2) {
            commercialActivity.currencyCol3 = commercialActivity.currencyCol2;
          } else {
            commercialActivity.currencyCol3 = '';
          }

          if (commercialActivity.amountCol2) {
            commercialActivity.amountCol3 = commercialActivity.amountCol2;
          } else {
            commercialActivity.amountCol3 = NaN;
          }
        }
      );
    }
  }
}
