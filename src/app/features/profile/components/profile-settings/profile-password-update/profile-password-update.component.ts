import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-password-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-password-update.component.html',
})
export class ProfilePasswordUpdateComponent {
  passwordForm(data: any) {}
}
