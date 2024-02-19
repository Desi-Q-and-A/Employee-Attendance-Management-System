package com.eams.mongo.api.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.eams.mongo.api.entity.AdminModel;


public interface AdminRepository extends MongoRepository<AdminModel, String> {

	
	@Query("{$or:[{'mobileNumber' : ?0 },{'email' : ?1 }]}")
	Optional<AdminModel> findByMobileNumberOrEmail(String mobileNumber, String email);
	
	@Query("{'isActive' : true }")
	List<AdminModel> findActiveUsers();
	
	@Query("{'isActive' : false }")
	List<AdminModel> findInActiveUsers();
	
	Optional<AdminModel> findByEmail(String email);

	
}
