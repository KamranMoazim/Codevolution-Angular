import { ValidatorFn, AbstractControl } from '@angular/forms';

// export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
//   const forbidden = /admin/.test(control.value);
//   return forbidden ? { 'forbiddenName': { value: control.value } } : null;
// };

export function ForbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}
