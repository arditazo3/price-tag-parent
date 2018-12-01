package com.tx.pt.security.api.exceptionmapper;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.ExceptionMapper;

import com.tx.pt.security.api.model.ApiErrorDetails;
import com.tx.pt.security.exception.GeneralException;

public class GeneralExceptionMapper implements ExceptionMapper<GeneralException> {

    @Context
    private UriInfo uriInfo;

    /**
     * @param exception
     * @return the FORBIDDEN status of General Exception
     */
    @Override
    public Response toResponse(GeneralException exception) {

        Response.Status status = Response.Status.NOT_ACCEPTABLE;

        ApiErrorDetails errorDetails = new ApiErrorDetails();
        errorDetails.setStatus(status.getStatusCode());
        errorDetails.setTitle(status.getReasonPhrase());
        errorDetails.setMessage(exception.getMessage());
        errorDetails.setPath(uriInfo.getAbsolutePath().getPath());

        return Response.status(status).entity(errorDetails).type(MediaType.APPLICATION_JSON).build();
    }
}