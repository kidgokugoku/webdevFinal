package com.CourseManagement.Service.ex;

public class SelectionNotFoundException extends ServiceException {
    public SelectionNotFoundException() {
        super();
    }

    public SelectionNotFoundException(String message) {
        super(message);
    }

    public SelectionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SelectionNotFoundException(Throwable cause) {
        super(cause);
    }

    protected SelectionNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}


