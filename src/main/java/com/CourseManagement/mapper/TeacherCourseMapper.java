package com.CourseManagement.mapper;

import com.CourseManagement.Entity.TeacherCourse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TeacherCourseMapper {
    int delete(TeacherCourse record);

    int insert(TeacherCourse record);

    TeacherCourse selectByPrimaryKey(Integer id);

    List<TeacherCourse> selectAll();

    TeacherCourse selectByIds(Integer teacherId, Integer courseId);

    List<Map> selectByTeacherId(Integer teacherId);

    List<Map> selectByCourseId(Integer courseId);

    int updateByPrimaryKey(TeacherCourse record);
}