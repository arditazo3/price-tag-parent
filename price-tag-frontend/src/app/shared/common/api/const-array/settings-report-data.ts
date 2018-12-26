import {ItemValue} from '../model/item-value';

export class SettingsReportData {

    public static FORMAT_PAPER: ItemValue[] = [
        new ItemValue('A4', 'A4', ''),
        new ItemValue('A5', 'A5', '')
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

    public static TEMPLATE_TYPE: ItemValue[] = [
        // Italian version
        new ItemValue('Natale', '1', 'IT'),
        new ItemValue('Pasqua', '2', 'IT'),
        // English version
        new ItemValue('Christmas', '1', 'EN'),
        new ItemValue('Easter', '2', 'EN')
    ];
}
