import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

interface UserPermission {
    id: string;
    name: string;
    module: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE';
}

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        SelectModule
    ],
    templateUrl: './crud.html',
    providers: [MessageService, ConfirmationService]
})
export class Crud implements OnInit {
    permissionDialog = false;
    permissions = signal<UserPermission[]>([]);
    selectedPermissions: UserPermission[] | null = null;
    permission: UserPermission = this.getEmptyPermission();
    submitted = false;
    moduleOptions = [
        { label: 'Users', value: 'Users' },
        { label: 'Financial', value: 'Financial' },
        { label: 'Reports', value: 'Reports' },
        { label: 'Settings', value: 'Settings' }
    ];
    statusOptions = [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Inactive', value: 'INACTIVE' }
    ];

    @ViewChild('dt') dt!: Table;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.permissions.set([
            {
                id: 'ADM_USERS_VIEW',
                name: 'View users',
                module: 'Users',
                description: 'Allows listing and searching users.',
                status: 'ACTIVE'
            },
            {
                id: 'ADM_USERS_EDIT',
                name: 'Edit users',
                module: 'Users',
                description: 'Allows editing user profiles and access links.',
                status: 'ACTIVE'
            },
            {
                id: 'RPT_EXPORT',
                name: 'Export reports',
                module: 'Reports',
                description: 'Allows exporting data in CSV format.',
                status: 'INACTIVE'
            }
        ]);
    }

    openNew(): void {
        this.permission = this.getEmptyPermission();
        this.submitted = false;
        this.permissionDialog = true;
    }

    editPermission(permission: UserPermission): void {
        this.permission = { ...permission };
        this.permissionDialog = true;
    }

    savePermission(): void {
        this.submitted = true;

        if (!this.permission.id.trim() || !this.permission.name.trim() || !this.permission.module) {
            return;
        }

        const currentPermissions = this.permissions();
        const foundIndex = currentPermissions.findIndex((item) => item.id === this.permission.id);

        if (foundIndex >= 0) {
            currentPermissions[foundIndex] = { ...this.permission };
            this.permissions.set([...currentPermissions]);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Permission updated successfully.',
                life: 3000
            });
        } else {
            this.permissions.set([...currentPermissions, { ...this.permission }]);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Permission created successfully.',
                life: 3000
            });
        }

        this.permissionDialog = false;
        this.permission = this.getEmptyPermission();
    }

    deletePermission(permission: UserPermission): void {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${permission.name}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.permissions.set(this.permissions().filter((item) => item.id !== permission.id));
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Permission deleted successfully.',
                    life: 3000
                });
            }
        });
    }

    deleteSelectedPermissions(): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected permissions?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const selectedIds = new Set(this.selectedPermissions?.map((item) => item.id));
                this.permissions.set(this.permissions().filter((item) => !selectedIds.has(item.id)));
                this.selectedPermissions = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Selected permissions removed successfully.',
                    life: 3000
                });
            }
        });
    }

    hideDialog(): void {
        this.permissionDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getStatusSeverity(status: UserPermission['status']): 'success' | 'danger' {
        return status === 'ACTIVE' ? 'success' : 'danger';
    }

    private getEmptyPermission(): UserPermission {
        return {
            id: '',
            name: '',
            module: '',
            description: '',
            status: 'ACTIVE'
        };
    }
}
