import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {

  /**
   * Método construtor
   *
   * @param auth
   */
  constructor(public auth: AuthService, public router: Router) {}

  /**
   * Quem pode ativar
   *
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('auth-user')!=null) {
        this.router.navigate(['/']);
        return false;
      } else return true;
  }
}

// End of file
