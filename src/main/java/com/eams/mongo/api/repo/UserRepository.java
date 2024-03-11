package com.eams.mongo.api.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.eams.mongo.api.entity.UserModel;

public interface UserRepository extends MongoRepository<UserModel, String> {

	@Query("{$or:[{'mobileNumber' : ?0 },{'email' : ?1 }]}")
	Optional<UserModel> findByMobileNumberOrEmail(String mobileNumber, String email);

	@Query("{'isActive' : true }")
	List<UserModel> findActiveUsers();

	@Query("{'isActive' : false }")
	List<UserModel> findInActiveUsers();

	Optional<UserModel> findByEmail(String email);

}
