import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private flagProfile = new BehaviorSubject<boolean>(false);
  currentflagProfile = this.flagProfile.asObservable();

  constructor() { }

  changeflagProfile(status: boolean) {
    this.flagProfile.next(status);
  }
}
