package com.tx.pt.file;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tx.pt.common.domain.Brand;
import com.tx.pt.user.domain.User;

@Service
public class FileService implements IFileService {

	private static final Logger logger = LogManager.getLogger(FileService.class);
	
	@Value("${file.json.users}")
	private String pathJsonUsers;

	@Value("${file.json.brands}")
	private String pathJsonBrands;
	
	@Override
	public List<User> readUsersFromJsonFile() {
		
		List<User> users = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		InputStream is;

		try {
			
			is = new FileInputStream(pathJsonUsers);
			
			users = Arrays.asList((User[]) mapper.readValue(is, User[].class));
		} catch (Exception e) {
			logger.error(e);
		}
		return users;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Brand> readBrandsFromJsonFile() {
		
		List<Brand> brands = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		InputStream is;

		try {
			
			is = new FileInputStream(pathJsonBrands);
			
			brands = (List<Brand>) mapper.readValue(is, Brand.class);
		} catch (Exception e) {
			logger.error(e);
		}
		return brands;	}

	
}
