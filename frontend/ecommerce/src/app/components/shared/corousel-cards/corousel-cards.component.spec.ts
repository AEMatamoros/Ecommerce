import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorouselCardsComponent } from './corousel-cards.component';

describe('CorouselCardsComponent', () => {
  let component: CorouselCardsComponent;
  let fixture: ComponentFixture<CorouselCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorouselCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorouselCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
