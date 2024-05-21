import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../enums/role';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// export const hasRoleGuard: CanActivateFn = (route, state) => {
//   return true;
// };


export const hasRoleGuard: CanActivateFn = (route, state) => {


  const router: Router = inject(Router);
  const userRole: Role = inject(AuthService).getUserRole();
  const expectedRoles: Role[] = route.data['roles'];

  if (!expectedRoles) {
    const snackBar: MatSnackBar = inject(MatSnackBar);
    snackBar.open("Please login", 'Close', {
      duration: 2000,
    });
  }

  const hasRole: boolean = expectedRoles.some((role) => userRole === role);

  if (!hasRole) {
    const snackBar: MatSnackBar = inject(MatSnackBar);
    snackBar.open("You are not authorized to access this Resource", 'Close', {
      duration: 2000,
    });
  }

  return hasRole || router.navigate(['home']);
};
