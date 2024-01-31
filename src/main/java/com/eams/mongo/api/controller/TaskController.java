package com.eams.mongo.api.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.JwtException;
import com.eams.mongo.api.dto.HttpResponse;
import com.eams.mongo.api.dto.SuccessHandler;
import com.eams.mongo.api.entity.Priority;
import com.eams.mongo.api.entity.TaskModel;
import com.eams.mongo.api.entity.TaskStatus;
import com.eams.mongo.api.services.JWTService;
import com.eams.mongo.api.services.TaskServices;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	private JWTService jwtService;

	 
	 @Autowired
		private  TaskServices taskServices;
	
	@PostMapping("/create")
	public ResponseEntity<?> createTask(@RequestHeader("Authorization") String authReq,@RequestBody TaskModel data) {
	    try {
	    	
	    	
	    	String token = authReq.substring(7);
			
			 if(token == null) {
				 
				 return ResponseEntity.ok(new HttpResponse<>(false,"invalid token",null).toMap());
			 }
		     String userId = jwtService.extractUsername(token);
		     
		     Optional<TaskModel> exTask = taskServices.find_Ex_Task(userId,data.getTaskName(), userId);
		     System.out.print(exTask);
		     if(exTask.isPresent()) {
		    	 return ResponseEntity.status(302).body(data.getTaskName() + " already exists.!!!");
		     }
	    	
	    	if (data.getTaskName() == null || data.getTaskName().isBlank()) {
	    	    return ResponseEntity.status(400).body("Task name is required");
	    	}
	    	
	    	if (data.getAssignedTo() == null || data.getAssignedTo().isBlank()) {
	    	    return ResponseEntity.status(400).body("Please select AssignedTo .!!!");
	    	}
	    	if (data.getObservers() == null || data.getObservers().isEmpty()) {
	    	    return ResponseEntity.status(400).body("Please select Observer.!!!");
	    	}
	    	if (data.getPriority() == null || data.getPriority().toString().isBlank()) {
	    		data.setPriority(Priority.MEDIUM);
	    	}else {
	    		data.setPriority(data.getPriority());
	    	}
	    	if (data.getTaskStatus() == null || data.getTaskStatus().toString().isBlank()) {
	    		data.setTaskStatus(TaskStatus.PENDING);
	    	}else {
	    		data.setTaskStatus(data.getTaskStatus());
	    	}
	    	
	    	data.setUserId(userId);
	    	data.setCreatedBy(userId);

	    	TaskModel createdTask = taskServices.create_task(data);

	        if (createdTask == null) {
	            return ResponseEntity.status(400).body("Something went wrong !!!");
	        }

	        return ResponseEntity.status(200).body(createdTask);
	    }  catch (Exception e) {
            // Handle validation error
            return ResponseEntity.status(400).body(e.getMessage());
        }
	}

	@PatchMapping("/update")
	public ResponseEntity<?> updateTask(@RequestHeader("Authorization") String authReq,@RequestBody TaskModel data) {
		try {
			
			String token = authReq.substring(7);
			
			 if(token == null) {
				 
				 return ResponseEntity.ok(new HttpResponse<>(false,"invalid token",null).toMap());
			 }
		     String userId = jwtService.extractUsername(token);
		     
		     Optional<TaskModel> exTask = taskServices.fetch_task(data.getTaskId());
		     
		     if(exTask == null) {
		    	 return SuccessHandler.res(false, "Task does not exist.!!!", Optional.empty());
		    	 
		     } else if(exTask != null && exTask.isPresent() && exTask.get().getUserId().equals(userId)) {
		    	 var updatedTask = taskServices.update_task(exTask.get().getTaskId(), data);
		    	 
		    	  return ResponseEntity.ok(new HttpResponse<>(true,"Updated successfully. ", updatedTask).toMap());
		     }
		     return ResponseEntity.ok(new HttpResponse<>(false,"Unable to update.!!! ", Optional.empty()).toMap());
	    
	    
		}catch (NullPointerException e) {
	        return SuccessHandler.res(false, "Something went wrong.!!!", Optional.empty());
	    
		} catch (JwtException e) {
            return SuccessHandler.res(false, e.getMessage(), Optional.empty());
        }
	}

	
	@PatchMapping("/task_actions")
	public ResponseEntity<?> updateStartStop(@RequestHeader("Authorization") String authReq, @RequestBody TaskModel data) {
	    try {
	        String token = authReq.substring(7);

	        if (token == null) {
	            return ResponseEntity.ok(new HttpResponse<>(false, "Invalid token", null).toMap());
	        }

	        String userId = jwtService.extractUsername(token);

	        Optional<TaskModel> exTask = taskServices.fetch_task(data.getTaskId());

	        if (!exTask.isPresent()) {
	            return ResponseEntity.ok(new HttpResponse<>(false, "Task does not exist", Optional.empty()).toMap());
	        }

	        TaskModel existingTask = exTask.get();

	        if (!existingTask.getUserId().equals(userId)) {
	            return ResponseEntity.ok(new HttpResponse<>(false, "Unauthorized access", Optional.empty()).toMap());
	        }

	        

	        //System.out.println("existingTask before update: " + existingTask.getStartedAt());
	        var updatedTask = taskServices.update_task_actions(existingTask.getTaskId(), data);
	        //System.out.println("updatedTask after update: " + updatedTask.getStartedAt());

	        return ResponseEntity.ok(new HttpResponse<>(true, "Updated successfully", updatedTask).toMap());

	    } catch (Exception e) {
	        return ResponseEntity.ok(new HttpResponse<>(false, e.getMessage(), Optional.empty()).toMap());
	    }
	}

	@GetMapping("/fetch_task/{taskId}")
	public ResponseEntity<?> fetchUserProfile(@RequestHeader("Authorization") String authReq,
	                                         @PathVariable String taskId) {
	    try {
	        String token = authReq.substring(7);

	        if (token == null) {
	            return ResponseEntity.ok(new HttpResponse<>(false, "Invalid token", null).toMap());
	        }

	        String userId = jwtService.extractUsername(token);

	        Optional<TaskModel> exTask = taskServices.fetch_task(taskId);

	        if (exTask == null) {
	            return ResponseEntity.ok(new HttpResponse<>(false, "Task does not exist.!!!", Optional.empty()).toMap());
	        }
              
	        if (!exTask.get().getUserId().equals(userId)) {
	            return ResponseEntity.ok(new HttpResponse<>(false, "The task does not belongs to you.!!!", Optional.empty()).toMap());
	        }
	        
	        return ResponseEntity.ok(new HttpResponse<>(true, "Task detail ---->⏬⏬⏬⬇⬇", exTask).toMap());

	    } catch (JwtException e) {
	        return ResponseEntity.ok(new HttpResponse<>(false, e.getMessage(), null).toMap());
	    }
	}

	
	@GetMapping("/list_of_active_tasks_for_user")
	public ResponseEntity<?> listOfActiveUsersTask(@RequestHeader("Authorization") String authReq){
		
		 String token = authReq.substring(7);

	        if (token == null) {
	            return ResponseEntity.ok(new HttpResponse<>(false, "Invalid token", null).toMap());
	        }

	        String userId = jwtService.extractUsername(token);
		
	List<TaskModel>	 checkTask = taskServices.list_of_active_tasks( userId, TaskStatus.IN_PROGRESS);
	
		if(checkTask != null) {
			return new ResponseEntity<>(checkTask,  HttpStatus.OK);
		}
		 return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/list_of_inactive_tasks_for_user")
	public ResponseEntity<?> listOfInactiveTasksUsers(@RequestHeader("Authorization") String authReq){
	    
	    String token = authReq.substring(7);

         if (token == null) {
            return ResponseEntity.ok(new HttpResponse<>(false, "Invalid token", null).toMap());
                          }

        String userId = jwtService.extractUsername(token);
 
         List<TaskModel>	 checkTask = taskServices.list_of_inactive_tasks( userId, TaskStatus.IN_PROGRESS);

           if(checkTask != null) {
	          return new ResponseEntity<>(checkTask,  HttpStatus.OK);
                  }
               return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/list_of_tasks_for_user")
	public ResponseEntity<?> list_of_all_tasks_For_users(@RequestHeader("Authorization") String authReq ,@RequestParam(name = "taskStatus",required = false) TaskStatus taskStatus){
		
		String token = authReq.substring(7);

        if (token == null) {
           return ResponseEntity.ok(new HttpResponse<>(false, "Invalid token", null).toMap());
                         }

       String userId = jwtService.extractUsername(token);

        if (taskStatus != null) {
           
        	List<TaskModel>	 checkTask = taskServices.list_of_all_tasks( userId, taskStatus);
            
        	return new ResponseEntity<>(checkTask,  HttpStatus.OK);
        } 	
        
        
        List<TaskModel>	 checkTask = taskServices.list_of_all_tasks( userId, null);
        
    	return new ResponseEntity<>(checkTask,  HttpStatus.OK);

          
             
	}
	
	
	 @DeleteMapping("/delete_user_task")
     public ResponseEntity<?> deleteUserTask(@RequestHeader("Authorization") String authReq ,@RequestBody TaskModel data){
   	  
   	  try {
   		 // System.out.println("userId   " + data.getTaskId());
   		  
   		String token = authReq.substring(7);

        if (token == null) {
           return ResponseEntity.ok(new HttpResponse<>(false, "Invalid token", null).toMap());
                         }

       String userId = jwtService.extractUsername(token);
   		Boolean isDeleted =  taskServices.delete_task(userId ,data.getTaskId() );
			if(isDeleted) {
				 return new ResponseEntity<>("Task deleted Successfully.", HttpStatus.OK);
			}else {
				 return new ResponseEntity<>("Task does not exist", HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			 return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
   	  
     }
	
}
