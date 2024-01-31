package com.eams.mongo.api.controller;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.JwtException;


import com.eams.mongo.api.dto.HttpResponse;
import com.eams.mongo.api.dto.JwtAuthenticationResponse;
import com.eams.mongo.api.dto.SuccessHandler;
import com.eams.mongo.api.entity.Role;
import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.services.JWTService;
import com.eams.mongo.api.services.UserServices;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private  UserServices UserService;
	@Autowired
	private JWTService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;
	 @Autowired
		private  PasswordEncoder passwordEncoder;
	
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
	        data.setPassword(passwordEncoder.encode(data.getPassword()));
	        data.setRole(Role.USER);

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
	public ResponseEntity<?> userLogin(@RequestBody UserModel user) {
		try {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
		System.out.print(user + "  SignInRequest");
		
		
	    UserModel exUser = UserService.user_login(user.getEmail());

	    System.out.print(exUser.getPassword() + "   "+ user.getPassword() + "  pwd    "+ passwordEncoder.matches(user.getPassword(),exUser.getPassword()));
	    
	    if (exUser != null && passwordEncoder.matches(user.getPassword(),exUser.getPassword())) {
	    	exUser.setLoginTime(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
	    	UserService.update_user_profile(exUser.getUserId(), exUser);
	        var genJWTToken =jwtService.generateToken(exUser);
	        var refreshToken = jwtService.generaterefreshToken( new HashMap<>(), exUser);
  
	        JwtAuthenticationResponse res = new JwtAuthenticationResponse();
			 res.setToken(genJWTToken);
			 res.setRefreshToken(refreshToken);
	        return ResponseEntity.ok(new HttpResponse<>(true,"Logged in successfully. ",res).toMap());
	           
	        
	    } else {
	        return SuccessHandler.res(false, "Invalid login credentials", Optional.empty());
	    } 
	    
		}catch (BadCredentialsException e) {
	        return SuccessHandler.res(false, "Invalid login credentials", Optional.empty());
	    
		} catch (JwtException e) {
            return SuccessHandler.res(false, e.getMessage(), Optional.empty());
        }
	}

	
	@PatchMapping("/update_profile")
	public ResponseEntity<?> updateUserProfile (@RequestHeader("Authorization") String authReq, @RequestBody UserModel data){
		 //System.out.print(" updateUserProfile "+ ("userId"));
		 String token = authReq.substring(7);
		
		 if(token == null) {
			 
			 return ResponseEntity.ok(new HttpResponse<>(false,"invalid token",null).toMap());
		 }
	     String userId = jwtService.extractUsername(token);
		UserModel exUser = UserService.update_user_profile(userId,data);
		if(exUser != null) {
			return new ResponseEntity<>(exUser,  HttpStatus.OK);


		}
		 return ResponseEntity.status(400).body("Unable to update !!!");
	}
	
	@GetMapping("/fetch_user_profile")
	public ResponseEntity<?> fetchUserProfile(@RequestHeader("Authorization") String authReq){
		
		try {
		
			
		 
		 String token = authReq.substring(7);
		 //System.out.println("fetch_user_profile: " + token);
		 if(token == null) {
			 
			 return ResponseEntity.ok(new HttpResponse<>(false,"invalid token",null).toMap());
		 }
	     String userId = jwtService.extractUsername(token);
		 //System.out.print(userId +" signUpRequest "+authReq);
		 
		UserModel checkUser = UserService.fetch_user_profile(userId);
		
		if(checkUser != null) {
			return  ResponseEntity.ok(new HttpResponse<>(true,"User found successfully",checkUser).toMap());
		}
		 return ResponseEntity.ok(new HttpResponse<>(false,"Unable to fetch user profile!!!",null).toMap());
		 
		} catch (JwtException e) {
			 return ResponseEntity.ok(new HttpResponse<>(false,e.getMessage(),null).toMap());
        }
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
