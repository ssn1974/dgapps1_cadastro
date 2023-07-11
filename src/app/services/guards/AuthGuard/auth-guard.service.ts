import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate() {
    if (this.loginService.usuarioLogado()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
