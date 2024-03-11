package com.eams.mongo.api.dto;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class exceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(value = { IllegalArgumentException.class })
	@ResponseStatus(HttpStatus.FORBIDDEN)
	protected exceptionResponse illegalErrorHandler(IllegalArgumentException ex, WebRequest req) {

		exceptionResponse err = new exceptionResponse();
		err.setStatus(false);
		err.setMessage(ex.getMessage());

		return err;

	}

	@ExceptionHandler(value = { IOException.class })
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	protected exceptionResponse errorHandlerIO(IOException ex, WebRequest req) {

		exceptionResponse err = new exceptionResponse();
		err.setStatus(false);
		err.setMessage(ex.getMessage());

		return err;

	}

	@ExceptionHandler(value = { NoSuchElementException.class })
	@ResponseStatus(HttpStatus.NOT_FOUND)
	protected exceptionResponse noSuchElementErrorHandler(NoSuchElementException ex, WebRequest req) {
		exceptionResponse err = new exceptionResponse();
		err.setStatus(false);
		err.setMessage("Resource not found"); // Customize the message as needed

		return err;
	}

//	@ExceptionHandler(value = {CustomException.class})
//	@ResponseStatus(HttpStatus.FORBIDDEN)
//	protected exceptionResponse customErrorCandler (CustomException ex , WebRequest req){
//		 String message = "IllegalArgumentException";
//		 exceptionResponse err = new exceptionResponse();
//		 err.setStatus(false);
//		 err.setMessage(message);
//		 
//		 return err;
//		 
//	}

}
