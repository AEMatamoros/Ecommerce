import { TestBed } from '@angular/core/testing';

import { ValidadoresRegisterService } from './validadores-register.service';

describe('ValidadoresRegisterService', () => {
  let service: ValidadoresRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidadoresRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
