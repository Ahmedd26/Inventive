import { IconsModule } from './../../../../shared/icons/icons.module';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-order-type',
  standalone: true,
  imports: [RouterLink, IconsModule],
  templateUrl: './select-order-type.component.html',
})
export class SelectOrderTypeComponent {}
