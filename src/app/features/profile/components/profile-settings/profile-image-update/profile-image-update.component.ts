import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../../../../shared/icons/icons.module';

@Component({
  selector: 'app-profile-image-update',
  standalone: true,
  imports: [FormsModule, IconsModule],
  templateUrl: './profile-image-update.component.html',
})
export class ProfileImageUpdateComponent {}
