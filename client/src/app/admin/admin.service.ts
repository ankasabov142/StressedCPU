import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ICategory from '../interfaces/ICategory';
import IDiscount from '../interfaces/IDiscount';
import IGame from '../interfaces/IGame';
import IGenre from '../interfaces/IGenre';
import IOrder from '../interfaces/IOrder';
import ITag from '../interfaces/ITag';
import { UserService } from '../user/user.service';

const ORDER_URL = environment.API_URL + "/orders";
const GAME_URL = environment.API_URL + "/games";
const CATEGORY_URL = environment.API_URL + "/categories";
const GENRE_URL = environment.API_URL + "/genres";
const TAG_URL = environment.API_URL + "/tags";
const DISCOUNT_URL = environment.API_URL + "/discounts";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  categories?: ICategory[] = [];
  genres?: IGenre[];
  tags?: ITag[];
  discounts?: IDiscount[];

  constructor(private http: HttpClient, private userService: UserService) {
    this.initData();
  }

  private handleError(err: HttpErrorResponse): void {
    console.error(err);
    alert(err.error.message || err.message);
  }

  private initData(): void {
    this.getCategories();
    this.getGenres();
    this.getTags();
    this.getDiscounts();
  }

  // orders
  getOrders(statuses: number[]): Observable<IOrder[]> {
    const query = `?${statuses.map(s => `status[]=${s}&`).join('')}`;

    return this.http.get<IOrder[]>(ORDER_URL + query, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [];
      }))
  }

  confirmOrder(orderId: string): Observable<boolean> {
    return this.http.post<boolean>(`${ORDER_URL}/confirm/${orderId}`, {}, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [false];
      }))
  }

  sendOrder(orderId: string): Observable<boolean> {
    return this.http.post<boolean>(`${ORDER_URL}/send/${orderId}`, {}, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [false];
      }))
  }

  fulfillOrder(orderId: string): Observable<boolean> {
    return this.http.post<boolean>(`${ORDER_URL}/fulfill/${orderId}`, {}, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [false];
      }))
  }

  cancelOrder(orderId: string): Observable<boolean> {
    return this.http.post<boolean>(`${ORDER_URL}/cancel/${orderId}`, {}, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [false];
      }))
  }

  returnOrder(orderId: string): Observable<boolean> {
    return this.http.post<boolean>(`${ORDER_URL}/return/${orderId}`, {}, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [false];
      }))
  }

  // games
  editGame(gameId: string, body: IGame) {
    return this.http.put<IGame>(`${GAME_URL}/${gameId}`, body, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [];
      }))
  }
  postGame(body: IGame): Observable<IGame> {
    return this.http.post<IGame>(GAME_URL, body, this.userService.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err)
        return [];
      }))
  }

  // categories
  getCategories(): void {
    const current = this.categories;
    this.categories = undefined;

    this.http.get<ICategory[]>(CATEGORY_URL).subscribe({
      next: (value: ICategory[]) => {
        this.categories = value;
      },
      error: (err) => {
        this.categories = current;
        this.handleError(err);
      }
    })
  }

  postCategory(body: ICategory): void {
    const current = this.categories;
    this.categories = undefined;

    this.http.post<ICategory[]>(CATEGORY_URL, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: ICategory[]) => {
          this.categories = value;
        },
        error: (err) => {
          this.categories = current;
          this.handleError(err);
        }
      })
  }

  editCategory(categoryId: string, body: ICategory): void {
    const current = this.categories;
    this.categories = undefined;

    this.http.put<ICategory[]>(`${CATEGORY_URL}/${categoryId}`, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: ICategory[]) => {
          this.categories = value;
        },
        error: (err) => {
          this.categories = current;
          this.handleError(err);
        }
      })
  }

  deleteCategory(categoryId: string): void {
    const current = this.categories;
    this.categories = undefined;

    this.http.delete<ICategory[]>(`${CATEGORY_URL}/${categoryId}`, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: ICategory[]) => {
          this.categories = value;
        },
        error: (err) => {
          this.categories = current;
          this.handleError(err);
        }
      })
  }

  // genres
  getGenres(): void {
    const current = this.genres;
    this.genres = undefined;

    this.http.get<IGenre[]>(GENRE_URL).subscribe({
      next: (value: IGenre[]) => {
        this.genres = value;
      },
      error: (err) => {
        this.genres = current;
        this.handleError(err);
      }
    })
  }

  postGenre(body: IGenre): void {
    const current = this.genres;
    this.genres = undefined;

    this.http.post<IGenre[]>(GENRE_URL, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: IGenre[]) => {
          this.genres = value;
        },
        error: (err) => {
          this.genres = current;
          this.handleError(err);
        }
      })
  }

  editGenre(genreId: string, body: IGenre): void {
    const current = this.genres;
    this.genres = undefined;

    this.http.put<IGenre[]>(`${GENRE_URL}/${genreId}`, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: IGenre[]) => {
          this.genres = value;
        },
        error: (err) => {
          this.genres = current;
          this.handleError(err);
        }
      })
  }

  deleteGenre(genreId: string): void {
    const current = this.genres;
    this.genres = undefined;

    this.http.delete<IGenre[]>(`${GENRE_URL}/${genreId}`, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: IGenre[]) => {
          this.genres = value;
        },
        error: (err) => {
          this.genres = current;
          this.handleError(err);
        }
      })
  }

  // tags
  getTags(): void {
    const current = this.tags;
    this.tags = undefined;

    this.http.get<ITag[]>(TAG_URL).subscribe({
      next: (value: ITag[]) => {
        this.tags = value;
      },
      error: (err) => {
        this.tags = current;
        this.handleError(err);
      }
    })
  }

  postTag(body: ITag): void {
    const current = this.tags;
    this.tags = undefined;

    this.http.post<ITag[]>(TAG_URL, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: ITag[]) => {
          this.tags = value;
        },
        error: (err) => {
          this.tags = current;
          this.handleError(err);
        }
      })
  }

  editTag(tagId: string, body: ITag): void {
    const current = this.tags;
    this.tags = undefined;

    this.http.put<ITag[]>(`${TAG_URL}/${tagId}`, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: ITag[]) => {
          this.tags = value;
        },
        error: (err) => {
          this.tags = current;
          this.handleError(err);
        }
      })
  }

  deleteTag(tagId: string): void {
    const current = this.tags;
    this.tags = undefined;

    this.http.delete<ITag[]>(`${TAG_URL}/${tagId}`, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: ITag[]) => {
          this.tags = value;
        },
        error: (err) => {
          this.tags = current;
          this.handleError(err);
        }
      })
  }


  // discounts
  getDiscounts(): void {
    this.discounts = undefined;

    this.http.get<IDiscount[]>(DISCOUNT_URL, this.userService.authHeaderOptions).subscribe({
      next: (value: IDiscount[]) => {
        this.discounts = value;
      },
      error: (err) => {
        this.handleError(err);
      }
    })
  }

  postDiscount(body: IDiscount): void {
    this.discounts = undefined;

    this.http.post<IDiscount[]>(DISCOUNT_URL, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: IDiscount[]) => {
          this.discounts = value;
        },
        error: (err) => {
          this.handleError(err);
        }
      })
  }

  editDiscount(discountId: string, body: IDiscount): void {
    this.discounts = undefined;

    this.http.put<IDiscount[]>(`${DISCOUNT_URL}/${discountId}`, body, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: IDiscount[]) => {
          this.discounts = value;
        },
        error: (err) => {
          this.handleError(err);
        }
      })
  }

  deleteDiscount(discountId: string): void {
    this.discounts = undefined;

    this.http.delete<IDiscount[]>(`${DISCOUNT_URL}/${discountId}`, this.userService.authHeaderOptions)
      .subscribe({
        next: (value: IDiscount[]) => {
          this.discounts = value;
        },
        error: (err) => {
          this.handleError(err);
        }
      })
  }
}
