package com.CourseManagement.Service;

import com.CourseManagement.Entity.User;

import java.util.List;
import java.util.Map;

public interface IUserService {

    Integer reg(User user, Integer operatorUid);

    Integer delete(Integer id, Integer operatorUid);

    Integer edit(Integer id, Integer operatorUid, User user);

    User login(String username, String password);

    List<User> getByName(String name, Integer operatorUid);

    Integer updatePasswordByUid(Integer uid, String username, String oldPassword, String newPassword);

    User getByUid(Integer uid);

    List<User> getAll(Integer operatorUid);

    List<Map> getAllSelection(Integer operatorUid);


}
