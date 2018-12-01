package com.tx.pt.user.service;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tx.pt.file.IFileService;
import com.tx.pt.user.domain.User;

/**
 * Service for {@link com.tx.pt.user.domain.User}s.
 *
 * @author aazo
 */
@Service
public class UserService implements IUserService {
	
	private IFileService fileService;

	@Autowired
	public void setFileService(IFileService fileService) {
		this.fileService = fileService;
	}

	@Override
	public User findByUsername(String username) {
		
		List<User> users = fileService.readUsersFromJsonFile();
		User user = null;
		
		if (!isEmpty(users)) {
			for (User userLoop : users) {
				if (userLoop.getUsername().equalsIgnoreCase(username)) {
					user = userLoop;
					break;
				}
			}
		}
		return user;
	}

}
