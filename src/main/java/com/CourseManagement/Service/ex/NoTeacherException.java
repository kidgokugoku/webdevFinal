package com.CourseManagement.Service.ex;

public class NoTeacherException extends ServiceException {
    public NoTeacherException() {
    }

    public NoTeacherException(String message) {
        super(message);
    }

    public NoTeacherException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoTeacherException(Throwable cause) {
        super(cause);
    }

    public NoTeacherException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
