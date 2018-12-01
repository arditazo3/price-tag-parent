package com.tx.pt.report.resource;

import static com.tx.pt.common.constants.ApiConstants.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.stereotype.Component;

@Component
@Path(REPORT)
public class ReportResource {

	private static final Logger logger = LogManager.getLogger(ReportResource.class);
	
	@GET
	@Path(ELABORATE_REPORT)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response elaborateReport() { 

		logger.info("elaborateReport - Path: " + ELABORATE_REPORT);
		
		return Response.noContent().build();
	}
	
}
