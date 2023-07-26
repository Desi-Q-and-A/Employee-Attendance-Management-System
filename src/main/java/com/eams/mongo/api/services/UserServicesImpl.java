package com.eams.mongo.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.repo.UserRepository;

@Service

public class UserServicesImpl implements IUserServices {
	@Autowired
	UserRepository User;
	
	@Override
	public Optional<UserModel> existing_user(String mobileNumber ,String email) {
		
		 Optional<UserModel> exUser =User.findByMobileNumberOrEmail(mobileNumber, email);

        if (exUser.isPresent()) {
        	UserModel user = exUser.get();

            if (user.getMobileNumber() != null && user.getMobileNumber().equals(mobileNumber)) {
                return Optional.empty();
            }

            if (user.getEmail() != null && user.getEmail().equals(email)) {
                return Optional.empty();
            }
        }

        return null;
		
	}


	@Override
	public UserModel register_user(UserModel userdata) {
		// TODO Auto-generated method stub
		return User.save(userdata);
	}

	@Override
	public UserModel update_user_profile(UserModel data) {
	
		Optional<UserModel> findUser =  User.findById(data.getUserId());
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
		        System.out.println("Updating isActive: " + data.getIsActive());
                 
		        return  User.save(exUser);
		    }

		    return null;
	}

	@Override
	public UserModel fetch_user_profile(UserModel userId) {
		
		Optional<UserModel> findUser =  User.findById(userId.getUserId());
		if(findUser.isPresent()) {
			return findUser.get();
		}
		return null;
	}

	@Override
	public List<UserModel> list_of_active_users() {
		List<UserModel> activelist = User.findActiveUsers();
		return activelist;
	}

	@Override
	public List<UserModel> list_of_inactive_users() {
		List<UserModel> inActivelist = User.findInActiveUsers();
		return inActivelist;
	}

	@Override
	public UserModel delete_user_profile(String userId) {
		Optional<UserModel > checkUser= User.findById(userId);
		
		if(checkUser.isPresent()) {
			User.deleteById(userId);
			return checkUser.get();
		}else {
			return null;
		}
		
	}

	@Override
	public UserModel user_login(String email) {
		Optional<UserModel > chkUser = User.findByEmail(email);
		
			return chkUser.orElse(null);
		
	}


	@Override
	public List<UserModel> list_of_all_users() {
		
		List<UserModel> chkUser = User.findAll();
		
		return chkUser;
	}

}
