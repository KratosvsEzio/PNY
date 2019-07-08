import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthData } from '../Model/auth-data.model';
import { Subject, Observable } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { MessageSocketService } from '../Service/message-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuth = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  private signUpURL = 'http://127.0.0.1:4000/api/user/signup';
  private loginURL = 'http://127.0.0.1:4000/api/user/login';
  private updateURL = 'http://127.0.0.1:4000/api/user';

  private currentUserUpdated = new Subject<{
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionStorageService,
    private messageSocketService: MessageSocketService,
    ) { }

  // get updated current user
  getCurrentUser() {
    return this.currentUserUpdated.asObservable();
  }

  getUser() {
    return this.sessionService.retrieve('currentUser');
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  creatUser(user: AuthData) {
    const authData: AuthData = user;
    return this.http.post<{message: string}>(this.signUpURL, authData);
  }

  loginUser( email: string, password: string ) {
    this.http.post<any>(this.loginURL, {email, password})
      .subscribe( response => {
        const token = response.token;
        const user = response.user;
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.token = token;
        if (token) {
          this.authStatusListener.next(true);
          this.isAuth = true;
          const now = new Date();
          const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, user, expirationDate);
          this.router.navigate(['/myapp']);
        }
      });
  }

  updateUser(userData: any) {
    if (userData.image) {
      const formData = new FormData();
      formData.append('image', userData.image);

      this.http.put<{message: string, user: any}>(this.updateURL + '/' + this.sessionService.retrieve('currentUser').userId,
        formData)
      .subscribe( response => {
        console.log(response.user.profileImage);
        this.http.post('http://127.0.0.1:4000/api/chat' + '/' + this.sessionService.retrieve('currentUser').userId,
        {profileImagePath: response.user.profileImage})
        .subscribe( result => {
          console.log(result);
          this.messageSocketService.updateChatParticipants();
        });

        this.currentUserUpdated.next(response.user);
        this.sessionService.store('currentUser', response.user);
      });
    }
    if (userData.userName) {
      this.http.put<{message: string, user: any}>(this.updateURL + '/' + this.sessionService.retrieve('currentUser').userId,
        { userName: userData.userName})
      .subscribe( response => {
        console.log(response);
        this.http.post('http://127.0.0.1:4000/api/chat' + '/' + this.sessionService.retrieve('currentUser').userId,
          {userName: userData.userName})
        .subscribe( result => {
          console.log(result);
          this.messageSocketService.updateChatParticipants();
        });
        this.currentUserUpdated.next(response.user);
        this.sessionService.store('currentUser', response.user );
      });
    }
    if (userData.about) {
      this.http.put<{message: string, user: any}>(this.updateURL + '/' + this.sessionService.retrieve('currentUser').userId,
        { about: userData.about})
      .subscribe( response => {
        console.log(response);
        this.http.post('http://127.0.0.1:4000/api/chat' + '/' + this.sessionService.retrieve('currentUser').userId,
          {about: userData.about})
        .subscribe( result => {
          console.log(result);
          this.messageSocketService.updateChatParticipants();
        });

        this.currentUserUpdated.next(response.user);
        this.sessionService.store('currentUser', response.user );
      });
    }
  }

  autoAuth() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return ;
    }
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime() ;
    console.log(authInformation, expiresIn);
    if ( expiresIn > 0 ) {
      this.token = authInformation.token;
      this.isAuth = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log('set Timer Duration' , duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string, user: any, expirationDate: Date) {
    this.sessionService.store('token', token);
    this.sessionService.store('currentUser', user);
    this.currentUserUpdated.next(user);
    this.sessionService.store('expiration', expirationDate.toISOString());
  }

  private getAuthData() {
    const token = this.sessionService.retrieve('token');
    const expiration = this.sessionService.retrieve('expiration');
    if ( !token || !expiration) {
      return;
    }
    return {
      token,
      expiration: new Date( expiration )
    };
  }

  private clearAuthData() {
    this.sessionService.clear('token');
    this.sessionService.clear('expiration');
  }
}
