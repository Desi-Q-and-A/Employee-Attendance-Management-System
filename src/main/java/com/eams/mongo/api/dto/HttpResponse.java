package com.eams.mongo.api.dto;

import java.util.HashMap;
import java.util.Map;

public class HttpResponse<T> {
	private boolean status;
	private String message;
	private T data;

	public HttpResponse(boolean status, String message, T data) {
		this.status = status;
		this.message = message;
		this.data = data;
	}

	public Map<String, Object> toMap() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", status);

		if (message != null && !message.trim().isEmpty()) {

			map.put("message", message);
		}

		if (data != null) {
			map.put("data", data);
		}
		return map;
	}
}
