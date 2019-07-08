import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../Service/profile.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  back() {
    this.profileService.changeflagProfile(false);
  }

}
