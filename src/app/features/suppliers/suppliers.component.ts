import { Component, OnInit } from '@angular/core';
import { SuppliersService } from './suppliers.service';
import { ISupplier } from './suppliers.model';
import { FormsModule } from '@angular/forms';
import { CreateSupplierModalComponent } from './components/create-supplier-modal/create-supplier-modal.component';
import { IconsModule } from '../../shared/icons/icons.module';
import { TableComponent } from '../../shared/components/table/table.component';
import { UpdateSupplierModalComponent } from './components/update-supplier-modal/update-supplier-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    FormsModule,
    CreateSupplierModalComponent,
    IconsModule,
    TableComponent,
    UpdateSupplierModalComponent,
    CommonModule,
    RouterLink,
    LoadingComponent,
    PaginationComponent,
  ],
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent implements OnInit {
  isLoading = false;
  suppliers: ISupplier[] = [];
  supplier: ISupplier | null = null;
  error: HttpErrorResponse | null = null;
  tableHeaders = ['id', 'name', 'email', 'phone', 'address'];

  constructor(private suppliersService: SuppliersService) {}

  //** ---------------------- START PAGINATION -------------------------- **//
  paginatedSuppliers: ISupplier[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 8;
  updatePaginatedSuppliers(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSuppliers = this.suppliers.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updatePaginatedSuppliers(page);
  }
  //** ---------------------- END PAGINATION -------------------------- **//

  ngOnInit() {
    this.isLoading = true;
    this.suppliersService.getAll().subscribe({
      next: (data: ISupplier[]) => {
        this.isLoading = false;
        this.suppliers = data;
        // ** ---------- PAGINATION ---------- **//
        this.totalItems = this.suppliers.length;
        this.updatePaginatedSuppliers(1);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }

  updateUpdatedSupplierInView(newSupplier: ISupplier) {
    const index = this.suppliers.findIndex(
      (supplier) => supplier.id === newSupplier.id,
    );
    this.suppliers[index] = newSupplier;
  }

  onSupplierCreated(event: { supplier: ISupplier; file: File | null }) {
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
      },
    });
  }

  onDeleteSupplier(id: number) {
    this.suppliersService.delete(id).subscribe({
      next: () => {
        this.suppliers = this.suppliers.filter(
          (supplier) => supplier.id !== id,
        );
        console.log('Supplier deleted:', id);
      },
      error: (error) => {
        console.error('Error deleting supplier:', error);
      },
    });
  }

  onUpdateSupplier(supplierId: number) {
    this.suppliersService.get(supplierId).subscribe((data) => {
      this.supplier = data as ISupplier;
    });
  }

  addNewSupplier(supplier: ISupplier) {
    this.suppliers.push(supplier);
  }

  onCloseModal() {
    this.supplier = null;
  }
}
