package com.eams.mongo.api.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eams.mongo.api.entity.UserModel;

public interface UserRepository extends MongoRepository<UserModel, String> {


	Optional<UserModel> findByMobileNumberOrEmail(String mobileNumber, String email);
}
