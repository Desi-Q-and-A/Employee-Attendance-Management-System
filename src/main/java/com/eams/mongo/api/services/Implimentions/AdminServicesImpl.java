package com.eams.mongo.api.services.Implimentions;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.AdminModel;
import com.eams.mongo.api.entity.Role;
import com.eams.mongo.api.entity.UserModel;
import com.eams.mongo.api.repo.AdminRepository;
import com.eams.mongo.api.repo.UserRepository;
import com.eams.mongo.api.services.AdminServices;

@Service

public class AdminServicesImpl implements AdminServices {
	@Autowired
	AdminRepository adminRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetailsService adminDetailsService() {
		return new UserDetailsService() {
			@Override
			public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
				return adminRepository.findByEmail(userName)
						.orElseThrow(() -> new UsernameNotFoundException("User not found!"));
			}
		};
	}

	@Override
	public Optional<AdminModel> existing_admin_user(String mobileNumber, String email) {

		Optional<AdminModel> exAdmin = adminRepository.findByMobileNumberOrEmail(mobileNumber, email);

		return exAdmin;
	}

	@Override
	public AdminModel register_admin_user(AdminModel data) {
		data.setRole(Role.ADMIN);
		return adminRepository.save(data);
	}

	@Override
	public AdminModel update_admin_profile(String userId, AdminModel data) {
		Optional<AdminModel> findAdminUser = adminRepository.findById(userId);
		if (findAdminUser.isPresent()) {
			AdminModel exAdmin = findAdminUser.get();

			if (data.getName() != null) {
				exAdmin.setName(data.getName());
			}
			if (data.getEmail() != null) {
				exAdmin.setEmail(data.getEmail());
			}
			if (data.getMobileNumber() != null) {
				exAdmin.setMobileNumber(data.getMobileNumber());
			}
			if (data.getPassword() != null) {
				exAdmin.setPassword(data.getPassword());
			}

			if (data.getIsActive() == true) {
				exAdmin.setIsActive(data.getIsActive());
			}
			exAdmin.setRole(Role.ADMIN);

			return adminRepository.save(exAdmin);
		}

		return null;
	}

	@Override
	public AdminModel fetch_admin_profile(String userId) {
		Optional<AdminModel> findAdmin = adminRepository.findById(userId);
		if (findAdmin.isPresent()) {
			return findAdmin.get();
		}
		return null;
	}

	@Override
	public AdminModel admin_login(String email) {
		Optional<AdminModel> chkAdmin = adminRepository.findByEmail(email);

		return chkAdmin.orElse(null);
	}

	// =========================================== User
	// ================================================

	@Override
	public Optional<UserModel> existing_user(String mobileNumber, String email) {

		Optional<UserModel> exUser = userRepository.findByMobileNumberOrEmail(mobileNumber, email);

		return exUser;

	}

	@Override
	public UserModel register_user(UserModel userdata) {

		return userRepository.save(userdata);
	}

	@Override
	public UserModel update_user_profile(String userId, UserModel data) {

		Optional<UserModel> findUser = userRepository.findById(userId);
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

			return userRepository.save(exUser);
		}

		return null;
	}

	@Override
	public UserModel fetch_user_profile(String userId) {

		Optional<UserModel> findUser = userRepository.findById(userId);
		if (findUser.isPresent()) {
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
		Optional<UserModel> checkUser = userRepository.findById(userId);

		if (checkUser.isPresent()) {
			userRepository.deleteById(userId);
			return checkUser.get();
		} else {
			return null;
		}

	}

	@Override
	public List<UserModel> list_of_all_users() {

		List<UserModel> chkUser = userRepository.findAll();

		return chkUser;
	}

}
