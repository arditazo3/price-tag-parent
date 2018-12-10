package com.tx.pt.report.service;

import com.tx.pt.common.domain.ReportData;
import com.tx.pt.common.file.domain.HttpFile;

public interface IReportService {

	public HttpFile elaborateReport(ReportData reportData);
}
