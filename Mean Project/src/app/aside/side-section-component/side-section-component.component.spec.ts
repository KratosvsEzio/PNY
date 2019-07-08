import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSectionComponentComponent } from './side-section-component.component';

describe('SideSectionComponentComponent', () => {
  let component: SideSectionComponentComponent;
  let fixture: ComponentFixture<SideSectionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideSectionComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideSectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
