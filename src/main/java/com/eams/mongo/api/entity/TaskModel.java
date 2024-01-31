package com.eams.mongo.api.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.time.Duration;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Tasks")
public class TaskModel {
	
	 @Id
	    private String id;

	    private String userId;
	    private String taskName;
	    private Priority priority;
	    private TaskActions taskActions;
	    private String createdBy;
	    private String assignedTo;
	    private List<String> observers;
	    private boolean isCompleted;
	    private TaskStatus taskStatus;
	    private Duration  timeTaken;
	    @Field("startedAt")
	    private LocalDateTime startedAt;
	    private LocalDateTime completedAt;

	    @CreatedDate
	    private LocalDateTime createdAt;

	    @LastModifiedDate
	    private LocalDateTime updatedAt;

		public String getTaskId() {
			return id;
		}
		public void setTaskId(String taskId) {
			this.id = taskId;
		}


		public String getUserId() {
			return userId;
		}

		public void setUserId(String userId) {
			this.userId = userId;
		}

		public String getTaskName() {
			return taskName;
		}

		public void setTaskName(String taskName) {
			this.taskName = taskName;
		}

		public Priority getPriority() {
			return priority;
		}

		public void setPriority(Priority priority) {
			this.priority = priority;
		}

		public String getCreatedBy() {
			return createdBy;
		}

		public void setCreatedBy(String createdBy) {
			this.createdBy = createdBy;
		}

		public String getAssignedTo() {
			return assignedTo;
		}

		public void setAssignedTo(String assignedTo) {
			this.assignedTo = assignedTo;
		}

		public List<String> getObservers() {
			return observers;
		}

		public void setObservers(List<String> observers) {
			this.observers = observers;
		}

		public boolean getIsCompleted() {
			return isCompleted;
		}

		public void setIsCompleted(boolean isCompleted) {
			this.isCompleted = isCompleted;
		}

		public TaskStatus getTaskStatus() {
			return taskStatus;
		}

		public void setTaskStatus(TaskStatus taskStatus) {
			this.taskStatus = taskStatus;
		}

		public Duration getTimeTaken() {
			return timeTaken;
		}

		public void setTimeTaken(Duration timeTaken) {
			this.timeTaken = timeTaken;
		}

		public LocalDateTime getStartedAt() {
			return startedAt;
		}

		public void setStartedAt(LocalDateTime startedAt) {
			this.startedAt = startedAt;
		}

		public LocalDateTime getCompletedAt() {
			return completedAt;
		}

		public void setCompletedAt(LocalDateTime completedAt) {
			this.completedAt = completedAt;
		}
		public TaskActions getTaskActions() {
			return taskActions;
		}
		public void setTaskActions(TaskActions taskActions) {
			this.taskActions = taskActions;
		}

		
}
