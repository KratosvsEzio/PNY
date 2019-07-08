import { Component, OnInit } from '@angular/core';
import { ChangeChatService } from '../../Service/change-chat.service';
import { MessageSocketService } from '../../Service/message-socket.service';
import { AuthService } from 'src/app/login-register/auth.service';
import { ChatService } from 'src/app/Service/chat.service';

@Component({
  selector: 'app-section-chat',
  templateUrl: './section-chat.component.html',
  styleUrls: ['./section-chat.component.css']
})
export class SectionChatComponent implements OnInit {
  chat: any;

  constructor(
    private chatIdService: ChangeChatService,
  ) {}

  ngOnInit() {
    this.chatIdService.currentChat.subscribe((data) => {
      this.chat = data;
    });
  }
}
