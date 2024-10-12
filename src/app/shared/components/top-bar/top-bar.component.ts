import { Component, OnInit } from '@angular/core';
import { ToggleDarkLightComponent } from './components/toggle-dark-light/toggle-dark-light.component';
import { LogoutComponent } from './components/logout/logout.component';
import { IUser } from '../../../features/users/users.model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ToggleDarkLightComponent, LogoutComponent, RouterLink],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  user!: IUser;

  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    initFlowbite();
    this.user = JSON.parse(localStorage.getItem('userData')!)?.user;
  }
}
