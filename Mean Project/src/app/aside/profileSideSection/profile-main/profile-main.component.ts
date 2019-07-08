import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../login-register/auth.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {

  flagUser = false;
  flagAbout = false;
  user: {
    userId: string,
    userName: string,
    profileImage: string,
    about: string
  };
  userName: string;
  about: string;
  previewImage: string | ArrayBuffer;
  image: File;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getCurrentUser().subscribe( user => {
      console.log(user);
      this.user = user;
    });
    this.previewImage = this.user.profileImage;
  }

  // change profile image
  onImagePick(file: FileList) {
    this.image = file.item(0);

    // show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImage = event.target.result;
    };
    reader.readAsDataURL(this.image);

    // upload image
    this.authService.updateUser({image: this.image});
  }

  editUserName() {
    this.flagUser = true;
  }

  editAbout() {
    this.flagAbout = true;
  }

  userNameOnKey(event) {
    this.userName = event.target.innerHTML;
  }

  aboutOnKey(event) {
    this.about = event.target.innerHTML;
  }

  saveUserName(name: any) {
    this.flagUser = false;
    this.authService.updateUser({userName: name});
  }

  saveAbout(uAbout: any) {
    this.flagAbout = false;
    this.authService.updateUser({about: uAbout});
  }

}
