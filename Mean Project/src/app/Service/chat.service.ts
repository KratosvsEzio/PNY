import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../Model/chat.model';
import { AuthService } from '../login-register/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatURL = 'http://127.0.0.1:4000/api/chat';

  private chats: Chat[] = [];
  private chatsUpdated = new Subject<Chat[]>();

  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

  // create a new chat
  creatChat( email: { email: string; } ) {
    this.http.post<{message: string}>(this.chatURL, email)
      .subscribe(response => {
        console.log(response);
        this.getChats();
      });

  }

  // get updated chats array
  getChatUpdateListener() {
    return this.chatsUpdated.asObservable();
  }

  // get all chats
  getChats() {
    this.user = this.authService.getUser();
    this.http.get<{ message: string; chats: any }>(this.chatURL + '/' + this.user.userId)
      .subscribe(transformedChats => {
        this.chats = transformedChats.chats;
        this.chatsUpdated.next([...this.chats]);
      });
  }

  // send message
  sendMessage(message: { userName: string, userId: string, message: string}, chatId: string) {
    this.http.put<{message: string}>(this.chatURL + '/' + chatId, message)
      .subscribe(response => {
        // console.log(response);
        this.getChats();
      });
  }
}
