import { Component } from '@angular/core';
import IGame from 'src/app/interfaces/IGame';
import { UserService } from 'src/app/user/user.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  private _games?: IGame[]

  get games(): IGame[] | undefined {
    return this._games;
  }

  get isAdmin(): boolean{
    return this.userService.isAdmin;
  }

  isProductInCart(gameId: string): boolean {
    return this.userService.isProductInCart(gameId);
  }

  getGenres(game: IGame): string {
    return game?.genres.map(g => g.name).join(', ') || ''
  }

  constructor(private gameService: GameService, private userService: UserService) { }

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe({
      next: (value: IGame[]) => {
        this._games = value;
      }
    })
  }

  addProductToCart(gameId: string) {
    this.userService.addProductToCart({ gameId });
  }
}
