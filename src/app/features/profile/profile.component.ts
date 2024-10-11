import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IconsModule } from '../../shared/icons/icons.module';
import { IUser } from '../users/users.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IconsModule, RouterOutlet, RouterLink],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user!: IUser;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData')!)?.user;
    console.log(this.user);
  }
}
