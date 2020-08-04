import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorprofilesComponent } from './vendedorprofiles.component';

describe('VendedorprofilesComponent', () => {
  let component: VendedorprofilesComponent;
  let fixture: ComponentFixture<VendedorprofilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorprofilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
