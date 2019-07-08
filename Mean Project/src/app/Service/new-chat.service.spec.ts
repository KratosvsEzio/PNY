import { TestBed } from '@angular/core/testing';

import { NewChatService } from './new-chat.service';

describe('NewChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewChatService = TestBed.get(NewChatService);
    expect(service).toBeTruthy();
  });
});
