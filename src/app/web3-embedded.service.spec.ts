import { TestBed, inject } from '@angular/core/testing';

import { Web3EmbeddedService } from './web3-embedded.service';

describe('Web3EmbeddedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3EmbeddedService]
    });
  });

  it('should be created', inject([Web3EmbeddedService], (service: Web3EmbeddedService) => {
    expect(service).toBeTruthy();
  }));
});
