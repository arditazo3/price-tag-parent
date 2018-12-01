package com.tx.pt.user.service;

import com.tx.pt.user.domain.User;

public interface IUserService {

	User findByUsername(String username);
}
