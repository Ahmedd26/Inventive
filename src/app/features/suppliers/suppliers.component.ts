import { Component } from '@angular/core';
import { SuppliersService } from './suppliers.service';
import { type ISupplier } from './suppliers.model';
import { FormsModule } from '@angular/forms';
import { CreateSupplierModalComponent } from './components/create-supplier-modal/create-supplier-modal.component';
import { IconsModule } from '../../shared/icons/icons.module';
import { TableComponent } from '../../shared/components/table/table.component';
import { UpdateSupplierModalComponent } from './components/update-supplier-modal/update-supplier-modal.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    FormsModule,
    CreateSupplierModalComponent,
    IconsModule,
    TableComponent,
    UpdateSupplierModalComponent,
  ],
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent {
  isLoading = false;
  suppliers!: ISupplier[];
  supplier!: ISupplier | null;
  tableHeaders = ['id', 'name', 'email', 'phone', 'address'];
  constructor(private suppliersService: SuppliersService) {}

  updateUpdatedSupplierInView(newSupplier: ISupplier) {
    const index = this.suppliers.findIndex(
      (supplier) => supplier.id === newSupplier.id
    );
    this.suppliers[index] = newSupplier;
  }
  onCreateSupplier(supplier: ISupplier) {
    this.isLoading = true;
    this.suppliersService.create(supplier).subscribe((supplier) => {
      this.isLoading = false;
      this.suppliers.push(supplier);
    });
  }

  onDeleteSupplier(id: number) {
    this.suppliersService.delete(id);
  }
  onUpdateSupplier(supplierId: number) {
    this.suppliersService.get(supplierId).subscribe((data) => {
      this.supplier = data as ISupplier;
    });
  }
  onCloseModal() {
    if (this.supplier) {
      this.supplier = null;
    }
  }

  ngOnInit() {
    this.suppliersService.getAll().subscribe((data) => {
      this.suppliers = data;
    });
  }
}
