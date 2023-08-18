import { Test, TestingModule } from '@nestjs/testing';
import { IndividualPersonController } from './individual-person.controller';
import { IndividualPersonService } from './individual-person.service';

describe('IndividualPersonController', () => {
  let controller: IndividualPersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividualPersonController],
      providers: [IndividualPersonService],
    }).compile();

    controller = module.get<IndividualPersonController>(IndividualPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
