import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorouselImgComponent } from './corousel-img.component';

describe('CorouselImgComponent', () => {
  let component: CorouselImgComponent;
  let fixture: ComponentFixture<CorouselImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorouselImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorouselImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
