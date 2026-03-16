import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import {AppFloatingConfigurator} from "../../../layout/component/app.floatingconfigurator";
import {LoginService} from "../../../services/login.service";
import {MessageService} from "primeng/api";
import {Message, MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {CommonModule, NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, Message, NgIf, ToastModule],
    templateUrl: './login.component.html',
    providers: [LoginService, MessageService]
})
export class LoginComponent {

    constructor(
      private readonly loginService: LoginService,
      private readonly router: Router,
      private readonly service: MessageService
    ){
    }

    email: string = '';

    password: string = '';

    checked: boolean = false;

    visible: any = new Map();

    errorMessage: string = '';

    isLoading: boolean = false;

    login() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.loginService.login(this.email, this.password).subscribe({
            next: () => {
                this.service.add({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
                this.router.navigate(['/logedin']);
            },
            error: (error) => {
                debugger;
                if(error.status == 401){
                    this.errorMessage = "Login Failed. Please check your credentials.";
                } else {
                    this.errorMessage = "Unexpected error. Please try again later.";
                }
                this.showMessage();
            }
        })
        this.isLoading = false;
    }

    showMessage(  ) {
        this.visible.set(true);

        setTimeout(() => {
            this.visible.set(false);
        }, 3500);
    }

    forgotPassword(event: Event) {
        event.preventDefault();
        debugger;
        // Implement forgot password logic
        this.service.add({ severity: 'warn', summary: 'Feature not implemented yet', detail: 'Future Updates Coming...' });
    }


    protected readonly onsubmit = onsubmit;
}
