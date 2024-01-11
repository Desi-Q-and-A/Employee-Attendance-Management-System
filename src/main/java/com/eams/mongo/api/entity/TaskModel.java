package com.eams.mongo.api.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.time.Duration;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Tasks")
public class TaskModel {
	
	 @Id
	    private String id;

	    private ObjectId userId;
	    private String taskName;
	    private Priority priority;
	    private String createdBy;
	    private String assignedTo;
	    private List<String> observers;
	    private boolean isCompleted;
	    private TaskStatus taskStatus;
	    private Duration  timeTaken;
	    private LocalDateTime startedAt;
	    private LocalDateTime completedAt;

	    @CreatedDate
	    private LocalDateTime createdAt;

	    @LastModifiedDate
	    private LocalDateTime updatedAt;

		public ObjectId getUserId() {
			return userId;
		}

		public void setUserId(ObjectId userId) {
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

		public boolean isCompleted() {
			return isCompleted;
		}

		public void setCompleted(boolean isCompleted) {
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

		
}
