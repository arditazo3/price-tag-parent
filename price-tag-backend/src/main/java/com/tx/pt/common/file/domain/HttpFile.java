package com.tx.pt.common.file.domain;

import java.io.InputStream;
import java.util.Map;

public class HttpFile {

	private String name;
	private String submittedFileName;
	private String fileType;
	private String filePath;
	private long size;
	private Map<String, String> parameters;
	private InputStream stream;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSubmittedFileName() {
		return submittedFileName;
	}
	public void setSubmittedFileName(String submittedFileName) {
		this.submittedFileName = submittedFileName;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
	public Map<String, String> getParameters() {
		return parameters;
	}
	public void setParameters(Map<String, String> parameters) {
		this.parameters = parameters;
	}
	public InputStream getStream() {
		return stream;
	}
	public void setStream(InputStream stream) {
		this.stream = stream;
	}
}
