package com.eams.mongo.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.AdminModel;
import com.eams.mongo.api.entity.UserModel;

@Service
public interface AdminServices {
	Optional<AdminModel> existing_admin_user(String mobileNumber, String email);

	AdminModel register_admin_user(AdminModel userdata);

	AdminModel update_admin_profile(String userId, AdminModel data);

	AdminModel fetch_admin_profile(String userId);

	AdminModel admin_login(String email);

	Optional<UserModel> existing_user(String mobileNumber, String email);

	UserModel register_user(UserModel userdata);

	UserModel update_user_profile(String userId, UserModel data);

	UserModel fetch_user_profile(String userId);

	List<UserModel> list_of_active_users();

	List<UserModel> list_of_inactive_users();

	List<UserModel> list_of_all_users();

	UserModel delete_user_profile(String userId);

	UserDetailsService adminDetailsService();

}
