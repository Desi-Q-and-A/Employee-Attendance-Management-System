package com.eams.mongo.api.services.Implimentions;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.repo.UserRepository;
import com.eams.mongo.api.services.ReportsServices;


@Service

public class ReportsServicesImpl implements ReportsServices {
	@Autowired
	UserRepository userRepository;
	
	 @Override
	    public UserDetailsService userDetailsService() {
	        return new UserDetailsService() {
	            @Override
	            public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
	                return userRepository.findByEmail(userName).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
	            }
	        };
	    }
	
	@Override
	public Optional<UserModel> existing_user(String mobileNumber, String email) {
		
		 Optional<UserModel> exUser =userRepository.findByMobileNumberOrEmail(mobileNumber,email);

        return exUser;
		
	}


	@Override
	public UserModel register_user(UserModel userdata) {

		return userRepository.save(userdata);
	}

	@Override
	public UserModel update_user_profile( String userId ,UserModel data) {
	
		Optional<UserModel> findUser =  userRepository.findById(userId);
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
		        if (data.getFaceData() != null) {
		            exUser.setFaceData(data.getFaceData());
		        }
		        if (data.getLoginTime() != null) {
		            exUser.setLoginTime(data.getLoginTime());
		        }
		        if (data.getLogOutTime() != null) {
		            exUser.setLogOutTime(data.getLogOutTime());
		        }
		        if (data.getIsActive() == true) {
		        	 exUser.setIsActive(data.getIsActive());
		        }
		       
                 
		        return  userRepository.save(exUser);
		    }

		    return null;
	}

	@Override
	public UserModel fetch_user_profile(String userId) {
		
		Optional<UserModel> findUser =  userRepository.findById(userId);
		if(findUser.isPresent()) {
			return findUser.get();
		}
		return null;
	}

	@Override
	public List<UserModel> list_of_active_users() {
		List<UserModel> activelist = userRepository.findActiveUsers();
		return activelist;
	}

	@Override
	public List<UserModel> list_of_inactive_users() {
		List<UserModel> inActivelist = userRepository.findInActiveUsers();
		return inActivelist;
	}

	@Override
	public UserModel delete_user_profile(String userId) {
		Optional<UserModel > checkUser= userRepository.findById(userId);
		
		if(checkUser.isPresent()) {
			userRepository.deleteById(userId);
			return checkUser.get();
		}else {
			return null;
		}
		
	}

	@Override
	public UserModel user_login(String email) {
		Optional<UserModel > chkUser = userRepository.findByEmail(email);
		
			return chkUser.orElse(null);
		
	}


	@Override
	public List<UserModel> list_of_all_users() {
		
		List<UserModel> chkUser = userRepository.findAll();
		
		return chkUser;
	}

}
