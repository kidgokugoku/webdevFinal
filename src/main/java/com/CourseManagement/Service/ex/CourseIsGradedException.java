package com.CourseManagement.Service.ex;

public class CourseIsGradedException extends ServiceException {
    public CourseIsGradedException() {
    }

    public CourseIsGradedException(String message) {
        super(message);
    }

    public CourseIsGradedException(String message, Throwable cause) {
        super(message, cause);
    }

    public CourseIsGradedException(Throwable cause) {
        super(cause);
    }

    public CourseIsGradedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
