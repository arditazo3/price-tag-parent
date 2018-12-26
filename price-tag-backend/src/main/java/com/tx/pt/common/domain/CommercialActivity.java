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
	private Double initialPrice1;
	private Double discount1;
	private Double amountCol1;
	private Integer decimalPart1;
	private String fractionalCurrencyPart1;
	
	private String commercialCategoryCol2;
	private String currencyCol2;
	private Double initialPrice2;
	private Double discount2;
	private Double amountCol2;
	private Integer decimalPart2;
	private String fractionalCurrencyPart2;
	
	private String commercialCategoryCol3;
	private String currencyCol3;
	private Double initialPrice3;
	private Double discount3;
	private Double amountCol3;
	private Integer decimalPart3;
	private String fractionalCurrencyPart3;
	
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
	public Double getInitialPrice1() {
		return initialPrice1;
	}
	public void setInitialPrice1(Double initialPrice1) {
		this.initialPrice1 = initialPrice1;
	}
	public Double getDiscount1() {
		return discount1;
	}
	public void setDiscount1(Double discount1) {
		this.discount1 = discount1;
	}
	public Double getInitialPrice2() {
		return initialPrice2;
	}
	public void setInitialPrice2(Double initialPrice2) {
		this.initialPrice2 = initialPrice2;
	}
	public Double getDiscount2() {
		return discount2;
	}
	public void setDiscount2(Double discount2) {
		this.discount2 = discount2;
	}
	public Double getInitialPrice3() {
		return initialPrice3;
	}
	public void setInitialPrice3(Double initialPrice3) {
		this.initialPrice3 = initialPrice3;
	}
	public Double getDiscount3() {
		return discount3;
	}
	public void setDiscount3(Double discount3) {
		this.discount3 = discount3;
	}
	public Integer getDecimalPart1() {
		return decimalPart1;
	}
	public void setDecimalPart1(Integer decimalPart1) {
		this.decimalPart1 = decimalPart1;
	}
	public String getFractionalCurrencyPart1() {
		return fractionalCurrencyPart1;
	}
	public void setFractionalCurrencyPart1(String fractionalCurrencyPart1) {
		this.fractionalCurrencyPart1 = fractionalCurrencyPart1;
	}
	public Integer getDecimalPart2() {
		return decimalPart2;
	}
	public void setDecimalPart2(Integer decimalPart2) {
		this.decimalPart2 = decimalPart2;
	}
	public String getFractionalCurrencyPart2() {
		return fractionalCurrencyPart2;
	}
	public void setFractionalCurrencyPart2(String fractionalCurrencyPart2) {
		this.fractionalCurrencyPart2 = fractionalCurrencyPart2;
	}
	public Integer getDecimalPart3() {
		return decimalPart3;
	}
	public void setDecimalPart3(Integer decimalPart3) {
		this.decimalPart3 = decimalPart3;
	}
	public String getFractionalCurrencyPart3() {
		return fractionalCurrencyPart3;
	}
	public void setFractionalCurrencyPart3(String fractionalCurrencyPart3) {
		this.fractionalCurrencyPart3 = fractionalCurrencyPart3;
	}
	
	
}
