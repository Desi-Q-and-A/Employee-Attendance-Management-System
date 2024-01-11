package com.eams.mongo.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.UserModel;
@Service
public interface UserServices {
	
	 Optional<UserModel> existing_user(String mobileNumber, String email);
	UserModel register_user(UserModel userdata);
	UserModel update_user_profile(String userId ,UserModel data);
	UserModel fetch_user_profile(String userId);
    List<UserModel> list_of_active_users();
    List<UserModel> list_of_inactive_users();
    List<UserModel> list_of_all_users();
	UserModel delete_user_profile(String userId);
	UserModel user_login(String email);
	UserDetailsService userDetailsService();

}
