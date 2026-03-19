import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageCode } from './language.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private readonly apiUrl = 'http://localhost:8081/translations';

    constructor(private readonly httpClient: HttpClient) {}

    getTranslations(language: LanguageCode): Observable<Record<string, string>> {
        return this.httpClient.get<Record<string, string>>(this.apiUrl, {
            params: {
                lang: language
            }
        });
    }
}

