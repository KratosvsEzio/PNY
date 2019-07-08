import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideHeaderComponentComponent } from './aside-header-component.component';

describe('AsideHeaderComponentComponent', () => {
  let component: AsideHeaderComponentComponent;
  let fixture: ComponentFixture<AsideHeaderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideHeaderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
