import { Component } from '@angular/core';
import { IconsModule } from '../../shared/icons/icons.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
