package com.CourseManagement.controller;

import com.CourseManagement.Service.ex.*;
import com.CourseManagement.util.JsonResult;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class BaseController {
    public static final int OK = 200;

    @ExceptionHandler(ServiceException.class)
    public JsonResult<Void> handleException(Throwable e) {
        JsonResult<Void> result = new JsonResult<>(e);
        if (e instanceof UsernameDuplicatedException) {
            result.setState(4000);
//            result.setMessage("用户名被占用的异常");
        } else if (e instanceof CourseIsFullException) {
            result.setState(5006);
        } else if (e instanceof CourseNotFoundException) {
            result.setState(5004);
        } else if (e instanceof UsernameNotFoundException) {
            result.setState(4001);
//            result.setMessage("用户名不存在的异常");
        } else if (e instanceof PasswordNotMatchException) {
            result.setState(4002);
//            result.setMessage("用户名密码不匹配的异常");
        } else if (e instanceof InsertException) {
            result.setState(4003);
//            result.setMessage("添加过程中发生的未知异常");
        } else if (e instanceof UpdateException) {
            result.setState(5001);
//            result.setMessage("更新数据中发生的未知异常");
        } else if (e instanceof DeleteException) {
            result.setState(6001);
//            result.setMessage("删除过程中发生的未知异常");
        } else if (e instanceof TokenAuthExpiredException) {
            result.setState(401);
//            result.setMessage("token已失效");
        } else if (e instanceof SelectionExistedException) {
            result.setState(5002);
        } else if (e instanceof PermissionDeniedException) {
            result.setState(5003);
        } else if (e instanceof NoTeacherException) {
            result.setState(5005);
        } else if (e instanceof CourseIsGradedException) {
            result.setState(5007);
        }


        return result;
    }
}
