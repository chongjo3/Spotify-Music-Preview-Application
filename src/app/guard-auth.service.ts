import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class GuardAuthService implements CanActivate {

  // Initialization

  constructor(
    private _AuthService: AuthService,
    private router: Router
  ) { }

  // Methods

  canActivate(): boolean {

    if (!this._AuthService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}