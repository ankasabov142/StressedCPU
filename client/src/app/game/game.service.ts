import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import IGame from '../interfaces/IGame';

const URL = environment.API_URL + "/games";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _games?: IGame[];

  constructor(private http: HttpClient, private userService: UserService) { }

  private handleError(err: HttpErrorResponse): void {
    console.error(err);
    alert(err.error.message || err.message);
  }

  getAllGames(): Observable<IGame[]> {
    return this.http.get<IGame[]>(URL).pipe(catchError((err) => {
      this.handleError(err);
      return [];
    }));
  }

  getGameById(gameId: string): Observable<IGame> {
    return this.http.get<IGame>(`${URL}/${gameId}`).pipe(catchError((err) => {
      this.handleError(err);
      return [];
    }));
  }
}
