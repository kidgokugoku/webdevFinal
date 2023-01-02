package com.CourseManagement.Entity;

import java.util.Date;

public class TeacherCourse extends BaseEntity {
    private Integer id;

    private Integer teacherId;

    private Integer courseId;


    public TeacherCourse(Integer teacherId, Integer courseId) {
        this.teacherId = teacherId;
        this.courseId = courseId;
    }

    public TeacherCourse(Integer id, Integer teacherId, Integer courseId, Date createdTime, Date modifiedTime, String createdUser, String modifiedUser) {
        this.id = id;
        this.teacherId = teacherId;
        this.courseId = courseId;
    }

    public TeacherCourse() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "TeacherCourse{" +
                "id=" + id +
                ", teacherId=" + teacherId +
                ", courseId=" + courseId +
                '}';
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
}