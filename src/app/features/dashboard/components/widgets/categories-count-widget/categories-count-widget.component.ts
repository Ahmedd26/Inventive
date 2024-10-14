import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-count-widget',
  standalone: true,
  imports: [],
  templateUrl: './categories-count-widget.component.html',
})
export class CategoriesCountWidgetComponent {
  @Input({ required: true }) value!: number | string;
}
