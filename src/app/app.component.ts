import { AuthService } from './core/auth/services/auth.service';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { BodyContainerComponent } from './shared/components/body-container/body-container.component';
import { DarkModeService } from './core/services/dark-mode-service/dark-mode.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent,
    TopBarComponent,
    BodyContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth = false;
  private userSub!: Subscription;

  constructor(
    private darkModeService: DarkModeService,
    private authService: AuthService
  ) {}

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.getCurrentMode();
  }
  ngOnInit(): void {
    initFlowbite();
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuth = !!user)
    );
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
