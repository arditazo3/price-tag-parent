package com.tx.pt.security.api.resource;

import static com.tx.pt.common.constants.ApiConstants.*;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tx.pt.security.api.model.UserCredentials;
import com.tx.pt.security.exception.GeneralException;
import com.tx.pt.user.domain.User;
import com.tx.pt.user.service.IUserService;

/**
 * JAX-RS resource class for authentication. The username is exchanged for an authentication token.
 * The user need to be exist on the table and to have at least one role
 *
 * @author aazo
 */
@Component
@Path(AUTH)
public class AuthenticationResource {

	private IUserService userService;

	@Autowired
	public void setUserService(IUserService userService) {
		this.userService = userService;
	}
	
	/**
     * Validate user credentials and issue a token for the user.
     *
     * @param credentials
     * @return the Response of authentification
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticate(UserCredentials credentials) {

        String username = credentials.getUsername();
        User userLogIn = null;

        if (!StringUtils.isEmpty(username)) {

            userLogIn = userService.findByUsername(username);

            if (userLogIn == null) {
                throw new GeneralException("The user doesn't exist");
            }
        } else {
            throw new GeneralException("Empty field");
        }

        return Response.ok(userLogIn).build();
    }
}
