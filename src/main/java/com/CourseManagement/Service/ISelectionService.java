package com.CourseManagement.Service;

import com.CourseManagement.Entity.StudentCourse;
import com.CourseManagement.Entity.TeacherCourse;

public interface ISelectionService {
    Integer teacherSelectCourse(TeacherCourse teacherCourse, Integer operatorUid);

    Integer teacherDeselectCourse(TeacherCourse teacherCourse, Integer operatorUid);

    Integer studentSelectCourse(StudentCourse studentCourse, Integer operatorUid);

    Integer studentDeselectCourse(StudentCourse studentCourse, Integer operatorUid);

    Integer updateScore(Integer cid, Integer uid, Integer score, Integer operatorUid);

}
