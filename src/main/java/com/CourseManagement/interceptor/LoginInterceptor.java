package com.CourseManagement.interceptor;

import com.CourseManagement.Service.ex.TokenAuthExpiredException;
import com.CourseManagement.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class LoginInterceptor implements HandlerInterceptor {
    @Autowired
    private TokenUtil tokenUtil;

    @Value("${token.refreshTime}")
    private Long refreshTime;
    @Value("${token.expiresTime}")
    private Long expiresTime;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        String token = request.getHeader("Authorization").substring(7);

        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        Map<String, String> map = tokenUtil.parseToken(token);
        String uid = map.get("uid");
        String username = map.get("username");

        long timeOfUse = System.currentTimeMillis() - Long.parseLong(map.get("timeStamp"));
        //1.判断 token 是否过期
        if (timeOfUse < refreshTime) {
            return true;
        }
        //超过token刷新时间，刷新 token
        else if (timeOfUse >= refreshTime && timeOfUse < expiresTime) {
            response.setHeader("Authorization", tokenUtil.getToken(uid, username));
            return true;
        }
        //token过期就返回 token 无效.
        else {
            throw new TokenAuthExpiredException();
        }
    }

}
