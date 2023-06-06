import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GameService } from 'src/app/game/game.service';
import IGame from 'src/app/interfaces/IGame';
import { AdminService } from '../admin.service';

import { GameFormDialogComponent } from './game-form-dialog/game-form-dialog.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  query: string = '';
  isLoading: boolean = false;

  get isQueryEmpty(): boolean {
    return this.query.trim().length === 0;
  }

  constructor(public dialog: MatDialog, private adminService: AdminService, private gameService: GameService) { }

  openDialog(): void {
    if (this.isQueryEmpty) {
      this.dialog.open(GameFormDialogComponent, {
        data: {
          title: 'New Game',
          submit: (body: IGame) => {
            this.isLoading = true;

            this.adminService.postGame(body).subscribe({
              next: (value: IGame) => {
                console.log(value)
                this.dialog.closeAll();
              },
              error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert(err.error.message || 'An error ocurred');
              },
              complete: () => {
                this.isLoading = false;
              }
            })
          }
        }
      });
    } else {
      const gameId = this.query.trim();
      this.gameService.getGameById(gameId).subscribe({
        next: (game: IGame) => {
          this.dialog.open(GameFormDialogComponent, {
            data: {
              title: 'Edit ' + this.toString(game),
              game,
              submit: (body: IGame) => {
                this.isLoading = true;

                this.adminService.editGame(gameId, body).subscribe({
                  next: (value: IGame) => {
                    console.log(value)
                    this.dialog.closeAll();
                  },
                  error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                    alert(err.error.message || 'An error ocurred');
                  },
                  complete: () => {
                    this.isLoading = false;
                  }
                })
              }
            },
          });
        },
        error: (err) => {
          alert(err.error.message || `Could not find game with ID ${gameId}`);
        }
      })
    }
  }

  toString(game: IGame): string {
    return `Game "${game.name}" #${game._id}`
  }
}
