package com.eams.mongo.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.services.IUserServices;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private final IUserServices UserService = null;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserModel data) {
	    try {
	        Optional<UserModel> exUser = UserService.existing_user(data.getMobileNumber(), data.getEmail());

	        if (exUser.isPresent()) {
	            UserModel existingUser = exUser.get();

	            if (existingUser.getMobileNumber().equals(data.getMobileNumber())) {
	                return ResponseEntity.status(409).body("Mobile number already exists");
	            }

	            if (existingUser.getEmail().equals(data.getEmail())) {
	                return ResponseEntity.status(409).body("Email already exists");
	            }
	        }

	        UserModel newUser = UserService.register_user(data);

	        if (newUser == null) {
	            return ResponseEntity.status(400).body("Something went wrong !!!");
	        }

	        return ResponseEntity.status(200).body(newUser);
	    } catch (IncorrectResultSizeDataAccessException e) {
	        // Log the exception or handle it in a way that makes sense for your application
	        return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
	    }
	}

}
