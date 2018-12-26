import {Brand} from './brand';
import {CommercialActivity} from './commercial-activity';
import {FormatSettings} from './format-settings';

export class ReportData {

    commercialActivities: CommercialActivity[] = [];
    formatSettings: FormatSettings = new FormatSettings();
}