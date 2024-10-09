import { ActivatedRoute, RouterLink } from '@angular/router';
import { SuppliersService } from './../suppliers.service';
import { Component, OnInit } from '@angular/core';
import { type ISupplier } from '../suppliers.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IconsModule } from '../../../shared/icons/icons.module';

@Component({
  selector: 'app-show-supplier',
  standalone: true,
  imports: [LoadingComponent, IconsModule, RouterLink],
  templateUrl: './show-supplier.component.html',
})
export class ShowSupplierComponent implements OnInit {
  fetchingState = false;
  supplier!: ISupplier;
  error: any = null;
  constructor(
    private suppliersService: SuppliersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeId = this.activatedRoute.snapshot.params['id'];
    this.fetchingState = true;
    this.suppliersService.get(+routeId).subscribe({
      next: (supplier) => {
        this.supplier = supplier as ISupplier;
        this.fetchingState = false;
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 404:
            this.error = 'Resource can not be found.';
            break;
          case 401:
            this.error =
              'Unauthenticated. Please log in to access this resource.';
            break;
          case 403:
            this.error = 'Unauthorized access.';
            break;
          case 408:
            this.error = 'Bad connection, please try again later.';
            break;
          case 429:
            this.error = 'Too many requests. Try again later.';
            break;
          case 500:
            this.error = 'Internal Server Error.';
            break;
          default:
            this.error = 'An error occurred while fetching the supplier.';
            break;
        }
        this.fetchingState = false;
      },
    });
  }
}
