import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../users/users.model';
import { API } from '../../../../core/utils/constants.utils';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { IconsModule } from '../../../../shared/icons/icons.module';
import { CommonModule } from '@angular/common';
import { ActivityLogsService } from '../../../../core/services/activity-logs-service/activity-logs.service';

@Component({
  selector: 'app-latest-transactions',
  standalone: true,
  imports: [LoadingComponent, PaginationComponent, IconsModule, CommonModule],
  templateUrl: './latest-transactions.component.html',
})
export class LatestTransactionsComponent implements OnInit {
  isLoading = false;
  user!: IUser;
  logs!: any[];
  constructor(private activityLogsService: ActivityLogsService) {}
  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedLogs: any[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;
  updatePaginatedLogs(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLogs = this.logs.slice(startIndex, endIndex);
    console.log(this.paginatedLogs);
  }

  onPageChange(page: number) {
    this.updatePaginatedLogs(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//
  ngOnInit(): void {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('userData')!)?.user;
    if (this.user.id) {
      this.activityLogsService.get(this.user.id).subscribe({
        next: (data: any) => {
          this.logs = data.reverse() as any[];
          this.isLoading = false;
          // ** ---------- PAGINATION ---------- **//
          this.totalItems = this.logs.length;
          this.updatePaginatedLogs(1);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error(error.message, error.status);
        },
      });
    }
  }
}

export interface ILog {
  id: number;
  log_name: string;
  description: string;
  subject_type: string;
  event: string;
  subject_id: number;
  causer_type: string;
  causer_id: number;
  properties: IProperties;
  batch_uuid: any;
  created_at: string;
  updated_at: string;
  causer: ICauser;
  subject: ISubject;
}

export interface IProperties {
  old: any[];
  attributes: any[];
}

export interface ICauser {
  id: number;
  name: string;
  email: string;
  email_verified_at: any;
  role_id: number;
  image: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}

export interface ISubject {
  id: number;
  name: string;
  email: string;
  email_verified_at: any;
  role_id: number;
  image: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
}
