import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  // console.log("called")
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ? { 'misMatch': true } : null;
}
