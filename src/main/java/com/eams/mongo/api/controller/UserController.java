package com.eams.mongo.api.controller;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.responses.SuccessHandler;
import com.eams.mongo.api.responses.SuccessResponse;
import com.eams.mongo.api.services.IUserServices;


@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private final IUserServices UserService = null;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserModel data) {
	    try {
	    	
	    	if (data.getUserName() == null || data.getUserName().isBlank()) {
	    	    return ResponseEntity.status(400).body("User name is required");
	    	}
	    	if (data.getMobileNumber() == null || data.getMobileNumber().isBlank()) {
	    	    return ResponseEntity.status(400).body("Mobile Number is required");
	    	}
	    	if (data.getEmail() == null || data.getEmail().isBlank()) {
	    	    return ResponseEntity.status(400).body("Email is required");
	    	}
	    	if (data.getPassword() == null || data.getPassword().isBlank()) {
	    	    return ResponseEntity.status(400).body("password is required");
	    	}
	    	
	        Optional<UserModel> exUser = UserService.existing_user(data.getMobileNumber(),data.getEmail());
	        //System.out.println(exUser);

	        if (exUser != null && exUser.isPresent() ) {
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
	    }  catch (Exception e) {
            // Handle validation error
            return ResponseEntity.status(400).body(e.getMessage());
        }
	}

	@PostMapping("/login")
	public ResponseEntity<SuccessResponse> userLogin (@RequestBody UserModel user){
		UserModel exUser = UserService.user_login( user.getEmail());
		
		 if (exUser != null && exUser.getPassword().equals(user.getPassword())) {
			 SecretKey secretKey = Keys.hmacShaKeyFor(("ff256ec5083ee140db76dda83af4f6c35929ce202226e69efc315745a951").getBytes());

	            // Generate JWT token using the secure key
	            String genJWTToken = Jwts.builder()
	                    .setSubject(user.getEmail())
	                    .signWith(secretKey)
	                    .compact();
;		    return SuccessHandler.res(true, "Login successful", Optional.of(genJWTToken));
		    } else {
		    	return	SuccessHandler.res(false, "Invalid login credentials", Optional.empty());
		    }
	}
	
	@PatchMapping("/update_profile")
	public ResponseEntity<?> updateUserProfile (@RequestBody UserModel data){
		UserModel exUser = UserService.update_user_profile(data);
		if(exUser != null) {
			return new ResponseEntity<>(exUser,  HttpStatus.OK);


		}
		 return ResponseEntity.status(400).body("Unable to update !!!");
	}
	
	@GetMapping("/fetch_user_profile/{userId}")
	public ResponseEntity<?> fetchUserProfile(@PathVariable UserModel userId){
		UserModel checkUser = UserService.fetch_user_profile(userId);
		if(checkUser != null) {
			return new ResponseEntity<>(checkUser,  HttpStatus.OK);
		}
		 return ResponseEntity.status(400).body("Unable to fetch user profile!!!");
	}
	
	@GetMapping("/list_of_active_users")
	public ResponseEntity<List<UserModel>> listOfActiveUsers(){
	List<UserModel>	 checkUsers = UserService.list_of_active_users();
		if(checkUsers != null) {
			return new ResponseEntity<>(checkUsers,  HttpStatus.OK);
		}
		 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/list_of_inactive_users")
	public ResponseEntity<List<UserModel>> listOfInactiveUsers(){
	List<UserModel>	 checkUsers = UserService.list_of_inactive_users();
		if(checkUsers != null) {
			return new ResponseEntity<>(checkUsers,  HttpStatus.OK);
		}
		 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/list_of_all_users")
	public ResponseEntity<List<UserModel>> list_of_all_users(){
	List<UserModel>	 checkUsers = UserService.list_of_all_users();
		if(checkUsers != null) {
			return new ResponseEntity<>(checkUsers,  HttpStatus.OK);
		}
		 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	 @DeleteMapping("/delete_user_profile")
     public ResponseEntity<?> deleteUserProfile(@RequestBody Map<String, String> data){
   	  
   	  try {
   		  System.out.println("userId   " + data.get("userId"));
   		UserModel findUser =  UserService.delete_user_profile(data.get("userId"));
			if(findUser != null) {
				 return new ResponseEntity<>(findUser, HttpStatus.OK);
			}else {
				 return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			 return new ResponseEntity<>("Invalid userId ", HttpStatus.BAD_REQUEST);
		}
   	  
     }
	
}
