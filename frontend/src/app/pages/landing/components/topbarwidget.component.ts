import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { SignupComponent } from '../../auth/signup/signup.component';
import { filter, Subscription } from 'rxjs';
import { LanguageCode, LanguageService } from '../../../services/language.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'topbar-widget',
    imports: [CommonModule, RouterModule, StyleClassModule, ButtonModule, RippleModule, DialogModule, LoginComponent, SignupComponent],
    templateUrl: './topbarwidget.component.html'
})
export class TopbarWidget implements OnInit, OnDestroy {
    loginVisible = false;
    signupVisible = false;
    currentLanguage: LanguageCode;
    private translations: Record<string, string> = {};
    private navSub: Subscription;

    constructor(
        public router: Router,
        private readonly languageService: LanguageService,
        private readonly translationService: TranslationService
    ) {
        this.currentLanguage = this.languageService.getLanguage();
        this.navSub = router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                this.loginVisible = false;
                this.signupVisible = false;
            });
    }

    ngOnInit() {
        this.loadTranslations();
    }

    setLanguage(language: LanguageCode) {
        this.currentLanguage = language;
        this.languageService.setLanguage(language);
        this.loadTranslations();
    }

    get text() {
        return {
            login: this.translate('landing.auth.login'),
            signup: this.translate('landing.auth.signup')
        };
    }

    private loadTranslations() {
        this.translationService.getTranslations(this.currentLanguage).subscribe({
            next: (translations) => {
                this.translations = translations;
            },
            error: () => {
                this.translations = {};
            }
        });
    }

    private translate(key: string) {
        return this.translations[key];
    }

    ngOnDestroy() {
        this.navSub.unsubscribe();
    }
}
