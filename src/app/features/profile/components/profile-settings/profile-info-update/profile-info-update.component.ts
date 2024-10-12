import { UsersService } from './../../../../users/users.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IUser } from '../../../../users/users.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-info-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-info-update.component.html',
})
export class ProfileInfoUpdateComponent implements OnInit {
  user!: IUser;
  passwordError = '';
  emailError = '';
  success = false;
  constructor(private usersService: UsersService) {}

  profileInfoForm(form: NgForm) {
    if (form.valid) {
      this.usersService.update(form.value, this.user.id).subscribe({
        next: (res) => {
          console.log(res);
          const currentUserData = JSON.parse(localStorage.getItem('userData')!);
          currentUserData.user.name = res.name;
          localStorage.setItem('userData', JSON.stringify(currentUserData));
          this.success = true;
        },
        error: (error: HttpErrorResponse) => {
          if (error?.error?.message) {
            this.emailError = error.error.message;
          }
          if (error?.error?.error?.current_password) {
            this.passwordError = error.error.error.current_password;
          }
        },
      });
    }
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData')!)?.user;
  }
}
