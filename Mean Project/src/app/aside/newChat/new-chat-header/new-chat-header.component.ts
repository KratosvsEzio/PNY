import { Component, OnInit } from '@angular/core';
import { NewChatService } from '../../../Service/new-chat.service';

@Component({
  selector: 'app-new-chat-header',
  templateUrl: './new-chat-header.component.html',
  styleUrls: ['./new-chat-header.component.css']
})

export class NewChatHeaderComponent implements OnInit {

  constructor( private newChatService: NewChatService ) { }

  ngOnInit() {
  }

  back() {
    this.newChatService.changeflagNewChat(false);
  }

}
