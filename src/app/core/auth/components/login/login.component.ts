import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginData } from '../../models/auth.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorToastComponent } from '../../../../shared/components/error-toast/error-toast.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ErrorToastComponent,
    LoadingComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@admin.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('P@ssw0rd', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
      ]),
      rememberMe: new FormControl(false),
    });
  }
  getControl(controlName: string) {
    return this.loginForm.get(controlName);
  }
  handleLoginSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe,
      };
      this.isLoading = true;
      this.authService.login(loginData).subscribe(
        (res) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (HttpErrorResponse) => {
          console.log(HttpErrorResponse);
          this.errorMessage = HttpErrorResponse.error.message;
          this.isLoading = false;
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  onResetString() {
    this.errorMessage = null;
  }
}
