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
  
  onSupplierCreated(event: { supplier: ISupplier, file: File | null }) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', event.supplier.name);
    formData.append('email', event.supplier.email);
    formData.append('phone', event.supplier.phone);
    formData.append('address', event.supplier.address);
    if (event.file) {
      formData.append('image', event.file);
      console.log('File appended:', event.file);
  } else {
      console.error('No file selected');
  }

    this.suppliersService.create(formData).subscribe({
        next: (supplier) => {
            this.isLoading = false;
            this.suppliers.push(supplier);
            console.log('Supplier created:', supplier);
        },
        error: (error) => {
            this.isLoading = false;
            console.error('Error creating supplier:', error);
        }
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
      console.log(data)
    });
  }
}
