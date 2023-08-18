import { Test, TestingModule } from '@nestjs/testing';
import { IndividualPersonService } from './individual-person.service';

describe('IndividualPersonService', () => {
  let service: IndividualPersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividualPersonService],
    }).compile();

    service = module.get<IndividualPersonService>(IndividualPersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
