import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewChatService {
  private flagNewChat = new BehaviorSubject<boolean>(false);
  currentFlagNewChat = this.flagNewChat.asObservable();

  constructor() { }

  changeflagNewChat(status: boolean) {
    this.flagNewChat.next(status);
  }
}
