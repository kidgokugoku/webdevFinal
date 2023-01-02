package com.CourseManagement.Entity;

public class Course extends BaseEntity {

    public static final Integer COURSE_SPECIALTY = 0;
    public static final Integer COURSE_PUBLIC_BASIC = 1;
    public static final Integer COURSE_COMMON = 2;

    private Integer id;
    private String name;
    private Integer credit;
    private Integer duration;
    private Integer capacity;
    private Integer currentSelected;
    private Integer courseType;
    private Integer isDeleted;
    private Integer campus;

    // 3. add a course time, like "2020-2021-1" or "2020-2021-2"
// 5. add a course location, like "room 102" or "room 103"
    public Course(Integer id) {
        this.id = id;
    }

    public Course() {
    }

    public Course(Integer id, String name, Integer capacity, Integer currentSelected, Integer courseType) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.currentSelected = currentSelected;
        this.courseType = courseType;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", credit=" + credit +
                ", duration=" + duration +
                ", capacity=" + capacity +
                ", currentSelected=" + currentSelected +
                ", courseType=" + courseType +
                ", isDeleted=" + isDeleted +
                ", campus=" + campus +
                '}';
    }

    public Integer getCampus() {
        return campus;
    }

    public void setCampus(Integer campus) {
        this.campus = campus;
    }

    public Integer getCourseType() {
        return courseType;
    }

    public void setCourseType(Integer courseType) {
        this.courseType = courseType;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }


    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getCurrentSelected() {
        return currentSelected;
    }

    public void setCurrentSelected(Integer currentSelected) {
        this.currentSelected = currentSelected;
    }

}
