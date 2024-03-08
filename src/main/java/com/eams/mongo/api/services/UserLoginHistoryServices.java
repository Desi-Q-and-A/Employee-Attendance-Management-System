package com.eams.mongo.api.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.UserLoginHistoryModel;

@Service
public interface UserLoginHistoryServices {

	
	UserLoginHistoryModel newLoggedIn(UserLoginHistoryModel loginData);

	Optional<UserLoginHistoryModel> alreadyLoggedIn(String userId, LocalDateTime startOfDay, LocalDateTime endOfDay);
	
	UserLoginHistoryModel update_loging_history( String loginId ,UserLoginHistoryModel data);
	
	
}
