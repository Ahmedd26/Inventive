import { RouterLink } from '@angular/router';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { IconsModule } from '../../../../icons/icons.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, IconsModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements AfterViewInit {
  @Input({ required: true }) menuId!: string | number;
  @Output() edit = new EventEmitter();

  update(id: number) {
    this.edit.emit(id);
  }
  ngAfterViewInit() {
    initFlowbite();
  }
}
