package com.CourseManagement.Entity;

public class StudentCourse extends BaseEntity {
    private Integer id;

    private Integer courseId;

    private Integer studentId;

    private Float score;


    public StudentCourse(Integer id, Integer courseId, Integer studentId, Float score) {
        this.id = id;
        this.courseId = courseId;
        this.studentId = studentId;
        this.score = score;
    }

    public StudentCourse() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "StudentCourse{" +
                "id=" + id +
                ", courseId=" + courseId +
                ", studentId=" + studentId +
                ", score=" + score +
                '}';
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }
}
