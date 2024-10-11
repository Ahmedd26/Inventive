import { UsersService } from './../../../../users/users.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../../../../shared/icons/icons.module';
import { IUser } from '../../../../users/users.model';

@Component({
  selector: 'app-profile-image-update',
  standalone: true,
  imports: [FormsModule, IconsModule],
  templateUrl: './profile-image-update.component.html',
})
export class ProfileImageUpdateComponent implements OnInit {
  user!: IUser;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData')!)?.user;
  }
}
