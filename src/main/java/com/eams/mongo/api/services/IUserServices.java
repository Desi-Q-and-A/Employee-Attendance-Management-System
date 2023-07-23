package com.eams.mongo.api.services;

import java.util.List;
import java.util.Optional;

import com.eams.mongo.api.entity.UserModel;

public interface IUserServices {
	
	 Optional<UserModel> existing_user(String mobileNumber , String email);
	UserModel register_user(UserModel userdata);
	UserModel update_user_profile(UserModel data);
	UserModel fetch_user_profile(UserModel userId);
    List<UserModel> list_of_active_users();
    List<UserModel> list_of_inactive_users();
	UserModel delete_user_profile(UserModel userId);
	UserModel user_login(UserModel data);

}
