import { Component } from '@angular/core';
import { SuppliersService } from './suppliers.service';
import { type ISuppliers } from './suppliers.model';
import { FormsModule } from '@angular/forms';
import { CreateSupplierModalComponent } from './components/create-supplier-modal/create-supplier-modal.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [FormsModule, CreateSupplierModalComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent {
  isLoading = false;
  suppliers!: ISuppliers[];

  constructor(private suppliersService: SuppliersService) { }

  onCreateSupplier(supplier: ISuppliers) {
    this.isLoading = true;
    this.suppliersService.create(supplier).subscribe((supplier) => {
      this.isLoading = false;
      this.suppliers.push(supplier);
    });
  }

  ngOnInit() {
    this.suppliersService.getAll().subscribe((data) => {
      this.suppliers = data;
      console.log(data)
    });
  }
}
