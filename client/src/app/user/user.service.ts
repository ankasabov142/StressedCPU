import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, catchError, pipe } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { LocalStorage } from '../injection-tokens';
import IAddress from '../interfaces/IAddress';
import IOrder from '../interfaces/IOrder';
import IUser from '../interfaces/IUser';

const USER_URL = `${env.API_URL}/user`;
const ADDRESS_URL = `${env.API_URL}/addresses`;
const ORDERS_URL = `${env.API_URL}/orders`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | undefined;
  accessToken: string | null = this.localStorage.getItem('accessToken') || null;


  get isAuth(): boolean { return Boolean(this.user); };
  get isAdmin(): boolean { return Boolean(this.user?.isAdmin); };

  get authHeaderOptions() {
    return {
      headers: new HttpHeaders({ 'x-authorization': this.accessToken || '' })
    }
  }

  constructor(
    @Inject(LocalStorage) private localStorage: Window['localStorage'],
    private http: HttpClient
  ) {
    this.accessToken = this.localStorage.getItem('accessToken');
  }

  private handleUserAuth(user: IUser, isNewUser = false): void {
    this.localStorage.setItem('accessToken', user.accessToken);
    this.accessToken = user.accessToken;
    this.user = user;
  }

  private handleError(err: HttpErrorResponse): void {
    console.error(err);
    alert(err.error.message || err.message);
  }


  // Auth

  persistedLogin(): void {
    if (!this.accessToken) {
      return;
    }

    this.http.post<IUser>(`${USER_URL}/login/token`, { accessToken: this.accessToken }, this.authHeaderOptions).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user);
      },
      error: (err) => {
        this.logout();
        this.handleError(err);
      }
    })
  }

  login(body: { email: string, password: string }): void {
    this.http.post<IUser>(`${USER_URL}/login`, body, this.authHeaderOptions).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user);
      },
      error: (err) => {
        this.logout();
        this.handleError(err);
      }
    })
  }

  register(body: {
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    password: string,
    repassword: string,
  }): void {
    this.http.post<IUser>(`${USER_URL}/register`, body, this.authHeaderOptions).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user);
      },
      error: (err) => {
        this.logout();
        this.handleError(err);
      }
    })
  }

  logout(): void {
    this.localStorage.removeItem('accessToken');
    this.accessToken = null;
    this.user = undefined;
  }

  editProfile(body: { username: string, imageUrl: string | undefined, password: string }): void {
    this.http.post<IUser>(`${USER_URL}/edit-profile`, body, this.authHeaderOptions).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user);
      },
      error: (err) => {
        this.logout();
        this.handleError(err);
      }
    })
  }


  // Addresses

  getAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(ADDRESS_URL, this.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err);
        return [];
      }));
  }

  postAddress(body: IAddress): Observable<IAddress[]> {
    return this.http.post<IAddress[]>(ADDRESS_URL, body, this.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err);
        return [];
      }));
  }

  editAddress(addressId: string): Observable<IAddress[]> {
    return this.http.put<IAddress[]>(`${ADDRESS_URL}/${addressId}`, this.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err);
        return [];
      }));
  }

  deleteAddress(addressId: string): Observable<IAddress[]> {
    return this.http.delete<IAddress[]>(`${ADDRESS_URL}/${addressId}`, this.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err);
        return [];
      }));
  }


  // Orders

  getUserOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${ORDERS_URL}/user`, this.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err);
        return [];
      }));
  }

  postOrder(body: IOrder): Observable<IOrder[]> {
    return this.http.post<IOrder[]>(ORDERS_URL, body, this.authHeaderOptions)
      .pipe(catchError((err) => {
        this.handleError(err);
        return [];
      }));
  }
}
