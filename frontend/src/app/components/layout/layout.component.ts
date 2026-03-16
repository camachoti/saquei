import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink,
    Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(
    private readonly router: Router) { }

  items: MenuItem[] | undefined;

    ngOnInit() {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home'
        },
        {
          label: 'Cadastros',
          icon: 'pi pi-search',
          items: [
            {
              label: 'Carteira de Clientes',
              icon: 'pi pi-address-book'
            }
          ]
        }
      ]
    }

}
