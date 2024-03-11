package com.eams.mongo.api.entity;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "User")
public class UserModel implements UserDetails {

	private static final long serialVersionUID = 1L;
	@Id
	private String userId;

	@NotNull(message = "User name is required")
	private String userName;
	@NotNull(message = "Email is required")
	private String email;
	@NotNull(message = "Mobile number is required")
	private String mobileNumber;
	@NotNull(message = "Password is required")
	private String password;
	private Role role;
	private boolean isActive;
	private String faceData;
	private Date loginTime;
	private Date logOutTime;

	public String getUserId() {
		return userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFaceData() {
		return faceData;
	}

	/**
	 * @param faceData the faceData to set
	 */
	public void setFaceData(String faceData) {
		this.faceData = faceData;
	}

	/**
	 * @return the loginTime
	 */
	public Date getLoginTime() {
		return loginTime;
	}

	/**
	 * @param loginTime the loginTime to set
	 */
	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	/**
	 * @return the logOutTime
	 */
	public Date getLogOutTime() {
		return logOutTime;
	}

	/**
	 * @param logOutTime the logOutTime to set
	 */
	public void setLogOutTime(Date logOutTime) {
		this.logOutTime = logOutTime;
	}

	/**
	 * @return the isActive
	 */
	public boolean getIsActive() {
		return isActive;
	}

	/**
	 * @param isActive the isActive to set
	 */
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Role getRole() {
		return role;
	}

	/**
	 * @param role the role to set
	 */
	public Role setRole(Role role) {
		return this.role = role;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {

		return userId;
	}

	@Override
	public boolean isAccountNonExpired() {

		return true;
	}

	@Override
	public boolean isAccountNonLocked() {

		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}

	@Override
	public boolean isEnabled() {

		return true;
	}
}
