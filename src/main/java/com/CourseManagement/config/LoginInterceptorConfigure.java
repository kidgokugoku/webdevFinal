package com.CourseManagement.config;

import com.CourseManagement.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class LoginInterceptorConfigure implements WebMvcConfigurer {
    @Bean
    public LoginInterceptor interceptor() {
        return new LoginInterceptor();
    }

    @Override
    //配置拦截器
    public void addInterceptors(InterceptorRegistry registry) {
        //2.配置白名单并存放在一个List集合
        List<String> patterns = new ArrayList<>();
        patterns.add("/api/v1/users/Login");

        registry.addInterceptor(interceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
    }
}
