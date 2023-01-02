package com.CourseManagement.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


@Component
public class TokenUtil {
    @Value("${token.secretKey}")
    private String secretKey;

    /**
     * 加密token.
     */
    public String getToken(String uid, String username) {
        String token = JWT
                .create()
                .withClaim("uid", uid)
                .withClaim("username", username)
                .withClaim("timeStamp", System.currentTimeMillis())
                .sign(Algorithm.HMAC256(secretKey));
        return token;
    }

    public Map<String, String> parseToken(String token) {
        HashMap<String, String> map = new HashMap<String, String>();
        DecodedJWT decodedjwt = JWT.require(Algorithm.HMAC256(secretKey))
                .build().verify(token);
        Claim uid = decodedjwt.getClaim("uid");
        Claim username = decodedjwt.getClaim("username");
        Claim timeStamp = decodedjwt.getClaim("timeStamp");
        map.put("uid", uid.asString());
        map.put("username", username.asString());
        map.put("timeStamp", timeStamp.asLong().toString());
        return map;
    }

    public Integer getUidFromToken(String token) {
        DecodedJWT decodedjwt = JWT.require(Algorithm.HMAC256(secretKey))
                .build().verify(token);
        Claim uid = decodedjwt.getClaim("uid");
        return Integer.valueOf(uid.asString());
    }

    public String getUsernameFromToken(String token) {
        DecodedJWT decodedjwt = JWT.require(Algorithm.HMAC256(secretKey))
                .build().verify(token);
        Claim username = decodedjwt.getClaim("username");
        return username.asString();
    }
}