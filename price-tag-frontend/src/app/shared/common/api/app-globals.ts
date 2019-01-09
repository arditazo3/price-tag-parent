import {IMyDpOptions} from 'mydatepicker';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

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

  public static currencyMaskWithDecimal = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: null,
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: false
  });

  public static currencyMaskWithoutDecimal = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: false,
    integerLimit: null,
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: false
  });
}
