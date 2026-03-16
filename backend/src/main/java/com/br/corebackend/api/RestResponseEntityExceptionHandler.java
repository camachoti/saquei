package com.br.corebackend.api;

import jakarta.validation.ValidationException;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import java.util.Locale;

@ControllerAdvice
public class RestResponseEntityExceptionHandler
  extends ResponseEntityExceptionHandler {

    MessageSource messageSource;

    RestResponseEntityExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(value
      = { IllegalArgumentException.class, IllegalStateException.class, ValidationException.class })
    protected ResponseEntity<Object> handleConflict(
      RuntimeException ex, WebRequest request, Locale locale) {
        return handleExceptionInternal(ex, messageSource.getMessage(ex.getMessage(), new Object[]{ex.getMessage()}, locale),
          new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}