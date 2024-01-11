package com.eams.mongo.api.services;

import com.eams.mongo.api.dto.JwtAuthenticationResponse;
import com.eams.mongo.api.dto.SignInRequest;
import com.eams.mongo.api.entity.UserModel;

public interface AuthenticationService {
	
	UserModel signUp(UserModel data);
	
	JwtAuthenticationResponse signIn(SignInRequest data);
	
	UserModel updateUserProfile(UserModel data);
	

}