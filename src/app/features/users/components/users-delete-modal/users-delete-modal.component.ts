import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from './../../users.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { IUser } from '../../users.model';

@Component({
  selector: 'app-users-delete-modal',
  standalone: true,
  imports: [CustomModalComponent],
  templateUrl: './users-delete-modal.component.html',
})
export class UsersDeleteModalComponent {
  @ViewChild('deleteModal') deleteModal!: CustomModalComponent;
  @Input({ required: true }) user!: IUser;
  @Input({ required: true }) id!: number;
  @Output() deletedUserId = new EventEmitter<number>();

  constructor(private usersService: UsersService) {}

  onDelete(id: number) {
    this.usersService.delete(id).subscribe({
      next: () => {
        this.deleteModal.closeModal();
        this.deletedUserId.emit(id);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
