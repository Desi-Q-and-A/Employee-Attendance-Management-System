package com.eams.mongo.api.controller;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.eams.mongo.api.entity.SuperAdminModel;
import com.eams.mongo.api.services.JWTService;
import com.eams.mongo.api.services.SuperAdminServices;
import io.jsonwebtoken.ExpiredJwtException;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/super_admin")
public class SuperAdminController {
	
	@Autowired
	private  SuperAdminServices SuperAdminService;
	
	@Autowired
	private JWTService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;
	 @Autowired
		private  PasswordEncoder passwordEncoder;
	 
	 
	 @PostMapping("/registartion")
		public ResponseEntity<?> admin_registartion(@RequestBody SuperAdminModel data) {
		    try {
		    	
		    	Boolean exSuperAdmin = SuperAdminService.alreadyExists(data.getEmail());
		    	
		    	  if (exSuperAdmin) {
		    		  return ResponseEntity.ok(new HttpResponse<>(false, "Ownwer already exists.!",null).toMap());
			        }
		    	
		    	if (data.getName() == null || data.getName().isBlank()) {
		    	    
		    	    return ResponseEntity.ok(new HttpResponse<>(false, "User name is required",null).toMap());
		    	}
		    
		    	if (data.getEmail() == null || data.getEmail().isBlank()) {
		    	    
		    	    return ResponseEntity.ok(new HttpResponse<>(false, "Email is required",null).toMap());
		    	}
		    	if (data.getPassword() == null || data.getPassword().isBlank()) {
		    	    
		    	    return ResponseEntity.ok(new HttpResponse<>(false, "password is required",null).toMap());
		    	}
		    	
		        data.setPassword(passwordEncoder.encode(data.getPassword()));
		        

		        SuperAdminModel newUser = SuperAdminService.register_super_admin_user(data);

		        if (newUser == null) {
		           
		            return ResponseEntity.ok(new HttpResponse<>(false, "Something went wrong.!",null).toMap());
		        }

		        return ResponseEntity.status(200).body(newUser);
		    }  catch (Exception e) {
	            
	            return ResponseEntity.ok(new HttpResponse<>(false, e.getMessage(),null).toMap());
	        }
		}
	
	 @PostMapping("/login")
	 public ResponseEntity<?> adminLogin(@RequestBody SuperAdminModel user) {
			try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
			System.out.print(user + "  SignInRequest");
			
			
			SuperAdminModel exUser = SuperAdminService.super_admin_login(user.getEmail());

		    System.out.print(exUser.getPassword().equals(user.getPassword()) + "  pwd    "+ passwordEncoder.matches(user.getPassword(),exUser.getPassword()));
		    
		    if (exUser != null && passwordEncoder.matches(user.getPassword(),exUser.getPassword())) {
		    	
		        var genJWTToken =jwtService.generateToken(exUser);
		        var refreshToken = jwtService.generaterefreshToken( new HashMap<>(), exUser);
	  
		        JwtAuthenticationResponse res = new JwtAuthenticationResponse();
				 res.setToken(genJWTToken);
				 res.setRefreshToken(refreshToken);
		        return ResponseEntity.ok(new HttpResponse<>(true,"Logged in successfully. ",res).toMap());
		           
		        
		    } else {
		        return ResponseEntity.ok(new HttpResponse<>(false, "Invalid login credentials", null).toMap());
		    } 
		    
			}catch (BadCredentialsException e) {
				 return ResponseEntity.ok(new HttpResponse<>(false, "Invalid login credentials", null).toMap());
		    
			} catch (JwtException  e) {
	           
	            return ResponseEntity.ok(new HttpResponse<>(false,  e.getMessage(), null).toMap());
	        }
		}

		
		@PatchMapping("/update_super_admin_profile")
		public ResponseEntity<?> updateAdminProfile (@RequestHeader("Authorization") String authReq, @RequestBody SuperAdminModel data) throws ExpiredJwtException{
			
			try {
				
			 String token = authReq.substring(7);
			 System.out.print("updateUserProfile "+token );
			
			 if(token == null) {
				 
				 return ResponseEntity.ok(new HttpResponse<>(false,"invalid token",null).toMap());
			 }
		     String userId = jwtService.extractUsername(token);
		     System.out.print(" updateUserProfile "+ (userId));
		     
		     
		     SuperAdminModel exUser = SuperAdminService.update_super_admin_profile(userId,data);
			if(exUser != null) {
				return new ResponseEntity<>(exUser,  HttpStatus.OK);


			}
			 return ResponseEntity.status(400).body("Unable to update !!!");
			}catch ( JwtException e) {
				 return ResponseEntity.ok(new HttpResponse<>(false,e.getMessage(),null).toMap());
			}
		}
		
		@GetMapping("/fetch_super_admin_profile")
		public ResponseEntity<?> fetchAdminProfile(@RequestHeader("Authorization") String authReq){
			
			try {
			
				
			 
			 String token = authReq.substring(7);
			 //System.out.println("fetch_user_profile: " + token);
			 if(token == null) {
				 
				 return ResponseEntity.ok(new HttpResponse<>(false,"invalid token",null).toMap());
			 }
		     String userId = jwtService.extractUsername(token);
			 //System.out.print(userId +" signUpRequest "+authReq);
			 
		     SuperAdminModel checkUser = SuperAdminService.fetch_super_admin_profile(userId);
			
			if(checkUser != null) {
				return  ResponseEntity.ok(new HttpResponse<>(true,null,checkUser).toMap());
			}
			 return ResponseEntity.ok(new HttpResponse<>(false,"Unable to fetch admin profile!!!",null).toMap());
			 
			} catch (JwtException e) {
				 return ResponseEntity.ok(new HttpResponse<>(false,e.getMessage(),null).toMap());
	        }
		}

		
}
