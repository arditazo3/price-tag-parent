package com.tx.pt.report.service;

import static com.tx.pt.common.constants.ApiConstants.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tx.pt.common.domain.ReportData;
import com.tx.pt.common.file.domain.HttpFile;
import com.tx.pt.file.IFileService;
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
	private IFileService fileService;
	
	@Autowired
	public void setReportFiller(ReportFiller reportFiller) {
		this.reportFiller = reportFiller;
	}

	@Autowired
	public void setReportExporter(ReportExporter reportExporter) {
		this.reportExporter = reportExporter;
	}

	@Autowired
	public void setFileService(IFileService fileService) {
		this.fileService = fileService;
	}

	@Override
	public HttpFile elaborateReport(ReportData reportData) {

		reportFiller.setReportFileName(REPORT_PATH);
		
		reportFiller.createParametersAndDatasource(reportData);
		
		reportFiller.prepareReport();
		
		reportExporter.setJasperPrint(reportFiller.getJasperPrint());
		
		HttpFile httpFile = new HttpFile();
		
		fileService.internalWriteFile(httpFile, reportExporter);
		
		return httpFile;
	}

}
