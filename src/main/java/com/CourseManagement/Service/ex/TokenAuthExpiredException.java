package com.CourseManagement.Service.ex;

public class TokenAuthExpiredException extends ServiceException {
    public TokenAuthExpiredException() {
    }

    public TokenAuthExpiredException(String message) {
        super(message);
    }

    public TokenAuthExpiredException(String message, Throwable cause) {
        super(message, cause);
    }

    public TokenAuthExpiredException(Throwable cause) {
        super(cause);
    }

    public TokenAuthExpiredException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
