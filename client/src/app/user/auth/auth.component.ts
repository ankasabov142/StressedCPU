import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  get isLoading(): boolean {
    return this.userService.isLoading;
  }
  
  constructor(private userService: UserService) { }
}
