import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { LanguageCode, LanguageService } from '../../services/language.service';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-account-management',
    standalone: true,
    imports: [FormsModule, ButtonModule, PasswordModule, Message, SkeletonModule],
    templateUrl: './account-management.html'
})
export class AccountManagement implements OnInit {
    currentLanguage: LanguageCode;
    currentPassword: string = '';
    newPassword: string = '';
    confirmNewPassword: string = '';
    isLoading: boolean = false;
    isTranslationsLoading: boolean = true;
    successMessage: string = '';
    errorMessage: string = '';
    private translations: Record<string, string> = {};

    constructor(
        private readonly loginService: LoginService,
        private readonly languageService: LanguageService,
        private readonly translationService: TranslationService
    ) {
        this.currentLanguage = this.languageService.getLanguage();
    }

    ngOnInit(): void {
        this.loadTranslations();
    }

    changePassword(): void {
        if (this.isLoading) {
            return;
        }

        this.successMessage = '';
        this.errorMessage = '';

        if (!this.currentPassword || !this.newPassword || !this.confirmNewPassword) {
            this.errorMessage = this.translate('auth.change.password.new.required');
            return;
        }

        if (this.newPassword !== this.confirmNewPassword) {
            this.errorMessage = this.translate('auth.change.password.confirm.mismatch');
            return;
        }

        this.isLoading = true;
        this.loginService.changePassword(this.currentPassword, this.newPassword, this.confirmNewPassword)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
                next: (message: string) => {
                    this.successMessage = message || this.translate('auth.change.password.success');
                    this.currentPassword = '';
                    this.newPassword = '';
                    this.confirmNewPassword = '';
                },
                error: (error: HttpErrorResponse) => {
                    this.errorMessage = typeof error.error === 'string' && error.error.trim().length > 0
                        ? error.error
                        : this.translate('app.unexpected.error');
                }
            });
    }

    private loadTranslations(): void {
        this.isTranslationsLoading = true;
        this.translationService.getTranslations(this.currentLanguage)
            .pipe(finalize(() => (this.isTranslationsLoading = false)))
            .subscribe({
                next: (translations) => {
                    this.translations = translations;
                },
                error: () => {
                    this.translations = {};
                }
            });
    }

    translate(key: string): string {
        return this.translations[key] ?? key;
    }
}

