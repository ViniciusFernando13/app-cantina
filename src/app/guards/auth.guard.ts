import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Método constructor
   *
   * @param auth
   */
  constructor(public auth: AuthService, public router: Router) {}

  /**
   * Proteje a rota
   *
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('auth-user')===null) {
      this.router.navigate(['/login']);
      return false;
    } else return true;
  }
}

// End of file
