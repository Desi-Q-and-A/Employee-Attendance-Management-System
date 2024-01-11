package com.eams.mongo.api.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import com.eams.mongo.api.services.JWTService;
import com.eams.mongo.api.services.UserServices;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private JWTService jwtService;
	@Autowired
	private UserServices userService ;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String requestURI = request.getRequestURI();
		final String authHeader = request.getHeader("Authorization");
		System.out.println("After getting authHeader: "+ requiresAuthorization(requestURI) + authHeader);
		if (requiresAuthorization(requestURI)) {
			  if (authHeader == null || !authHeader.startsWith("Bearer ")) {
		            System.out.println("Authorization header is missing or invalid. Please log in.");
		            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		            response.getWriter().write("Please, log in first.!!!");
		            return;
		        }
		}
		final String jwt;
		final String userId;
		
		if(StringUtils.isEmpty(authHeader)   || org.apache.commons.lang3.StringUtils.startsWith(authHeader, "Bearer ")) {
			
			filterChain.doFilter(request, response);
			
			return;
		}
		
		jwt =authHeader.substring(7);
		
		userId =  jwtService.extractUsername(jwt);
		
		if(StringUtils.isEmpty(userId) && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userId);
			
			if(jwtService.isValidToken(jwt, userDetails)) {
				 request.setAttribute("userId", userId);
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
						userDetails, null , userDetails.getAuthorities()
						);
				
				token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				securityContext.setAuthentication(token);
				SecurityContextHolder.setContext(securityContext);
			}
		}
		
		filterChain.doFilter(request, response);
	}

	private boolean requiresAuthorization(String requestURI) {
		
		return requestURI.startsWith("/user/update_profile") || requestURI.startsWith("/user/fetch_user_profile") || requestURI.startsWith("/order/history");
	}
	
	
}
