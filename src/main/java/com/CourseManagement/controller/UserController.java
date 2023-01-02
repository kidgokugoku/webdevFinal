package com.CourseManagement.controller;

import com.CourseManagement.Entity.User;
import com.CourseManagement.Service.IUserService;
import com.CourseManagement.util.JsonResult;
import com.CourseManagement.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:9911")
@RestController
@RequestMapping("api/v1/users")
public class UserController extends BaseController {
    @Autowired
    private TokenUtil tokenUtil;
    @Autowired
    private IUserService userService;

    @RequestMapping("Reg")
    public JsonResult<Void> Reg(User user, @RequestHeader("Authorization") String auth) {
        String token = auth.substring(7);
        userService.reg(user, tokenUtil.getUidFromToken(token));
        return new JsonResult<>(OK);
    }


    @RequestMapping("Delete")
    public JsonResult<Void> Delete(Integer uid, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        userService.delete(uid, tokenUtil.getUidFromToken(token));

        return new JsonResult<>(OK);
    }


    @RequestMapping("Login")
    public JsonResult<String> Login(String username, String password) {
        User data = userService.login(username, password);
        String token = tokenUtil.getToken(data.getUid().toString(), data.getUsername());

        return new JsonResult<String>(OK, token);
    }

    @RequestMapping("ChangePassword")
    public JsonResult<Void> ChangePassword(String oldPassword, String newPassword, @RequestHeader("Authorization") String auth) {
        String token = auth.substring(7);

        userService.updatePasswordByUid(tokenUtil.getUidFromToken(token), tokenUtil.getUsernameFromToken(token), oldPassword, newPassword);
        return new JsonResult<>(OK);
    }

    @RequestMapping(value = "GetByUid")
    public JsonResult<User> GetByUid(@RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);
        User user = userService.getByUid(tokenUtil.getUidFromToken(token));

        return new JsonResult<User>(OK, user);
    }


    @RequestMapping(value = "GetByName")
    public JsonResult<List<User>> GetByName(String name, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);
        List<User> users = userService.getByName(name, tokenUtil.getUidFromToken(token));

        return new JsonResult<List<User>>(OK, users);
    }

    @RequestMapping(value = "GetAll")
    public JsonResult<List<User>> GetAll(@RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        List<User> users = userService.getAll(tokenUtil.getUidFromToken(token));

        return new JsonResult<List<User>>(OK, users);
    }

    @RequestMapping("Edit")
    public JsonResult<Void> Edit(User user, @RequestHeader("Authorization") String auth) {

        String token = auth.substring(7);

        userService.edit(user.getUid(), tokenUtil.getUidFromToken(token), user);

        return new JsonResult<>(OK);
    }

    @RequestMapping("GetAllSelection")
    public JsonResult<List<Map>> GetAllSelection(@RequestHeader("Authorization") String auth) {
        String token = auth.substring(7);

        List<Map> selections = userService.getAllSelection(tokenUtil.getUidFromToken(token));

        return new JsonResult<List<Map>>(OK, selections);
    }
}