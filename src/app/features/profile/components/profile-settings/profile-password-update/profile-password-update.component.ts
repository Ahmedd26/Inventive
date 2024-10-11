import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IUser } from '../../../../users/users.model';
import { UsersService } from '../../../../users/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-password-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-password-update.component.html',
})
export class ProfilePasswordUpdateComponent implements OnInit {
  user!: IUser;
  current_passwordError = '';
  new_passwordError = '';
  new_password_confirmationError = '';

  constructor(private usersService: UsersService) {}

  passwordForm(form: NgForm) {
    console.log(form.valid);

    if (form.valid) {
      this.usersService.update(form.value, this.user.id).subscribe({
        next: (res) => {
          console.log(res);
          const currentUserData = JSON.parse(localStorage.getItem('userData')!);
          currentUserData.user.name = res.name;
          localStorage.setItem('userData', JSON.stringify(currentUserData));
        },
        error: (error: HttpErrorResponse) => {
          if (error?.error?.error?.current_password) {
            this.current_passwordError = error.error.error.current_password;
            console.log(error.error.error.current_password);
          }
          if (error?.error?.message) {
            this.new_password_confirmationError = error.error.message;
            console.log(error.error.message);
          }
          // P@ssw0rD
        },
      });
    }
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData')!)?.user;
  }
}
