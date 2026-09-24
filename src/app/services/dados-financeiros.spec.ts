import { TestBed } from '@angular/core/testing';

import { DadosFinanceiros } from './dados-financeiros';

describe('DadosFinanceiros', () => {
  let service: DadosFinanceiros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosFinanceiros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
