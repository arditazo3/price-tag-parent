import {Component, AfterViewInit, OnInit} from '@angular/core';
import {CommercialActivity} from '../../shared/common/api/model/commercial-activity';
import {Observable} from 'rxjs';
import {Brand} from '../../shared/common/api/model/brand';
import {CommCategoryService} from '../service/comm-category.service';
import {ReportData} from '../../shared/common/api/model/report-data';
import {DeviceDetectorService} from 'ngx-device-detector';
import {saveAs as importedSaveAs} from 'file-saver';
import {ApiErrorDetails} from '../../shared/common/api/model/api-error-details';

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

    headerMsg = '';
    footerMsg = '';

    constructor(private commCategoryService: CommCategoryService,
                private deviceService: DeviceDetectorService) {

        this.isMobile = this.deviceService.isMobile();
    }

    ngOnInit(): void {
        console.log('PriceTagComponent - ngOnInit');

        for (let i = 0; i < this.noOfRowsDefault; i++) {
            this.commercialActivities.push(new CommercialActivity(this.indexOrder));
            this.indexOrder++;
        }

        this.brandsObservable = this.commCategoryService.getBrands();
    }

    elaborateReport() {
        console.log('PriceTagComponent - elaborateReport');

        const me = this;

        const reportData: ReportData = new ReportData();
        reportData.brand = this.selectedBrand;
        reportData.headerMsg = this.headerMsg;
        reportData.footerMsg = this.footerMsg;
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
                    commercialActivity.amountCol1 = NaN;
                }
            );
        }
    }

    cleanSecondColumnValues() {

        if (this.commercialActivities && this.commercialActivities.length > 0) {
            this.commercialActivities.forEach(
                commercialActivity => {

                    commercialActivity.commercialCategoryCol2 = '';
                    commercialActivity.currencyCol2 = '';
                    commercialActivity.amountCol2 = NaN;
                }
            );
        }
    }

    cleanThirdColumnValues() {

        if (this.commercialActivities && this.commercialActivities.length > 0) {
            this.commercialActivities.forEach(
                commercialActivity => {

                    commercialActivity.commercialCategoryCol3 = '';
                    commercialActivity.currencyCol3 = '';
                    commercialActivity.amountCol3 = NaN;
                }
            );
        }
    }

    copyFirstColumnValuesToSecond() {

        if (this.commercialActivities && this.commercialActivities.length > 0) {
            this.commercialActivities.forEach(
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

        if (this.commercialActivities && this.commercialActivities.length > 0) {
            this.commercialActivities.forEach(
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
