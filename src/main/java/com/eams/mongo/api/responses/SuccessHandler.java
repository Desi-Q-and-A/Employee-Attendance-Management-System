package com.eams.mongo.api.responses;

import java.util.Optional;

import org.springframework.http.ResponseEntity;

public class SuccessHandler {

	 public static ResponseEntity<SuccessResponse> res(Boolean status,String message, Optional<?> data) {
	        SuccessResponse successResponse = new SuccessResponse();
	        successResponse.setStatus(status);
	        successResponse.setMessage(message);
	        successResponse.setData(Optional.ofNullable(data));

	        return ResponseEntity.ok().body(successResponse);
	    }
	
}
