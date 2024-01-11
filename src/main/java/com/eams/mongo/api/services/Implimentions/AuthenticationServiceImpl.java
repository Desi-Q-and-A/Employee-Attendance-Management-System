package com.eams.mongo.api.services.Implimentions;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.dto.JwtAuthenticationResponse;
import com.eams.mongo.api.dto.SignInRequest;
import com.eams.mongo.api.entity.Role;
import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.repo.UserRepository;
import com.eams.mongo.api.services.AuthenticationService;
import com.eams.mongo.api.services.JWTService;


@Service

public class AuthenticationServiceImpl implements AuthenticationService {
	@Autowired
	private  UserRepository userRepository ;
	 @Autowired
	private  PasswordEncoder passwordEncoder;
	 @Autowired
	 private JWTService jwtService;
	 @Autowired
	 private AuthenticationManager authenticationManager;

	
	public UserModel signUp(UserModel data) {
		
		userRepository.findByEmail(data.getEmail())
        .ifPresent(existingUser -> {
            throw new IllegalArgumentException("User already exists.");
        });
		System.out.print(data);
		UserModel  user = new UserModel();
		user.setUserName(data.getUserName());
		user.setEmail(data.getEmail());
		user.setMobileNumber(data.getMobileNumber());
		user.setRole(Role.USER);
		user.setPassword(passwordEncoder.encode(data.getPassword()));
		return userRepository.save(user);
	}
	
	public JwtAuthenticationResponse signIn(SignInRequest data) {
		
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(data.getEmail(),data.getPassword()));
		System.out.print(data + "  SignInRequest");
		UserModel  user = userRepository.findByEmail(data.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email address !!!") );
		
		var token = jwtService.generateToken(user);
		
		var refreshToken = jwtService.generaterefreshToken( new HashMap<>(), user);
		System.out.print(user + "  user");
		
		JwtAuthenticationResponse res = new JwtAuthenticationResponse();
		 res.setToken(token);
		 res.setRefreshToken(refreshToken);
		 
		 return res;
		
	}
	
	

	    public UserModel updateUserProfile(UserModel data) {
	    	
	    	System.out.print(data + "  updateUserProfile");
	    	UserModel  exiUser = userRepository.findByEmail(data.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email address !!!") );

			Optional<UserModel> findUser =  userRepository.findById(exiUser.getUsername());
			  if (findUser.isPresent()) {
				  UserModel exUser = findUser.get();

			        if (data.getUserName() != null) {
			            exUser.setUserName(data.getUserName());
			        }
			        if (data.getEmail() != null) {
			            exUser.setEmail(data.getEmail());
			        }
			        if (data.getMobileNumber() != null) {
			            exUser.setMobileNumber(data.getMobileNumber());
			        }
			        if (data.getPassword() != null) {
			            exUser.setPassword(data.getPassword());
			        }
			       
			       
	                 
			        return  userRepository.save(exUser);
			    }

			    return null;
	}
	

}