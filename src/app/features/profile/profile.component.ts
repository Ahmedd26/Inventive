import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { IconsModule } from '../../shared/icons/icons.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IconsModule, RouterOutlet, RouterLink],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
