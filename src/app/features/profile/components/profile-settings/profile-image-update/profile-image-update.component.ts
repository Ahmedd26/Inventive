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
  newImage: any = null;
  constructor(private usersService: UsersService) {}

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  ProfilePic(formValue: any) {
    const formData = new FormData();
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      formData.append('image', fileInput.files[0]);
    }
    if (this.newImage) {
      this.user.image = this.newImage;
      this.usersService.update(formData, this.user.id).subscribe({
        next: (res) => {
          console.log(res);
          const currentUserData = JSON.parse(localStorage.getItem('userData')!);
          currentUserData.user.image = res.image;
          localStorage.setItem('userData', JSON.stringify(currentUserData));
        },
        error: (error) => {
          console.error(error);
        },
      });
      this.newImage = null; // Clear the new image after update
    }
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData')!)?.user;
  }
}
