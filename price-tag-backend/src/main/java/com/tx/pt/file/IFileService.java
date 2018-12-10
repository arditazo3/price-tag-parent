package com.tx.pt.file;

import java.util.List;

import com.tx.pt.common.domain.Brand;
import com.tx.pt.common.file.domain.HttpFile;
import com.tx.pt.report.config.ReportExporter;
import com.tx.pt.user.domain.User;

public interface IFileService {

	public List<User> readUsersFromJsonFile();
	
	public List<Brand> readBrandsFromJsonFile();
	
	public void internalWriteFile(HttpFile httpFile, ReportExporter reportExporter);
}
