package com.eams.mongo.api.jwtSecurity;
import com.eams.mongo.api.entity.UserModel;
import java.util.Map;

public interface  JwtGeneratorInterface {
	Map<String, String> generateToken(UserModel user);
}
