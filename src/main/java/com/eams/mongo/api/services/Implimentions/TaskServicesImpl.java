package com.eams.mongo.api.services.Implimentions;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.eams.mongo.api.entity.UserModel;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.entity.TaskActions;
import com.eams.mongo.api.entity.TaskModel;
import com.eams.mongo.api.entity.TaskStatus;
import com.eams.mongo.api.repo.TaskRepository;
import com.eams.mongo.api.repo.UserRepository;
import com.eams.mongo.api.services.TaskServices;

@Service

public class TaskServicesImpl implements TaskServices {

	@Autowired
	TaskRepository taskRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public TaskModel create_task(TaskModel data) {

		return taskRepository.save(data);
	}

	@Override
	public TaskModel update_task(String taskId, TaskModel data) {

		Optional<TaskModel> findTask = taskRepository.findById(taskId);
		if (findTask.isPresent()) {
			TaskModel exTask = findTask.get();

			if (data.getTaskName() != null) {
				exTask.setTaskName(data.getTaskName());
			}
			if (data.getTaskStatus() != null) {
				exTask.setTaskStatus(data.getTaskStatus());
			}
			if (data.getPriority() != null) {
				exTask.setPriority(data.getPriority());
			}
			if (data.getAssignedTo() != null) {
				exTask.setAssignedTo(data.getAssignedTo());
			}
			if (data.getTimeTaken() != null) {
				exTask.setTimeTaken(data.getTimeTaken());
			}
			if (exTask.getStartedAt() == null) {

				LocalDateTime startDateTime = LocalDateTime.now();

				exTask.setStartedAt(startDateTime);
				exTask.setTaskStatus(TaskStatus.IN_PROGRESS);
			} else {

				LocalDateTime endDateTime = LocalDateTime.now();

				exTask.setCompletedAt(endDateTime);
				exTask.setTaskStatus(TaskStatus.COMPLETED);
				Duration duration = Duration.between(exTask.getStartedAt(), endDateTime);
				exTask.setTimeTaken(duration);
			}
			if (data.getCompletedAt() != null) {
				exTask.setCompletedAt(data.getCompletedAt());
			}
			if (data.getObservers() != null) {
				exTask.setObservers(data.getObservers());
			}

			return taskRepository.save(exTask);
		}

		return null;
	}

	@Override
	public TaskModel update_task_actions(String taskId, TaskModel data) {

		Optional<TaskModel> findTask = taskRepository.findById(taskId);
		if (findTask.isPresent()) {
			TaskModel exTask = findTask.get();

			if (data.getTaskActions() == TaskActions.START && exTask.getStartedAt() == null
					&& exTask.getTaskStatus() == TaskStatus.PENDING) {

				LocalDateTime startDateTime = LocalDateTime.now();
				exTask.setTaskActions(TaskActions.STARTED);
				exTask.setStartedAt(startDateTime);
				exTask.setTaskStatus(TaskStatus.IN_PROGRESS);
			} else if (data.getTaskActions() == TaskActions.PAUSE && exTask.getStartedAt() != null
					&& exTask.getTaskStatus() == TaskStatus.IN_PROGRESS) {
				exTask.setTaskActions(TaskActions.PAUSED);
				LocalDateTime startDateTime = LocalDateTime.now();
				Duration duration = Duration.between(exTask.getStartedAt(), startDateTime);
				exTask.setTimeTaken(duration);
				exTask.setTaskStatus(TaskStatus.IN_PROGRESS);
			} else if (data.getTaskActions() == TaskActions.RESUME && exTask.getStartedAt() != null
					&& exTask.getTaskStatus() == TaskStatus.IN_PROGRESS) {
				exTask.setTaskActions(TaskActions.RESUMED);
				LocalDateTime startDateTime = LocalDateTime.now();
				Duration duration = Duration.between(exTask.getStartedAt().plus(exTask.getTimeTaken()), startDateTime);
				exTask.setTimeTaken(duration);
				exTask.setTaskStatus(TaskStatus.IN_PROGRESS);
			} else if (data.getTaskActions() == TaskActions.END && exTask.getStartedAt() != null
					&& exTask.getTaskStatus() == TaskStatus.IN_PROGRESS) {
				exTask.setTaskActions(TaskActions.ENDED);
				LocalDateTime startDateTime = LocalDateTime.now();
				Duration duration = Duration.between(exTask.getStartedAt().plus(exTask.getTimeTaken()), startDateTime);
				exTask.setTimeTaken(duration);
				exTask.setTaskStatus(TaskStatus.COMPLETED);
				exTask.setCompletedAt(startDateTime);
				exTask.setIsCompleted(true);
			}
			if (data.getTaskStatus() == TaskStatus.COMPLETED) {
				exTask.setTaskStatus(TaskStatus.COMPLETED);
				exTask.setCompletedAt(data.getCompletedAt());
				exTask.setIsCompleted(true);
			}

			return taskRepository.save(exTask);
		}

		return null;
	}

	@Override
	public Optional<TaskModel> fetch_task(String userId) {

		Optional<TaskModel> findUser = taskRepository.findById(userId);
		if (findUser.isPresent()) {
			return findUser;
		}
		return null;
	}

	@Override
	public List<TaskModel> list_of_active_tasks(String userId, TaskStatus taskStatus) {
		List<TaskModel> activelist = taskRepository.findActiveTasks(userId, taskStatus);
		return activelist;
	}

	@Override
	public List<TaskModel> list_of_inactive_tasks(String userId, TaskStatus taskStatus) {
		List<TaskModel> inActivelist = taskRepository.findInActiveTasks(userId, taskStatus);
		return inActivelist;
	}

	@Override
	public List<TaskModel> list_of_all_tasks(String userId, TaskStatus taskStatus) {

		if (taskStatus != null) {

			List<TaskModel> inActivelist = taskRepository.findAllTasksForUser(userId, taskStatus);
			return inActivelist;
		}
		List<TaskModel> inActivelist = taskRepository.findAllTasksBy(userId);
		return inActivelist;
	}

	@Override
	public Boolean delete_task(String userId, String taskId) {

		Optional<UserModel> checkUser = userRepository.findById(userId);

		if (checkUser.isPresent()) {
			Optional<TaskModel> exTask = taskRepository.findById(taskId);
			if (exTask.isPresent()) {
				taskRepository.deleteById(taskId);
				return true;
			} else {

				return false;
			}
		} else {
			return false;
		}

	}

	@Override
	public Optional<TaskModel> find_Ex_Task(String userId, String taskName, String createdBy) {

		return taskRepository.findExTask(userId, taskName, createdBy);
	}

}
