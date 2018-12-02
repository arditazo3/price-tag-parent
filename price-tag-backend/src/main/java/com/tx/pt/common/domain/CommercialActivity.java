package com.tx.pt.common.domain;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * API model for returning commercial activity details.
 *
 * @author aazo
 */
@JsonInclude(JsonInclude.Include.ALWAYS)
public class CommercialActivity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer idOrder;
	
	private String commercialCategoryCol1;
	private String currencyCol1;
	private Double amountCol1;
	
	private String commercialCategoryCol2;
	private String currencyCol2;
	private Double amountCol2;
	
	private String commercialCategoryCol3;
	private String currencyCol3;
	private Double amountCol3;
	
	public Integer getIdOrder() {
		return idOrder;
	}
	public void setIdOrder(Integer idOrder) {
		this.idOrder = idOrder;
	}
	public String getCommercialCategoryCol1() {
		return commercialCategoryCol1;
	}
	public void setCommercialCategoryCol1(String commercialCategoryCol1) {
		this.commercialCategoryCol1 = commercialCategoryCol1;
	}
	public String getCurrencyCol1() {
		return currencyCol1;
	}
	public void setCurrencyCol1(String currencyCol1) {
		this.currencyCol1 = currencyCol1;
	}
	public Double getAmountCol1() {
		return amountCol1;
	}
	public void setAmountCol1(Double amountCol1) {
		this.amountCol1 = amountCol1;
	}
	public String getCommercialCategoryCol2() {
		return commercialCategoryCol2;
	}
	public void setCommercialCategoryCol2(String commercialCategoryCol2) {
		this.commercialCategoryCol2 = commercialCategoryCol2;
	}
	public String getCurrencyCol2() {
		return currencyCol2;
	}
	public void setCurrencyCol2(String currencyCol2) {
		this.currencyCol2 = currencyCol2;
	}
	public Double getAmountCol2() {
		return amountCol2;
	}
	public void setAmountCol2(Double amountCol2) {
		this.amountCol2 = amountCol2;
	}
	public String getCommercialCategoryCol3() {
		return commercialCategoryCol3;
	}
	public void setCommercialCategoryCol3(String commercialCategoryCol3) {
		this.commercialCategoryCol3 = commercialCategoryCol3;
	}
	public String getCurrencyCol3() {
		return currencyCol3;
	}
	public void setCurrencyCol3(String currencyCol3) {
		this.currencyCol3 = currencyCol3;
	}
	public Double getAmountCol3() {
		return amountCol3;
	}
	public void setAmountCol3(Double amountCol3) {
		this.amountCol3 = amountCol3;
	}
	
	
}
