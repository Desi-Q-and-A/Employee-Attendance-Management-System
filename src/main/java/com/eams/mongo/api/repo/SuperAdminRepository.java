package com.eams.mongo.api.repo;


import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.eams.mongo.api.entity.SuperAdminModel;


public interface SuperAdminRepository extends MongoRepository<SuperAdminModel, String> {

	
	@Query("{'email' : ?0 }")
	Optional<SuperAdminModel> findByEmail( String email);
	
}
