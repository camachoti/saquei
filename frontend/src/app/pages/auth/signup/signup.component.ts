import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
import { finalize } from 'rxjs/operators';
import { LanguageService } from '../../../services/language.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, Message],
    templateUrl: './signup.component.html',
    providers: [LoginService, MessageService]
})
export class SignupComponent implements OnInit {
    @Output() navigateToLogin = new EventEmitter<void>();

    constructor(
        private readonly loginService: LoginService,
        private readonly router: Router,
        private readonly service: MessageService,
        private readonly languageService: LanguageService,
        private readonly translationService: TranslationService
    ) {}

    name: string = '';

    email: string = '';

    password: string = '';

    repeatPassword: string = '';

    errorMessage: string = '';

    isLoading: boolean = false;

    private translations: Record<string, string> = {};

    ngOnInit() {
        this.loadTranslations();
    }

    signup() {
        if (this.isLoading) {
            return;
        }

        this.errorMessage = '';
        this.isLoading = true;
        this.loginService
            .signup(this.name, this.email, this.password)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
                next: () => {
                    this.service.add({
                        severity: 'success',
                        summary: this.translate('auth.signup.success.summary'),
                        detail: this.translate('auth.signup.success.detail')
                    });
                    this.router.navigate(['/auth/login']);
                },
                error: (error: HttpErrorResponse) => {
                    this.errorMessage = this.resolveSignupErrorMessage(error);
                }
            });
    }

    private resolveSignupErrorMessage(error: HttpErrorResponse): string {
        const rawError = error.error;

        if (typeof rawError === 'string' && rawError.trim()) {
            return rawError.trim();
        }

        if (rawError && typeof rawError.message === 'string' && rawError.message.trim()) {
            return rawError.message.trim();
        }

        if (error.status === 400) {
            return this.translate('auth.signup.error.validation');
        }

        return this.translate('app.unexpected.error');
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

    rediretLogin(event: Event) {
        event.preventDefault();
        if (this.navigateToLogin.observed) {
            this.navigateToLogin.emit();
            return;
        }
        this.router.navigate(['/auth/login']);
    }

    protected readonly onsubmit = onsubmit;
}
