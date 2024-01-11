package com.eams.mongo.api.services;

import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;




public interface JWTService {
	
	String extractUsername (String Token);
	
	String generateToken(UserDetails userDetails);

	boolean isValidToken(String token , UserDetails  userDetails);
	
	String  generaterefreshToken( Map <String ,Object> extraClaims, UserDetails userdetail);

	
}

