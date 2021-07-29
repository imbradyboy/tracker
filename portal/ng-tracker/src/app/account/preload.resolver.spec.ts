import { TestBed } from '@angular/core/testing';

import { PreloadResolver } from './preload.resolver';

describe('PreloadResolver', () => {
  let resolver: PreloadResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PreloadResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
