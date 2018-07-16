import { TestBed, inject } from '@angular/core/testing';

import { UserLoggedInService } from './user-logged-in.service';

describe('UserLoggedInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoggedInService]
    });
  });

  it('should be created', inject([UserLoggedInService], (service: UserLoggedInService) => {
    expect(service).toBeTruthy();
  }));
});
