import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { APP_HOME_URL } from '../../app.constants';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [AppMenuitem, RouterModule],
    templateUrl: './app.menu.html'})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [APP_HOME_URL] }]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: [APP_HOME_URL, 'uikit', 'formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: [APP_HOME_URL, 'uikit', 'input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: [APP_HOME_URL, 'uikit', 'button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: [APP_HOME_URL, 'uikit', 'table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: [APP_HOME_URL, 'uikit', 'list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: [APP_HOME_URL, 'uikit', 'tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: [APP_HOME_URL, 'uikit', 'panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: [APP_HOME_URL, 'uikit', 'overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: [APP_HOME_URL, 'uikit', 'media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: [APP_HOME_URL, 'uikit', 'menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: [APP_HOME_URL, 'uikit', 'message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: [APP_HOME_URL, 'uikit', 'file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: [APP_HOME_URL, 'uikit', 'charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: [APP_HOME_URL, 'uikit', 'timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: [APP_HOME_URL, 'uikit', 'misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: [APP_HOME_URL, 'pages', 'documentation'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'User Permissions',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: [APP_HOME_URL, 'pages', 'permissions']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: [APP_HOME_URL, 'pages', 'empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
