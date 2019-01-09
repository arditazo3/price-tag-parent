package com.tx.pt.report.service;

import static org.springframework.util.ObjectUtils.isEmpty;
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

		reportFiller.setReportFileName(findTemplatePath(reportData));
		
		reportFiller.createParametersAndDatasource(reportData);
		
		reportFiller.prepareReport();
		
		reportExporter.setJasperPrint(reportFiller.getJasperPrint());
		
		HttpFile httpFile = new HttpFile();
		
		fileService.internalWriteFile(httpFile, reportExporter);
		
		return httpFile;
	}

	private String findTemplatePath(ReportData reportData) {

		String templatePath = "";

		if (!isEmpty(reportData)) {

			String brand = reportData.getFormatSettings().getBrand().getDescription();
			String formatPaper = reportData.getFormatSettings().getFormatPaper();
			String numbCols = String.valueOf(reportData.getFormatSettings().getNumberCols());
			String typePrice = getTipologyPriceByValue(reportData.getFormatSettings().getTipologyPrice());
			String templateType = getTemplateTypeByValue(reportData.getFormatSettings().getTemplateType());

			templatePath = REPORT_DEFAULT_PATH.concat(brand).concat("_").concat(formatPaper).concat("_").concat(numbCols).concat("_").concat(typePrice);

			if (!isEmpty(templateType)) {
				templatePath = templatePath.concat("_").concat(templateType);
			}
			templatePath = templatePath.concat(".jrxml");
		}
		return templatePath;
	}

	private String getTipologyPriceByValue(Integer value) {

		String tipPrice = "";

		if (value == 1) {
			tipPrice = "Institutional";
		} else if (value == 2) {
			tipPrice = "Promotion";
		}
		return tipPrice;
	}

	private String getTemplateTypeByValue(Integer value) {

		String tempType = "";

		if (value == 1) {
			tempType = "Christmas";
		} else if (value == 2) {
			tempType = "Easter";
		}
		return tempType;
	}

}
