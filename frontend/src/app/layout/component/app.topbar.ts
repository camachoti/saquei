import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { APP_HOME_URL, LOGIN_URL } from '../../app.constants';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { LoginService } from '../../services/login.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LanguageCode, LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, ConfirmDialogModule],
    providers: [ConfirmationService],
    templateUrl: './app.topbar.html'
})
export class AppTopbar {
    currentLanguage: LanguageCode;

    private readonly labels = {
        'pt-BR': {
            calendar: 'Calendario',
            messages: 'Mensagens',
            profile: 'Perfil',
            manageAccount: 'Gerenciar Minha Conta',
            logout: 'Sair',
            language: 'Idioma',
            portuguese: 'Portugues (Brasil)',
            english: 'Ingles (EUA)',
            logoutHeader: 'Logout',
            logoutMessage: 'Tem certeza que deseja sair?',
            logoutAccept: 'Sim, sair',
            logoutReject: 'Cancelar'
        },
        'en-US': {
            calendar: 'Calendar',
            messages: 'Messages',
            profile: 'Profile',
            manageAccount: 'Manage My Account',
            logout: 'Logout',
            language: 'Language',
            portuguese: 'Portuguese (Brazil)',
            english: 'English (US)',
            logoutHeader: 'Logout',
            logoutMessage: 'Are you sure you want to logout?',
            logoutAccept: 'Yes, logout',
            logoutReject: 'Cancel'
        }
    } as const;

    constructor(
        public layoutService: LayoutService,
        private readonly loginService: LoginService,
        private readonly router: Router,
        private readonly confirmationService: ConfirmationService,
        private readonly languageService: LanguageService
    ) {
        this.currentLanguage = this.languageService.getLanguage();
    }

    get text() {
        return this.labels[this.currentLanguage];
    }

    setLanguage(language: LanguageCode) {
        if (this.currentLanguage === language) {
            return;
        }

        this.currentLanguage = language;
        this.languageService.setLanguage(language);
        window.location.reload();
    }

    setLanguageAndClose(language: LanguageCode, dropdownPanel: HTMLElement) {
        this.setLanguage(language);
        dropdownPanel.classList.add('hidden');
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    navigateToAccount() {
        this.router.navigate([APP_HOME_URL, 'account']);
    }

    logout() {
        this.confirmationService.confirm({
            message: this.text.logoutMessage,
            header: this.text.logoutHeader,
            acceptLabel: this.text.logoutAccept,
            rejectLabel: this.text.logoutReject,
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.loginService.logout();
                this.router.navigate([LOGIN_URL]);
            }
        });
    }
}
