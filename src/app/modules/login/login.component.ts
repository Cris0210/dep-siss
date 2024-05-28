import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from 'src/app/core/services/auth/auth-google.service';
import { PrimeModule } from 'src/app/prime.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PrimeModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit {
  public userName: string = '';

  constructor(private _authGoogleServie: AuthGoogleService) {}
  ngOnInit(): void {
    this._authGoogleServie.handleLoginCallback();
  }

  public login() {
    this._authGoogleServie.login();
  }

  public logout() {
    this._authGoogleServie.logout();
  }

  public isLogin(): boolean {
    if (this._authGoogleServie.getProfile()) {
      this.userName = this._authGoogleServie.getProfile()['name'];
      return true;
    }
    return false;
  }
}