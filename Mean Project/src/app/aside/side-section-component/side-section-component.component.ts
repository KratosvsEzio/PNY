import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../Service/chat.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ProfileService } from '../../Service/profile.service';
import { NewChatService } from '../../Service/new-chat.service';
import { MessageSocketService } from 'src/app/Service/message-socket.service';

@Component({
  selector: 'app-side-section-component',
  templateUrl: './side-section-component.component.html',
  styleUrls: ['./side-section-component.component.css']
})
export class SideSectionComponentComponent implements OnInit {
  createChatForm: FormGroup;
  flagProfile: boolean;
  flagNewChat: boolean;
  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private newChatService: NewChatService,
    private messageSocketService: MessageSocketService
    ) {}

  ngOnInit() {
    this.createChatForm = this.fb.group({
      emailid: ['', [Validators.required, Validators.email]]
    });
    this.profileService.currentflagProfile.subscribe( flag => {
      this.flagProfile = flag;
    });
    this.newChatService.currentFlagNewChat.subscribe( flag => {
      this.flagNewChat = flag;
    });

    this.messageSocketService.getMessages().subscribe( (data: any) => {
      setTimeout( () => {
        this.chatService.getChats();
      }, 50);
    });

    this.messageSocketService.getUpdateChatParticipants().subscribe( () => {
      this.chatService.getChats();
    });
  }

  submitForm(createChatForm: FormGroup) {
    const email = createChatForm.controls.emailid.value;
    this.chatService.creatChat({email});
    createChatForm.reset();
  }

}
