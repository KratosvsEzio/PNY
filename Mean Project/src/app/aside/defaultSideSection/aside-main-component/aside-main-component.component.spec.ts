import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideMainComponentComponent } from './aside-main-component.component';

describe('AsideMainComponentComponent', () => {
  let component: AsideMainComponentComponent;
  let fixture: ComponentFixture<AsideMainComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideMainComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
