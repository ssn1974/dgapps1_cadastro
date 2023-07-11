import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
    ){}

  canActivate() {
    if (this.loginService.usuarioLogado()){
      this.router.navigate(['home']);
      return false;      
    }
    else      
      return true;

  }
}
