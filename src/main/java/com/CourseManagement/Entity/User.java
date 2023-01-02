package com.CourseManagement.Entity;


public class User extends BaseEntity {
    public static final Integer USER_ADMIN = 0;
    public static final Integer USER_STUDENT = 1;
    public static final Integer USER_TEACHER = 2;
    private Integer uid;
    private String username;
    private String password;
    private String name;
    private Integer isDeleted;
    /**
     * usertype 0:administrator 1:student 2:teacher
     */
    private Integer userType;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(Integer uid, String username, String password) {
        this.uid = uid;
        this.username = username;
        this.password = password;
    }

    public User(Integer uid, String username, String password, String name, Integer isDeleted, Integer userType) {
        this.uid = uid;
        this.username = username;
        this.password = password;
        this.name = name;
        this.isDeleted = isDeleted;
        this.userType = userType;
    }

    public User(String username, String password, String name, Integer isDeleted, Integer userType) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.isDeleted = isDeleted;
        this.userType = userType;
    }


    @Override
    public String toString() {
        return "User{" +
                "uid=" + uid +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", isDeleted=" + isDeleted +
                ", userType=" + userType +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        if (!super.equals(o)) return false;

        User user = (User) o;

        if (getUid() != null ? !getUid().equals(user.getUid()) : user.getUid() != null) return false;
        if (getUsername() != null ? !getUsername().equals(user.getUsername()) : user.getUsername() != null)
            return false;
        if (getPassword() != null ? !getPassword().equals(user.getPassword()) : user.getPassword() != null)
            return false;
        if (getName() != null ? !getName().equals(user.getName()) : user.getName() != null) return false;
        if (getIsDeleted() != null ? !getIsDeleted().equals(user.getIsDeleted()) : user.getIsDeleted() != null)
            return false;
        return getUserType() != null ? getUserType().equals(user.getUserType()) : user.getUserType() == null;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (getUid() != null ? getUid().hashCode() : 0);
        result = 31 * result + (getUsername() != null ? getUsername().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getIsDeleted() != null ? getIsDeleted().hashCode() : 0);
        result = 31 * result + (getUserType() != null ? getUserType().hashCode() : 0);
        return result;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
