import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Service/chat.service';
import { ChangeChatService } from '../../Service/change-chat.service';
import { AuthService } from '../../login-register/auth.service';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators} from '@angular/forms';
import { MessageSocketService } from '../../Service/message-socket.service';

@Component({
  selector: 'app-section-footer',
  templateUrl: './section-footer.component.html',
  styleUrls: ['./section-footer.component.css']
})
export class SectionFooterComponent implements OnInit {

  messageForm: FormGroup;
  Message = '';
  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };
  chat: { _id: string; };

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private chatIdService: ChangeChatService,
    private fb: FormBuilder,
    private messageSocketService: MessageSocketService,
    ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;
    });
    this.chatIdService.currentChat.subscribe( (data) => {
      this.chat = data;
    });
    this.messageForm = this.fb.group({
      message: new FormControl('', Validators.required)
    });

  }

  onKey(event) {
    const inputValue = event.target.value;
    if (inputValue.length >= 0) {
      this.messageSocketService.typing({
        chatId: this.chat._id,
        msglength: inputValue.length,
        userName: this.user.userName,
      });
    }
  }

  FormData(messageForm: any) {
    this.Message = messageForm.controls.message.value;

    this.chatService.sendMessage(
      {userName: this.user.userName, userId: this.user.userId, message: this.Message},
      this.chat._id);

    this.messageSocketService.sendMessage({
      chatId: this.chat._id,
      message: this.Message,
      userId: this.user.userId,
      userName: this.user.userName,
    });

    messageForm.reset();
  }
}
