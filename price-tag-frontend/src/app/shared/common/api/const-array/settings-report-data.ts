import {ItemValue} from "../model/item-value";

export class SettingsReportData {

  public static FORMAT_PAPER: ItemValue[] = [
    new ItemValue('A3', 'A3', ''),
    new ItemValue('A4', 'A4', '')
  ];

  public static NUMBER_COLS: ItemValue[] = [
    new ItemValue('2', '2', ''),
    new ItemValue('3', '3', '')
  ];

  public static TIPOLOGY_PRICE: ItemValue[] = [
    // Italian version
    new ItemValue('Istituzionale', '1', 'IT'),
    new ItemValue('Promozione', '2', 'IT'),
    // English version
    new ItemValue('Institutional', '1', 'EN'),
    new ItemValue('Promotion', '2', 'EN')
  ];
}
