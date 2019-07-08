import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatMainComponent } from './new-chat-main.component';

describe('NewChatMainComponent', () => {
  let component: NewChatMainComponent;
  let fixture: ComponentFixture<NewChatMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChatMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChatMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
