package com.tx.pt.report.config;

import static org.springframework.util.ObjectUtils.isEmpty;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRSaver;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import com.tx.pt.common.domain.CommercialActivity;
import com.tx.pt.common.domain.ReportData;

@Component
public class ReportFiller {

    private String reportFileName;

    private JasperReport jasperReport;

    private JasperPrint jasperPrint;
    
    private JRDataSource dataSource;

	private Map<String, Object> parameters;

    public ReportFiller() {
        parameters = new HashMap<>();
    }

    public void prepareReport() {
        compileReport();
        fillReport();
    }

    public void compileReport() {
        try {
            InputStream reportStream = getClass().getResourceAsStream("/".concat(reportFileName));
            jasperReport = JasperCompileManager.compileReport(reportStream);
            
            Resource resource = new ClassPathResource(reportFileName);
            
            JRSaver.saveObject(jasperReport, resource.getFilename().replace(".jrxml", ".jasper"));
        } catch (JRException ex) {
            Logger.getLogger(ReportFiller.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void fillReport() {
        try {
            jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, getDataSource());
        } catch (JRException ex) {
            Logger.getLogger(ReportFiller.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Map<String, Object> getParameters() {
        return parameters;
    }

    public void createParametersAndDatasource(ReportData reportData) {
    	
    	createParameters(reportData);
    	createDataSource(reportData);
    }
    
    public void createParameters(ReportData reportData) {
    	
    	String headerTxt = "";
    	String footerTxt = "";
    
    	if (!isEmpty(reportData.getFormatSettings().getBrand()) && !isEmpty(reportData.getFormatSettings().getBrand().getHeader())) {
    		headerTxt = reportData.getFormatSettings().getBrand().getHeader();
    	}
    	if (!isEmpty(reportData.getFormatSettings().getBrand()) && !isEmpty(reportData.getFormatSettings().getBrand().getFooter())) {
    		footerTxt = reportData.getFormatSettings().getBrand().getFooter();
    	}
    	
    	Map<String, Object> parametersInserted = new HashMap<>();
    	parametersInserted.put("headerTxt", headerTxt);
    	parametersInserted.put("footerTxt", footerTxt);
    	
        this.parameters = parametersInserted;
    }

    public String getReportFileName() {
        return reportFileName;
    }

    public void setReportFileName(String reportFileName) {
        this.reportFileName = reportFileName;
    }

    public JasperPrint getJasperPrint() {
        return jasperPrint;
    }

	public JRDataSource getDataSource() {
		return dataSource;
	}

	public void createDataSource(ReportData reportData) {

		Collection<CommercialActivity> activitiesCollection = new ArrayList<>();

		if (!isEmpty(reportData.getCommercialActivities())) {
			
			for (CommercialActivity commercialActivity : reportData.getCommercialActivities()) {
				if (!isEmpty(commercialActivity.getAmountCol1())) {
					String amount1 = String.valueOf(commercialActivity.getAmountCol1());
					
					String[] valueSplitted = amount1.split("\\.");
					if (!isEmpty(valueSplitted) && valueSplitted.length == 2) {
						
						commercialActivity.setDecimalPart1(Integer.valueOf(valueSplitted[0]));
						
						String fractioal = valueSplitted[1];
						if (fractioal.length() == 1) {
							fractioal = fractioal + "0";
						}
						
						commercialActivity.setFractionalCurrencyPart1("," + fractioal + commercialActivity.getCurrencyCol1());
					}
				}
				if (!isEmpty(commercialActivity.getAmountCol2())) {
					String amount2 = String.valueOf(commercialActivity.getAmountCol2());
					
					String[] valueSplitted = amount2.split("\\.");
					if (!isEmpty(valueSplitted) && valueSplitted.length == 2) {
						
						commercialActivity.setDecimalPart2(Integer.valueOf(valueSplitted[0]));
						
						String fractioal = valueSplitted[1];
						if (fractioal.length() == 1) {
							fractioal = fractioal + "0";
						}
						
						commercialActivity.setFractionalCurrencyPart2("," + fractioal + " " + commercialActivity.getCurrencyCol2());
					}
				}
				if (!isEmpty(commercialActivity.getAmountCol3())) {
					String amount3 = String.valueOf(commercialActivity.getAmountCol3());
					
					String[] valueSplitted = amount3.split("\\.");
					if (!isEmpty(valueSplitted) && valueSplitted.length == 2) {
						
						commercialActivity.setDecimalPart3(Integer.valueOf(valueSplitted[0]));
						
						String fractioal = valueSplitted[1];
						if (fractioal.length() == 1) {
							fractioal = fractioal + "0";
						}
						
						commercialActivity.setFractionalCurrencyPart3("," + fractioal + " " + commercialActivity.getCurrencyCol3());
					}
				}
			}
			activitiesCollection.addAll(reportData.getCommercialActivities());	
		}
		
		this.dataSource = new JRBeanCollectionDataSource(activitiesCollection);
	}
}