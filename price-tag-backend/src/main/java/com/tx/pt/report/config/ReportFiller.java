package com.tx.pt.report.config;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.*;
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

import javax.imageio.ImageIO;

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

            JRSaver.saveObject(jasperReport, resource.getFilename().replace(".jrxml",".jasper"));
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
        parametersInserted.put("headerTxt","");
        parametersInserted.put("footerTxt", footerTxt);

        URL url = this.getClass().getClassLoader().getResource("report/logo-images/logo_".concat(headerTxt.toLowerCase()).concat(".png"));
        parametersInserted.put("logo", url);

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
                elaborateColumn1(commercialActivity);
                elaborateColumn2(commercialActivity);
                elaborateColumn3(commercialActivity);
            }
            activitiesCollection.addAll(reportData.getCommercialActivities());

            if (reportData.getFormatSettings().getTipologyPrice().compareTo(new Integer(1)) == 0 &&
					activitiesCollection.size() % 6 != 0) {

            	List<CommercialActivity> commercialActivityList = new ArrayList<>();
				for (int index = 0; index < activitiesCollection.size() % 6; index++) {
					CommercialActivity commercialActivity = new CommercialActivity();
					elaborateColumn1(commercialActivity);
					elaborateColumn2(commercialActivity);
					elaborateColumn3(commercialActivity);
					commercialActivityList.add(commercialActivity);
				}
				activitiesCollection.addAll(commercialActivityList);
			} else if (reportData.getFormatSettings().getTipologyPrice().compareTo(new Integer(2)) == 0 &&
					activitiesCollection.size() % 4 != 0) {

				List<CommercialActivity> commercialActivityList = new ArrayList<>();
            	for (int index = 0; index < activitiesCollection.size() % 4; index++) {
					CommercialActivity commercialActivity = new CommercialActivity();
					elaborateColumn1(commercialActivity);
					elaborateColumn2(commercialActivity);
					elaborateColumn3(commercialActivity);
					commercialActivityList.add(commercialActivity);
				}
				activitiesCollection.addAll(commercialActivityList);
			}
        }

        this.dataSource = new JRBeanCollectionDataSource(activitiesCollection);
    }

	private void elaborateColumn3(CommercialActivity commercialActivity) {
		if (!isEmpty(commercialActivity.getAmountCol3())) {
		    String amount3 = String.valueOf(commercialActivity.getAmountCol3());
		    String initialPrice3 = String.valueOf(commercialActivity.getInitialPrice3());

		    String[] valueSplitted = amount3.split("\\.");
		    String[] initialPriceSplitted = initialPrice3.split("\\.");

		    if (!isEmpty(valueSplitted) && valueSplitted.length == 2) {

		        commercialActivity.setDecimalPart3(Integer.valueOf(valueSplitted[0]));

		        String fractioal = valueSplitted[1];
		        if (fractioal.length() == 1) {
		            fractioal = fractioal + "0";
		        }

		        commercialActivity.setFractionalCurrencyPart3("," + fractioal + " " + commercialActivity.getCurrencyCol3());
		    }

		    if (!isEmpty(initialPriceSplitted) && initialPriceSplitted.length == 2) {

		        commercialActivity.setDecimalInitialPart3(Integer.valueOf(initialPriceSplitted[0]));

		        String fractioal = initialPriceSplitted[1];
		        if (fractioal.length() == 1) {
		            fractioal = fractioal + "0";
		        }

		        commercialActivity.setFractionalCurrencyInitialPart3("," + fractioal + " " + commercialActivity.getCurrencyCol3());
		        commercialActivity.setDiscountReport3("-".concat(String.valueOf(commercialActivity.getDiscount3().intValue())).concat("%"));
		    }

		    if (!isEmpty(commercialActivity.getCommercialCategoryCol3())) {
		        commercialActivity.setCommercialCategoryCol3(commercialActivity.getCommercialCategoryCol3().toUpperCase());
            }
		} else {
		    commercialActivity.setFractionalCurrencyInitialPart3("");
		    commercialActivity.setDiscountReport3("");
		    commercialActivity.setDecimalInitialPart3(0);
		    commercialActivity.setDecimalPart3(0);
		    commercialActivity.setFractionalCurrencyPart3("");
		    commercialActivity.setCommercialCategoryCol3("");
		    commercialActivity.setAmountCol3(0d);
		    commercialActivity.setCurrencyCol3("");
		    commercialActivity.setDiscount3(0d);
		    commercialActivity.setInitialPrice3(0d);
		}
	}

	private void elaborateColumn2(CommercialActivity commercialActivity) {
		if (!isEmpty(commercialActivity.getAmountCol2())) {
		    String amount2 = String.valueOf(commercialActivity.getAmountCol2());
		    String initialPrice2 = String.valueOf(commercialActivity.getInitialPrice2());

		    String[] valueSplitted = amount2.split("\\.");
		    String[] initialPriceSplitted = initialPrice2.split("\\.");

		    if (!isEmpty(valueSplitted) && valueSplitted.length == 2) {

		        commercialActivity.setDecimalPart2(Integer.valueOf(valueSplitted[0]));

		        String fractioal = valueSplitted[1];
		        if (fractioal.length() == 1) {
		            fractioal = fractioal + "0";
		        }

		        commercialActivity.setFractionalCurrencyPart2("," + fractioal + " " + commercialActivity.getCurrencyCol2());
		    }

		    if (!isEmpty(initialPriceSplitted) && initialPriceSplitted.length == 2) {

		        commercialActivity.setDecimalInitialPart2(Integer.valueOf(initialPriceSplitted[0]));

		        String fractioal = initialPriceSplitted[1];
		        if (fractioal.length() == 1) {
		            fractioal = fractioal + "0";
		        }

		        commercialActivity.setFractionalCurrencyInitialPart2("," + fractioal + " " + commercialActivity.getCurrencyCol2());
		        commercialActivity.setDiscountReport2("-".concat(String.valueOf(commercialActivity.getDiscount2().intValue())).concat("%"));
		    }

            if (!isEmpty(commercialActivity.getCommercialCategoryCol2())) {
                commercialActivity.setCommercialCategoryCol2(commercialActivity.getCommercialCategoryCol2().toUpperCase());
            }
		} else {
		    commercialActivity.setFractionalCurrencyInitialPart2("");
		    commercialActivity.setDiscountReport2("");
		    commercialActivity.setDecimalInitialPart2(0);
		    commercialActivity.setDecimalPart2(0);
		    commercialActivity.setFractionalCurrencyPart2("");
		    commercialActivity.setCommercialCategoryCol2("");
		    commercialActivity.setAmountCol2(0d);
		    commercialActivity.setCurrencyCol2("");
		    commercialActivity.setDiscount2(0d);
		    commercialActivity.setInitialPrice2(0d);
		}
	}

	private void elaborateColumn1(CommercialActivity commercialActivity) {
		if (!isEmpty(commercialActivity.getAmountCol1())) {
		    String amount1 = String.valueOf(commercialActivity.getAmountCol1());
		    String initialPrice1 = String.valueOf(commercialActivity.getInitialPrice1());

		    String[] valueSplitted = amount1.split("\\.");
		    String[] initialPriceSplitted = initialPrice1.split("\\.");

		    if (!isEmpty(valueSplitted) && valueSplitted.length == 2) {

		        commercialActivity.setDecimalPart1(Integer.valueOf(valueSplitted[0]));

		        String fractioal = valueSplitted[1];
		        if (fractioal.length() == 1) {
		            fractioal = fractioal + "0";
		        }

		        commercialActivity.setFractionalCurrencyPart1("," + fractioal + " " + commercialActivity.getCurrencyCol1());
		    }

		    if (!isEmpty(initialPriceSplitted) && initialPriceSplitted.length == 2) {

		        commercialActivity.setDecimalInitialPart1(Integer.valueOf(initialPriceSplitted[0]));

		        String fractioal = initialPriceSplitted[1];
		        if (fractioal.length() == 1) {
		            fractioal = fractioal + "0";
		        }

		        commercialActivity.setFractionalCurrencyInitialPart1("," + fractioal + " " + commercialActivity.getCurrencyCol1());
		        commercialActivity.setDiscountReport1("-".concat(String.valueOf(commercialActivity.getDiscount1().intValue())).concat("%"));
		    }

            if (!isEmpty(commercialActivity.getCommercialCategoryCol1())) {
                commercialActivity.setCommercialCategoryCol1(commercialActivity.getCommercialCategoryCol1().toUpperCase());
            }
		} else {
		    commercialActivity.setFractionalCurrencyInitialPart1("");
		    commercialActivity.setDiscountReport1("");
		    commercialActivity.setDecimalInitialPart1(0);
		    commercialActivity.setDecimalPart1(0);
		    commercialActivity.setFractionalCurrencyPart1("");
		    commercialActivity.setCommercialCategoryCol1("");
		    commercialActivity.setAmountCol1(0d);
		    commercialActivity.setCurrencyCol1("");
		    commercialActivity.setDiscount1(0d);
		    commercialActivity.setInitialPrice1(0d);
		}
	}
}