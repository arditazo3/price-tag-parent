import {ItemValue} from '../model/item-value';
import {CommercialActivity} from "../model/commercial-activity";

export class SettingsReportData {

    public static  FORMAT_PAPER: ItemValue[] = [
        new ItemValue('A4', 'A4', ''),
        new ItemValue('A5', 'A5', '')
    ];

    public static readonly NUMBER_COLS: ItemValue[] = [
        new ItemValue('2', '2', ''),
        new ItemValue('3', '3', '')
    ];

    public static readonly TIPOLOGY_PRICE: ItemValue[] = [
        // Italian version
        new ItemValue('Istituzionale', '1', 'IT'),
        new ItemValue('Promozione', '2', 'IT'),
        // English version
        new ItemValue('Institutional', '1', 'EN'),
        new ItemValue('Promotion', '2', 'EN')
    ];

    public static readonly TEMPLATE_TYPE: ItemValue[] = [
        // Italian version
        // new ItemValue('Natale', '1', 'IT'),
        // new ItemValue('Pasqua', '2', 'IT'),
        new ItemValue('Standard', '3', 'IT'),
        // English version
        // new ItemValue('Christmas', '1', 'EN'),
        // new ItemValue('Easter', '2', 'EN'),
        new ItemValue('Standard', '3', 'EN')
    ];
}
