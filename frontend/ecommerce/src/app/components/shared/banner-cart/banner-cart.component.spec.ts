import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCartComponent } from './banner-cart.component';

describe('BannerCartComponent', () => {
  let component: BannerCartComponent;
  let fixture: ComponentFixture<BannerCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
