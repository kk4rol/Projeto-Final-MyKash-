import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);

  const usuarioLogado = localStorage.getItem('mykash-usuario-logado');

  if (usuarioLogado) {
    return true;
  }

  return router.createUrlTree(['/login']);

};
