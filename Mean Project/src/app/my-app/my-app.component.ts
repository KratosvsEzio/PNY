import { Component, OnInit } from '@angular/core';
import { MessageSocketService } from '../Service/message-socket.service';
import { ChatService } from '../Service/chat.service';
import { AuthService } from '../login-register/auth.service';
import { Chat } from '../Model/chat.model';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
})
export class MyAppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private messageSocketService: MessageSocketService,
    private chatService: ChatService,
  ) {
  }

  ngOnInit() {
    this.chatService.getChatUpdateListener().subscribe( (chats: Chat[]) => {
      if (chats != null) {
        const user = this.authService.getUser();
        this.messageSocketService.connection(chats, user.userId);
      }
    });
  }
}
