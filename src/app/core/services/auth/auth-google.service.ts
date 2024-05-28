import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../user/user.service';
import { GoogleAccountData } from '../../interfaces/google-account-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  constructor(
    private _oauthService: OAuthService,
    private _userService: UserService
  ) {
    this.initLogin();
  }

  private initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      //!change to true for deploy
      strictDiscoveryDocumentValidation: false,
      clientId: environment.authClientId,
      redirectUri: window.location.origin + '/login',
      scope: 'openid profile email',
    };

    this._oauthService.configure(config);
    this._oauthService.setupAutomaticSilentRefresh();
    this._oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public async login() {
    this._oauthService.initLoginFlow();
  }

  public logout() {
    this._oauthService.logOut();
  }

  public getProfile(): GoogleAccountData {
    return this._oauthService.getIdentityClaims() as GoogleAccountData;
  }

  public async handleLoginCallback() {
    await this._oauthService.loadDiscoveryDocumentAndTryLogin();
    if (this._oauthService.hasValidAccessToken()) {
      const profile = this.getProfile();
      await this._userService.createUser(profile);
    }
  }
}
