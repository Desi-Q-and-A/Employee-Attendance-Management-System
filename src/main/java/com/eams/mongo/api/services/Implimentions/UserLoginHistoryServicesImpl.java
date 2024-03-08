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
	
	@Override
	public UserLoginHistoryModel update_loging_history( String loginId ,UserLoginHistoryModel data) {
	
		Optional<UserLoginHistoryModel> findUser =  UserLoginHistory.findById(loginId);
		  if (findUser.isPresent()) {
			  UserLoginHistoryModel exUser = findUser.get();

		        if (data.getBreakTime() != null) {
		            exUser.setBreakTime(data.getBreakTime());
		        }
		        if (data.getWorkedTime() != null) {
		            exUser.setWorkedTime(data.getWorkedTime());
		        }
		        if (data.getBreakStartTime() != null) {
		            exUser.setBreakStartTime(data.getBreakStartTime());
		        }
		        if (data.getBreakPauseTime() != null) {
		            exUser.setBreakPauseTime(data.getBreakPauseTime());
		        }
		        if (data.getLoggedOutAt() != null) {
		            exUser.setLoggedOutAt(data.getLoggedOutAt() );
		        }
		        
		            exUser.setOnBreak(data.isOnBreak());
		        
		        
		            exUser.setPaused(data.isPaused());
		        
		       
		       
                 
		        return  UserLoginHistory.save(exUser);
		    }

		    return null;
	}


}
