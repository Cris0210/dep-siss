import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public roles = ['CLIENTE', 'PROMOTOR', 'ADMINISTRADOR'];
  constructor(private _userService: UserService) {}
  ngOnInit(): void {
    this.getUsers();
  }
  public updateRole(subId: string, event: any) {
    this._userService.updateUserRole(event.value, subId);
  }
  private getUsers() {
    this._userService.getAllUsers().subscribe((usersData: User[]) => {
      this.users = usersData;
    });
  }
}