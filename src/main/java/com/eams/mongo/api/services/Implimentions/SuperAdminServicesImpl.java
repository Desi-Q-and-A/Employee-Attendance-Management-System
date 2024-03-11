package com.eams.mongo.api.services.Implimentions;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.eams.mongo.api.entity.Role;
import com.eams.mongo.api.entity.SuperAdminModel;
import com.eams.mongo.api.repo.SuperAdminRepository;

import com.eams.mongo.api.services.SuperAdminServices;

@Service

public class SuperAdminServicesImpl implements SuperAdminServices {
	@Autowired
	SuperAdminRepository SuperAdmin;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetailsService superAdminDetailsService() {
		return new UserDetailsService() {
			@Override
			public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
				return SuperAdmin.findByEmail(userName)
						.orElseThrow(() -> new UsernameNotFoundException("User not found!"));
			}
		};
	}

	@Override
	public Boolean alreadyExists(String email) {

		Optional<SuperAdminModel> exAdmin = SuperAdmin.findByEmail(email);

		List<SuperAdminModel> exSA = SuperAdmin.findAll();
		if (exAdmin.isPresent()) {
			return true;
		}
		if (exSA.size() > 0) {
			return true;
		}

		return false;
	}

	@Override
	public SuperAdminModel register_super_admin_user(SuperAdminModel data) {
		data.setRole(Role.SUPERADMIN);
		return SuperAdmin.save(data);
	}

	@Override
	public SuperAdminModel update_super_admin_profile(String userId, SuperAdminModel data) {
		Optional<SuperAdminModel> findAdminUser = SuperAdmin.findById(userId);
		if (findAdminUser.isPresent()) {
			SuperAdminModel exAdmin = findAdminUser.get();

			if (data.getName() != null) {
				exAdmin.setName(data.getName());
			}
			if (data.getEmail() != null) {
				exAdmin.setEmail(data.getEmail());
			}

			if (data.getPassword() != null) {

				exAdmin.setPassword(passwordEncoder.encode(data.getPassword()));
			}

			exAdmin.setRole(Role.SUPERADMIN);

			return SuperAdmin.save(exAdmin);
		}

		return null;
	}

	@Override
	public SuperAdminModel fetch_super_admin_profile(String userId) {
		Optional<SuperAdminModel> findAdmin = SuperAdmin.findById(userId);
		if (findAdmin.isPresent()) {
			return findAdmin.get();
		}
		return null;
	}

	@Override
	public SuperAdminModel super_admin_login(String email) {
		Optional<SuperAdminModel> chkAdmin = SuperAdmin.findByEmail(email);

		return chkAdmin.orElse(null);
	}

}
