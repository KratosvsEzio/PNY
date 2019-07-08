import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeChatService {

  private chatSource = new BehaviorSubject<any>(null);
  currentChat = this.chatSource.asObservable();

  constructor() { }

  changeChat(chat: any) {
    this.chatSource.next(chat);
  }
}
