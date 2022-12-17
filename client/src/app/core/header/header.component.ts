import { Component, HostListener } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private screenWidth: number = window.innerWidth;

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  get getCartItemsCount(): number | null {
    const count = this.userService.cart?.products.reduce((total, product) => total + product.quantity, 0);
    const res = count === 0 ? null : count;

    return res || null;
  }

  get getFavItemsCount(): number | null {
    return null;
  }

  get isMobile(): boolean {
    return this.screenWidth < 1000;
  }

  constructor(private userService: UserService) { }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
