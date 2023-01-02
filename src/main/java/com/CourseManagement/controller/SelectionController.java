package com.CourseManagement.controller;

import com.CourseManagement.Entity.StudentCourse;
import com.CourseManagement.Entity.TeacherCourse;
import com.CourseManagement.Service.ISelectionService;
import com.CourseManagement.util.JsonResult;
import com.CourseManagement.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/selections")
public class SelectionController extends BaseController {
    @Autowired
    private TokenUtil tokenUtil;
    @Autowired
    private ISelectionService selectionService;


    @RequestMapping("UpdateScore")
    public JsonResult<Void> UpdateScore(Integer cid, Integer uid, Integer score, @RequestHeader("Authorization") String auth) {
        System.out.println(cid + ": " + uid + ": " + score);
        String token = auth.substring(7);
        selectionService.updateScore(cid, uid, score, tokenUtil.getUidFromToken(token));
        return new JsonResult<>(OK);
    }

    @RequestMapping("TeacherSelect")
    public JsonResult<Void> TeacherSelect(TeacherCourse teacherCourse, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        selectionService.teacherSelectCourse(teacherCourse, tokenUtil.getUidFromToken(token));

        return new JsonResult<>(OK);
    }

    @RequestMapping("TeacherDeselect")
    public JsonResult<Void> TeacherDeselect(TeacherCourse teacherCourse, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        selectionService.teacherDeselectCourse(teacherCourse, tokenUtil.getUidFromToken(token));

        return new JsonResult<>(OK);
    }

    @RequestMapping("StudentSelect")
    public JsonResult<Void> StudentSelect(StudentCourse studentCourse, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        selectionService.studentSelectCourse(studentCourse, tokenUtil.getUidFromToken(token));

        return new JsonResult<>(OK);
    }

    @RequestMapping("StudentDeselect")
    public JsonResult<Void> StudentDeselect(StudentCourse studentCourse, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        selectionService.studentDeselectCourse(studentCourse, tokenUtil.getUidFromToken(token));

        return new JsonResult<>(OK);
    }
}

