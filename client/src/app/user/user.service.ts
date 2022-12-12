import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { LocalStorage } from '../injection-tokens';
import IUser from '../interfaces/IUser';

const URL = `${env.API_URL}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | undefined;
  accessToken: string | null = this.localStorage.getItem('accessToken') || null;


  get isAuth(): boolean { return Boolean(this.user); };
  get isAdmin(): boolean { return Boolean(this.user?.isAdmin); };

  constructor(
    @Inject(LocalStorage) private localStorage: Window['localStorage'],
    private http: HttpClient
  ) {
    this.accessToken = this.localStorage.getItem('accessToken');
  }

  get authHeaderOptions() {
    return {
      headers: new HttpHeaders({ 'x-authorization': this.accessToken || '' })
    }
  }

  private handleUserAuth(user: IUser, isNewUser = false): void {
    this.localStorage.setItem('accessToken', user.accessToken);
    this.accessToken = user.accessToken;
    this.user = user;
  }

  private handleError(err: HttpErrorResponse): void {
    console.error(err);
    alert(err.error.message);
  }

  persistedLogin(): void {
    if (!this.accessToken) {
      return;
    }

    this.http.post<IUser>(`${URL}/login/token`, { accessToken: this.accessToken }, this.authHeaderOptions).subscribe({
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
    this.http.post<IUser>(`${URL}/login`, body, this.authHeaderOptions).subscribe({
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
    this.http.post<IUser>(`${URL}/register`, body, this.authHeaderOptions).subscribe({
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
    this.http.post<IUser>(`${URL}/edit-profile`, body, this.authHeaderOptions).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user);
      },
      error: (err) => {
        this.logout();
        this.handleError(err);
      }
    })
  }
}
