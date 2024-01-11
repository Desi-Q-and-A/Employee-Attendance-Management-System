package com.eams.mongo.api.entity;

import java.time.LocalDateTime;


import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Document(collection = "Reports")
public class ReportsModel  {
	
   @Id
    private String id;
   @NotNull(message = "Title is required")
  private String title;
   @NotNull(message = "Description is required")
  private String description;
   @NotNull(message = "Submitted by is required")
  private String submittedBy;
   @NotNull(message = "Submitted to is required")
  private String submittedTo;
   
  private boolean isApproved;
  
  @CreatedDate
  private LocalDateTime createdAt;

  @LastModifiedDate
  private LocalDateTime updatedAt;
  
  public String getReportId() {
		return id;
	}

public boolean isApproved() {
	return isApproved;
}

public void setApproved(boolean isApproved) {
	this.isApproved = isApproved;
}

}


