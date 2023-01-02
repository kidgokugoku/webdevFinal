package com.CourseManagement.Service.ex;

public class CourseIsFullException extends ServiceException {
    public CourseIsFullException() {
    }

    public CourseIsFullException(String message) {
        super(message);
    }

    public CourseIsFullException(String message, Throwable cause) {
        super(message, cause);
    }

    public CourseIsFullException(Throwable cause) {
        super(cause);
    }

    public CourseIsFullException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
