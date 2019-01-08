import { TestBed, inject } from '@angular/core/testing';

import { TriviaCrudService } from './trivia-crud.service';

describe('TriviaCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriviaCrudService]
    });
  });

  it('should be created', inject([TriviaCrudService], (service: TriviaCrudService) => {
    expect(service).toBeTruthy();
  }));
});
