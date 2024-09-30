import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validator/passwordConfirmationValidator';
import { trimmedPatternValidator } from '../../validator/trimmedPatternValidator';
import type { RegistrationData } from '../../models/auth.model';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { ErrorToastComponent } from '../../../../shared/components/error-toast/error-toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LoadingComponent,
    ErrorToastComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  formValues = output<RegistrationData>();
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        trimmedPatternValidator(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        confirmPasswordValidator,
      ]),
      rememberMe: new FormControl(false),
    });
  }

  getControl(controlName: string) {
    return this.registerForm.get(controlName);
  }

  handleRegisterSubmit() {
    if (this.registerForm.valid) {
      const registrationData: RegistrationData = {
        name: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        password_confirmation: this.registerForm.value.confirmPassword,
        rememberMe: this.registerForm.value.rememberMe,
        role_id: 1,
      };
      this.isLoading = true;

      this.authService.register(registrationData).subscribe(
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
      this.registerForm.markAllAsTouched();
    }
  }

  onResetString() {
    this.errorMessage = null;
  }
}
