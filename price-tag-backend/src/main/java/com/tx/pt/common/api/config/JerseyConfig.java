package com.tx.pt.common.api.config;

import static com.tx.pt.common.constants.ApiConstants.*;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import com.tx.pt.report.resource.ReportResource;
import com.tx.pt.security.api.exceptionmapper.GeneralExceptionMapper;
import com.tx.pt.security.api.resource.AuthenticationResource;

/**
 * Jersey configuration class.
 *
 * @author aazo
 */
@Component
@ApplicationPath(APP_PATH)
public class JerseyConfig extends ResourceConfig {

	/**
	 * Jersey URL configuration
	 */
	public JerseyConfig() {

		/**
		 * Application Resource
		 * */
		register(AuthenticationResource.class);
		register(ReportResource.class);

		/**
		 * General exception
		 * */
		register(GeneralExceptionMapper.class);
	}
}