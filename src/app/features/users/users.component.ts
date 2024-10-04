import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/table/components/menu/menu.component';
import { RolesService } from '../../core/services/temp/roles/roles.service';
import { type IUser } from './users.model';
import { type IRole } from '../../core/services/temp/roles/roles.model';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { UsersCreateModalComponent } from './components/users-create-modal/users-create-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    LoadingComponent,
    CommonModule,
    MenuComponent,
    PaginationComponent,
    UsersCreateModalComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  fetchingState = false;
  users!: IUser[];
  error: any;
  user!: IUser;
  roles!: IRole[];

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedUsers: IUser[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 5;
  updatePaginatedUsers(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedUsers(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//

  ngOnInit(): void {
    this.fetchingState = true;
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.fetchingState = false;
        // ** ---------- PAGINATION ---------- **//
        this.totalItems = users.length;
        this.updatePaginatedUsers(1);
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

  getUser(data: NgForm) {
    const id = data.value.id;
    this.fetchingState = true;
    this.usersService.get(+id).subscribe({
      next: (user) => {
        this.user = user;
        console.log('the user data is', user);

        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        console.log('could not get the user', error);
        this.fetchingState = false;
      },
    });
  }

  onDeleteUser(id: any) {
    this.fetchingState = true;
    this.usersService.delete(+id).subscribe({
      next: () => {
        console.log('deleted');
        this.users = this.users.filter((user) => user.id !== id);
        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        console.log('not deleted', error);
        this.fetchingState = false;
      },
    });
  }

  addNewlyCreatedUser(user: IUser) {
    this.paginatedUsers.push(user);
  }

  onUpdateUser(user: IUser) {
    this.fetchingState = true;
    this.usersService.update(user, user.id).subscribe({
      next: (user) => {
        console.log('user updated successfully', user);
        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        console.log('failed to update user', error);
        this.fetchingState = false;
      },
    });
  }
}
