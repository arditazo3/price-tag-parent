package com.tx.pt.report.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JasperReportConfig {

    @Bean
    public ReportFiller reportFiller() {
        return new ReportFiller();
    }

    @Bean
    public ReportExporter reportExporter() {
        return new ReportExporter();
    }

}