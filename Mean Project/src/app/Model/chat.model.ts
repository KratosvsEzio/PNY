// import { AuthData } from './auth-data.model';

export interface Chat {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  participants: [{
    _id: string;
    name: string;
    email: string;
    about: string;
    profileImagePath: string,
    userId: string;
    createdAt: Date;
  }];
  messages: [{
    _id: string;
    message: string;
    senderId: string,
    senderName: string,
    createdAt: Date;
    updatedAt: Date;
  }];
}
