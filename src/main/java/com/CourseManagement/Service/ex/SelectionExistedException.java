package com.CourseManagement.Service.ex;

public class SelectionExistedException extends ServiceException {
    public SelectionExistedException() {
    }

    public SelectionExistedException(String message) {
        super(message);
    }

    public SelectionExistedException(String message, Throwable cause) {
        super(message, cause);
    }

    public SelectionExistedException(Throwable cause) {
        super(cause);
    }

    public SelectionExistedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
