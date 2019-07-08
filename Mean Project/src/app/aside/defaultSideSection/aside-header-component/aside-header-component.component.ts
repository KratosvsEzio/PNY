import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../login-register/auth.service';
import { ProfileService } from '../../../Service/profile.service';
import { NewChatService } from '../../../Service/new-chat.service';

@Component({
  selector: 'app-aside-header-component',
  templateUrl: './aside-header-component.component.html',
  styleUrls: ['./aside-header-component.component.css']
})
export class AsideHeaderComponentComponent implements OnInit {

  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private newChatService: NewChatService,
    ) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;
    });
  }

  profile() {
    this.profileService.changeflagProfile(true);
  }

  newChat() {
    this.newChatService.changeflagNewChat(true);
  }
}
