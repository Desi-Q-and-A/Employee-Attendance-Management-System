package com.eams.mongo.api.services.Implimentions;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.UserLoginHistoryModel;

import com.eams.mongo.api.repo.UserLoginHistoryRepository;

import com.eams.mongo.api.services.UserLoginHistoryServices;


@Service

public class UserLoginHistoryServicesImpl implements UserLoginHistoryServices {
	
	@Autowired
	UserLoginHistoryRepository UserLoginHistory;
	
	@Override
	public Optional<UserLoginHistoryModel> alreadyLoggedIn(String userId, LocalDateTime startOfDay, LocalDateTime endOfDay) {
		 
		 Optional<UserLoginHistoryModel> exLogin =UserLoginHistory.alreadyLoggedIn(userId,startOfDay,endOfDay);

        return exLogin;
		
	}
	@Override
	public UserLoginHistoryModel newLoggedIn(UserLoginHistoryModel loginData) {
		
		UserLoginHistoryModel newLogin =UserLoginHistory.save(loginData);

        return newLogin;
		
	}

}
