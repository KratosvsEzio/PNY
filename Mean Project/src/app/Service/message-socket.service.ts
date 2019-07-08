import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {

  private socket: any;

  connection(chats: any, userId: string) {
    this.socket.emit('chatroom', { chats, userId });
  }

  public sendMessage(msg: {
    chatId: string,
    message: string,
    userId: string
    userName: string
  }) {
    this.socket.emit('chat', msg);
  }

  public typing(msg: {
    chatId: string,
    msglength: number,
    userName: string
  }) {
    this.socket.emit('typing', msg);
  }

  public updateChatParticipants() {
    this.socket.emit('updateChatParticipants', true);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('msg', (message: any) => {
          observer.next(message);
        });
    });
  }

  public getTyping = () => {
    return Observable.create((observer) => {
        this.socket.on('typing', (data: any) => {
          observer.next(data);
        });
    });
  }

  public getUpdateChatParticipants = () => {
    return Observable.create((observer) => {
        this.socket.on('updateChatParticipants', (data: any) => {
          observer.next(data);
        });
    });
  }


  constructor() {
    this.socket = io('http://localhost:4000');
  }
}
