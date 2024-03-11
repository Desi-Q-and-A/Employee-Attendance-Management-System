package com.eams.mongo.api.repo;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.eams.mongo.api.entity.UserLoginHistoryModel;

public interface UserLoginHistoryRepository extends MongoRepository<UserLoginHistoryModel, String> {

//	@Query("{$and:[{'userId' : ?0 },{'loggedInAt' : ?1 }]}")
//	Optional<UserLoginHistoryModel> alreadyLoggedIn(String userId, LocalDate loggedInAt);

	@Query("{'userId' : ?0, 'loggedInAt' : { $gte : ?1, $lt : ?2 } }")
	Optional<UserLoginHistoryModel> alreadyLoggedIn(String userId, LocalDateTime startOfDay, LocalDateTime endOfDay);

}
