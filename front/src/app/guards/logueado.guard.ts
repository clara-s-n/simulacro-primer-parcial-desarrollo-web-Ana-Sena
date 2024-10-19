import {CanActivateFn, Router} from '@angular/router';
import {ApiRestService} from '../services/api-rest.service';
import {inject} from '@angular/core';

export const logueadoGuard: CanActivateFn = (route, state) => {
  const apiService: ApiRestService = inject(ApiRestService);
  const router: Router = inject(Router);

  if(apiService.isValidUser()){
    return true;
  }

  router.navigate(['/auth/login']);
  return false;

};
