import { Test, TestingModule } from '@nestjs/testing';
import { LegalPersonController } from './legal-person.controller';
import { LegalPersonService } from './legal-person.service';

describe('LegalPersonController', () => {
  let controller: LegalPersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegalPersonController],
      providers: [LegalPersonService],
    }).compile();

    controller = module.get<LegalPersonController>(LegalPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
