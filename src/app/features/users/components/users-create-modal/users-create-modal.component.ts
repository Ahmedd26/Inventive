import { RolesService } from './../../../../core/services/temp/roles/roles.service';
import { Component } from '@angular/core';
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
  fetchingState = false;
  users!: IUser[];
  error: any;
  user!: IUser;
  roles!: IRole[];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  ngOnInit(): void {
    this.fetchingState = true;
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;

        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        this.fetchingState = false;
      },
    });
    this.rolesService.getAll().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        this.fetchingState = false;
      },
    });
  }
}
