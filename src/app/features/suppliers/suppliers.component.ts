import { Component } from '@angular/core';
import { SuppliersService } from './suppliers.service';
import { type ISuppliers } from './suppliers.model';
import { FormsModule } from '@angular/forms';
import { CreateSupplierModalComponent } from './components/create-supplier-modal/create-supplier-modal.component';
import { IconsModule } from '../../shared/icons/icons.module';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    FormsModule,
    CreateSupplierModalComponent,
    IconsModule,
    TableComponent,
  ],
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent {
  isLoading = false;
  emptySup: ISuppliers[] = [];
  suppliers!: ISuppliers[];
  tableHeaders = ['id', 'name', 'email', 'phone', 'address'];
  constructor(private suppliersService: SuppliersService) {}

  onCreateSupplier(supplier: ISuppliers) {
    this.isLoading = true;
    this.suppliersService.create(supplier).subscribe((supplier) => {
      this.isLoading = false;
      this.suppliers.push(supplier);
      console.log(supplier);
    });
  }

  ngOnInit() {
    this.suppliersService.getAll().subscribe((data) => {
      this.suppliers = data;
    });
  }
}
