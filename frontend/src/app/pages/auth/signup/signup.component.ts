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
import {Message} from "primeng/message";
import {Toast} from "primeng/toast";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, Message, NgIf],
    templateUrl: './signup.component.html',
    providers: [LoginService, MessageService]
})
export class SignupComponent {

    constructor(
      private readonly loginService: LoginService,
      private readonly router: Router,
      private readonly service: MessageService
    ){
    }

    name: string = '';

    email: string = '';

    password: string = '';

    repeatPassword: string = '';

    visible: any = new Map();

    errorMessage: string = '';

    isLoading: boolean = false;

    signup() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.loginService.signup(this.name, this.email, this.password).subscribe({
            next: () => {
                this.service.add({ severity: 'success', summary: 'Success Message', detail: 'Message sent' });
                this.router.navigate(['/auth/login']);
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

    rediretLogin(event: Event) {
        event.preventDefault();
        this.router.navigate(['/auth/login']);
        // Implement forgot password logic
    }

    protected readonly onsubmit = onsubmit;
}
