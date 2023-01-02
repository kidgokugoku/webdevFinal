package com.CourseManagement.Service.impl;

import com.CourseManagement.Entity.Course;
import com.CourseManagement.Entity.StudentCourse;
import com.CourseManagement.Entity.TeacherCourse;
import com.CourseManagement.Entity.User;
import com.CourseManagement.Service.ISelectionService;
import com.CourseManagement.Service.ex.*;
import com.CourseManagement.mapper.CourseMapper;
import com.CourseManagement.mapper.StudentCourseMapper;
import com.CourseManagement.mapper.TeacherCourseMapper;
import com.CourseManagement.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SelectionServiceImpl implements ISelectionService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private TeacherCourseMapper teacherCourseMapper;
    @Autowired
    private StudentCourseMapper studentCourseMapper;

    private static void checkPermission(User operator, Integer userType) {
        if (operator == null || operator.getUserType() != userType) {
            throw new PermissionDeniedException("权限不足");
        }
    }
    // 抽取的方法

    @Override
    public Integer teacherSelectCourse(TeacherCourse teacherCourse, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        Course result = courseMapper.selectByPrimaryKey(teacherCourse.getCourseId());

        if (result == null || result.getIsDeleted() == 1) {
            throw new CourseNotFoundException("此课程数据不存在");
        }
        checkPermission(operator, 0);

        if (teacherCourseMapper.selectByIds(teacherCourse.getTeacherId(), teacherCourse.getCourseId()) != null) {
            throw new SelectionExistedException("已分配该老师到此门课程");
        }

        teacherCourse.setCreatedUser(operator.getUsername());
        teacherCourse.setCreatedTime(new Date());
        teacherCourse.modified(operator.getUsername());

        Integer rows = teacherCourseMapper.insert(teacherCourse);

        if (rows != 1) {
            throw new InsertException("课程分配教师时出现未知错误");
        }

        return rows;
    }


    @Override
    public Integer teacherDeselectCourse(TeacherCourse teacherCourse, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        Course result = courseMapper.selectByPrimaryKey(teacherCourse.getCourseId());
        if (teacherCourseMapper.selectByIds(teacherCourse.getTeacherId(), teacherCourse.getCourseId()) == null) {
            throw new SelectionNotFoundException("未分配该老师到此门课程");
        }
        if (result == null || result.getIsDeleted() == 1) {
            throw new CourseNotFoundException("此课程数据不存在");
        }
        checkPermission(operator, 0);

        Integer rows = teacherCourseMapper.delete(teacherCourse);

        if (rows == 0) {
            throw new DeleteException("教师未选择此课程");
        } else if (rows != 1) {
            throw new DeleteException("课程取消分配教师时出现未知错误");
        }

        return rows;
    }

    @Override
    public Integer studentSelectCourse(StudentCourse studentCourse, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        Course course = courseMapper.selectByPrimaryKey(studentCourse.getCourseId());

        if (course == null || course.getIsDeleted() == 1) {
            throw new CourseNotFoundException("此课程数据不存在");
        }
        if (teacherCourseMapper.selectByCourseId(studentCourse.getCourseId()).isEmpty()) {
            throw new NoTeacherException("该门课暂时没有老师");
        }
        if (course.getCurrentSelected() + 1 > course.getCapacity()) {
            throw new CourseIsFullException("课程已满员");
        }
        if (!(operator.getUserType() == 0 || operator.getUid().equals(studentCourse.getStudentId()))) {
            throw new PermissionDeniedException("用户权限不足");
        }
        if (studentCourseMapper.selectByIds(studentCourse.getStudentId(), studentCourse.getCourseId()) != null) {
            throw new SelectionExistedException("已选择此门课程");
        }

        studentCourse.setScore(-1f);
        studentCourse.setCreatedUser(operator.getUsername());
        studentCourse.setCreatedTime(new Date());
        studentCourse.modified(operator.getUsername());

        Integer rows = studentCourseMapper.insert(studentCourse);

        if (rows != 1) {
            throw new InsertException("教师选择课程时出现未知错误");
        }

        course.setCurrentSelected(course.getCurrentSelected() + 1);
        courseMapper.updateByPrimaryKey(course);
        return rows;
    }


    @Override
    public Integer studentDeselectCourse(StudentCourse studentCourse, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        Course course = courseMapper.selectByPrimaryKey(studentCourse.getCourseId());

        if (studentCourseMapper.selectByIds(studentCourse.getStudentId(), studentCourse.getCourseId()) == null) {
            throw new SelectionNotFoundException("未选择此门课程");
        }
        if (course == null || course.getIsDeleted() == 1) {
            throw new CourseNotFoundException("此课程数据不存在");
        }
        if (!(operator.getUserType() == 0 || operator.getUid().equals(studentCourse.getStudentId()))) {
            throw new PermissionDeniedException("用户权限不足");
        }
        if (studentCourseMapper.selectByIds(studentCourse.getStudentId(), studentCourse.getCourseId()).getScore() != null) {
            throw new CourseIsGradedException("该课程已经被评分，无法取消选择");
        }
        Integer rows = studentCourseMapper.delete(studentCourse);
        course.setCurrentSelected(course.getCurrentSelected() - 1);
        courseMapper.updateByPrimaryKey(course);

        if (rows != 1) {
            throw new DeleteException("取消选择课程时出现未知错误");
        }

        return rows;
    }

    @Override
    public Integer updateScore(Integer cid, Integer uid, Integer score, Integer operatorUid) {
        User operator = userMapper.selectByPrimaryKey(operatorUid);
        if (teacherCourseMapper.selectByIds(operatorUid, cid) == null) {
            throw new PermissionDeniedException("用户不教授该课程");
        }
        StudentCourse studentCourse = studentCourseMapper.selectByIds(uid, cid);
        studentCourse.setScore(score.floatValue());
        studentCourse.modified(operator.getUsername());
        Integer rows = studentCourseMapper.updateByPrimaryKey(studentCourse);

        if (rows < 1) throw new UpdateException("更新成绩时出现错误，可能学生未选课");
        else if (rows > 1) throw new UpdateException("更新成绩时出现未知错误");

        return rows;

    }

}
