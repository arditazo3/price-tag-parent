package com.tx.pt.report.config;

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
    	
    	Map<String, Object> parametersInserted = new HashMap<>();
    	parametersInserted.put("headerTxt", reportData.getHeaderMsg());
    	parametersInserted.put("footerTxt", reportData.getFooterMsg());
    	parametersInserted.put("brandTxt", reportData.getBrand().getDescription());
    	
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

		activitiesCollection.addAll(reportData.getCommercialActivities());
		
		this.dataSource = new JRBeanCollectionDataSource(activitiesCollection);
	}

	

}