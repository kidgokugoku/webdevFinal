package com.CourseManagement.mapper;

import com.CourseManagement.Entity.Course;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CourseMapper {
    int deleteByPrimaryKey(Course record);

    int insert(Course record);

    Course selectByPrimaryKey(Integer id);

    List<Map> selectAll();

    List<Course> selectAllCommon();

    List<Map> selectAllWithTeacherName();

    List<Map> selectAllWithStudentName();

    int updateByPrimaryKey(Course record);
}