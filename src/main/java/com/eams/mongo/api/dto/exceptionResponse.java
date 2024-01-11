package com.eams.mongo.api.dto;

import java.util.Optional;

public class exceptionResponse {
             
	private Boolean status;
	private String message;
	private Optional<?> data;
//	private Optional<List<Object> ? Object :String> data;
	/**
	 * @return the status
	 */
	public Boolean getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(Boolean status) {
		this.status = status;
	}
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}
	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	/**
	 * @return the data
	 */
	public Optional<?> getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(Optional<?> data) {
		this.data = data;
	}
}
