import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { IUser ,IRole} from './users.model';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, LoadingComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit  {
  fetchingState = false;
  users!: IUser[];
  error: any;
  user!: IUser;
  roles!: IRole[];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchingState = true;
    this.usersService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        console.log('all users retreived successfully',users);
        
        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        console.log('could not get all users',error);
        this.fetchingState = false;
      }
    });
    this.usersService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        this.fetchingState = false;
      }
    })
  }

  getUser(data: NgForm) {
    const id = data.value.id;
    this.fetchingState = true;
    this.usersService.get(+id).subscribe({
      next: (user) => {
        this.user = user;
        console.log('the user data is',user);

        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        console.log('could not get the user',error);
        this.fetchingState = false;
      }
    });
  }

  onDeleteUser(id: any) {
    this.fetchingState = true;
    this.usersService.delete(+id).subscribe({
      next: () => {
        console.log('deleted');
        this.users = this.users.filter(user => user.id !== id);
        this.fetchingState = false;
      },
      error: (error) => {
        this.error = error.error.message;
        console.log('not deleted', error);
        this.fetchingState = false;
      }
    });
  }
  onCreateUser(user: IUser){
    this.fetchingState=true;
    this.usersService.create(user).subscribe({
      next: (user) => {
        console.log('user created successfully',user);
        this.users.push(user);
        this.fetchingState = false;
      }, error: (error) => {
        this.error = error.error.message;
        console.log('failed to create user',error);
        this.fetchingState = false;
      }
    })
  }
  onUpdateUser(user: IUser ){
    this.fetchingState=true;
    this.usersService.update(user, user.id).subscribe({
      next: (user) => {
        console.log('user updated successfully',user);
    this.fetchingState=false;
      }, error: (error) => {
        this.error = error.error.message;
        console.log('failed to update user',error);
        this.fetchingState = false;
      }
    })
  }
}
