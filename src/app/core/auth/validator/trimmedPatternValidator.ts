import { AbstractControl, ValidatorFn } from '@angular/forms';

export function trimmedPatternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const trimmedValue = control.value.trim();
      return pattern.test(trimmedValue)
        ? null
        : { pattern: { value: control.value } };
    }
    return null;
  };
}
