package com.CourseManagement.Service;

import com.CourseManagement.Entity.Course;

import java.util.List;
import java.util.Map;

public interface ICourseService {
    Integer add(Course course, Integer operatorUid);

    Integer delete(Integer id, Integer operatorUid);

    Integer edit(Integer id, Integer operatorUid, Course course);


    List<Map> getAll(Integer operatorUid);

}
