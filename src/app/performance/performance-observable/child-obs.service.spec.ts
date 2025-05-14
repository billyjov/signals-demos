import { TestBed } from '@angular/core/testing';

import { ChildObsService } from './child-obs.service';

describe('ChildObsService', () => {
  let service: ChildObsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
