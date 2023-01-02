package com.CourseManagement.mapper;

import com.CourseManagement.Entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int deleteByPrimaryKey(User record);

    int insert(User record);

    User selectByPrimaryKey(Integer uid);

    User selectByUsername(String username);

    List<User> selectByName(String name);

    List<User> selectAll();

    int updateByPrimaryKey(User record);

    int updatePasswordByPrimaryKey(User record);
}