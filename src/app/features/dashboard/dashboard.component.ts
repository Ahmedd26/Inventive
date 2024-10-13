import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
