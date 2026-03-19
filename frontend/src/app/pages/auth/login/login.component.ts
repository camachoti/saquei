import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LoginService } from '../../../services/login.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageService } from '../../../services/language.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, Message, ToastModule],
    templateUrl: './login.component.html',
    providers: [LoginService, MessageService]
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
                    this.router.navigate(['/logedin']);
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.errorMessage = this.translate('auth.login.invalid.credentials');
                    } else {
                        this.errorMessage = this.translate('app.unexpected.error');
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

    translate(key: string) {
        return this.translations[key];
    }

    forgotPassword(event: Event) {
        event.preventDefault();
        this.service.add({
            severity: 'warn',
            summary: this.translate('auth.login.forgot.password.summary'),
            detail: this.translate('auth.login.forgot.password.detail')
        });
    }
}
