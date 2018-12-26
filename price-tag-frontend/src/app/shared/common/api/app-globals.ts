import {IMyDpOptions} from 'mydatepicker';

export class AppGlobals {

    public static dateFormat = 'dd/mm/yyyy';

    /* Color of Loading */
    public static PrimaryWhite = '#ffffff';
    public static SecondaryGrey = '#ccc';

    public static myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: AppGlobals.dateFormat,
        editableDateField: false
    };

    public static convertDateToDatePicker(date): any {

        if (!date) {
            return;
        }
        const dateConverted: Object = {
            date:
                {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate()
                }
        };
        return dateConverted;
    }

    public static convertDatePickerToDate(date): any {

        if (!date) {
            return;
        }

        return date.day.toString() + '/' + date.month.toString() + '/' + date.year.toString();
    }
}
