import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCardsComponent } from './box-cards.component';

describe('BoxCardsComponent', () => {
  let component: BoxCardsComponent;
  let fixture: ComponentFixture<BoxCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
