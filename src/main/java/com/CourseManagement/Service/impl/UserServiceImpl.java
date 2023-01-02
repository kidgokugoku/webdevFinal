package com.CourseManagement.Service.impl;

import com.CourseManagement.Entity.User;
import com.CourseManagement.Service.IUserService;
import com.CourseManagement.Service.ex.*;
import com.CourseManagement.mapper.StudentCourseMapper;
import com.CourseManagement.mapper.TeacherCourseMapper;
import com.CourseManagement.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private TeacherCourseMapper teacherCourseMapper;
    @Autowired
    private StudentCourseMapper studentCourseMapper;

    @Override
    public Integer reg(User user, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        if (operator.getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }
        if (user.getUserType() == 0) {
            throw new PermissionDeniedException("不可以创建管理员");
        }
        user.setCreatedUser(operator.getUsername());
        user.setCreatedTime(new Date());
        user.modified(operator.getUsername());
        user.setIsDeleted(0);

        if (userMapper.selectByUsername(user.getUsername()) != null) {
            throw new UsernameDuplicatedException("增加新用户时用户名重复");
        }
        Integer rows = userMapper.insert(user);

        if (rows != 1) {
            throw new InsertException("增加新用户时出现未知错误");
        }

        return rows;
    }


    @Override
    public Integer delete(Integer id, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        User user = userMapper.selectByPrimaryKey(id);

        if (user == null || user.getIsDeleted() == 1) {
            throw new UsernameNotFoundException("此用户数据不存在");
        }
        if (operator.getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }

        user.setIsDeleted(1);
        user.modified(operator.getUsername());

        Integer rows = userMapper.deleteByPrimaryKey(user);

        if (rows != 1) {
            throw new DeleteException("删除过程中出现未知问题");
        }

        return rows;
    }

    @Override
    public Integer edit(Integer uid, Integer operatorUid, User user) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);

        User result = userMapper.selectByPrimaryKey(uid);
        if (result == null || result.getIsDeleted() == 1) {
            throw new UsernameNotFoundException("此用户数据不存在");
        }
        if (operator.getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }
        if (user.getUserType() == 0) {
            throw new PermissionDeniedException("不可以修改成管理员");
        }

        if (user.getUserType() == null) {
            user.setUserType(result.getUserType());
        }

        user.setIsDeleted(0);
        user.modified(operator.getUsername());

        Integer rows = userMapper.updateByPrimaryKey(user);

        if (rows != 1) {
            throw new UpdateException("更新数据中产生未知异常");
        }
        return rows;
    }

    @Override
    public User login(String username, String password) {
        User result = userMapper.selectByUsername(username);
        if (result == null) {
            throw new UsernameNotFoundException("此用户名不存在");
        }
        if (!password.equals(result.getPassword())) {
            throw new PasswordNotMatchException("用户名与密码不匹配");
        }
        if (result.getIsDeleted() == 1) {
            throw new UsernameNotFoundException("此用户名不存在");
        }

        User user = new User();
        user.setUid(result.getUid());
        user.setUsername(result.getUsername());
        return user;
    }

    @Override
    public Integer updatePasswordByUid(Integer uid, String username, String oldPassword, String newPassword) {
        User result = userMapper.selectByPrimaryKey(uid);

        if (result == null || result.getIsDeleted() == 1) {
            throw new UsernameNotFoundException("此用户不存在");
        }
        if (!result.getPassword().equals(oldPassword)) {
            throw new PasswordNotMatchException("旧密码错误");
        }

        result.setPassword(newPassword);
        result.modified(username);

        Integer rows = userMapper.updatePasswordByPrimaryKey(result);

        if (rows != 1) {
            throw new UpdateException("更新数据中产生未知异常");
        }

        return rows;
    }

    @Override
    public User getByUid(Integer uid) {
        User result = userMapper.selectByPrimaryKey(uid);

        if (result == null || result.getIsDeleted() == 1) {
            throw new UsernameNotFoundException("此用户数据不存在");
        }

        return result;
    }

    @Override
    public List<User> getByName(String name, Integer operatorUid) {
        if (userMapper.selectByPrimaryKey(operatorUid).getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }

        return userMapper.selectByName(name);
    }

    @Override
    public List<User> getAll(Integer operatorUid) {
        if (userMapper.selectByPrimaryKey(operatorUid).getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }

        return userMapper.selectAll();
    }

    @Override
    public List<Map> getAllSelection(Integer operatorUid) {

        User operator = userMapper.selectByPrimaryKey(operatorUid);

        List<Map> result = new ArrayList<>();

        if (operator.getUserType() == 0) {
            throw new PermissionDeniedException("用户是管理员");
        } else if (operator.getUserType() == 1) {
            result = studentCourseMapper.selectByStudentId(operator.getUid());

        } else if (operator.getUserType() == 2) {
            List<Map> studentList;
            studentList = teacherCourseMapper.selectByTeacherId(operator.getUid());
            for (Map map : studentList) {
                List<Map> tmpList;
                tmpList = studentCourseMapper.selectByCourseId((Integer) map.get("course_id"));
                for (Map map2 : tmpList) {
                    map2.put("courseName", map.get("name"));
                }
                result.addAll(tmpList);
            }
        }

        return result;
    }

}
