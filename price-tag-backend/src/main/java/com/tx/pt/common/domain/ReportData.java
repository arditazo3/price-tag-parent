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
	
	private List<CommercialActivity> commercialActivities;
	private FormatSettings formatSettings;

	public List<CommercialActivity> getCommercialActivities() {
		return commercialActivities;
	}
	public void setCommercialActivities(List<CommercialActivity> commercialActivities) {
		this.commercialActivities = commercialActivities;
	}
	public FormatSettings getFormatSettings() {
		return formatSettings;
	}
	public void setFormatSettings(FormatSettings formatSettings) {
		this.formatSettings = formatSettings;
	}
}
