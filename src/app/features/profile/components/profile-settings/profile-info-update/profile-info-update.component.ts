import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-info-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-info-update.component.html',
})
export class ProfileInfoUpdateComponent {
  profileInfoForm(data: any) {}
}
