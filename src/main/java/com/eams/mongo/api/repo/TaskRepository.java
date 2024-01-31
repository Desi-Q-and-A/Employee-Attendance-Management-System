package com.eams.mongo.api.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.eams.mongo.api.entity.TaskModel;
import com.eams.mongo.api.entity.TaskStatus;


public interface TaskRepository extends MongoRepository<TaskModel, String> {
	
	@Query("{ 'userId' : ?0, 'taskName' : ?1, 'createdBy' : ?2 }")
	Optional<TaskModel> findExTask(String userId,String taskName, String createdBy);
	
	@Query("{ 'userId' : ?0, 'taskStatus' : ?1 }")
	List<TaskModel> findActiveTasks(String userId, TaskStatus taskStatus);

	
	@Query("{ 'userId' : ?0, 'taskStatus' : { $ne: ?1 } }")
	List<TaskModel> findInActiveTasks(String userId, TaskStatus taskStatus);
	
	@Query("{ 'userId' : ?0, $or: [ { 'taskStatus' : ?1 }, { 'taskStatus' : { $exists: false } } ] }")
	List<TaskModel> findAllTasksForUser(String userId, TaskStatus taskStatus);
	
	@Query("{ 'userId' : ?0 }")
	List<TaskModel> findAllTasksBy(String userId);
}
