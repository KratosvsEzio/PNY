import { TestBed } from '@angular/core/testing';

import { ChangeChatService } from './change-chat.service';

describe('ChangeChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeChatService = TestBed.get(ChangeChatService);
    expect(service).toBeTruthy();
  });
});
