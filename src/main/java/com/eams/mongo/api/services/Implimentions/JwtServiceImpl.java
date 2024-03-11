package com.eams.mongo.api.services.Implimentions;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.eams.mongo.api.services.JWTService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceImpl implements JWTService {

	public String generateToken(UserDetails userdetail) {

		return Jwts.builder().setSubject(userdetail.getUsername()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))// valid for 1 day
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();

	}

	public String generaterefreshToken(Map<String, Object> extraClaims, UserDetails userdetail) {

		return Jwts.builder().setClaims(extraClaims).setSubject(userdetail.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // valid for 7 days
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();

	}

	public String extractUsername(String token) {

		return extractClaim(token, Claims::getSubject);

	}

	private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Key getSignKey() {
		byte[] key = Decoders.BASE64
				.decode("c20f1bd73e1ee379f26de2a129e4edd739589a297642efdcfa375541fd2e437b7b05226373a9392c");
		return Keys.hmacShaKeyFor(key);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
	}

	public boolean isValidToken(String token, UserDetails userDetails) {
		final String userName = extractUsername(token);
		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	private boolean isTokenExpired(String token) {

		return extractClaim(token, Claims::getExpiration).before(new Date());
	}
}
