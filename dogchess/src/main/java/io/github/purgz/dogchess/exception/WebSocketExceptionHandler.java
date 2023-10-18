package io.github.purgz.dogchess.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class WebSocketExceptionHandler {


    @ExceptionHandler
    public ResponseEntity<Exception> handleException(Exception exc){

        return new ResponseEntity<>(exc, HttpStatus.BAD_REQUEST);
    }
}
