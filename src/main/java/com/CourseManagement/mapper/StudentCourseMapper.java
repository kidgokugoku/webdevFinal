package com.CourseManagement.mapper;

import com.CourseManagement.Entity.StudentCourse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface StudentCourseMapper {
    int delete(StudentCourse record);

    int insert(StudentCourse record);

    StudentCourse selectByPrimaryKey(Integer id);

    List<StudentCourse> selectAll();

    StudentCourse selectByIds(Integer studentId, Integer courseId);

    List<Map> selectByStudentId(Integer studentId);

    List<Map> selectByCourseId(Integer courseId);

    int updateByPrimaryKey(StudentCourse record);
}