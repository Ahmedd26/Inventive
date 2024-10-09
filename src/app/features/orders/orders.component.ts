import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {}
