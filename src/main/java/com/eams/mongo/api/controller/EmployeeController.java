package com.eams.mongo.api.controller;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Optional;
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
import com.eams.mongo.api.dto.SuccessHandler;
import com.eams.mongo.api.entity.UserLoginHistoryModel;
import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.services.JWTService;
import com.eams.mongo.api.services.UserLoginHistoryServices;
import com.eams.mongo.api.services.UserServices;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class EmployeeController {
	@Autowired
	private  UserServices UserService;
	@Autowired
	private  UserLoginHistoryServices userLoginHistoryServices;
	@Autowired
	private JWTService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;
	 @Autowired
		private  PasswordEncoder passwordEncoder;
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody UserModel user) {
		try {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
		System.out.print(user + "  SignInRequest");
		
		
	    UserModel exUser = UserService.user_login(user.getEmail());

	    System.out.print(exUser.getPassword() + "   "+ user.getPassword() + "  pwd    "+ passwordEncoder.matches(user.getPassword(),exUser.getPassword()));
	    
	    if (exUser != null && passwordEncoder.matches(user.getPassword(),exUser.getPassword())) {
	    	
	    	LocalDate today = LocalDate.now();
	    	 LocalDateTime startOfDay = today.atStartOfDay();
	    	    LocalDateTime endOfDay = today.atTime(23, 59, 59);
              Optional<UserLoginHistoryModel> exLogin = userLoginHistoryServices.alreadyLoggedIn(exUser.getUserId(), startOfDay,endOfDay);
	    	      System.out.print(today + "hiiii " + exLogin);
	    	if(exLogin.isEmpty()) {
	    		UserLoginHistoryModel newObj = new UserLoginHistoryModel();
	    		newObj.setUserId(exUser.getUserId());
	    		newObj.setLoggedInAt(LocalDateTime.now());
	    		userLoginHistoryServices.newLoggedIn(newObj);
	    		
	    		exUser.setLoginTime(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
		    	UserService.update_user_profile(exUser.getUserId(), exUser);
	    	}
	    	
	    	
	    	
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
	
	
}
