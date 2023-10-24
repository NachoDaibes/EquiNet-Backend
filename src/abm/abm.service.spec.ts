import { Test, TestingModule } from '@nestjs/testing';
import { AbmService } from './abm.service';

describe('AbmService', () => {
  let service: AbmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbmService],
    }).compile();

    service = module.get<AbmService>(AbmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
