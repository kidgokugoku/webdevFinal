package com.CourseManagement.controller;

import com.CourseManagement.Entity.Course;
import com.CourseManagement.Service.ICourseService;
import com.CourseManagement.util.JsonResult;
import com.CourseManagement.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/courses")
public class CourseController extends BaseController {
    @Autowired
    TokenUtil tokenUtil;
    @Autowired
    private ICourseService courseService;

    @RequestMapping("Add")
    public JsonResult<Void> Add(Course course, @RequestHeader("Authorization") String auth) {
        String token = auth.substring(7);

        Integer uid = tokenUtil.getUidFromToken(token);
        courseService.add(course, uid);

        return new JsonResult<>(OK);
    }

    @RequestMapping(value = "GetAll")
    public JsonResult<List<Map>> GetAll(@RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        List<Map> courses = courseService.getAll(tokenUtil.getUidFromToken(token));

        return new JsonResult<List<Map>>(OK, courses);
    }

    @RequestMapping("Edit")
    public JsonResult<Void> Edit(Course course, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        courseService.edit(course.getId(), tokenUtil.getUidFromToken(token), course);

        return new JsonResult<>(OK);
    }

    @RequestMapping("Delete")
    public JsonResult<Void> Delete(Integer uid, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        courseService.delete(uid, tokenUtil.getUidFromToken(token));

        return new JsonResult<>(OK);
    }
}
