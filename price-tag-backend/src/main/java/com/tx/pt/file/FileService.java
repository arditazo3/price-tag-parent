package com.tx.pt.file;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tx.pt.common.domain.Brand;
import com.tx.pt.common.file.domain.HttpFile;
import com.tx.pt.common.file.exceptions.FileUploadException;
import com.tx.pt.common.file.exceptions.ServiceError;
import com.tx.pt.report.config.ReportExporter;
import com.tx.pt.user.domain.User;

@Service
public class FileService implements IFileService {

	private static final Logger logger = LogManager.getLogger(FileService.class);

	@Value("${file.json.users}")
	private String pathJsonUsers;

	@Value("${file.json.brands}")
	private String pathJsonBrands;
	
	@Value("${file.upload.rootpath}")
	private String fileRootPath;

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

	@Override
	public List<Brand> readBrandsFromJsonFile() {

		List<Brand> brands = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		InputStream is;

		try {

			is = new FileInputStream(pathJsonBrands);

			brands = Arrays.asList((Brand[]) mapper.readValue(is, Brand[].class));
		} catch (Exception e) {
			logger.error(e);
		}
		return brands;	}

	public void internalWriteFile(HttpFile httpFile, ReportExporter reportExporter) {
		try {
			Calendar now = Calendar.getInstance();
			int year = now.get(Calendar.YEAR);
			int month = now.get(Calendar.MONTH);
			int day = now.get(Calendar.DAY_OF_MONTH);
			String yearInString = String.valueOf(year);
			String monthInString = String.valueOf(month + 1);
			String dayInString = String.valueOf(day);

			int hour = now.get(Calendar.HOUR_OF_DAY);
			int minute = now.get(Calendar.MINUTE);
			int second = now.get(Calendar.SECOND);
			String hourInString = String.valueOf(hour);
			String minuteInString = String.valueOf(minute);
			String secondInString = String.valueOf(second);

			String idString = hourInString.concat(minuteInString).concat(secondInString);
			String targetFileName = "Report";

			File currentDirFile = new File(".");
			String helper = currentDirFile.getAbsolutePath();
			String currentDir = helper.substring(0, helper.length() - currentDirFile.getCanonicalPath().length());

			String fullFilePath = currentDir + File.separator + fileRootPath + File.separator + yearInString + File.separator + monthInString + File.separator + dayInString;
			targetFileName = fullFilePath + File.separator + idString.concat("_").concat(targetFileName);
			httpFile.setFilePath(targetFileName);

			File file = new File(targetFileName);
			if (file.exists()) {
				file.delete();
			}

			file.getParentFile().mkdirs();

			targetFileName = reportExporter.exportToPdf(targetFileName);
			
			httpFile.setName(targetFileName);
		} catch(Exception e) {
			throw new FileUploadException(new ServiceError("storingFileError", "Error writing file"), String.format("Writing File '%s' failed", "Report elaboration"), e);
		}
	}
	
	

}
