package com.CourseManagement.Service.impl;

import com.CourseManagement.Entity.Course;
import com.CourseManagement.Entity.User;
import com.CourseManagement.Service.ICourseService;
import com.CourseManagement.Service.ex.*;
import com.CourseManagement.mapper.CourseMapper;
import com.CourseManagement.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class CourseServiceImpl implements ICourseService {
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private UserMapper userMapper;


    @Override
    public Integer add(Course course, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);

        if (operator.getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }

        course.setCreatedUser(operator.getUsername());
        course.setModifiedUser(operator.getUsername());
        course.setCreatedTime(new Date());
        course.setModifiedTime(new Date());
        course.setIsDeleted(0);
        course.setCurrentSelected(0);

        Integer rows = courseMapper.insert(course);

        if (rows != 1) {
            throw new InsertException("增加新课程时出现未知错误");
        }

        return rows;
    }

    @Override
    public Integer delete(Integer uid, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        Course result = courseMapper.selectByPrimaryKey(uid);

        if (result == null || result.getIsDeleted() == 1) {
            throw new CourseNotFoundException("此课程数据不存在");
        }
        if (operator.getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }

        result.setIsDeleted(1);
        result.modified(operator.getUsername());

        Integer rows = courseMapper.deleteByPrimaryKey(result);

        if (rows != 1) {
            throw new DeleteException("删除过程中出现未知问题");
        }

        return rows;
    }

    @Override
    public Integer edit(Integer id, Integer operatorUid, Course course) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);

        Course result = courseMapper.selectByPrimaryKey(id);
        if (result == null || result.getIsDeleted() == 1) {
            throw new CourseNotFoundException("此课程数据不存在");
        }

        if (operator.getUserType() != 0) {
            throw new PermissionDeniedException("用户权限不足");
        }

        if (course.getCurrentSelected() == null) {
            course.setCurrentSelected(result.getCurrentSelected());
        }
        if (course.getCampus() == null) {
            course.setCampus(result.getCampus());
        }
        course.setIsDeleted(0);
        course.modified(operator.getUsername());

        Integer rows = courseMapper.updateByPrimaryKey(course);

        if (rows != 1) {
            throw new UpdateException("更新数据中产生未知异常");
        }
        return rows;
    }

    @Override
    public List<Map> getAll(Integer operatorUid) {

        List<Map> result;
        if (userMapper.selectByPrimaryKey(operatorUid).getUserType() == 0) {
            result = courseMapper.selectAll();
        } else if (userMapper.selectByPrimaryKey(operatorUid).getUserType() == 2) {
            result = courseMapper.selectAllWithTeacherName();
        } else {
            result = courseMapper.selectAllWithStudentName();

        }

        return result;
    }


}
