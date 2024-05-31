import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import { AuthGoogleService } from '../../services/auth/auth-google.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public userData: User = {} as User;

  constructor(
    private _userService: UserService,
    private _authService: AuthGoogleService
  ) {}

  ngOnInit(): void {
    this.getUserAccountData();
  }

  private async getUserAccountData() {
    const data = await this._userService.getUserById(
      this._authService.getProfile().sub
    );
    if (data) {
      this.userData = data;
    }
  }
}