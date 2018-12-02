package com.tx.pt.common.domain;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * API model for returning report data details.
 *
 * @author aazo
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReportData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String headerMsg;
	private String footerMsg;
	private Brand brand;
	private List<CommercialActivity> commercialActivities;
	
	public String getHeaderMsg() {
		return headerMsg;
	}
	public void setHeaderMsg(String headerMsg) {
		this.headerMsg = headerMsg;
	}
	public String getFooterMsg() {
		return footerMsg;
	}
	public void setFooterMsg(String footerMsg) {
		this.footerMsg = footerMsg;
	}
	public Brand getBrand() {
		return brand;
	}
	public void setBrand(Brand brand) {
		this.brand = brand;
	}
	public List<CommercialActivity> getCommercialActivities() {
		return commercialActivities;
	}
	public void setCommercialActivities(List<CommercialActivity> commercialActivities) {
		this.commercialActivities = commercialActivities;
	}
	
	
}
