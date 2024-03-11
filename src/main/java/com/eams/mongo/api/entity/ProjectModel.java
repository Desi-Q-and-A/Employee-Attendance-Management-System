package com.eams.mongo.api.entity;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "Project")
public class ProjectModel {

	@Id
	private String id;

	@NotNull(message = "Project name is required")
	private String projectName;
	@NotNull(message = "Description is required")
	private String description;
	private List<String> refs;
	private String tlName;
	private String tlId;
	private boolean isActive;
	private List<String> workingGroups;
	private Date startDate;
	private Date deadline;

	public String getProjectId() {
		return id;
	}

	public boolean getIsActive() {
		return isActive;
	}

	/**
	 * @param isActive the isActive to set
	 */
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public List<String> getRefs() {
		return refs;
	}

	public void setRefs(List<String> refs) {
		this.refs = refs;
	}

	public String getTlName() {
		return tlName;
	}

	public void setTlName(String tlName) {
		this.tlName = tlName;
	}

	public String getTlId() {
		return tlId;
	}

	public void setTlId(String tlId) {
		this.tlId = tlId;
	}

	public List<String> getWorkingGroups() {
		return workingGroups;
	}

	public void setWorkingGroups(List<String> workingGroups) {
		this.workingGroups = workingGroups;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

}
