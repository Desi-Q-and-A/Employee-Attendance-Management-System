package com.eams.mongo.api.entity;

import java.time.Duration;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "UserLoginHistory")
public class UserLoginHistoryModel {

	@Id
	private String id;

	private String userId;
	private Duration breakTime;
	private Duration workedTime;
	private LocalDateTime breakStartTime;
	private boolean isOnBreak = false;
	private LocalDateTime breakPauseTime;
	private boolean isPaused = false;
	private LocalDateTime loggedInAt;
	private LocalDateTime loggedOutAt;
	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	public String getId() {
		return id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Duration getBreakTime() {
		return breakTime;
	}

	public void setBreakTime(Duration breakTime) {
		this.breakTime = breakTime;
	}

	public Duration getWorkedTime() {
		return workedTime;
	}

	public void setWorkedTime(Duration workedTime) {
		this.workedTime = workedTime;
	}

	public LocalDateTime getLoggedInAt() {
		return loggedInAt;
	}

	public void setLoggedInAt(LocalDateTime loggedInAt) {
		this.loggedInAt = loggedInAt;
	}

	public LocalDateTime getLoggedOutAt() {
		return loggedOutAt;
	}

	public void setLoggedOutAt(LocalDateTime loggedOutAt) {
		this.loggedOutAt = loggedOutAt;
	}

	public LocalDateTime getBreakStartTime() {
		return breakStartTime;
	}

	public void setBreakStartTime(LocalDateTime breakStartTime) {
		this.breakStartTime = breakStartTime;
	}

	public boolean isOnBreak() {
		return isOnBreak;
	}

	public void setOnBreak(boolean isOnBreak) {
		this.isOnBreak = isOnBreak;
	}

	public LocalDateTime getBreakPauseTime() {
		return breakPauseTime;
	}

	public void setBreakPauseTime(LocalDateTime breakPauseTime) {
		this.breakPauseTime = breakPauseTime;
	}

	public boolean isPaused() {
		return isPaused;
	}

	public void setPaused(boolean isPaused) {
		this.isPaused = isPaused;
	}

}
