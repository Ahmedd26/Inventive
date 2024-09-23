import { SuppliersService } from './suppliers.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent {
  constructor(private suppliersService: SuppliersService) {}
}
