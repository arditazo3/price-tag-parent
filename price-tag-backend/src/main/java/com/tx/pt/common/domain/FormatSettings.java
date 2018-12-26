package com.tx.pt.common.domain;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * API model for returning format settings details.
 *
 * @author aazo
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FormatSettings implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String formatPaper;
	private Integer numberCols;
	private Integer tipologyPrice;
	private Integer templateType;

	private Brand brand;
	
	public String getFormatPaper() {
		return formatPaper;
	}
	public void setFormatPaper(String formatPaper) {
		this.formatPaper = formatPaper;
	}
	public Integer getNumberCols() {
		return numberCols;
	}
	public void setNumberCols(Integer numberCols) {
		this.numberCols = numberCols;
	}
	public Integer getTipologyPrice() {
		return tipologyPrice;
	}
	public void setTipologyPrice(Integer tipologyPrice) {
		this.tipologyPrice = tipologyPrice;
	}
	public Brand getBrand() {
		return brand;
	}
	public void setBrand(Brand brand) {
		this.brand = brand;
	}
	public Integer getTemplateType() {
		return templateType;
	}

	public void setTemplateType(Integer templateType) {
		this.templateType = templateType;
	}
	
	
}
