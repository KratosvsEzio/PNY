import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeChatService } from '../../Service/change-chat.service';
import { Chat } from '../../Model/chat.model';
import { MessageSocketService } from 'src/app/Service/message-socket.service';
import { AuthService } from '../../login-register/auth.service';
import { ChatService } from '../../Service/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit, OnDestroy {

  chat: Chat;

  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };

  typingData: {
    chatId: string,
    msglength: number,
    userName: string
  };
  private chatsubs: Subscription;

  constructor(
    private chatIdService: ChangeChatService,
    private messageSocketService: MessageSocketService,
    private authService: AuthService,
    private chatService: ChatService,
    ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;
    });
    this.chatIdService.currentChat.subscribe(
      (data) => {
        this.chat = data;
        this.typingData = {
          chatId: '',
          msglength: -1,
          userName: ''
        };
      }
    );

    this.messageSocketService.getUpdateChatParticipants()
    .subscribe( result => {
      this.chatService.getChats();
      // console.log(this.chat._id);
      this.chatService.getChatUpdateListener()
      .subscribe( chats => {
        if (chats.length > 0) {
          for (const chat of chats) {
            if (chat._id === this.chat._id) {
              this.chat = chat;
            }
          }
        }
      });
    });

    this.messageSocketService.getTyping()
    .subscribe((data: { chatId: string; msglength: number; userName: string; }) => {
      if (this.chat._id === data.chatId) {
        this.typingData = data;
      }
    });
  }

  ngOnDestroy() {
    this.chatsubs.unsubscribe();
  }

  checkParticipant(user1: string, user2: string) {
    if (user1.match(user2)) {
      return true;
    }
    return false;
  }

}
