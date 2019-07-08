import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ChatService } from '../../../Service/chat.service';
import { Chat } from '../../../Model/chat.model';
import { Subscription } from 'rxjs';
import { ChangeChatService } from '../../../Service/change-chat.service';
import { AuthService } from '../../../login-register/auth.service';
import { MessageSocketService } from '../../../Service/message-socket.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-aside-main-component',
  templateUrl: './aside-main-component.component.html',
  styleUrls: ['./aside-main-component.component.css']
})
export class AsideMainComponentComponent implements OnInit, OnDestroy {

  chats: Chat[] = [];
  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };
  private chatsubs: Subscription;

  constructor(
    private chatService: ChatService,
    private chatIdService: ChangeChatService,
    private authService: AuthService,
    private messageSocketService: MessageSocketService
    ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;
    });
    this.chatService.getChats();
    this.chatsubs = this.chatService.getChatUpdateListener()
    .subscribe((chats: Chat[]) => {
      this.chats = chats;
    });

    this.messageSocketService.getUpdateChatParticipants()
    .subscribe( result => {
      this.chatService.getChats();
    });
  }

  ngOnDestroy() {
    this.chatsubs.unsubscribe();
  }

  newChat(newChat: any) {
    this.chatService.getChats();
    this.chatIdService.changeChat(newChat);
  }
}
