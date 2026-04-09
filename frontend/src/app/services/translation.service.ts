import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.constants';
import { LanguageCode } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private readonly apiUrl = `${API_BASE_URL}/translations`;

    constructor(private readonly httpClient: HttpClient) {}

    getTranslations(language: LanguageCode): Observable<Record<string, string>> {
        return this.httpClient.get<Record<string, string>>(this.apiUrl, {
            params: {
                lang: language
            }
        });
    }
}
