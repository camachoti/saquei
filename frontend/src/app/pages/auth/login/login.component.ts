import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { APP_HOME_URL } from '../../../app.constants';
import { LanguageService } from '../../../services/language.service';
import { LoginService } from '../../../services/login.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, Message, ToastModule],
    templateUrl: './login.component.html',
    providers: [MessageService]
})
export class LoginComponent implements OnInit {
    constructor(
        private readonly loginService: LoginService,
        private readonly router: Router,
        private readonly service: MessageService,
        private readonly languageService: LanguageService,
        private readonly translationService: TranslationService
    ) {}

    email: string = '';
    password: string = '';
    checked: boolean = false;
    errorMessage: string = '';
    isLoading: boolean = false;
    private translations: Record<string, string> = {};

    ngOnInit() {
        this.loadTranslations();
    }

    login() {
        if (this.isLoading) return;
        this.errorMessage = '';
        this.isLoading = true;
        this.loginService.login(this.email, this.password)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
                next: () => {
                    this.router.navigate([APP_HOME_URL]);
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.errorMessage = this.translate('auth.login.invalid.credentials', 'Login failed. Please check your credentials.');
                    } else {
                        this.errorMessage = this.translate('app.unexpected.error', 'Unexpected error. Please try again later.');
                    }
                }
            });
    }

    private loadTranslations() {
        this.translationService.getTranslations(this.languageService.getLanguage()).subscribe({
            next: (translations) => {
                this.translations = translations;
            },
            error: () => {
                this.translations = {};
            }
        });
    }

    translate(key: string, fallback = key) {
        return this.translations[key] ?? fallback;
    }

    forgotPassword(event: Event) {
        event.preventDefault();
        this.service.add({
            severity: 'warn',
            summary: this.translate('auth.login.forgot.password.summary', 'Password recovery unavailable'),
            detail: this.translate('auth.login.forgot.password.detail', 'Contact support to recover your password.')
        });
    }
}
