import { Component } from '@angular/core';
import IUser from 'src/app/interfaces/IUser';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  constructor(private userService: UserService) { }

  get user(): IUser { return this.userService.user!; };
}
