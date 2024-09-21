import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control || !control.parent) {
    return null;
  }

  const password = control.parent.get('password');
  const confirmPassword = control;

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordsDontMatch: true };
  }

  return null;
}
