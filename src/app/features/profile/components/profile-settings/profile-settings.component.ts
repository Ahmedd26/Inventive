import { Component } from '@angular/core';
import { ProfileImageUpdateComponent } from './profile-image-update/profile-image-update.component';
import { ProfileInfoUpdateComponent } from './profile-info-update/profile-info-update.component';
import { ProfilePasswordUpdateComponent } from './profile-password-update/profile-password-update.component';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    ProfileImageUpdateComponent,
    ProfileInfoUpdateComponent,
    ProfilePasswordUpdateComponent,
  ],
  templateUrl: './profile-settings.component.html',
})
export class ProfileSettingsComponent {}
