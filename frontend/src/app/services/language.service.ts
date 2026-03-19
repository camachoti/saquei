import { Injectable } from '@angular/core';

export type LanguageCode = 'pt-BR' | 'en-US';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly storageKey = 'app-language';
    private readonly fallbackLanguage: LanguageCode = 'pt-BR';

    private currentLanguage: LanguageCode;

    constructor() {
        this.currentLanguage = this.resolveInitialLanguage();
        this.applyDocumentLanguage(this.currentLanguage);
    }

    getLanguage(): LanguageCode {
        return this.currentLanguage;
    }

    setLanguage(language: LanguageCode): void {
        this.currentLanguage = language;
        localStorage.setItem(this.storageKey, language);
        this.applyDocumentLanguage(language);
    }

    private resolveInitialLanguage(): LanguageCode {
        const storedLanguage = localStorage.getItem(this.storageKey);
        if (storedLanguage === 'pt-BR' || storedLanguage === 'en-US') {
            return storedLanguage;
        }

        const browserLanguage = navigator.language;
        if (browserLanguage === 'pt-BR' || browserLanguage.startsWith('pt')) {
            return 'pt-BR';
        }

        if (browserLanguage === 'en-US' || browserLanguage.startsWith('en')) {
            return 'en-US';
        }

        return this.fallbackLanguage;
    }

    private applyDocumentLanguage(language: LanguageCode): void {
        document.documentElement.lang = language;
    }
}

