package com.eams.mongo.api.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import com.eams.mongo.api.entity.SuperAdminModel;

@Service
public interface SuperAdminServices {
	Boolean alreadyExists(String email);

	SuperAdminModel register_super_admin_user(SuperAdminModel data);

	SuperAdminModel super_admin_login(String email);

	SuperAdminModel update_super_admin_profile(String Id, SuperAdminModel data);

	SuperAdminModel fetch_super_admin_profile(String userId);

	UserDetailsService superAdminDetailsService();

}
