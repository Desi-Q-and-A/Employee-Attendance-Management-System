package com.eams.mongo.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.TaskModel;
import com.eams.mongo.api.entity.TaskStatus;

@Service
public interface TaskServices {

	Optional<TaskModel> find_Ex_Task(String userId, String taskName, String createdBy);

	TaskModel create_task(TaskModel taskdata);

	TaskModel update_task(String taskId, TaskModel data);

	Optional<TaskModel> fetch_task(String taskId);

	List<TaskModel> list_of_active_tasks(String userId, TaskStatus taskStatus);

	List<TaskModel> list_of_inactive_tasks(String userId, TaskStatus taskStatus);

	List<TaskModel> list_of_all_tasks(String userId, TaskStatus taskStatus);

	Boolean delete_task(String userId, String taskId);

	TaskModel update_task_actions(String taskId, TaskModel data);

}
