import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/table/components/menu/menu.component';
import { RolesService } from '../../core/services/temp/roles/roles.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { UsersCreateModalComponent } from './components/users-create-modal/users-create-modal.component';
import { UsersUpdateModalComponent } from './components/users-update-modal/users-update-modal.component';
import { UsersDeleteModalComponent } from './components/users-delete-modal/users-delete-modal.component';
import { RouterLink } from '@angular/router';
import { type IUser } from './users.model';
import { type IRole } from '../../core/services/temp/roles/roles.model';
import { IconsModule } from '../../shared/icons/icons.module';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    LoadingComponent,
    CommonModule,
    RouterLink,
    IconsModule,
    MenuComponent,
    PaginationComponent,
    UsersCreateModalComponent,
    UsersUpdateModalComponent,
    UsersDeleteModalComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  fetchingState = false;
  users!: IUser[];
  error: any;
  user!: IUser;

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

  addNewlyCreatedUser(user: IUser) {
    this.paginatedUsers.push(user);
  }
  setUpdatedUser(user: IUser) {
    this.paginatedUsers = this.paginatedUsers.filter((u) => u.id !== user.id);
    this.paginatedUsers.push(user);
  }
  removeDeletedUser(id: number) {
    this.paginatedUsers = this.paginatedUsers.filter((u) => u.id !== id);
  }
}
