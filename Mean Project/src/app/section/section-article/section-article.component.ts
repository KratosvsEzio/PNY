import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef,
   ChangeDetectionStrategy, AfterViewChecked} from '@angular/core';
import { ChangeChatService } from '../../Service/change-chat.service';
import { Chat } from '../../Model/chat.model';
import { AuthService } from '../../login-register/auth.service';
import * as dateDiff from 'date-diff';
import { MessageSocketService } from '../../Service/message-socket.service';
import { ChatService } from '../../Service/chat.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-section-article',
  templateUrl: './section-article.component.html',
  styleUrls: ['./section-article.component.css']
})
export class SectionArticleComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public chat: any;
  chatId: string;
  perviousDiff: number;
  flagDiff: boolean;
  flagUser: boolean;
  flagOtherUser: boolean;
  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };

  constructor(
      private chatIdService: ChangeChatService,
      private authService: AuthService,
      private changeDetector: ChangeDetectorRef,
      private messageSocketService: MessageSocketService,
      private chatService: ChatService
    ) {}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;
    });

    this.chatIdService.currentChat.subscribe( (data) => {
        this.chatId = data._id;
        this.chatService.getChatUpdateListener().subscribe( (chats: Chat[]) => {
          for (const chat of chats) {
            if (this.chatId === chat._id) {
              this.chat = chat;
            }
          }
        });
    });

    this.messageSocketService.getUpdateChatParticipants().subscribe( result => {
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

  }

  checkDate(d: Date) {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);

    const currentDiff = Math.floor(new dateDiff(newDate, new Date(d)).days());
    if (currentDiff !== this.perviousDiff) {
      this.perviousDiff = currentDiff;
      return true;
    }
    return false;
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  scrollToBottom(): void {
    try {
      if (this.myScrollContainer.nativeElement.scrollTop === 0) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }

  setUserFlags(): void {
    this.flagUser = false;
    this.flagOtherUser = true;
  }

  setOtherUserFlags(): void {
    this.flagUser = true;
    this.flagOtherUser = false;
  }

  setDiffFlag() {
    this.flagDiff = true;
  }

  unsetDiffFlag() {
    this.flagDiff = false;
  }

  setFlags(): void {
    this.flagUser = true;
    this.flagOtherUser = true;
    this.flagDiff = true;
  }
}
