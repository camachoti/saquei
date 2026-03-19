import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

export const acceptLanguageInterceptor: HttpInterceptorFn = (req, next) => {
    const languageService = inject(LanguageService);
    const language = languageService.getLanguage();

    const requestWithLanguage = req.clone({
        setHeaders: {
            'Accept-Language': language
        }
    });

    return next(requestWithLanguage);
};

