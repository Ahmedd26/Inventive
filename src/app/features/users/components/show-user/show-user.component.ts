import { UsersService } from './../../users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../users.model';
import { ActivityLogsService } from '../../../../core/services/activity-logs-service/activity-logs.service';
import { ILog } from '../../../profile/components/latest-transactions/latest-transactions.component';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { UserLogsComponent } from './user-logs/user-logs.component';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [IconsModule, RouterLink, UserLogsComponent],
  templateUrl: './show-user.component.html',
})
export class ShowUserComponent implements OnInit {
  isLoading = false;
  user!: IUser;
  logs!: ILog[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private activityLogsService: ActivityLogsService,
  ) {}

  getActivityLogs(id: number) {
    this.activityLogsService.get(id).subscribe({
      next: (logs) => {
        this.logs = logs as ILog[];
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.usersService.get(+routeId).subscribe({
      next: (user: IUser) => {
        this.user = user;
        this.isLoading = false;
        if (user.id) {
          this.getActivityLogs(user.id);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
