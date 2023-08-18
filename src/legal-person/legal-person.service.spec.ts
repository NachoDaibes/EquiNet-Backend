import { Test, TestingModule } from '@nestjs/testing';
import { LegalPersonService } from './legal-person.service';

describe('LegalPersonService', () => {
  let service: LegalPersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalPersonService],
    }).compile();

    service = module.get<LegalPersonService>(LegalPersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
