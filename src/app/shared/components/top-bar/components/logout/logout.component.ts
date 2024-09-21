import { Component } from '@angular/core';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { IconsModule } from '../../../../icons/icons.module';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  constructor(private authService: AuthService) {}
  logout(): void {
    this.authService.logout();
  }
}
