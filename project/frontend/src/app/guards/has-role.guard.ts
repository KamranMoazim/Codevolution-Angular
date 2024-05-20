import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../enums/role';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

// export const hasRoleGuard: CanActivateFn = (route, state) => {
//   return true;
// };


export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userRole: Role = inject(AuthService).getUserRole();
  const expectedRoles: Role[] = route.data['roles'];

  const hasRole: boolean = expectedRoles.some((role) => userRole === role);

  return hasRole || router.navigate(['unauthorized']);
};
