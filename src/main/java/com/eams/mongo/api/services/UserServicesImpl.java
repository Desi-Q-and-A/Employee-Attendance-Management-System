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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserModel fetch_user_profile(UserModel userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserModel> list_of_active_users() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserModel> list_of_inactive_users() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserModel delete_user_profile(UserModel userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserModel user_login(UserModel data) {
		// TODO Auto-generated method stub
		return null;
	}

}
