import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionChatComponent } from './section-chat.component';

describe('SectionChatComponent', () => {
  let component: SectionChatComponent;
  let fixture: ComponentFixture<SectionChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
