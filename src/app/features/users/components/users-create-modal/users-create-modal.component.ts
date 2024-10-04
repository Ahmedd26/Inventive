import { RolesService } from './../../../../core/services/temp/roles/roles.service';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../users.service';
import { type IUser } from '../../users.model';
import { type IRole } from '../../../../core/services/temp/roles/roles.model';

@Component({
  selector: 'app-users-create-modal',
  standalone: true,
  imports: [CustomModalComponent, FormsModule],
  templateUrl: './users-create-modal.component.html',
})
export class UsersCreateModalComponent {
  @ViewChild('createModal') createUserModal!: CustomModalComponent;
  @Output() newlyCreatedUser = new EventEmitter<IUser>();
  ApiErrors: any;
  user!: IUser;
  roles!: IRole[];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  getRole(role_id: number): string {
    if (this.roles) {
      const role = this.roles.find((role) => role.id === role_id);
      return role ? role.name : 'Failed to get role';
    }
    return 'Failed to get role';
  }

  onCreateUser(user: IUser) {
    this.usersService.create(user).subscribe({
      next: (user) => {
        this.createUserModal.closeModal();
        const userWithRole = {
          ...user,
          role: {
            id: user.role_id,
            name: this.getRole(user.role_id),
          },
        };
        this.newlyCreatedUser.emit(userWithRole);
      },
      error: (error) => {
        this.ApiErrors = error.error.message;
        console.log('failed to create user', error);
      },
    });
  }

  ngOnInit(): void {
    this.rolesService.getAll().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        this.ApiErrors = error.error.message;
      },
    });
  }
}
