import { UsersService } from './../../users.service';
import { FormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { IUser } from '../../users.model';
import { RolesService } from '../../../../core/services/temp/roles/roles.service';
import { IRole } from '../../../../core/services/temp/roles/roles.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-update-modal',
  standalone: true,
  imports: [FormsModule, CustomModalComponent],
  templateUrl: './users-update-modal.component.html',
})
export class UsersUpdateModalComponent implements OnInit, OnChanges {
  @ViewChild('updateModal') updateModal!: CustomModalComponent;
  @Input({ required: true }) currentUserData!: IUser;
  roles!: IRole[];
  newUser!: IUser;
  @Output() updatedUser = new EventEmitter<IUser>();

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentUserData'] && changes['currentUserData'].currentValue) {
      // DEEP COPY
      this.newUser = JSON.parse(
        JSON.stringify({ ...changes['currentUserData'].currentValue }),
      );
    }
  }

  getRole(role_id: number): string {
    if (this.roles) {
      const role = this.roles.find((role) => role.id === role_id);
      return role ? role.name : 'Failed to get role';
    }
    return 'Failed to get role';
  }

  onUpdateUser(user: IUser) {
    if (user && this.currentUserData.id) {
      this.usersService.update(user, this.currentUserData.id).subscribe({
        next: (user) => {
          const userWithRole = {
            ...user,
            role: {
              id: user.role_id,
              name: this.getRole(user.role_id),
            },
          };
          this.updatedUser.emit(userWithRole);
          this.updateModal.closeModal();
        },
        error: (error) => {
          console.log('failed to update user', error);
        },
      });
    } else {
      console.log('user not updated');
    }
  }

  ngOnInit(): void {
    this.rolesService.getAll().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
