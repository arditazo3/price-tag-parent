import {Component, AfterViewInit, OnInit} from '@angular/core';
import {CommercialActivity} from '../../shared/common/api/model/commercial-activity';
import {Observable} from 'rxjs';
import {Brand} from '../../shared/common/api/model/brand';
import {CommCategoryService} from '../service/comm-category.service';
import {ReportData} from '../../shared/common/api/model/report-data';
import {DeviceDetectorService} from 'ngx-device-detector';
import {saveAs as importedSaveAs} from 'file-saver';
import {ApiErrorDetails} from '../../shared/common/api/model/api-error-details';
import {ItemValue} from '../../shared/common/api/model/item-value';
import {SettingsReportData} from '../../shared/common/api/const-array/settings-report-data';

@Component({
  templateUrl: './price-tag.component.html',
  styleUrls: ['./price-tag.component.css']
})
export class PriceTagComponent implements OnInit {

  isMobile = false;

  indexOrder = 0;
  noOfRowsDefault = 6;
  commercialActivities: CommercialActivity[] = [];

  errorDetails: ApiErrorDetails = new ApiErrorDetails();

  brandsObservable: Observable<any[]>;
  selectedBrand: Brand;

  selectedFormatPaper: ItemValue;
  selectedNumberCols: ItemValue;
  selectedTipologyPrice: ItemValue;
  selectedTemplateType: ItemValue;

  hasFormatPaper = false;
  hasNumberCols = false;
  hasTipologyPrice = false;
  hasBrand = false;
  hasTemplate = false;

  formatPaperAvailable: ItemValue[] = SettingsReportData.FORMAT_PAPER;
  numberColsAvailable: ItemValue[] = SettingsReportData.NUMBER_COLS;
  tipologyPriceAvailable: ItemValue[] = SettingsReportData.TIPOLOGY_PRICE;
  templateTypeAvailable: ItemValue[] = SettingsReportData.TEMPLATE_TYPE;

  constructor(private commCategoryService: CommCategoryService,
              private deviceService: DeviceDetectorService) {

    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    console.log('PriceTagComponent - ngOnInit');

    this.brandsObservable = this.commCategoryService.getBrands();
  }

  constructActivities() {

    this.commercialActivities = [];

    for (let i = 0; i < this.noOfRowsDefault; i++) {
      this.commercialActivities.push(new CommercialActivity(this.indexOrder));
      this.indexOrder++;
    }
  }

  confirmSettings() {

    this.hasFormatPaper = false;
    this.hasNumberCols = false;
    this.hasTipologyPrice = false;

    if (!this.selectedFormatPaper) {
      this.hasFormatPaper = true;
    }
    if (!this.selectedNumberCols) {
      this.hasNumberCols = true;
    }
    if (!this.selectedTipologyPrice) {
      this.hasTipologyPrice = true;
    }

    if (!this.hasFormatPaper && !this.hasNumberCols && !this.hasTipologyPrice) {
      this.constructActivities();
    }
  }

  elaborateReport() {
    console.log('PriceTagComponent - elaborateReport');

    const me = this;

    const reportData: ReportData = new ReportData();
    reportData.formatSettings.brand = this.selectedBrand;
    reportData.formatSettings.formatPaper = this.selectedFormatPaper.value;
    reportData.formatSettings.numberCols = + this.selectedNumberCols.value;
    reportData.formatSettings.tipologyPrice = + this.selectedTipologyPrice.value;
    reportData.formatSettings.templateType = + this.selectedTemplateType.value;

    reportData.commercialActivities = this.commercialActivities;


    this.commCategoryService.elaborateReport(reportData).subscribe(
      (data) => {
        importedSaveAs(data, 'Test.pdf');
        console.log('ExpirationActivityControlledComponent - downloadFileExp - next');
      },
      error => {
        me.errorDetails = error.error;
        console.error('ExpirationActivityControlledComponent - downloadFileExp - error \n', error);
      });
  }

  addNewRow() {

    this.commercialActivities.push(new CommercialActivity(this.indexOrder));
    this.indexOrder++;
  }

  removeRowListener(idOrderToRemove) {

    const index = this.commercialActivities.findIndex(commercialActy => commercialActy.idOrder === idOrderToRemove);
    if (index > -1) {
      this.commercialActivities.splice(index, 1);
    }
  }

  cleanFirstColumnValues() {

    if (this.commercialActivities && this.commercialActivities.length > 0) {
      this.commercialActivities.forEach(
        commercialActivity => {

          commercialActivity.commercialCategoryCol1 = '';
          commercialActivity.currencyCol1 = '';
          commercialActivity.amountCol1 = +'';
        }
      );
    }
  }
}
