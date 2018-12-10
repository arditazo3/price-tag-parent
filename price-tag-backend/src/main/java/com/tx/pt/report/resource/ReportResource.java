package com.tx.pt.report.resource;

import static com.tx.pt.common.constants.ApiConstants.*;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tx.pt.common.domain.Brand;
import com.tx.pt.common.domain.ReportData;
import com.tx.pt.common.file.domain.HttpFile;
import com.tx.pt.file.IFileService;
import com.tx.pt.report.service.IReportService;
import com.tx.pt.security.exception.GeneralException;

@Component
@Path(REPORT)
public class ReportResource {

	private static final Logger logger = LogManager.getLogger(ReportResource.class);

	private IFileService fileService;
	private IReportService reportService;

	@Autowired
	public void setFileService(IFileService fileService) {
		this.fileService = fileService;
	}

	@Autowired
	public void setReportService(IReportService reportService) {
		this.reportService = reportService;
	}

	@GET
	@Path(BRANDS)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBrands() { 

		logger.info("getBrands - Path: " + BRANDS);

		List<Brand> brands = fileService.readBrandsFromJsonFile();

		return Response.ok(brands).build();
	}

	@GET
	@Path(TEMPLATES)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTemplates() { 

		logger.info("getTemplates - Path: " + TEMPLATES);

		List<Brand> templates = fileService.readBrandsFromJsonFile();

		return Response.ok(templates).build();
	}

	@POST
	@Path(ELABORATE_REPORT)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response elaborateReport(ReportData reportData) { 

		logger.info("elaborateReport - Path: " + ELABORATE_REPORT);

		HttpFile reportFile = reportService.elaborateReport(reportData);

		StreamingOutput fileStream =  new StreamingOutput()
		{
			@Override
			public void write(java.io.OutputStream output)
			{
				try
				{
					java.nio.file.Path path = Paths.get(reportFile.getName());
					byte[] data = Files.readAllBytes(path);
					output.write(data); 
					output.flush();
				}
				catch (Exception e)
				{
					throw new GeneralException("File Not Found !!");
				}
			}
		};

		return Response
				.ok(fileStream, MediaType.APPLICATION_OCTET_STREAM)
				.header("content-disposition","attachment; filename = " + reportFile.getName())
				.build();
	}

}
