import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../../Service/chat.service';
import { Chat } from '../../../Model/chat.model';
import { Subscription } from 'rxjs';
import { ChangeChatService } from 'src/app/Service/change-chat.service';
import { AuthService } from 'src/app/login-register/auth.service';
import { MessageSocketService } from 'src/app/Service/message-socket.service';
import * as dateDiff from 'date-diff';

@Component({
  selector: 'app-new-chat-main',
  templateUrl: './new-chat-main.component.html',
  styleUrls: ['./new-chat-main.component.css']
})
export class NewChatMainComponent implements OnInit, OnDestroy {

  chats: Chat[] = [];
  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };
  private chatsubs: Subscription;
  perviousAlpha = '';

  constructor(
    private chatService: ChatService,
    private chatIdService: ChangeChatService,
    private authService: AuthService,
    private messageSocketService: MessageSocketService
  ) { }

  ngOnInit() {
    // get current user
    this.user = this.authService.getUser();
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;
    });

    // get chats
    this.chatService.getChats();
    this.chatsubs = this.chatService.getChatUpdateListener()
    .subscribe((chats: Chat[]) => {
      // sorting chat array
      this.chats = chats.sort( (a, b) => {
        let x: string;
        let y: string;

        for (const participant of a.participants) {
          if (participant.userId !== this.user.userId) {
            x = participant.name;
          }
        }
        for (const participant of b.participants) {
          if (participant.userId !== this.user.userId) {
            y = participant.name;
          }
        }

        if (x > y) {
          return 1;
        } else if (y > x) {
          return -1;
        } else {
          return 0;
        }
      } );
    });
    this.messageSocketService.getUpdateChatParticipants()
    .subscribe( () => {
      this.chatService.getChats();
    });

  }

  // set current chat
  newChat(newChat: any) {
    this.chatService.getChats();
    this.chatIdService.changeChat(newChat);
  }

  // check frequently contacted chats
  frequently(d: Date) {
    const newDate = new Date();
    d = new Date(d);
    newDate.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    const diff = Math.floor(new dateDiff(newDate, new Date(d)).days());
    return diff;
  }

  alphabet(participants: any) {
    for (const participant of participants) {
      if (participant.userId !== this.user.userId) {
        if (participant.name.charCodeAt(0) >= 65 && participant.name.charCodeAt(0) <= 90) {
          this.perviousAlpha = participant.name.charAt(0);
        } else {
          this.perviousAlpha = '#';
        }
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.chatsubs.unsubscribe();
  }

}
