import { ActivatedRoute } from '@angular/router';
import { SuppliersService } from './../suppliers.service';
import { Component, OnInit } from '@angular/core';
import { type ISupplier } from '../suppliers.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-show-supplier',
  standalone: true,
  imports: [LoadingComponent],
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
      error: (error) => {
        this.error = error.error.message;
        this.fetchingState = false;
      },
    });
  }
}
