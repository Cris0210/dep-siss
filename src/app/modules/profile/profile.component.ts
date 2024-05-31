import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { AuthGoogleService } from 'src/app/core/services/auth/auth-google.service';
import { UserService } from 'src/app/core/services/user/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userData: User = {} as User;
  public formUserProfile: FormGroup;
  public submitted: boolean = false;
  constructor(
    private _userService: UserService,
    private _authService: AuthGoogleService
  ) {
    this.formUserProfile = this.createFormGroup();
  }
  ngOnInit(): void {
    this.getUserAccountData();
  }
  public saveUserData() {
    this.submitted = true;
    if (this.formUserProfile.valid) {
      this.updateUserData();
    }
  }
  private createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }
  private async getUserAccountData() {
    const data = await this._userService.getUserById(
      this._authService.getProfile().sub
    );
    if (data) {
      this.userData = data;
      this.setFormValue(data);
    }
  }
  private updateUserData() {
    this.formUserProfile.disable();
    const data: User = {
      ...this.formUserProfile.value,
    };
    this._userService
      .updateUser(data, this.userData.subId || '')
      .pipe(
        tap(() => {
          this.formUserProfile.enable();
        })
      )
      .subscribe();
  }
  private setFormValue(data: any) {
    this.formUserProfile.patchValue(data);
  }
}