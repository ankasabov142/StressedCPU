import { Component, HostListener } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private cartItems: number = 0;
  private favItems: number = 0;
  private screenWidth: number = window.innerWidth;

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  get getCartItems(): number | null {
    return this.cartItems === 0
      ? null
      : this.cartItems;
  }

  get getFavItems(): number | null {
    return this.favItems === 0
      ? null
      : this.favItems;
  }

  get isMobile(): boolean {
    return this.screenWidth < 1000;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.cartItems = Math.round(Math.random() * 10); //todo
    this.favItems = Math.round(Math.random() * 10); //todo
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
