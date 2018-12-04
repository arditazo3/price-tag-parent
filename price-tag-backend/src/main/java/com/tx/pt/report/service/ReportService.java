package com.tx.pt.report.service;

import static com.tx.pt.common.constants.ApiConstants.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tx.pt.common.domain.ReportData;
import com.tx.pt.report.config.ReportExporter;
import com.tx.pt.report.config.ReportFiller;

/**
 * Service for {@link com.tx.pt.common.domain.ReportData}s.
 *
 * @author aazo
 */
@Service
public class ReportService implements IReportService {

	private ReportFiller reportFiller;
	private ReportExporter reportExporter;
	
	@Autowired
	public void setReportFiller(ReportFiller reportFiller) {
		this.reportFiller = reportFiller;
	}

	@Autowired
	public void setReportExporter(ReportExporter reportExporter) {
		this.reportExporter = reportExporter;
	}


	@Override
	public void elaborateReport(ReportData reportData) {

		reportFiller.setReportFileName(REPORT_PATH);
		
		reportFiller.createParametersAndDatasource(reportData);
		
		reportFiller.prepareReport();
		
		reportExporter.setJasperPrint(reportFiller.getJasperPrint());
		
		reportExporter.exportToPdf("C:\\PriceTag\\test.pdf", "Ardit");
	}

}
