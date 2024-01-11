package com.eams.mongo.api.jwtSecurity;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import com.eams.mongo.api.entity.UserModel;

@Service
public class JwtGeneratorImpl implements JwtGeneratorInterface {
    @Value("${jwt.secret}")
    private String secret;

//    @Value("${app.jwttoken.message}")
//    private String message;

    
    
    @Override
    public Map<String, String> generateToken(UserModel user) {
        String jwtToken = "";

        // Replace "secret" with your actual secret key
        Key key = Keys.hmacShaKeyFor(secret.getBytes());

        jwtToken = Jwts.builder()
                .setSubject(user.getUserName())
                .setIssuedAt(new Date())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        Map<String, String> jwtTokenGen = new HashMap<>();
        jwtTokenGen.put("token", jwtToken);
        jwtTokenGen.put("message", "jwt msms");
        return jwtTokenGen;
    }
    
    
    public boolean isValidToken(String token) {
        try {
           
            Key key = Keys.hmacShaKeyFor("eams-pankaj".getBytes());

             Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

            
            return true;
        } catch (Exception e) {
           
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(secret.getBytes());
            Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

            
            return claimsJws.getBody().getSubject();
        } catch (Exception e) {
            return null; // Return null if token is invalid
        }
    }
}
