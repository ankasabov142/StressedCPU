import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  timeLeft: number = 4;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.logout();

    const interval = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft == 0) {
        clearInterval(interval);
        return;
      }
    }, 1000)

    setTimeout(() => {
      window.location.href = window.location.origin;
    }, 4000)
  }
}
