import {Component, AfterViewInit, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
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
import {UserInfoService} from '../../user/service/user-info.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {SettingsData} from '../../shared/common/api/model/settings-data';
import {AppGlobals} from '../../shared/common/api/app-globals';
import {ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';

@Component({
  templateUrl: './price-tag.component.html',
  styleUrls: ['./price-tag.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PriceTagComponent implements OnInit {

  isMobile = false;

  indexOrder = 0;
  noOfRowsDefault = 6;
  commercialActivities: CommercialActivity[];

  errorDetails: ApiErrorDetails = new ApiErrorDetails();

  brandsObservable: Observable<any[]>;
  selectedBrand: Brand;

  selectedFormatPaper: ItemValue;
  selectedNumberCols: ItemValue;
  selectedTipologyPrice: ItemValue;
  selectedTemplateType: ItemValue;

  settingsData: SettingsData;

  hasFormatPaper = false;
  hasNumberCols = false;
  hasTipologyPrice = false;
  hasBrand = false;
  hasTemplate = false;
  lang = 'IT';

  formatPaperAvailable: ItemValue[] = SettingsReportData.FORMAT_PAPER;
  numberColsAvailable: ItemValue[] = SettingsReportData.NUMBER_COLS;
  tipologyPriceAvailable: ItemValue[] = SettingsReportData.TIPOLOGY_PRICE;
  templateTypeAvailable: ItemValue[] = SettingsReportData.TEMPLATE_TYPE;

  @ViewChild('resetSettingsSwal') private resetSettingsSwal: SwalComponent;
  @ViewChild('insertAtLeastOneRow') private insertAtLeastOneRow: SwalComponent;

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  public primaryColour = AppGlobals.PrimaryWhite;
  public secondaryColour = AppGlobals.SecondaryGrey;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px'
  };

  constructor(private commCategoryService: CommCategoryService,
              private userInfoService: UserInfoService,
              private deviceService: DeviceDetectorService) {

    this.isMobile = this.deviceService.isMobile();

    this.lang = this.userInfoService.getUserLang().toUpperCase();
  }

  ngOnInit(): void {
    console.log('PriceTagComponent - ngOnInit');

    this.brandsObservable = this.commCategoryService.getBrands();

    this.tipologyPriceAvailable = this.tipologyPriceAvailable.filter(item => item.lang === this.lang);
    this.tipologyPriceAvailable = [...this.tipologyPriceAvailable];

    this.templateTypeAvailable = this.templateTypeAvailable.filter(item => item.lang === this.lang);
    this.templateTypeAvailable = [...this.templateTypeAvailable];
  }

  constructActivities() {
    console.log('PriceTagComponent - constructActivities');

    this.commercialActivities = [];

    for (let i = 0; i < this.noOfRowsDefault; i++) {
      this.commercialActivities.push(new CommercialActivity(this.indexOrder));
      this.indexOrder++;
    }
  }

  checkSettings() {
    console.log('PriceTagComponent - checkSettings');

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
  }

  confirmSettings() {
    console.log('PriceTagComponent - confirmSettings');

    const me = this;
    me.checkSettings();

    if (!this.hasFormatPaper && !this.hasNumberCols && !this.hasTipologyPrice) {

      if (me.commercialActivities && me.commercialActivities.length > 0 && me.hasStoredData(me.commercialActivities)) {
        me.resetSettingsSwal.show()
          .then(function (result) {
            if (result.value === true) {

              me.settingsUp();
            }
          }, function (dismiss) {
            // dismiss can be "cancel" | "close" | "outside"
          });
      } else {
        me.settingsUp();
      }
    } else {
      me.constructActivities();
    }
  }

  settingsUp() {

    const me = this;

    if (!me.settingsData) {
      me.settingsData = new SettingsData();
    }
    me.settingsData.selectedFormatPaper = Object.assign({}, me.selectedFormatPaper);
    me.settingsData.selectedNumberCols = Object.assign({}, me.selectedNumberCols);
    me.settingsData.selectedTipologyPrice = Object.assign({}, me.selectedTipologyPrice);

    me.constructActivities();
  }

  elaborateReport() {
    console.log('PriceTagComponent - elaborateReport');

    const me = this;

    this.checkSettings();

    me.hasBrand = false;
    me.hasTemplate = false;
    if (!this.selectedBrand) {
      me.hasBrand = true;
    }
    if (!this.selectedTemplateType) {
      me.hasTemplate = true;
    }

    if (!me.hasBrand && !me.hasTemplate) {

      const reportData: ReportData = new ReportData();
      reportData.formatSettings.brand = this.selectedBrand;
      reportData.formatSettings.formatPaper = this.settingsData.selectedFormatPaper.value;
      reportData.formatSettings.numberCols = +this.settingsData.selectedNumberCols.value;
      reportData.formatSettings.tipologyPrice = +this.settingsData.selectedTipologyPrice.value;
      reportData.formatSettings.templateType = +this.selectedTemplateType.value;

      reportData.commercialActivities = this.commercialActivities;

      me.ngxLoadingComponent.show = true;

      this.cleanEmptyRow(reportData);

      if (reportData.commercialActivities && reportData.commercialActivities.length > 0) {
        this.commCategoryService.elaborateReport(reportData).subscribe(
          (data) => {
            importedSaveAs(data, 'Elaborated Report.pdf');
            console.log('ExpirationActivityControlledComponent - downloadFileExp - next');
            me.ngxLoadingComponent.show = false;
          },
          error => {
            me.errorDetails = error.error;
            console.error('ExpirationActivityControlledComponent - downloadFileExp - error \n', error);
            me.ngxLoadingComponent.show = false;
          });
      } else {
        this.insertAtLeastOneRow.show();
        me.ngxLoadingComponent.show = false;
      }
    }
  }

  addNewRow() {

    this.commercialActivities.push(new CommercialActivity(this.indexOrder));
    //   this.commercialActivities.push(new CommercialActivity(this.indexOrder, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));this.commercialActivities.push(new CommercialActivity(this.indexOrder, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
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

  formatPaperChange($event) {

    if ($event && $event.value === 'A5') {
      this.numberColsAvailable = this.numberColsAvailable.filter(item => item.value === '2');
      this.numberColsAvailable = [...this.numberColsAvailable];

      if (this.selectedNumberCols) {
        this.selectedNumberCols = SettingsReportData.NUMBER_COLS[0];
      }
    } else {
      this.numberColsAvailable = SettingsReportData.NUMBER_COLS;
    }
  }

  hasStoredData(commercialActivities): boolean {

    const me = this;
    let hasStoredData = false;

    commercialActivities.forEach(commercialActivity => {

      if (commercialActivity && commercialActivity.commercialCategoryCol1 || commercialActivity.amountCol1) {
        hasStoredData = true;
      }
    });
    return hasStoredData;
  }

  cleanEmptyRow(reportData) {

    if (reportData.commercialActivities) {

      let filtredCommercialActivities = [];

      if (reportData.formatSettings.tipologyPrice === 2) {

        filtredCommercialActivities = reportData.commercialActivities.filter(item =>
          (item.commercialCategoryCol1 && item.currencyCol1 && item.initialPrice1 && item.discount1 && item.amountCol1) ||
          (item.commercialCategoryCol2 && item.currencyCol2 && item.initialPrice2 && item.discount2 && item.amountCol2) ||
          (item.commercialCategoryCol3 && item.currencyCol3 && item.initialPrice3 && item.discount3 && item.amountCol3));

        let collectIdOrdersFiltredCommActs = [];
        filtredCommercialActivities.forEach(item => {
          collectIdOrdersFiltredCommActs.push(item.idOrder);
        });
        const maxIdOrder = Math.max.apply(Math, collectIdOrdersFiltredCommActs);

        filtredCommercialActivities = reportData.commercialActivities.filter(item =>
          (item.commercialCategoryCol1 && item.currencyCol1 && item.initialPrice1 && item.discount1 && item.amountCol1) ||
          (item.commercialCategoryCol2 && item.currencyCol2 && item.initialPrice2 && item.discount2 && item.amountCol2) ||
          (item.commercialCategoryCol3 && item.currencyCol3 && item.initialPrice3 && item.discount3 && item.amountCol3) ||
          (item.idOrder < maxIdOrder));

        this.replaceCommaWithDotOnRow(filtredCommercialActivities);
      } else {
        filtredCommercialActivities = reportData.commercialActivities.filter(item =>
          (item.commercialCategoryCol1 && item.currencyCol1 && item.amountCol1) ||
          (item.commercialCategoryCol2 && item.currencyCol2 && item.amountCol2) ||
          (item.commercialCategoryCol3 && item.currencyCol3 && item.amountCol3));

        let collectIdOrdersFiltredCommActivities = [];
        filtredCommercialActivities.forEach(item => {
          collectIdOrdersFiltredCommActivities.push(item.idOrder);
        });
        const maxIdOrder = Math.max.apply(Math, collectIdOrdersFiltredCommActivities);

        filtredCommercialActivities = reportData.commercialActivities.filter(item =>
          (item.commercialCategoryCol1 && item.currencyCol1 && item.amountCol1) ||
          (item.commercialCategoryCol2 && item.currencyCol2 && item.amountCol2) ||
          (item.commercialCategoryCol3 && item.currencyCol3 && item.amountCol3) ||
          (item.idOrder < maxIdOrder));
      }
      reportData.commercialActivities = filtredCommercialActivities;
    }
  }

  replaceCommaWithDotOnRow(filtredCommercialActivities) {

    if (filtredCommercialActivities) {
      filtredCommercialActivities.forEach(item => {
        if (item.initialPrice1) {
          item.initialPrice1 = item.initialPrice1.replace(/,/g, '.');
        }
        if (item.initialPrice2) {
          item.initialPrice2 = item.initialPrice2.replace(/,/g, '.');
        }
        if (item.initialPrice3) {
          item.initialPrice3 = item.initialPrice3.replace(/,/g, '.');
        }
      });
    }
  }
}
